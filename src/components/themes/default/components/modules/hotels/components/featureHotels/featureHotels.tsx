"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

// ✅ Define Hotel type
interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  oldPrice: number;
  reviews: number;
  image: string;
}

const FeaturedHotels: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [likedDestinations, setLikedDestinations] = useState<Set<number>>(new Set());

  const toggleLike = (hotelId: number) => {
    setLikedDestinations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(hotelId)) {
        newSet.delete(hotelId);
      } else {
        newSet.add(hotelId);
      }
      return newSet;
    });
  };

  const hotels: Hotel[] = [
    {
      id: 1,
      name: "Marmaris Resort",
      location: "Marmaris, Turkey",
      price: 420,
      oldPrice: 560,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Istanbul Luxury",
      location: "Istanbul, Turkey",
      price: 380,
      oldPrice: 500,
      reviews: 180,
      image: "./images/fh2.jpg",
    },
    {
      id: 3,
      name: "Antalya Paradise",
      location: "Antalya, Turkey",
      price: 450,
      oldPrice: 600,
      reviews: 310,
      image: "./images/fh3.jpg",
    },
    {
      id: 4,
      name: "Cappadocia Dreams",
      location: "Cappadocia, Turkey",
      price: 450,
      oldPrice: 600,
      reviews: 310,
      image: "./images/fh6.jpg",
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto appHorizantalSpacing py-6">
      <div className="text-center mb-8 md:mb-12">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: 'Urbanist, sans-serif' }}
        >
          Featured Hotels
        </h1>
        <p
          className="text-base sm:text-lg text-[#697488] max-w-md mx-auto leading-relaxed px-4"
          style={{ fontFamily: 'Urbanist, sans-serif' }}
        >
          Experience world-class comfort and unmatched hospitality in the heart
          of paradise
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-[#F5F5F5] p-[8px] rounded-[55px] shadow cursor-pointer transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredId(hotel.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[393px] object-cover rounded-[55px]"
            />
            <div className="px-4 pt-[16px]">
              {/* Title & Reviews */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="font-[800] text-[20px] sm:text-[24px] lg:text-[25px] leading-tight">
                  {hotel.name}
                </p>
                <div className="flex items-center">
                  <Icon
                    icon="material-symbols:star-rate-rounded"
                    className="text-[#FE9A00]"
                    width="22"
                    height="22"
                  />
                  <p className="text-[#5B697E] text-[14px] sm:text-[16px] lg:text-[14px] font-[400]">
                    ({hotel.reviews} reviews)
                  </p>
                </div>
              </div>
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] my-2 font-[400] text-[#5B697E]">
                {hotel.location}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-[24px] sm:text-[28px] lg:text-[30px] font-[900]">
                    ${hotel.price}
                  </p>
                  <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[500] text-[#90A1B9] line-through">
                    ${hotel.oldPrice}
                  </p>
                  <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[400] text-[#5B697E]">
                    /night
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:circle"
                    className="text-[#00A63E]"
                    width="11px"
                    height="11px"
                  />
                  <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#00A63E] font-[500]">
                    2 rooms left
                  </p>
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  hoveredId === hotel.id ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="py-[16px]">
                  <div className="border-t border-[#E1E1E1] pt-[20px] mt-[24px]">
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#FFF6D1] rounded-[11px] p-[8px] sm:p-[11px]">
                          <Icon icon="mdi:waves" width="16" height="16" className="sm:w-5 sm:h-5" />
                        </div>
                        <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[500]">
                          Private Beach
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#FFE0D8] rounded-[11px] p-[8px] sm:p-[11px]">
                          <Icon icon="mdi:local-restaurant" width="18" height="18" className="sm:w-6 sm:h-6" />
                        </div>
                        <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[500]">
                          5 Restaurants
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#E5F2FF] rounded-[11px] p-[8px] sm:p-[11px]">
                          <Icon icon="mdi:car-hatchback" width="18" height="18" className="sm:w-6 sm:h-6" />
                        </div>
                        <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[500]">
                          Valet Parking
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#D1FFE8] rounded-[11px] p-[8px] sm:p-[11px]">
                          <Icon icon="mdi:gym" width="18" height="18" className="sm:w-6 sm:h-6" />
                        </div>
                        <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[500]">
                          Fitness Center
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center px-4 py-[16px] justify-between gap-3">
              <button className="text-[16px] sm:text-[18px] lg:text-[20px] font-[600] px-4 sm:px-6 bg-[#163D8C] text-white rounded-full py-[12px] sm:py-[16px] flex-1 transition-all duration-200 hover:bg-[#1a4299]">
                Book Now
              </button>
              <button
                onClick={() => toggleLike(hotel.id)}
                className="bg-[#EBEFF4] hover:bg-gray-200 rounded-full transition-all duration-200 flex items-center justify-center flex-shrink-0
                         w-12 h-12
                         sm:w-14 sm:h-14
                         md:w-12 md:h-12
                         lg:w-16 lg:h-16"
                aria-label={`${likedDestinations.has(hotel.id) ? 'Unlike' : 'Like'} ${hotel.name}`}
              >
                <svg 
                  className="transition-colors duration-200
                           w-5 h-5
                           sm:w-6 sm:h-6
                           md:w-5 md:h-5
                           lg:w-6 lg:h-6" 
                  viewBox="0 0 22 22" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M6.22371 1.44739C3.27589 1.44739 0.885498 3.98725 0.885498 7.11938C0.885498 13.3881 11 20.5526 11 20.5526C11 20.5526 21.1145 13.3881 21.1145 7.11938C21.1145 3.23878 18.7241 1.44739 15.7763 1.44739C13.686 1.44739 11.8766 2.72406 11 4.58288C10.1234 2.72406 8.31404 1.44739 6.22371 1.44739Z" 
                    stroke={likedDestinations.has(hotel.id) ? "#ef4444" : "#6b7280"}
                    strokeOpacity="0.8" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill={likedDestinations.has(hotel.id) ? "#ef4444" : "none"}
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHotels;