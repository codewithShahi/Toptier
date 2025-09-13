"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@lib/redux/store";
// import CustomRating from "@components/core/customRating/customRating";
type Hotel = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  amenities: string[];
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  imageUrl: string;
};
const FeatureHotels: React.FC = () => {
  const { hotels = [] } = useAppSelector((state) => state?.appData?.data?.featured);
// Manual Star Rating Component (no external lib)
  const StarRating = ({ rating = 0 }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xs ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  const activeHotels = hotels.filter((hotel: any) => hotel.status);
  if (activeHotels.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon icon="material-symbols-light:hotel" className="text-2xl text-gray-300" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No feature hotels available</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Check back later for new listings.</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 py-3 animate-fade-in">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels && hotels.length > 0 ? (hotels
            .filter((hotel: any) => hotel.status)

            .map((hotel: any , i:number) => {

              // Support both string and array for amenities
              let amenitiesArr = [];
              if (Array.isArray(hotel.amenities)) {
                amenitiesArr = hotel.amenities;
              } else if (typeof hotel.amenities === "string") {
                amenitiesArr = hotel.amenities
                  .split(",")
                  .map((a: any) => a.trim());
              } else {
                amenitiesArr = ["No amenities listed"];
              }
              // console.log("Hotel Data:", hotel);
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-transform duration-300 group hover:scale-[1.02] hover:shadow-2xl hover:z-10"
                >
                  {/* Top Section with Background Image and Zoom Effect */}
                  <div className="relative h-44 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${hotel.imageUrl ||
                          hotel.img ||
                          "https://iata.co/assets/img/no_image.png"
                          }')`,
                      }}
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 bg-opacity-90 text-gray-800 dark:text-yellow-300 px-2 py-1 rounded-lg flex items-center gap-1">
                      <Icon
                        icon="material-symbols:star"
                        width={16}
                        className="text-yellow-300"
                      />
                      <span className="text-xs font-semibold">
                        {hotel.rating || "4.0"}
                      </span>
                    </div>
                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg">
                      <span className="text-xs font-bold">
                        {" "}
                        {hotel.regular_price && hotel.sale_price
                          ? `-${Math.round(
                            ((Number(hotel.regular_price) -
                              Number(hotel.sale_price)) /
                              Number(hotel.regular_price)) *
                            100
                          )}% OFF`
                          : ""}
                      </span>
                    </div>
                  </div>
                  {/* Content Section */}
                  <div className="p-4">
                    {/* Hotel Name */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                      {hotel.name || hotel.title || "Hotel Name"}
                    </h3>
                    {/* Location */}
                    <div className="flex items-center gap-1 mb-3">
                      <Icon
                        icon="material-symbols:location-on-outline"
                        width={18}
                        className="text-blue-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {hotel.location || "Unknown Location"}
                      </span>
                    </div>
                    {/* Amenities */}
                    <div className="flex gap-3 mb-4">
                      {amenitiesArr.map((amenity: any, index: number) => (
                        <div key={index} className="flex items-center gap-1">
                          <span className="text-xs bg-blue-50 dark:bg-blue-50 rounded-md px-2 py-1 text-blue-600 dark:text-blue-600 font-medium">
                            {amenity || "Amenity"}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-1 mb-4 pb-2">
                      <StarRating rating={hotel.rating} />


                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({hotel.rating ? hotel.rating.toLocaleString() : "0"})
                      </span>
                    </div>
                    <div className="flex flex-col gap-2  border-b border-gray-100 dark:border-gray-700 pb-2">
                      {/* Features */}
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <Icon
                          icon="material-symbols:check-circle-outline"
                          className="text-green-500"
                          width={25}
                        />
                        <span className="text-xs">
                          Hotel accommodation included
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <Icon
                          icon="material-symbols:check-circle-outline"
                          className="text-green-500"
                          width={25}
                        />
                        <span className="text-xs">
                          Professional guide & transport
                        </span>
                      </div>
                    </div>
                    {/* Pricing and Book Button */}
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 dark:text-gray-400 line-through">
                            $
                            {hotel.originalPrice ||
                              hotel.regular_price ||
                              "1000.00"}
                          </span>
                          <span className="text-md font-bold text-gray-800 dark:text-gray-50">
                            $
                            {hotel.discountedPrice ||
                              hotel.sale_price ||
                              "800.00"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          per night
                        </span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm duration-200">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })) : (
            <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">
              No featured hotels available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FeatureHotels;