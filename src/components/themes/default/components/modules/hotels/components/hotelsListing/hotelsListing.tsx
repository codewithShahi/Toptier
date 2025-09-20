"use client"
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import useHotelFilter from "@hooks/useHotelFilter";
import useHotelSearch from "@hooks/useHotelSearchFilters";
// import useHotelFilter from "./useHotelFilter";

// Types for your actual hotel data
interface HotelData {
  hotel_id: string;
  name: string;
  location: string;
  actual_price: string;
  actual_price_per_night: string;
  img: string;
  rating: string;
  stars: string;
  amenities: string[];
  favorite: number;
  address: string;
  latitude: string;
  longitude: string;
  currency: string;
  supplier_name: string;
  markup_price: string;
  markup_price_per_night: string;
  booking_currency: string;
}

interface HotelSearchAppProps {
  hotelsData: HotelData[];
  isLoading?: boolean;
}

export default function HotelSearchApp() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [user, setUser] = useState(true);
  const { hotels_Data:hotelsData, isSearching:isLoading ,loadMoreData} = useHotelSearch()
  const safeHotelsData = Array.isArray(hotelsData) && hotelsData.length > 0
  ? hotelsData
  : Array.isArray(hotelsData)
    ? hotelsData
    : [];
//   console.log('hotelslisting after search',hotelsData)

  // Use the hotel filter hook
  const {
    filteredHotels,
    totalResults,
    filters,
    priceRange,
    availableAmenities,
    updatePriceRange,
    toggleStarFilter,
    updateRatingFilter,
    updateSearchQuery,
    toggleAmenityFilter,
    updateSortBy,
    resetFilters,
    hasActiveFilters
  } = useHotelFilter({ hotelsData: safeHotelsData ?? [],  isLoading });
  // 🚀 Infinite scroll handler
  useEffect(() => {
  const handleScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const result = await loadMoreData(event); // 👈 pass event or null if not needed

      if (result?.success) {
        console.log("Fetched more hotels:", result.data);
      } else if (result?.error) {
        console.error("Failed to load more:", result.error);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [loadMoreData]);

// console.log('filters data',filteredHotels)
  // Handle price range changes
  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;

    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && value > filters.priceRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < filters.priceRange[0]) {
      newRange[0] = value;
    }

    updatePriceRange(newRange);
  };

  // Custom slider component
 interface PriceSliderProps {
  min: number;
  max: number;
  values: [number, number]; // tuple for two values
  onChange: (index: 0 | 1, value: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ min, max, values, onChange }) => {
    const getPercentage = (value:number) => ((value - min) / (max - min)) * 100;

    return (
      <div className="relative">
        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-4">
          <span>${values[0]}</span>
          <span>${values[1]}</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-blue-600 rounded-full"
            style={{
              left: `${getPercentage(values[0])}%`,
              right: `${100 - getPercentage(values[1])}%`
            }}
          ></div>
          <input
            type="range"
            min={min}
            max={max}
            value={values[0]}
            onChange={(e) => onChange(0, parseInt(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={values[1]}
            onChange={(e) => onChange(1, parseInt(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
          />
        </div>
      </div>
    );
  };

  // Guest rating slider
  interface RatingSliderProps {
  value: number;
  onChange: (newValue: number) => void;
}
  const RatingSlider: React.FC<RatingSliderProps> = ({ value, onChange }) => {
    const percentage = ((value - 1) / 4) * 100;

    return (
      <div className="space-y-4">
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-blue-600 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
          <input
            type="range"
            min={1}
            max={5}
            step={0.1}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
          />
        </div>
        <div className="text-center text-sm text-gray-600">{value.toFixed(1)}+ Stars</div>
      </div>
    );
  };

  // Render star ratings
  const renderStars = (rating: string) => {
    const stars = [];
    const numRating = parseInt(rating) || 0;

    for (let i = 0; i < numRating; i++) {
      stars.push(
        <Icon key={i} icon="mdi:star" className="h-4 w-4 text-yellow-400" />
      );
    }

    return stars;
  };

  // Toggle like function
  const toggleLike = (hotel: HotelData) => {
    console.log('Toggle like for:', hotel.name);
  };

  // Handle sort change
  const handleSortChange = (sortValue: string) => {
    let sortBy: 'price_low' | 'price_high' | 'rating' | 'name';

    switch (sortValue) {
      case 'Price Low to High':
        sortBy = 'price_low';
        break;
      case 'Price High to Low':
        sortBy = 'price_high';
        break;
      case 'Rating':
        sortBy = 'rating';
        break;
      case 'Name':
        sortBy = 'name';
        break;
      default:
        sortBy = 'price_low';
    }

    updateSortBy(sortBy);
  };

  // Get sort display value
  const getSortDisplayValue = () => {
    switch (filters.sortBy) {
      case 'price_low':
        return 'Price Low to High';
      case 'price_high':
        return 'Price High to Low';
      case 'rating':
        return 'Rating';
      case 'name':
        return 'Name';
      default:
        return 'Price Low to High';
    }
  };

  // Loading component
  const LoadingGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array(6).fill(0).map((_, index) => (
        <div key={index} className="bg-white p-2 rounded-3xl shadow animate-pulse">
          <div className="aspect-square bg-gray-300 rounded-2xl mb-3"></div>
          <div className="p-3 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="flex gap-1">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-300 rounded-full flex-1"></div>
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom CSS for sliders */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Desktop Sidebar - Advanced Search */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Advanced Search</h2>
                {hasActiveFilters && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Filters Active
                  </span>
                )}
              </div>

              {/* Search Location */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Search Hotels</label>
                <div className="relative">
                  <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search hotels by name or location..."
                    value={filters.searchQuery}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Price Range (per night)
                </label>
                <PriceSlider
                  min={priceRange.min}
                  max={priceRange.max}
                  values={filters.priceRange}
                  onChange={handlePriceChange}
                />
              </div>

              {/* Hotel Stars */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Hotel Stars</label>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          {[...Array(stars)].map((_, i) => (
                            <Icon key={i} icon="mdi:star" className="h-3 w-3 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({stars} Stars)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={filters.selectedStars.includes(stars)}
                        onChange={() => toggleStarFilter(stars)}
                        className="rounded border-gray-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Rating */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Minimum Rating</label>
                <RatingSlider
                  value={filters.selectedRating}
                  onChange={updateRatingFilter}
                />
              </div>

              {/* Amenities
              {availableAmenities.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Amenities</label>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {availableAmenities.map((amenity:string, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{amenity}</span>
                        <input
                          type="checkbox"
                          checked={filters.selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenityFilter(amenity)}
                          className="rounded border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                  className="w-full py-3 bg-gray-100 text-blue-600 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                <Icon icon="mdi:tune" className="h-4 w-4" />
                Filters & Search
                {hasActiveFilters && (
                  <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
                    •
                  </span>
                )}
              </button>
            </div>

            {/* Sort and Results Header */}
            <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 p-3 lg:p-4 mb-4 lg:mb-6">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between gap-3 lg:gap-4">
                <div className="flex items-center gap-3 lg:gap-4">
                  <span className="text-gray-600 font-medium text-sm lg:text-base">
                    {isLoading ? "Loading..." : `${totalResults} hotels found`}
                  </span>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium text-sm lg:text-base">Sort :</span>
                    <div className="relative">
                      <select
                        value={getSortDisplayValue()}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="appearance-none bg-gray-100 px-3 lg:px-4 py-2 pr-7 lg:pr-8 rounded-lg text-xs lg:text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 border-none"
                        disabled={isLoading}
                      >
                        <option>Price Low to High</option>
                        <option>Price High to Low</option>
                        <option>Rating</option>
                        <option>Name</option>
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 hover:bg-gray-50 transition-colors ${viewMode === 'grid' ? 'bg-white border-r border-gray-300' : 'bg-gray-50'}`}
                    >
                      <Icon icon="mdi:view-grid" className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 hover:bg-gray-50 transition-colors ${viewMode === 'list' ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <Icon icon="mdi:view-list" className="h-3 w-3 lg:h-4 lg:w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && <LoadingGrid />}

            {/* Hotel Grid */}
            {!isLoading && (
              <div className={`${
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start'
                  : 'space-y-4 md:space-y-6'
              }`}>
                {filteredHotels.map((hotel:any) => (
                  <div
                    key={hotel.hotel_id}
                    className={`bg-white p-[8px] rounded-[45px] shadow cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      viewMode === 'list' ? 'flex flex-col sm:flex-row max-w-none' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden rounded-[40px] ${
                      viewMode === 'list'
                        ? 'sm:w-80 sm:h-64 flex-shrink-0 aspect-square sm:aspect-auto'
                        : 'aspect-square'
                    }`}>
                      <img
                        src={hotel.img}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
                        }}
                      />
                    </div>
                    <div className={`p-3 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <h3
                          className="text-xl font-extrabold text-gray-900 mb-4 pl-4 sm:text-2xl md:text-xl lg:text-2xl text-ellipsis overflow-hidden whitespace-nowrap"
                          style={{ fontFamily: "Urbanist, sans-serif" }}
                          title={hotel.name}
                        >
                          {hotel.name}
                        </h3>
                        <p className="text-[16px] sm:text-[17px] lg:text-[18px] my-2 font-[400] text-[#5B697E] pl-4">
                          {hotel.location}
                        </p>
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-2 pl-4">
                          {renderStars(hotel.stars)}
                          <span className="text-sm text-gray-500 ml-2">
                            ({parseFloat(hotel.rating).toFixed(1)})
                          </span>
                        </div>
                        {/* Price */}
                        <div className={`flex ${viewMode === 'list' ? 'flex-col sm:flex-row sm:justify-between' : 'justify-between'} items-start sm:items-center pl-4 mb-4`}>
                          <div className="flex gap-2 items-center mb-2 sm:mb-0">
                            <p className="text-[24px] sm:text-[28px] lg:text-[30px] font-[900]">
                              ${parseFloat(hotel.actual_price_per_night).toFixed(0)}
                            </p>
                            <p className="text-[14px] sm:text-[16px] lg:text-[17px] font-[400] text-[#5B697E]">
                              /night
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={`flex items-center gap-3  ${viewMode === 'list' ? 'mt-auto' : ''}`}>
                        <button className="flex-1 cursor-pointer bg-[#163D8C] hover:bg-gray-800 text-white font-medium py-2.5 px-3 text-sm sm:text-base md:text-sm lg:text-base rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          Book Now
                        </button>
                        <button
                          onClick={() => toggleLike(hotel)}
                          className="bg-[#EBEFF4] cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-200 flex items-center justify-center flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-11.5 lg:h-11.5"
                          aria-label={`${hotel.favorite === 1 && user ? "Unlike" : "Like"} ${hotel.name}`}
                        >
                          <svg
                            className="transition-colors duration-200 w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-4.5 lg:h-4.5"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.22371 1.44739C3.27589 1.44739 0.885498 3.98725 0.885498 7.11938C0.885498 13.3881 11 20.5526 11 20.5526C11 20.5526 21.1145 13.3881 21.1145 7.11938C21.1145 3.23878 18.7241 1.44739 15.7763 1.44739C13.686 1.44739 11.8766 2.72406 11 4.58288C10.1234 2.72406 8.31404 1.44739 6.22371 1.44739Z"
                              stroke={hotel.favorite === 1 && user ? "#EF4444" : "#6B7280"}
                              strokeOpacity="0.8"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill={hotel.favorite === 1 && user ? "#EF4444" : "none"}
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {!isLoading && filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <Icon icon="mdi:hotel-off" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={resetFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
            {isLoading &&
            <div className="flex justify-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
            }
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Filters & Search</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon icon="mdi:close" className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Mobile Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Search Hotels</label>
                <div className="relative">
                  <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search hotels by name or location..."
                    value={filters.searchQuery}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Price Range (per night)</label>
                <PriceSlider
                  min={priceRange.min}
                  max={priceRange.max}
                  values={filters.priceRange}
                  onChange={handlePriceChange}
                />
              </div>

              {/* Mobile Hotel Stars */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Hotel Stars</label>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          {[...Array(stars)].map((_, i) => (
                            <Icon key={i} icon="mdi:star" className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({stars} Stars)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={filters.selectedStars.includes(stars)}
                        onChange={() => toggleStarFilter(stars)}
                        className="rounded border-gray-300 h-5 w-5"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Minimum Rating</label>
                <RatingSlider
                  value={filters.selectedRating}
                  onChange={updateRatingFilter}
                />
              </div>

              {/* Mobile Amenities */}
              {availableAmenities.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Amenities</label>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {availableAmenities.map((amenity, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-600">{amenity}</span>
                        <input
                          type="checkbox"
                          checked={filters.selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenityFilter(amenity)}
                          className="rounded border-gray-300 h-5 w-5"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Filter Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
              <button
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="w-full py-3 bg-gray-100 text-blue-600 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Filters ({totalResults} hotels)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Booking Notification */}
      <div className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 lg:p-4 max-w-xs lg:max-w-sm z-40 transform transition-transform duration-300 hover:scale-105">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="James L."
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs lg:text-sm font-bold text-gray-900 truncate">James L. just booked</div>
              <div className="flex items-center gap-1 lg:gap-2 text-xs text-gray-600">
                <span className="truncate">Luxury Bay Resort</span>
                <div className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></div>
                <span className="flex-shrink-0">10 sec ago</span>
              </div>
            </div>
          </div>
          <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
            Live
          </div>
        </div>
      </div>
    </div>
  );
}