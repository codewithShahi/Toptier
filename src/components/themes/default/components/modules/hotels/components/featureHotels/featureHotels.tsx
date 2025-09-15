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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Antalya Paradise",
      location: "Antalya, Turkey",
      price: 450,
      oldPrice: 600,
      reviews: 310,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Antalya Paradise",
      location: "Antalya, Turkey",
      price: 450,
      oldPrice: 600,
      reviews: 310,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="appHorizantalSpacing py-6">
      {/* Heading */}

         <div className="text-center mb-12">
            <h1
              className="text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Urbanist, sans-serif' }}
            >
            Featured Hotels
            </h1>
            <p
              className="text-lg text-[#697488] max-w-md mx-auto leading-relaxed"
              style={{ fontFamily: 'Urbanist, sans-serif' }}
            >
               Experience world-class comfort and unmatched hospitality in the heart
          of paradise
            </p>
          </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        {hotels.map((hotel, index) => (
          <div
            key={hotel.id}
            className="bg-[#F5F5F5] p-[8px] rounded-[55px] shadow cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-[393px] object-cover rounded-[55px]"
            />
            <div className="px-4 pt-[16px]">
              {/* Title & Reviews */}
              <div className="flex text-center items-center justify-between">
                <p className="font-[800] text-[28px]">{hotel.name}</p>
                <div className="flex text-center items-center">
                  <Icon
                    icon="material-symbols:star-rate-rounded"
                    className="text-[#FE9A00]"
                    width="22"
                    height="22"
                  />
                  <p className="text-[#5B697E] text-[17px] font-[400]">
                    ({hotel.reviews} reviews)
                  </p>
                </div>
              </div>

              {/* Location */}
              <p className="text-[18px] my-2 font-[400] text-[#5B697E]">
                {hotel.location}
              </p>

              {/* Price */}
              <div className="flex justify-between">
                <div className="flex gap-2 text-center items-center">
                  <p className="text-[30px] font-[900]">${hotel.price}</p>
                  <p className="text-[17px] font-[500] text-[#90A1B9]">
                    ${hotel.oldPrice}
                  </p>
                  <p className="text-[17px] font-[400] text-[#5B697E]">/night</p>
                </div>
                <div className="flex text-center items-center gap-2">
                  <Icon
                    icon="material-symbols:circle"
                    className="text-[#00A63E]"
                    width="11px"
                    height="11px"
                  />
                  <p className="text-[16px] text-[#00A63E] font-[500]">
                    2 rooms left
                  </p>
                </div>
              </div>

              {/* Extra details only on hover */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  hoveredIndex === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="py-[16px]">
                  <div className="border-t border-[#E1E1E1] pt-[20px] mt-[24px]">
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center ">
                        <div className="bg-[#FFF6D1] rounded-[11px] p-[11px]">
                          <Icon icon="mdi:waves" width="20" height="20" />
                        </div>
                        <p className="text-[17px] font-[500]">Private Beach</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#FFE0D8] rounded-[11px] p-[11px]">
                          <Icon icon="mdi:local-restaurant" width="24" height="24" />
                        </div>
                        <p className="text-[17px] font-[500]">5 Restaurants</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <div className="flex gap-2 items-center ">
                        <div className="bg-[#E5F2FF] rounded-[11px] p-[11px]">
                          <Icon icon="mdi:car-hatchback" width="24" height="24" />
                        </div>
                        <p className="text-[17px] font-[500]">Valet Parking</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#D1FFE8] rounded-[11px] p-[11px]">
                          <Icon icon="mdi:gym" width="24" height="24" />
                        </div>
                        <p className="text-[17px] font-[500]">Fitness Center</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex items-center px-4 py-[16px] justify-between">
              <button className="text-[20px] font-[600] px-2 bg-[#163D8C] text-white rounded-full py-[16px] w-[291px]">
                Book Now
              </button>
              <div className="bg-[#EBEFF4] rounded-full p-[18px]">
                <Icon
                  icon="mdi:heart-outline"
                  className="rounded-full"
                  width="28"
                  height="28"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHotels;
