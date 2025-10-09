"use client";
import { useAppSelector, useAppDispatch } from "@lib/redux/store";
import { setCurrency } from "@lib/redux/base";
import { useEffect } from "react";

const useCurrency = () => {
  const dispatch = useAppDispatch();
  const currencies =
    useAppSelector((state) => state?.appData?.data?.currencies) || [];
  const currentCurrency = useAppSelector(
    (state) => state?.root?.currency
  ) as string;
  const defaultCurrency = currencies?.find(
    (currency: any) => currency?.default === "1"
  );
  const currency = currentCurrency ? currentCurrency : defaultCurrency?.name;
  localStorage.setItem('currency', currency)
  useEffect(() => {
    if (currency) {
      dispatch(setCurrency(currency));
    }
  }, [currency, dispatch]);

  return { currency };
};

export default useCurrency;
