"use client";
import { useAppSelector } from "@lib/redux/store";
import React from "react";

interface Destination {
  id: number;
  country: string;
  location: string;
  image: string;
}

const FeaturedDestinations: React.FC = () => {
  const { featured_tours } = useAppSelector((state) => state.appData?.data);
  const [likedDestinations, setLikedDestinations] = React.useState<Set<number>>(new Set());

  const destinations: Destination[] = React.useMemo(() => {
    if (!featured_tours || !Array.isArray(featured_tours)) {
      return [];
    }

    return featured_tours.map((tour: any, index: number) => ({
      id: tour.id || index + 1,
      country: tour.country,
      location: tour.location,
      image: tour.img,
    }));
  }, [featured_tours]);

  const toggleLike = (destinationId: number) => {
    setLikedDestinations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(destinationId)) {
        newSet.delete(destinationId);
      } else {
        newSet.add(destinationId);
      }
      return newSet;
    });
  };

  const handleExploreNow = (destination: Destination) => {
    console.log(`Exploring ${destination.location}, ${destination.country}`);
  };

  if (!featured_tours) {
    return (
      <div className="py-6 ">
        <div className="w-full max-w-[1200px] mx-auto appHorizantalSpacing">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse bg-gray-300 rounded-[65px] w-full max-w-[415px] h-[577px]"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="sectionVerticalSpacing ">
        <div className="w-full max-w-[1200px] mx-auto appHorizantalSpacing">
          <div className="text-center mb-6">
            <h1
              className="text-4xl font-bold text-gray-900 mb-2 md:mb-4"
              style={{ fontFamily: "Urbanist, sans-serif" }}
            >
              Featured Destination
            </h1>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "Urbanist, sans-serif" }}
            >
              Discover the most stunning and sought-after travel spots, curated
              for unforgettable experiences around the globe.
            </p>
          </div>

          {destinations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No featured destinations available at the moment.
              </p>
            </div>
          ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {destinations.map((destination) => (
    <div
      key={destination.id}
      className="bg-[#F5F5F5] rounded-[65px]  w-full"
    >
      {/* Image wrapper with aspect ratio */}
      <div className="relative overflow-hidden rounded-[55px] m-3 aspect-[4/3]">
        <img
          src={destination.image}
          alt={`${destination.location}, ${destination.country}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "./images/destinations/default.jpg";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3
          className="text-xl font-extrabold text-gray-900 mb-4 pl-4
                     sm:text-2xl md:text-xl lg:text-2xl"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          {destination.location}, {destination.country}
        </h3>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExploreNow(destination)}
            className="flex-1 ml-3 bg-[#163C8C] hover:bg-blue-700 text-white font-medium
                       py-3 px-3 text-sm sm:text-base md:text-sm lg:text-base
                       rounded-full transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Explore Now
          </button>

          <button
            onClick={() => toggleLike(destination.id)}
            className="bg-[#EBEFF4] mr-3 hover:bg-gray-200 rounded-full transition-all duration-200
                       flex items-center justify-center flex-shrink-0
                       w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
            aria-label={`${
              likedDestinations.has(destination.id) ? "Unlike" : "Like"
            } ${destination.location}, ${destination.country}`}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 transition-colors duration-200"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.22371 1.44739C3.27589 1.44739 0.885498 3.98725 0.885498 7.11938C0.885498 13.3881 11 20.5526 11 20.5526C11 20.5526 21.1145 13.3881 21.1145 7.11938C21.1145 3.23878 18.7241 1.44739 15.7763 1.44739C13.686 1.44739 11.8766 2.72406 11 4.58288C10.1234 2.72406 8.31404 1.44739 6.22371 1.44739Z"
                stroke={
                  likedDestinations.has(destination.id) ? "#EF4444" : "#6B7280"
                }
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={
                  likedDestinations.has(destination.id) ? "#EF4444" : "none"
                }
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedDestinations;
