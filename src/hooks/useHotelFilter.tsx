import { useState, useMemo, useCallback } from "react";

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
}

interface FilterState {
  priceRange: [number, number];
  selectedStars: number[];
  selectedRating: number;
  searchQuery: string;
  selectedAmenities: string[];
  sortBy: 'price_low' | 'price_high' | 'rating' | 'name';
}

interface UseHotelFilterProps {
  hotelsData: HotelData[];
  isLoading?: boolean;
}

const useHotelFilter = ({ hotelsData, isLoading = false }: UseHotelFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    selectedStars: [],
    selectedRating: 1,
    searchQuery: '',
    selectedAmenities: [],
    sortBy: null as any, // default sort
  });

  // Calculate price range from actual data
  const priceRange = useMemo(() => {
    if (!hotelsData || hotelsData?.length === 0) return { min: 0, max: 1000 };

    const prices = hotelsData.map(hotel => parseFloat(hotel.actual_price_per_night) || 0);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [hotelsData]);

  // Initialize price range when data loads
  useMemo(() => {
    if (priceRange.min !== 0 || priceRange.max !== 1000) {
      setFilters(prev => ({
        ...prev,
        priceRange: [priceRange.min, priceRange.max]
      }));
    }
  }, [priceRange]);

  // Get unique amenities from data
  const availableAmenities = useMemo(() => {
    if (!hotelsData) return [];

    const amenitiesSet = new Set<string>();
    hotelsData.forEach(hotel => {
      if (hotel.amenities && Array.isArray(hotel.amenities)) {
        hotel.amenities.forEach(amenity => amenitiesSet.add(amenity));
      }
    });

    return Array.from(amenitiesSet);
  }, [hotelsData]);

  // Filter and sort hotels
  const filteredHotels = useMemo(() => {
    if (!hotelsData || hotelsData?.length === 0) return [];

     const filtered = hotelsData.filter(hotel => {
      // Price filter
      const hotelPrice = parseFloat(hotel.actual_price_per_night) || 0;
      if (hotelPrice < filters.priceRange[0] || hotelPrice > filters.priceRange[1]) {
        return false;
      }

      // Stars filter
      if (filters.selectedStars?.length > 0) {
        const hotelStars = parseInt(hotel.stars) || 0;
        if (!filters.selectedStars.includes(hotelStars)) {
          return false;
        }
      }

      // Rating filter
      const hotelRating = parseFloat(hotel.rating) || 0;
      if (hotelRating < filters.selectedRating) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(query);
        const matchesLocation = hotel.location.toLowerCase().includes(query);
        const matchesAddress = hotel.address?.toLowerCase().includes(query);

        if (!matchesName && !matchesLocation && !matchesAddress) {
          return false;
        }
      }

      // Amenities filter
      if (filters.selectedAmenities?.length > 0) {
        if (!hotel.amenities || !Array.isArray(hotel.amenities)) {
          return false;
        }

        const hasAllAmenities = filters.selectedAmenities.every(amenity =>
          hotel.amenities.includes(amenity)
        );

        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });

    // Sort hotels
    if (filters.sortBy) {
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_low':
        return (parseFloat(a.actual_price) || 0) - (parseFloat(b.actual_price) || 0);
      case 'price_high':
        return (parseFloat(b.actual_price) || 0) - (parseFloat(a.actual_price) || 0);
      case 'rating':
        return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
}

    return filtered;
  }, [hotelsData, filters]);

  // Filter update functions
  const updatePriceRange = useCallback((newRange: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: newRange }));
  }, []);

  const toggleStarFilter = useCallback((stars: number) => {
    setFilters(prev => ({
      ...prev,
      selectedStars: prev.selectedStars.includes(stars)
        ? prev.selectedStars.filter(s => s !== stars)
        : [...prev.selectedStars, stars]
    }));
  }, []);

  const updateRatingFilter = useCallback((rating: number) => {
    setFilters(prev => ({ ...prev, selectedRating: rating }));
  }, []);

  const updateSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const toggleAmenityFilter = useCallback((amenity: string) => {
    setFilters(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity]
    }));
  }, []);

  const updateSortBy = useCallback((sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [priceRange.min, priceRange.max],
      selectedStars: [],
      selectedRating: 1,
      searchQuery: '',
      selectedAmenities: [],
      sortBy: 'price_low'
    });
  }, [priceRange]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.selectedStars?.length > 0 ||
      filters.selectedRating > 1 ||
      filters.searchQuery.trim() !== '' ||
      filters.selectedAmenities?.length > 0 ||
      filters.priceRange[0] > priceRange.min ||
      filters.priceRange[1] < priceRange.max
    );
  }, [filters, priceRange]);

  return {
    // Filtered data
    filteredHotels,
    totalResults: filteredHotels?.length,

    // Filter state
    filters,
    hasActiveFilters,

    // Data info
    priceRange,
    availableAmenities,
    isLoading,

    // Update functions
    updatePriceRange,
    toggleStarFilter,
    updateRatingFilter,
    updateSearchQuery,
    toggleAmenityFilter,
    updateSortBy,
    resetFilters,
  };
};

export default useHotelFilter;