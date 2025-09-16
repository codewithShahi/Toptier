"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@lib/redux/store";
import { addToFavourite } from "@src/actions"; // 👈 import API

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  price: string;
  stars: string;
  left_rooms: string;
  img: string;
  amenities?: string[];
  favorite?: number; // 1 = liked, 0 = not liked
}

const FeaturedHotels: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const { featured_hotels } = useAppSelector((state) => state.appData?.data);

  // simulate userId (replace with real auth value)
  const userId = "123";

  // Sync redux → local state
  useEffect(() => {
    if (featured_hotels && Array.isArray(featured_hotels)) {
      setHotels(featured_hotels);
    }
  }, [featured_hotels]);

  // ⭐ Star Rating Renderer
  const renderStars = (stars: number) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starsArr = [];
    for (let i = 0; i < fullStars; i++) {
      starsArr.push(
        <Icon
          key={`full-${i}`}
          icon="material-symbols:star-rate-rounded"
          className="text-[#FE9A00]"
          width="24"
          height="24"
        />
      );
    }
    if (hasHalfStar) {
      starsArr.push(
        <Icon
          key="half"
          icon="material-symbols:star-half"
          className="text-[#FE9A00]"
          width="24"
          height="24"
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      starsArr.push(
        <Icon
          key={`empty-${i}`}
          icon="material-symbols:star-rate-rounded"
          className="text-gray-300"
          width="20"
          height="20"
        />
      );
    }
    return starsArr;
  };

const renderStars = (stars: number) => {
  const fullStars = Math.floor(stars); // whole stars
  const hasHalfStar = stars % 1 >= 0.5; // check if half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starsArr = [];

  for (let i = 0; i < fullStars; i++) {
    starsArr.push(
      <Icon
        key={`full-${i}`}
        icon="material-symbols:star-rate-rounded"
        className="text-[#FE9A00]"
        width="24"
        height="24"
      />
    );
  }


  if (hasHalfStar) {
    starsArr.push(
      <Icon
        key="half"
        icon="material-symbols:star-half"
        className="text-[#FE9A00]"
        width="24"
        height="24"
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    starsArr.push(
      <Icon
        key={`empty-${i}`}
        icon="material-symbols:star-rate-rounded"
        className="text-gray-300"
        width="20"
        height="20"
      />
    );
  }

  return starsArr;
};


  // ❤️ Handle Favorite API
  const toggleLike = async (hotel: Hotel) => {
    try {
      const payload = {
        item_id: String(hotel.id),
        module: "hotels", // 👈 confirm with backend
        user_id: userId,
      };

      const res = await addToFavourite(payload);

      if (res?.error) {
        console.error("Error updating favourite:", res.error);
        return;
      }

      // update local state
      setHotels((prev) =>
        prev.map((h) =>
          h.id === hotel.id ? { ...h, favorite: h.favorite === 1 ? 0 : 1 } : h
        )
      );
    } catch (err) {
      console.error("toggleLike error:", err);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto appHorizantalSpacing py-6">
      <div className="text-center mb-8 md:mb-12">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          Featured Hotels
        </h1>
        <p
          className="text-base sm:text-lg text-[#697488] max-w-md mx-auto leading-relaxed px-4"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          Experience world-class comfort and unmatched hospitality in the heart
          of paradise
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
        {hotels?.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-[#F5F5F5] p-[8px] rounded-[55px] shadow cursor-pointer transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredId(hotel.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={hotel.img}
              alt={hotel.name}
              className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[393px] object-cover rounded-[55px]"
            />
            <div className="px-4 pt-[16px]">
              {/* Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="font-[800] text-[20px] sm:text-[24px] lg:text-[25px] leading-tight">
                  {hotel.name}
                </p>

                {renderStars(Number(hotel.stars))}

              </div>

              <p className="text-[16px] sm:text-[17px] lg:text-[18px] my-2 font-[400] text-[#5B697E]">
                {hotel.city}, {hotel.country}
              </p>

              {/* Stars - now above pricing */}
              <div className="flex items-center gap-1 mb-2">
                {renderStars(Number(hotel.stars))}
              </div>

              {/* Price & Rooms */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-[24px] sm:text-[28px] lg:text-[30px] font-[900]">
                    ${hotel.price}
                  </p>
                  <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[400] text-[#5B697E]">
                    /night
                  </p>
                </div>
                {/* Commented out green rooms left text */}
                {/* <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:circle"
                    className="text-[#00A63E]"
                    width="11px"
                    height="11px"
                  />
                  <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#00A63E] font-[500]">
                    {hotel.left_rooms} rooms left
                  </p>
                </div> */}
              </div>

              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  hoveredId === hotel.id ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="py-[16px]">
                  <div className="border-t border-[#E1E1E1] pt-[20px] mt-[24px] space-y-4">
                    {hotel.amenities?.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <Icon icon="mdi:check-circle" className="text-blue-600" />
                        <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[500]">
                          {amenity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center px-4 py-[16px] justify-between gap-3">
              <button className="text-[16px] sm:text-[18px] lg:text-[20px] font-[600] px-4 sm:px-6 bg-[#163D8C] text-white rounded-full py-[12px] sm:py-[16px] flex-1 transition-all duration-200 hover:bg-[#1a4299]">
                Book Now
              </button>
              <button
  onClick={() => toggleLike(hotel)}
  className="bg-[#EBEFF4] hover:bg-gray-200 rounded-full transition-all duration-200
             flex items-center justify-center flex-shrink-0
             w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-16 lg:h-16"
  aria-label={`${hotel.favorite === 1 ? "Unlike" : "Like"} ${hotel.name}`}
>
  <svg
    className="transition-colors duration-200 w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.22371 1.44739C3.27589 1.44739 0.885498 3.98725 0.885498 7.11938C0.885498 13.3881 11 20.5526 11 20.5526C11 20.5526 21.1145 13.3881 21.1145 7.11938C21.1145 3.23878 18.7241 1.44739 15.7763 1.44739C13.686 1.44739 11.8766 2.72406 11 4.58288C10.1234 2.72406 8.31404 1.44739 6.22371 1.44739Z"
      stroke={hotel.favorite === 1 ? "#ef4444" : "#6b7280"}  // ✅ red if fav
      strokeOpacity="0.8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={hotel.favorite === 1 ? "#ef4444" : "none"}       // ✅ filled red if fav
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