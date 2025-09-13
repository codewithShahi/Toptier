"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "@src/actions";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { setCountry } from "@lib/redux/base";
import { useEffect, useState } from "react";

const useCountries = () => {
  const [countries, setCountries] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const defaultCountry =
    useAppSelector((state) => state?.appData?.data?.app?.country_name) || "";
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (data && data.data) {
      const filtered = (data.data || [])
        .filter((country: { status: string }) => country.status)

        .map((country: { name: any; id: any }) => ({
          label: country?.name.toLocaleLowerCase(),
          value: country?.id.toString(),
        }));
      setCountries(filtered);
    }
  }, [data]);

  const dispatch = useAppDispatch();
  const currentCountry = useAppSelector(
    (state) => state?.root?.country
  ) as string;
  const country = currentCountry;
  useEffect(() => {
    const select = countries.find((con: { label: string; value: string }) => {
      return con.label === defaultCountry || con.value === country;
    });
    if (select) {
      setSelectedCountry(select);
    }
  }, [country, countries, isLoading, defaultCountry]);
  useEffect(() => {
    if (country) {
      dispatch(setCountry(country));
    }
  }, [country, dispatch]);
  return { countries, isLoading, selectedCountry };
};

export default useCountries;
