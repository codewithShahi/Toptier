// import { useState, useMemo } from "react";
// import { Icon } from "@iconify/react";

// // Define types
// interface FilterChip {
//   icon?: string;
//   label: string;
//   category?: string;
// }

// interface Hotel {
//   id: number;
//   name: string;
//   location: string;
//   price: number;
//   originalPrice: number;
//   image: string;
//   rating: number;
//   reviews: number;
//   availableRooms: number;
//   stars: number;
//   amenities: string[];
//   category: string[];
// }

// interface Amenity {
//   icon: string;
//   label: string;
//   key: string;
// }

// export default function HotelSearchApp() {
//   const [selectedSort, setSelectedSort] = useState<string>("Popularity");
//   const [priceRange, setPriceRange] = useState<number[]>([50, 1000]);
//   const [selectedStars, setSelectedStars] = useState<number[]>([]);
//   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
//   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
//   const [guestRating, setGuestRating] = useState<number>(3);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [searchLocation, setSearchLocation] = useState<string>("");

//   // Filter chips data
//   const filterChips: FilterChip[] = [
//     { icon: "emojione-monotone:hotel", label: "Luxury Hotel", category: "luxury" },
//     { icon: "mdi:briefcase", label: "Business", category: "business" },
//     { icon: "noto:beach-with-umbrella", label: "Resort", category: "resort" },
//     { icon: "mdi:cash", label: "Budget", category: "budget" },
//     { icon: "mdi:star", label: "Top Rated", category: "top-rated" },
//     { icon: "mdi:city", label: "City Center", category: "city-center" },
//     { icon: "mdi:food", label: "Fine Dining", category: "fine-dining" },
//     { icon: "noto:beach-with-umbrella", label: "Beachfront", category: "beachfront" },
//     { icon: "mdi:snowflake", label: "Lake View", category: "lake-view" },
//     { label: "Near Airport", category: "near-airport" },
//   ];

//   // Enhanced hotels data with more variety
//   const hotels: Hotel[] = [
//     {
//       id: 1,
//       name: "Marmaris Resort & Spa",
//       location: "Marmaris, Turkey",
//       price: 420,
//       originalPrice: 560,
//       image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
//       rating: 4.8,
//       reviews: 245,
//       availableRooms: 2,
//       stars: 5,
//       amenities: ["wifi", "pool", "spa", "restaurant", "beach"],
//       category: ["luxury", "resort", "beachfront"]
//     },
//     {
//       id: 2,
//       name: "Grand Marina Hotel",
//       location: "Istanbul, Turkey",
//       price: 320,
//       originalPrice: 420,
//       image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
//       rating: 4.5,
//       reviews: 189,
//       availableRooms: 5,
//       stars: 4,
//       amenities: ["wifi", "gym", "business", "restaurant"],
//       category: ["business", "city-center"]
//     },
//     {
//       id: 3,
//       name: "Seaside Paradise Resort",
//       location: "Antalya, Turkey",
//       price: 650,
//       originalPrice: 780,
//       image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
//       rating: 4.9,
//       reviews: 312,
//       availableRooms: 1,
//       stars: 5,
//       amenities: ["wifi", "pool", "spa", "gym", "restaurant", "beach"],
//       category: ["luxury", "resort", "beachfront", "top-rated"]
//     },
//     {
//       id: 4,
//       name: "Budget Inn Central",
//       location: "Ankara, Turkey",
//       price: 85,
//       originalPrice: 120,
//       image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
//       rating: 4.1,
//       reviews: 67,
//       availableRooms: 8,
//       stars: 3,
//       amenities: ["wifi", "restaurant"],
//       category: ["budget", "city-center"]
//     },
//     {
//       id: 5,
//       name: "Lakeside Retreat",
//       location: "Bolu, Turkey",
//       price: 280,
//       originalPrice: 350,
//       image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
//       rating: 4.6,
//       reviews: 156,
//       availableRooms: 3,
//       stars: 4,
//       amenities: ["wifi", "spa", "restaurant"],
//       category: ["resort", "lake-view"]
//     },
//     {
//       id: 6,
//       name: "Airport Business Hotel",
//       location: "Istanbul, Turkey",
//       price: 180,
//       originalPrice: 220,
//       image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
//       rating: 4.2,
//       reviews: 298,
//       availableRooms: 12,
//       stars: 3,
//       amenities: ["wifi", "gym", "business"],
//       category: ["business", "near-airport"]
//     },
//     {
//       id: 7,
//       name: "Gourmet Palace Hotel",
//       location: "Bodrum, Turkey",
//       price: 520,
//       originalPrice: 640,
//       image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
//       rating: 4.7,
//       reviews: 203,
//       availableRooms: 4,
//       stars: 5,
//       amenities: ["wifi", "pool", "spa", "gym", "restaurant"],
//       category: ["luxury", "fine-dining", "beachfront"]
//     },
//     {
//       id: 8,
//       name: "City Center Plaza",
//       location: "Izmir, Turkey",
//       price: 240,
//       originalPrice: 300,
//       image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400&h=300&fit=crop",
//       rating: 4.3,
//       reviews: 134,
//       availableRooms: 6,
//       stars: 4,
//       amenities: ["wifi", "gym", "business", "restaurant"],
//       category: ["business", "city-center"]
//     },
//     {
//       id: 9,
//       name: "Luxury Beach Villa",
//       location: "Kas, Turkey",
//       price: 890,
//       originalPrice: 1100,
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
//       rating: 4.9,
//       reviews: 89,
//       availableRooms: 2,
//       stars: 5,
//       amenities: ["wifi", "pool", "spa", "gym", "restaurant", "beach"],
//       category: ["luxury", "resort", "beachfront", "top-rated"]
//     },
//   ];

//   // Amenities data
//   const amenities: Amenity[] = [
//     { icon: "mdi:wifi", label: "Wi-Fi", key: "wifi" },
//     { icon: "mdi:pool", label: "Pool", key: "pool" },
//     { icon: "mdi:spa", label: "Spa", key: "spa" },
//     { icon: "mdi:dumbbell", label: "Gym", key: "gym" },
//     { icon: "mdi:food", label: "Restaurant", key: "restaurant" },
//     { icon: "noto:beach-with-umbrella", label: "Beach Access", key: "beach" },
//     { icon: "mdi:briefcase", label: "Business Center", key: "business" },
//   ];

//   // Filter and sort hotels
//   const filteredAndSortedHotels = useMemo(() => {
//     const filtered = hotels.filter(hotel => {
//       // Price range filter
//       if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) return false;

//       // Star rating filter
//       if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) return false;

//       // Guest rating filter
//       if (hotel.rating < guestRating) return false;

//       // Amenities filter
//       if (selectedAmenities.length > 0) {
//         const hasAllAmenities = selectedAmenities.every(amenity =>
//           hotel.amenities.includes(amenity)
//         );
//         if (!hasAllAmenities) return false;
//       }

//       // Category filter (from filter chips)
//       if (selectedFilters.length > 0) {
//         const hasMatchingCategory = selectedFilters.some(filter =>
//           hotel.category.includes(filter)
//         );
//         if (!hasMatchingCategory) return false;
//       }

//       // Location search filter
//       if (searchLocation.trim()) {
//         const searchTerm = searchLocation.toLowerCase();
//         if (!hotel.name.toLowerCase().includes(searchTerm) &&
//             !hotel.location.toLowerCase().includes(searchTerm)) return false;
//       }

//       return true;
//     });

//     // Sort hotels
//     filtered.sort((a, b) => {
//       switch (selectedSort) {
//         case "Price Low to High":
//           return a.price - b.price;
//         case "Price High to Low":
//           return b.price - a.price;
//         case "Rating":
//           return b.rating - a.rating;
//         case "Popularity":
//         default:
//           return b.reviews - a.reviews;
//       }
//     });

//     return filtered;
//   }, [hotels, priceRange, selectedStars, guestRating, selectedAmenities, selectedFilters, selectedSort, searchLocation]);

//   // Handle filter chip toggle
//   const toggleFilterChip = (category: string) => {
//     setSelectedFilters(prev =>
//       prev.includes(category)
//         ? prev.filter(f => f !== category)
//         : [...prev, category]
//     );
//   };

//   // Handle star rating toggle
//   const toggleStarRating = (stars: number) => {
//     setSelectedStars(prev =>
//       prev.includes(stars)
//         ? prev.filter(s => s !== stars)
//         : [...prev, stars]
//     );
//   };

//   // Handle amenity toggle
//   const toggleAmenity = (amenityKey: string) => {
//     setSelectedAmenities(prev =>
//       prev.includes(amenityKey)
//         ? prev.filter(a => a !== amenityKey)
//         : [...prev, amenityKey]
//     );
//   };

//   // Reset all filters
//   const resetFilters = () => {
//     setPriceRange([50, 1000]);
//     setSelectedStars([]);
//     setSelectedAmenities([]);
//     setSelectedFilters([]);
//     setGuestRating(3);
//     setSearchLocation("");
//   };

//   // Handle price range changes
//   const handlePriceChange = (index: number, value: number) => {
//     const newRange = [...priceRange];
//     newRange[index] = value;

//     // Ensure min doesn't exceed max and vice versa
//     if (index === 0 && value > priceRange[1]) {
//       newRange[1] = value;
//     } else if (index === 1 && value < priceRange[0]) {
//       newRange[0] = value;
//     }

//     setPriceRange(newRange);
//   };

//   // Render star ratings
//   const renderStars = (rating: number) => {
//     const rounded = Math.round(rating);
//     return Array.from({ length: 5 }, (_, index) => (
//       <Icon
//         key={index}
//         icon="mdi:star"
//         className={`w-4 h-4 ${index < rounded ? 'text-yellow-400' : 'text-gray-300'}`}
//       />
//     ));
//   };

//   // Custom slider component
//   const PriceSlider = ({ min, max, values, onChange }) => {
//     const getPercentage = (value) => ((value - min) / (max - min)) * 100;

//     return (
//       <div className="relative">
//         <div className="flex justify-between text-sm font-semibold text-gray-600 mb-4">
//           <span>${values[0]}</span>
//           <span>${values[1]}</span>
//         </div>
//         <div className="relative h-2 bg-gray-200 rounded-full">
//           <div
//             className="absolute h-2 bg-blue-600 rounded-full"
//             style={{
//               left: `${getPercentage(values[0])}%`,
//               right: `${100 - getPercentage(values[1])}%`
//             }}
//           ></div>
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={values[0]}
//             onChange={(e) => onChange(0, parseInt(e.target.value))}
//             className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
//           />
//           <input
//             type="range"
//             min={min}
//             max={max}
//             value={values[1]}
//             onChange={(e) => onChange(1, parseInt(e.target.value))}
//             className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
//           />
//         </div>
//       </div>
//     );
//   };

//   // Guest rating slider
//   const GuestRatingSlider = ({ value, onChange }) => {
//     const percentage = ((value - 1) / 4) * 100;

//     return (
//       <div className="space-y-4">
//         <div className="relative h-2 bg-gray-200 rounded-full">
//           <div
//             className="absolute h-2 bg-blue-600 rounded-full"
//             style={{ width: `${percentage}%` }}
//           ></div>
//           <input
//             type="range"
//             min={1}
//             max={5}
//             step={0.1}
//             value={value}
//             onChange={(e) => onChange(parseFloat(e.target.value))}
//             className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
//           />
//         </div>
//         <div className="text-center text-sm text-gray-600">{value.toFixed(1)}+ Stars</div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Custom CSS for sliders */}
//       <style jsx>{`
//         .slider-thumb::-webkit-slider-thumb {
//           appearance: none;
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: #2563eb;
//           cursor: pointer;
//           border: 2px solid #ffffff;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//         }
//         .slider-thumb::-moz-range-thumb {
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: #2563eb;
//           cursor: pointer;
//           border: 2px solid #ffffff;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//       {/* Header */}
//       <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">Top Tier Travel</h1>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
//               <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm xl:text-base">Hotels</a>
//               <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm xl:text-base">Contact</a>
//               <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm xl:text-base">Support</a>
//             </nav>

//             {/* Desktop Search Bar */}
//             <div className="hidden md:block flex-1 max-w-xs lg:max-w-md mx-4 lg:mx-8">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Icon icon="mdi:map-marker" className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search destinations..."
//                   value={searchLocation}
//                   onChange={(e) => setSearchLocation(e.target.value)}
//                   className="block w-full pl-9 lg:pl-10 pr-10 lg:pr-12 py-2 lg:py-3 border border-gray-300 rounded-lg lg:rounded-xl bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-2 lg:pr-3 flex items-center">
//                   <button className="bg-blue-600 text-white p-1.5 lg:p-2 rounded-md lg:rounded-lg hover:bg-blue-700 transition-colors">
//                     <Icon icon="mdi:magnify" className="h-3 w-3 lg:h-4 lg:w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//             >
//               {mobileMenuOpen ? (
//                 <Icon icon="mdi:close" className="h-5 w-5 text-blue-600" />
//               ) : (
//                 <Icon icon="mdi:menu" className="h-5 w-5 text-blue-600" />
//               )}
//             </button>

//             {/* Desktop Menu Button */}
//             <button className="hidden md:block lg:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
//               <Icon icon="mdi:menu" className="h-5 w-5 text-blue-600" />
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div className="md:hidden border-t border-gray-100 py-4 space-y-4">
//               {/* Mobile Search */}
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Icon icon="mdi:map-marker" className="h-4 w-4 text-gray-500" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search destinations..."
//                   value={searchLocation}
//                   onChange={(e) => setSearchLocation(e.target.value)}
//                   className="block w-full pl-9 pr-10 py-3 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                   <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
//                     <Icon icon="mdi:magnify" className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Mobile Navigation Links */}
//               <nav className="space-y-2">
//                 <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">Hotels</a>
//                 <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">Contact</a>
//                 <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">Support</a>
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Filter Chips */}
//       <div className="bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 lg:py-4">
//           <div className="flex items-center gap-2 mb-3 lg:mb-4">
//             <span className="text-gray-600 font-medium text-sm lg:text-base">Quick Filter :</span>
//           </div>
//           <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2 scrollbar-hide">
//             {filterChips.map((chip, index) => (
//               <button
//                 key={index}
//                 onClick={() => chip.category && toggleFilterChip(chip.category)}
//                 className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
//                   selectedFilters.includes(chip.category || '')
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 {chip.icon && <Icon icon={chip.icon} className="text-sm lg:text-base" />}
//                 {chip.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
//           {/* Desktop Sidebar - Advanced Search */}
//           <div className="hidden lg:block w-80 flex-shrink-0">
//             <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
//               <h2 className="text-lg font-bold text-gray-900 mb-6">Advanced Search</h2>

//               {/* Search Location */}
//               <div className="mb-8">
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Search Location</label>
//                 <div className="relative">
//                   <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                   <input
//                     type="text"
//                     placeholder="Where do you want to stay?"
//                     value={searchLocation}
//                     onChange={(e) => setSearchLocation(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-8">
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Price Range (per night)</label>
//                 <div className="mb-4">
//                   <select
//                     value={selectedSort}
//                     onChange={(e) => setSelectedSort(e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   >
//                     <option>Popularity</option>
//                     <option>Price Low to High</option>
//                     <option>Price High to Low</option>
//                     <option>Rating</option>
//                   </select>
//                 </div>
//                 <PriceSlider
//                   min={50}
//                   max={1000}
//                   values={priceRange}
//                   onChange={handlePriceChange}
//                 />
//               </div>

//               {/* Hotel Stars */}
//               <div className="mb-8">
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Hotel Stars</label>
//                 <div className="space-y-3">
//                   {[5, 4, 3].map((stars) => (
//                     <div key={stars} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="flex">
//                           {[...Array(stars)].map((_, i) => (
//                             <Icon key={i} icon="mdi:star" className="h-3 w-3 text-gray-300" />
//                           ))}
//                         </div>
//                         <span className="text-sm text-gray-600">({stars} Stars)</span>
//                       </div>
//                       <input
//                         type="checkbox"
//                         checked={selectedStars.includes(stars)}
//                         onChange={() => toggleStarRating(stars)}
//                         className="rounded border-gray-300"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Guest Rating */}
//               <div className="mb-8">
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Guest Rating</label>
//                 <GuestRatingSlider
//                   value={guestRating}
//                   onChange={setGuestRating}
//                 />
//               </div>

//               {/* Amenities */}
//               <div className="mb-8">
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Amenities</label>
//                 <div className="space-y-3">
//                   {amenities.map((amenity, index) => (
//                     <div key={index} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Icon icon={amenity.icon} className="text-lg" />
//                         <span className="text-sm text-gray-600">{amenity.label}</span>
//                       </div>
//                       <input
//                         type="checkbox"
//                         checked={selectedAmenities.includes(amenity.key)}
//                         onChange={() => toggleAmenity(amenity.key)}
//                         className="rounded border-gray-300"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="space-y-3">
//                 <button
//                   onClick={resetFilters}
//                   className="w-full py-3 bg-gray-100 text-blue-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//                 >
//                   Reset Filters
//                 </button>
//                 <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Area */}
//           <div className="flex-1 min-w-0">
//             {/* Mobile Filter Button */}
//             <div className="lg:hidden mb-4">
//               <button
//                 onClick={() => setMobileFiltersOpen(true)}
//                 className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors w-full sm:w-auto"
//               >
//                 <Icon icon="mdi:tune" className="h-4 w-4" />
//                 Filters & Search
//               </button>
//             </div>

//             {/* Sort and Results Header */}
//             <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 p-3 lg:p-4 mb-4 lg:mb-6">
//               <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between gap-3 lg:gap-4">
//                 <div className="flex items-center gap-3 lg:gap-4">
//                   <span className="text-gray-600 font-medium text-sm lg:text-base">
//                     {filteredAndSortedHotels.length} hotels found
//                   </span>
//                   <button className="p-1.5 lg:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                     <Icon icon="mdi:chart-bar" className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
//                   </button>
//                 </div>
//                 <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-4">
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-600 font-medium text-sm lg:text-base">Sort :</span>
//                     <div className="relative">
//                       <select
//                         value={selectedSort}
//                         onChange={(e) => setSelectedSort(e.target.value)}
//                         className="appearance-none bg-gray-100 px-3 lg:px-4 py-2 pr-7 lg:pr-8 rounded-lg text-xs lg:text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 border-none"
//                       >
//                         <option>Popularity</option>
//                         <option>Price Low to High</option>
//                         <option>Price High to Low</option>
//                         <option>Rating</option>
//                       </select>
//                       <Icon icon="mdi:chevron-down" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 text-gray-500 pointer-events-none" />
//                     </div>
//                   </div>
//                   <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
//                     <button
//                       onClick={() => setViewMode('grid')}
//                       className={`p-2 hover:bg-gray-50 transition-colors ${viewMode === 'grid' ? 'bg-white border-r border-gray-300' : 'bg-gray-50'}`}
//                     >
//                       <Icon icon="mdi:view-grid" className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className={`p-2 hover:bg-gray-50 transition-colors ${viewMode === 'list' ? 'bg-white' : 'bg-gray-50'}`}
//                     >
//                       <Icon icon="mdi:view-list" className="h-3 w-3 lg:h-4 lg:w-4 text-gray-500" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Hotel Grid/List */}
//             <div className={`grid gap-4 lg:gap-6 ${
//               viewMode === 'grid'
//                 ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
//                 : 'grid-cols-1'
//             }`}>
//               {filteredAndSortedHotels.map((hotel) => (
//                 <div key={hotel.id} className={`bg-white rounded-[2.8rem] lg:rounded-[3rem] border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
//                   viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
//                 }`}>
//                   <div className={`relative ${viewMode === 'list' ? 'sm:w-80 flex-shrink-0' : ''}`}>
//                     <img
//                       src={hotel.image}
//                       alt={hotel.name}
//                       className={`w-full object-cover rounded-[2.5rem] lg:rounded-[2.8rem] m-2 ${
//                         viewMode === 'list' ? 'h-48 sm:h-[calc(100%-1rem)]' : 'h-60 sm:h-72 lg:h-80'
//                       }`}
//                     />
//                     <button className="absolute top-4 lg:top-6 right-4 lg:right-6 p-3 lg:p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
//                       <Icon icon="mdi:heart-outline" className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500" />
//                     </button>
//                     <div className="absolute top-4 lg:top-6 left-4 lg:left-6 flex items-center gap-1">
//                       <Icon
//                         icon="mdi:star"
//                         className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-400"
//                       />
//                       <span className="text-xs lg:text-sm font-semibold text-white bg-black bg-opacity-50 px-2 py-1 rounded">
//                         {hotel.rating}
//                       </span>
//                     </div>
//                   </div>

//                   <div className={`p-4 lg:p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
//                     <div>
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="text-lg lg:text-xl font-bold text-gray-900 pr-2">{hotel.name}</h3>
//                         <span className="text-xs lg:text-sm text-gray-500 whitespace-nowrap">({hotel.reviews} reviews)</span>
//                       </div>

//                       <div className="flex items-center gap-2 mb-2">
//                         <Icon icon="mdi:map-marker" className="h-4 w-4 text-gray-400" />
//                         <span className="text-sm text-gray-600">{hotel.location}</span>
//                       </div>

//                       <div className="flex items-center gap-1 mb-4">
//                         {renderStars(hotel.rating)}
//                         <span className="text-sm text-gray-500 ml-1">({hotel.stars} star hotel)</span>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <span className="text-xl lg:text-2xl font-black text-gray-900">${hotel.price}</span>
//                           <span className="text-sm text-gray-400 line-through">${hotel.originalPrice}</span>
//                           <span className="text-sm text-gray-600">/night</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                           <span className="text-sm text-green-600 font-medium">{hotel.availableRooms} rooms left</span>
//                         </div>
//                       </div>

//                       <button className="w-full bg-blue-600 text-white py-3 lg:py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm lg:text-base">
//                         Book now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* No Results Message */}
//             {filteredAndSortedHotels.length === 0 && (
//               <div className="text-center py-12">
//                 <Icon icon="mdi:hotel-off" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">No hotels found</h3>
//                 <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
//                 <button
//                   onClick={resetFilters}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                 >
//                   Reset All Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filters Overlay */}
//       {mobileFiltersOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)}></div>
//           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
//               <h2 className="text-lg font-bold text-gray-900">Filters & Search</h2>
//               <button
//                 onClick={() => setMobileFiltersOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Icon icon="mdi:close" className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="p-4 space-y-6">
//               {/* Mobile Search Location */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Search Location</label>
//                 <div className="relative">
//                   <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                   <input
//                     type="text"
//                     placeholder="Where do you want to stay?"
//                     value={searchLocation}
//                     onChange={(e) => setSearchLocation(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Mobile Price Range */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Price Range (per night)</label>
//                 <div className="mb-4">
//                   <select
//                     value={selectedSort}
//                     onChange={(e) => setSelectedSort(e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   >
//                     <option>Popularity</option>
//                     <option>Price Low to High</option>
//                     <option>Price High to Low</option>
//                     <option>Rating</option>
//                   </select>
//                 </div>
//                 <PriceSlider
//                   min={50}
//                   max={1000}
//                   values={priceRange}
//                   onChange={handlePriceChange}
//                 />
//               </div>

//               {/* Mobile Hotel Stars */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Hotel Stars</label>
//                 <div className="space-y-3">
//                   {[5, 4, 3].map((stars) => (
//                     <div key={stars} className="flex items-center justify-between py-2">
//                       <div className="flex items-center gap-3">
//                         <div className="flex">
//                           {[...Array(stars)].map((_, i) => (
//                             <Icon key={i} icon="mdi:star" className="h-4 w-4 text-gray-300" />
//                           ))}
//                         </div>
//                         <span className="text-sm text-gray-600">({stars} Stars)</span>
//                       </div>
//                       <input
//                         type="checkbox"
//                         checked={selectedStars.includes(stars)}
//                         onChange={() => toggleStarRating(stars)}
//                         className="rounded border-gray-300 h-5 w-5"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Mobile Guest Rating */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Guest Rating</label>
//                 <GuestRatingSlider
//                   value={guestRating}
//                   onChange={setGuestRating}
//                 />
//               </div>

//               {/* Mobile Amenities */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">Amenities</label>
//                 <div className="space-y-3">
//                   {amenities.map((amenity, index) => (
//                     <div key={index} className="flex items-center justify-between py-2">
//                       <div className="flex items-center gap-3">
//                         <Icon icon={amenity.icon} className="text-xl" />
//                         <span className="text-sm text-gray-600">{amenity.label}</span>
//                       </div>
//                       <input
//                         type="checkbox"
//                         checked={selectedAmenities.includes(amenity.key)}
//                         onChange={() => toggleAmenity(amenity.key)}
//                         className="rounded border-gray-300 h-5 w-5"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Filter Buttons */}
//             <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
//               <button
//                 onClick={resetFilters}
//                 className="w-full py-3 bg-gray-100 text-blue-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//               >
//                 Reset Filters
//               </button>
//               <button
//                 onClick={() => setMobileFiltersOpen(false)}
//                 className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Live Booking Notification */}
//       <div className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 lg:p-4 max-w-xs lg:max-w-sm z-40 transform transition-transform duration-300 hover:scale-105">
//         <div className="flex items-center gap-2 lg:gap-3">
//           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//           <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
//             <img
//               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
//               alt="James L."
//               className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover flex-shrink-0"
//             />
//             <div className="min-w-0 flex-1">
//               <div className="text-xs lg:text-sm font-bold text-gray-900 truncate">James L. just booked</div>
//               <div className="flex items-center gap-1 lg:gap-2 text-xs text-gray-600">
//                 <span className="truncate">Luxury Bay Resort</span>
//                 <div className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></div>
//                 <span className="flex-shrink-0">10 sec ago</span>
//               </div>
//             </div>
//           </div>
//           <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
//             Live
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200 mt-8 lg:mt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
//             {/* Brand */}
//             <div className="sm:col-span-2 lg:col-span-2">
//               <h3 className="text-2xl lg:text-3xl font-black text-blue-600 mb-3 lg:mb-4">Top Tier Travel</h3>
//               <p className="text-gray-600 leading-relaxed mb-6 lg:mb-8 text-sm lg:text-base">
//                 Unlock extraordinary stays with our expert-curated hotels and exclusive access to the world's finest destinations.
//               </p>
//             </div>

//             {/* Links */}
//             <div>
//               <h4 className="font-bold text-gray-900 mb-4 lg:mb-6 text-sm lg:text-base">Explore</h4>
//               <ul className="space-y-3 lg:space-y-4">
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Featured Hotels</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Popular Destinations</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Travel Guides</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Special Offers</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Blog</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold text-gray-900 mb-4 lg:mb-6 text-sm lg:text-base">Support</h4>
//               <ul className="space-y-3 lg:space-y-4">
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Contact Us</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Help Center</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">FAQs</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Booking Policies</a></li>
//                 <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">Cancellation</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold text-gray-900 mb-4 lg:mb-6 text-sm lg:text-base">Stay Connected</h4>
//               <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">Subscribe to get travel tips, exclusive deals, and the latest updates.</p>
//               <div className="space-y-3 lg:space-y-4">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full px-4 lg:px-6 py-3 lg:py-4 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                 />
//                 <button className="w-full bg-blue-600 text-white py-3 lg:py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm lg:text-base">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 mt-8 lg:mt-16 pt-6 lg:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
//             <p className="text-gray-900 text-sm lg:text-base">© 2025 PHPTARVELS All rights reserved.</p>
//             <div className="flex items-center gap-4 lg:gap-6">
//               <div className="flex items-center gap-4 lg:gap-6">
//                 <select className="text-gray-600 border-none bg-transparent focus:outline-none text-sm lg:text-base">
//                   <option>English</option>
//                   <option>Spanish</option>
//                   <option>French</option>
//                 </select>
//                 <select className="text-gray-600 border-none bg-transparent focus:outline-none text-sm lg:text-base">
//                   <option>USD</option>
//                   <option>EUR</option>
//                   <option>GBP</option>
//                 </select>
//               </div>
//               <div className="flex items-center gap-3 lg:gap-4">
//                 <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
//                   <Icon icon="mdi:facebook" className="h-4 w-4 lg:h-5 lg:w-5" />
//                 </a>
//                 <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
//                   <Icon icon="mdi:twitter" className="h-4 w-4 lg:h-5 lg:w-5" />
//                 </a>
//                 <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
//                   <Icon icon="mdi:instagram" className="h-4 w-4 lg:h-5 lg:w-5" />
//                 </a>
//                 <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
//                   <Icon icon="mdi:linkedin" className="h-4 w-4 lg:h-5 lg:w-5" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }