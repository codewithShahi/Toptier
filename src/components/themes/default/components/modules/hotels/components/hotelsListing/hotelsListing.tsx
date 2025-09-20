"use client"
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import useHotelFilter from "@hooks/useHotelFilter";
import useHotelSearch from "@hooks/useHotelSearchFilters";
// import useHotelFilter from "./useHotelFilter";


// Define types
interface FilterChip {
  icon?: string;
  label: string;
  category?: string;
}
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
const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { hotels_Data:hotelsData, isSearching:isLoading ,loadMoreData} = useHotelSearch()
  const safeHotelsData = Array.isArray(hotelsData) && hotelsData.length > 0
  ? hotelsData
  : Array.isArray(hotelsData)
    ? hotelsData
    : [];
//   console.log('hotelslisting after search',hotelsDa

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

// console.log('filters data',filteredHo
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
    const getPercentage = (value: number) => ((value - min) / (max - min)) * 100;

    return (
      <div className="relative">
        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-4">
          <span>${values[0]}</span>
          <span>${values[1]}</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-[#163C8C] rounded-full"
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
            className="absolute h-2 bg-[#163C8C] rounded-full"
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

  const toggleFilterChip = (category: string) => {
    setSelectedFilters(prev =>
      prev.includes(category)
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  };

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

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 lg:py-4">
          {/* <div className="flex items-center gap-2 mb-3 lg:mb-4">
            <span className="text-gray-600 font-medium text-sm lg:text-base">Quick Filter :</span>
          </div> */}
          <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2  scrollbar-hide">
            {filterChips.map((chip, index) => (
              <button
                key={index}
                onClick={() => chip.category && toggleFilterChip(chip.category)}
                className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg cursor-pointer lg:rounded-l text-xs lg:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${selectedFilters.includes(chip.category || '')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {chip.icon && <span className="text-sm lg:text-base">{chip.icon}</span>}
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8">

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Desktop Sidebar - Advanced Search */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6 border-b pb-6 border-gray-200">
                <h2 className="text-lg font-bold text-[#112233]">Advanced Search</h2>

                {hasActiveFilters && (
                  <button
                    type="button"
                    className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full border border-gray-300"
                  >
                    {/* Yahan apna SVG icon daal do */}
                    <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.24242 1.0387L6.24242 12.9663C6.24242 13.378 5.90863 13.7118 5.49694 13.7118C5.08525 13.7118 4.75146 13.378 4.75146 12.9663L4.75146 1.0387C4.75146 0.627007 5.08525 0.293221 5.49694 0.293221C5.90863 0.293221 6.24242 0.627007 6.24242 1.0387Z" fill="#163C8C" />
                      <path d="M10.7143 1.0387V12.9663C10.7143 13.378 10.3806 13.7118 9.96886 13.7118C9.55718 13.7118 9.22339 13.378 9.22339 12.9663V1.0387C9.22339 0.627007 9.55718 0.293221 9.96886 0.293221C10.3806 0.293221 10.7143 0.627007 10.7143 1.0387Z" fill="#163C8C" />
                      <path d="M1.76927 1.03851L1.76927 12.9661C1.76927 13.3778 1.43549 13.7116 1.0238 13.7116C0.612107 13.7116 0.27832 13.3778 0.27832 12.9661L0.27832 1.03851C0.27832 0.626824 0.612107 0.293037 1.0238 0.293037C1.43549 0.293037 1.76927 0.626824 1.76927 1.03851Z" fill="#163C8C" />
                    </svg>

                  </button>
                )}
              </div>


              {/* Search Location */}
              <div className="mb-8">
                <label className="block text-base font-semibold text-[#112233] mb-3">Search Hotels</label>
                <div className="relative">
                  {/* <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" /> */}
                  <svg width="18" height="17" className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5098 13.4063L16.3686 16.2651M15.4655 8.37544C15.4655 10.2217 14.732 11.9924 13.4265 13.298C12.121 14.6035 10.3503 15.3369 8.50398 15.3369C6.65767 15.3369 4.88699 14.6035 3.58146 13.298C2.27592 11.9924 1.54248 10.2217 1.54248 8.37544C1.54248 6.52913 2.27592 4.75845 3.58146 3.45292C4.88699 2.14738 6.65767 1.41394 8.50398 1.41394C10.3503 1.41394 12.121 2.14738 13.4265 3.45292C14.732 4.75845 15.4655 6.52913 15.4655 8.37544Z" stroke="#0F172B" stroke-opacity="0.6" stroke-width="1.3923" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Where do you want to stay?"
                    value={filters.searchQuery}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl font-medium text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-base font-semibold text-[#112233] mb-3">
                  Price Range (per night)
                </label>

                {/* Dropdown Input */}
                <select
                  className="w-full cursor-pointer pl-4 py-3 mb-3 border border-gray-200 rounded-xl font-medium text-sm text-gray-500 appearance-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='gray'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "0.85rem 0.85rem",
                  }}
                >
                  <option value="usd">Low to High</option>
                  <option value="eur">Mid Range</option>
                  <option value="pkr">Very High</option>
                </select>


                {/* Price Slider */}
                <PriceSlider
                  min={priceRange.min}
                  max={priceRange.max}
                  values={filters.priceRange}
                  onChange={handlePriceChange}

                />

              </div>


              {/* Hotel Stars */}
              <div className="mb-8">
                <label className="block text-base font-semibold text-[#112233] mb-3">Hotel Stars</label>
                <div className="space-y-3">
                  {[5, 4, 3].map((stars) => (
                    <div
                      key={stars}
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        setSelectedStars((prev) =>
                          prev.includes(stars)
                            ? prev.filter((s) => s !== stars) // agar already selected hai to remove kar do
                            : [...prev, stars] // warna add kar do
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          {[...Array(stars)].map((_, i) => (
                            <Icon
                              key={i}
                              icon="mdi:star"
                              className={`h-5 w-5 ${selectedStars.includes(stars)
                                ? "text-yellow-400"
                                : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({stars} Stars)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Rating */}
              <div className="mb-8 border-b border-gray-200 pb-6">
                <label className="block text-base font-semibold text-[#112233] mb-3 ">Guests Rating</label>
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
                  className="w-full py-3 bg-[#E5E7EB] border border-[#E5E7EB] cursor-pointer text-[#163C8C] rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Filters
                </button>
                <button
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                  className="w-full py-3 bg-[#163C8C] border border-[#163C8C] cursor-pointer text-white rounded-lg font-medium  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
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
                        className="appearance-none bg-[#F3F3F5] px-3 lg:px-4 cursor-pointer py-2 pr-7 lg:pr-8 rounded-2xl text-xs lg:text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[DFE2E6] border border-[#DFE2E6]"
                        disabled={isLoading}
                      >
                        <option>Price Low to High</option>
                        <option>Price High to Low</option>
                        <option>Rating</option>
                        <option>Name</option>
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="hidden sm:flex border border-gray-300 bg-[#F3F3F5] rounded-lg overflow-hidden space-x-3 px-3 py-0.5">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 hover:bg-gray-50 hover:rounded-lg cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-[#F3F3F5] border-r border-gray-300' : 'bg-[#F3F3F5]'}`}
                    >
                      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.1 1.4V4.2H8.9V1.4H6.1ZM10.3 1.4V4.2H13.1V1.4H10.3ZM10.3 5.6V8.4H13.1V5.6H10.3ZM10.3 9.8V12.6H13.1V9.8H10.3ZM8.9 12.6V9.8H6.1V12.6H8.9ZM4.7 12.6V9.8H1.9V12.6H4.7ZM4.7 8.4V5.6H1.9V8.4H4.7ZM4.7 4.2V1.4H1.9V4.2H4.7ZM6.1 8.4H8.9V5.6H6.1V8.4ZM1.9 0H13.1C13.4713 0 13.8274 0.1475 14.0899 0.41005C14.3525 0.672601 14.5 1.0287 14.5 1.4V12.6C14.5 12.9713 14.3525 13.3274 14.0899 13.5899C13.8274 13.8525 13.4713 14 13.1 14H1.9C1.144 14 0.5 13.37 0.5 12.6V1.4C0.5 1.0287 0.6475 0.672601 0.91005 0.41005C1.1726 0.1475 1.5287 0 1.9 0Z" fill="#163C8C" />
                      </svg>

                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 hover:bg-gray-50 hover:rounded-lg cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-[#F3F3F5]' : 'bg-gray-50'}`}
                    >
                      <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6H1.00833M1 11H1.00833M1 1H1.00833M5.16667 6H16M5.16667 11H16M5.16667 1H16" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 hover:bg-gray-50 hover:rounded-lg cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-[#F3F3F5]' : 'bg-gray-50'}`}
                    >
                      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0452 1.44663C13.8444 1.31318 13.6135 1.23193 13.3733 1.21023C13.1331 1.18853 12.8914 1.22707 12.6699 1.32235L9.712 2.59001L5.77647 0.932938C5.62197 0.866842 5.45568 0.832764 5.28763 0.832764C5.11959 0.832764 4.9533 0.866842 4.7988 0.932938L1.18639 2.45744C0.904789 2.57992 0.665671 2.7829 0.499091 3.04088C0.332511 3.29886 0.245902 3.60032 0.250149 3.90737V13.2284C0.248625 13.4904 0.312174 13.7486 0.435092 13.98C0.55801 14.2114 0.736451 14.4086 0.954403 14.554C1.15524 14.6875 1.38619 14.7687 1.62634 14.7904C1.86649 14.8121 2.10826 14.7736 2.32977 14.6783L5.28763 13.4107L9.22317 15.0677C9.37736 15.1347 9.5439 15.1686 9.712 15.1671C9.88 15.1674 10.0463 15.1336 10.2008 15.0677L13.8132 13.5184C14.0949 13.3959 14.334 13.1929 14.5005 12.9349C14.6671 12.6769 14.7537 12.3755 14.7495 12.0684V2.77228C14.751 2.51029 14.6875 2.25201 14.5645 2.02064C14.4416 1.78926 14.2632 1.59203 14.0452 1.44663ZM5.90903 2.27516L9.0906 3.63396V13.6841L5.90903 12.3253V2.27516ZM1.84093 13.5349C1.80945 13.5531 1.77373 13.5627 1.73737 13.5627C1.70101 13.5627 1.66529 13.5531 1.6338 13.5349C1.58758 13.5026 1.55039 13.459 1.52574 13.4082C1.50109 13.3575 1.4898 13.3013 1.49295 13.2449V3.90737C1.49194 3.84122 1.51126 3.77634 1.5483 3.72152C1.58534 3.66669 1.63832 3.62456 1.70008 3.60082L4.66623 2.31659V12.3253L1.84093 13.5349ZM13.5067 12.0933C13.5097 12.1566 13.4941 12.2195 13.4617 12.274C13.4293 12.3285 13.3815 12.3723 13.3244 12.3998L10.3334 13.6841V3.67539L13.1587 2.46573C13.1902 2.44755 13.2259 2.43798 13.2623 2.43798C13.2986 2.43798 13.3344 2.44755 13.3658 2.46573C13.4121 2.49808 13.4493 2.54169 13.4739 2.59244C13.4985 2.64319 13.5098 2.69938 13.5067 2.75571V12.0933Z" fill="black" fill-opacity="0.7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && <LoadingGrid />}

            {/* Hotel Grid */}
            {!isLoading && (
              <div className={`${viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start'
                : 'space-y-4 md:space-y-6'
                }`}>
                {filteredHotels.map((hotel: any) => (
                  <div
                    key={hotel.hotel_id}
                    className={`bg-white p-[8px] rounded-[45px] shadow cursor-pointer transition-all duration-300 hover:shadow-lg ${viewMode === 'list' ? 'flex flex-col sm:flex-row max-w-none' : ''
                      }`}
                  >
                    <div className={`relative overflow-hidden rounded-[40px] ${viewMode === 'list'
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
      {/* <div className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 lg:p-4 max-w-xs lg:max-w-sm z-40 transform transition-transform duration-300 hover:scale-105">
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
      </div> */}
    </div>
  );
}