"use client";
import React from 'react';
interface Destination {
  id: number;
  name: string;
  image: string;
  isLiked?: boolean;
}
const FeaturedDestinations: React.FC = () => {
  const destinations: Destination[] = [
    {
      id: 1,
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      isLiked: false
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      image: "./images/fd2.jpg",
      isLiked: false
    },
    {
      id: 3,
      name: "Cape Town, South Africa",
      image: "./images/fd3.jpg",
    },
    {
      id: 4,
      name: "Paris, France",
      image: "./images/fd4.jpg",
      isLiked: false
    },
    {
      id: 5,
      name: "Bali, Indonesia",
    image: "./images/fd5.jpg",
      isLiked: false
    },
    {
      id: 6,
      name: "Banff, Canada",
      image: "./images/fd6.jpg",
      isLiked: false
    }
  ];
  const [likedDestinations, setLikedDestinations] = React.useState<Set<number>>(new Set());
  const toggleLike = (destinationId: number) => {
    setLikedDestinations(prev => {
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
    console.log(`Exploring ${destination.name}`);
  };
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <div className=" py-6 appHorizantalSpacing">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Urbanist, sans-serif' }}>
              Featured Destination
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Urbanist, sans-serif' }}>
              Discover the most stunning and sought-after travel spots, curated
              for unforgettable experiences around the globe.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-[#F5F5F5] rounded-[65px]
                          w-full max-w-[415px] h-[390px]
                          sm:w-full sm:max-w-[315px] sm:h-[420px]
                          md:w-full md:max-w-[350px] md:h-[480px]
                          lg:w-full lg:max-w-[415px] lg:h-[577px]"
              >
                <div className="relative overflow-hidden rounded-[55px] m-3
                              h-[240px]
                              sm:h-[240px]
                              md:h-[260px]
                              lg:h-[393px]">
                  <img
                    src={destination.image}
                    alt={`${destination.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4 pl-4
                               sm:text-2xl sm:mb-5
                               md:text-xl md:mb-4
                               lg:text-3xl lg:mb-6"
                      style={{ fontFamily: 'Urbanist, sans-serif' }}>
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => handleExploreNow(destination)}
                      className="flex-1 mx-1 ml-3 bg-[#163C8C] hover:bg-blue-700 text-white font-medium
                               py-3 px-3 text-sm
                               sm:py-3 sm:px-3 sm:text-base
                               md:py-3 md:px-3 md:text-sm
                               lg:py-4 lg:px-3 lg:text-base
                               rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Explore Now
                    </button>
                    <button
                      onClick={() => toggleLike(destination.id)}
                      className="bg-[#EBEFF4] mr-3 hover:bg-gray-200 rounded-full transition-all duration-200 flex items-center justify-center flex-shrink-0
                               w-12 h-12
                               sm:w-14 sm:h-14
                               md:w-12 md:h-12
                               lg:w-16 lg:h-16"
                      aria-label={`${likedDestinations.has(destination.id) ? 'Unlike' : 'Like'} ${destination.name}`}
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
                          stroke={likedDestinations.has(destination.id) ? "#EF4444" : "#6B7280"}
                          strokeOpacity="0.8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill={likedDestinations.has(destination.id) ? "#EF4444" : "none"}
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default FeaturedDestinations;