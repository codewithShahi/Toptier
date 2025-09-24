"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { hotel_details } from "@src/actions/server-actions";
import HotelDetailsSearch from "./hotelDetailsSearch";
import SwiperImageSlider from "./imageSlider";
// import { hotel_details } from "@src/actions/hotelDetails";

interface HotelDetailsPayload {
  hotel_id: string;
  checkin: string;
  checkout: string;
  rooms: number;
  adults: number;
  childs: number;
  child_age: string;
  nationality: string;
  language: string;
  currency: string;
  supplier_name: string;
}

const HotelsDetails = () => {
  const params = useParams();
  const slugArr = (params?.slug as string[]) || [];

  const payload: HotelDetailsPayload = {
    hotel_id: slugArr[0],
    checkin: slugArr[2],
    checkout: slugArr[3],
    rooms: Number(slugArr[4]),
    adults: Number(slugArr[5]),
    childs: Number(slugArr[6]),
    child_age: "", // 👉 optional: "5,8" if API expects ages
    nationality: slugArr[7],
    language: "en", // 👉 set default or detect from app
    currency: "USD", // 👉 set default or detect from user settings
    supplier_name: slugArr[8],
  };

  const { data: hotelDetails, isLoading } = useQuery({
    queryKey: ["hotel-details", payload],
    queryFn: () => hotel_details(payload),
    enabled: slugArr.length > 0,
    staleTime: Infinity,
  });
  const { img } = hotelDetails || {};
// console.log("hotel details payload", payload);
  console.log("hotel details data", hotelDetails);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
     <HotelDetailsSearch/>
     {/* <SwiperImageSlider images={img}/> */}
    </div>
  );
};

export default HotelsDetails;
