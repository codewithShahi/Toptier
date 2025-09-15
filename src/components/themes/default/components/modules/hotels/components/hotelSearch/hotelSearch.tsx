"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import DatePicker from "@components/core/DatePicker";
import useDictionary from "@hooks/useDict";
import useDirection  from "@hooks/useDirection"
import { useParams } from "next/navigation";
import { data } from 'autoprefixer';
import { z } from 'zod';

// Define your Zod schema
const hotelSearchSchema = z.object({
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  checkin: z.string().min(1, "Check-in date is required"),
  checkout: z.string().min(1, "Check-out date is required"),
  rooms: z.number().min(1, "At least 1 room is required").max(8, "Maximum 8 rooms allowed"),
  adults: z.number().min(1, "At least 1 adult is required").max(16, "Maximum 16 adults allowed"),
  children: z.number().min(0, "Children cannot be negative").max(10, "Maximum 10 children allowed"),
  nationality: z.string().min(1, "Nationality is required"),
}).refine((data) => {
  const checkinDate = new Date(data.checkin);
  const checkoutDate = new Date(data.checkout);
  return checkoutDate > checkinDate;
}, {
  message: "Check-out date must be after check-in date",
  path: ["checkout"]
});

interface HotelForm {
  destination: string;
  checkin: string;
  checkout: string;
  rooms: number;
  adults: number;
  children: number;
  nationality: string;
}

export default function HotelSearch() {
  const { lang } = useParams();
  const { data: dict, isLoading } = useDictionary(lang as any);
  // console.log( dict.hotel_search)
  const [direction]=useDirection();
  const [form, setForm] = useState<HotelForm>({
    destination: "",
    checkin: "2025-07-17",
    checkout: "2025-07-19",
    rooms: 1,
    adults: 2,
    children: 0,
    nationality: "PK",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasValidationAttempted, setHasValidationAttempted] = useState(false);

  // Refs for handling outside clicks
  const guestsDropdownRef = useRef<HTMLDivElement>(null);
  const destinationDropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestsDropdownRef.current && !guestsDropdownRef.current.contains(event.target as Node)) {
        setShowGuestsDropdown(false);
      }
      if (destinationDropdownRef.current && !destinationDropdownRef.current.contains(event.target as Node)) {
        setShowDestinationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear specific error when user starts typing/changing
    if (hasValidationAttempted && errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleIncrement = (name: keyof HotelForm, max: number) => {
    setForm((prev) => ({
      ...prev,
      [name]: Math.min(max, prev[name] as number + 1),
    }));

    // Clear error when user interacts
    if (hasValidationAttempted && errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleDecrement = (name: keyof HotelForm, min: number) => {
    setForm((prev) => ({
      ...prev,
      [name]: Math.max(min, prev[name] as number - 1),
    }));

    // Clear error when user interacts
    if (hasValidationAttempted && errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasValidationAttempted(true);

    try {
      hotelSearchSchema.parse(form);
      setErrors({});
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 1500);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages: Record<string, string> = {};
        err.errors.forEach((error) => {
          errorMessages[error.path[0] as string] = error.message;
        });
        setErrors(errorMessages);
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  // Error message component with RTL/LTR support - Fixed positioning
  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? (
      <div className={`flex items-center gap-2 mt-1 w-full text-red-500 text-xs ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
<span className='w-3 h-3 flex items-center justify-center rounded-full bg-red-500 p-1 text-white'>!</span>
<span>{error}</span>
      </div>
    ) : null;

  const countries = [
    { code: "PK", name: "Pakistan" },
    { code: "IN", name: "India" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "US", name: "United States" },
    { code: "UK", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
  ];

  return (
    <div className="md:w-full mx-auto p-4 ">
      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 dark:text-gray-50 w-full rounded-xl shadow-lg p-6 space-y-6">
          {/* Destination */}
          <div className="relative" ref={destinationDropdownRef}>
            <label className="block text-sm text-start font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isLoading ? "Loading..." : dict?.hotel_search?.destination_input?.title}
            </label>
            <div className="relative">
              <div className={`absolute ${direction === "ltr" ? "left-4" : "right-4" } top-1/2 transform -translate-y-1/2 text-gray-400`}>
                <Icon icon="mdi:map-marker-outline" width={20} height={20} />
              </div>
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                onFocus={() => setShowDestinationDropdown(true)}
                placeholder={isLoading ? "Loading..." : dict?.hotel_search?.destination_input?.placeholder}
                className={`w-full ${direction === "ltr" ? "pl-12" : "pr-12"} pr-4 py-3 text-xs dark:text-gray-200 placeholder-gray-500 focus:outline-none hover:bg-gray-100 hover:border-gray-300 border border-gray-200 rounded-lg text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 transition-all duration-200`}
              />
              {showDestinationDropdown && form.destination.length >= 3 && (
                <div className="absolute z-10 w-full bg-white border dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-600 rounded-xl shadow-lg mt-1">
                  <div className="p-4 text-gray-500 text-sm">
                    Start typing to search destinations...
                  </div>
                </div>
              )}
            </div>
            <ErrorMessage error={errors.destination} />
          </div>

          {/* Dates and Guests Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Check-in Date */}
            <div className="relative">
              <label className="block text-sm text-start font-medium text-gray-700 dark:text-gray-300 mb-2">
                {isLoading ? "Loading..." : dict?.hotel_search?.checkin?.title}
              </label>
              <DatePicker
                direction={direction}
                showCalendarIcon={true}
                className="w-full font-medium text-sm placeholder-gray-400
                hover:bg-gray-100 hover:border-gray-300 border border-gray-200 rounded-lg text-gray-900
                dark:bg-gray-800 dark:border-gray-600  dark:hover:bg-gray-700 dark:hover:border-gray-500
                bg-white transition-all duration-200 focus:outline-none  "
                onSelect={(date) => {
                  const newCheckin = date ? date.toISOString().slice(0, 10) : "";
                  setForm((prev) => ({ ...prev, checkin: newCheckin }));

                  // Clear error when user selects date
                  if (hasValidationAttempted && errors.checkin) {
                    setErrors((prev) => ({
                      ...prev,
                      checkin: ""
                    }));
                  }
                }}
              />
              <ErrorMessage error={errors.checkin} />
            </div>

            {/* Check-out Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-start text-gray-700 dark:text-gray-300 mb-2">
                {isLoading ? "Loading..." : dict?.hotel_search?.checkout?.title}
              </label>
              <DatePicker
                direction={direction}
                showCalendarIcon={true}
                className="w-full  font-medium text-sm placeholder-gray-400
                hover:bg-gray-100 hover:border-gray-300 border border-gray-200 rounded-lg text-gray-900
                dark:bg-gray-800 dark:border-gray-600  dark:hover:bg-gray-700 dark:hover:border-gray-500
                bg-white transition-all duration-200 focus:outline-none "
                onSelect={(date) => {
                  const newCheckout = date ? date.toISOString().slice(0, 10) : "";
                  setForm((prev) => ({ ...prev, checkout: newCheckout }));

                  // Clear error when user selects date
                  if (hasValidationAttempted && errors.checkout) {
                    setErrors((prev) => ({
                      ...prev,
                      checkout: ""
                    }));
                  }
                }}
              />
              <ErrorMessage error={errors.checkout} />
            </div>

            {/* Guests Dropdown */}
            <div className="relative" ref={guestsDropdownRef}>
              <label className="block text-sm text-start font-medium text-gray-700 mb-2 dark:text-gray-300">
                {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.title}
              </label>
              <button
                type="button"
                onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                className={`w-full flex items-center justify-between ${direction ==="ltr" ? "pl-12 pr-4" : "pr-12 pl-4"} py-2.5 text-xs
                hover:bg-gray-100 hover:border-gray-300 border border-gray-200 rounded-lg text-gray-900
                dark:bg-gray-800 dark:border-gray-600 cursor-pointer  dark:hover:bg-gray-700 dark:hover:border-gray-500   dark:text-gray-50
                 transition-all duration-200`}
              >
                <div className={`absolute ${direction === "ltr" ? "left-4" : "right-4"} top-12 transform -translate-y-1/2 text-gray-400`}>
                  <Icon icon="mdi:account-group-outline" width={20} height={20} />
                </div>
                <span className="font-medium">
                  {form.adults + form.children}   {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.guest_title}, {form.rooms}  {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.room_title}
                </span>
                <Icon
                  icon="mdi:chevron-down"
                  width={20}
                  height={20}
                  className={`text-gray-400 transition-transform duration-200 ${showGuestsDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Guests Dropdown Menu */}
              {showGuestsDropdown && (
                <div className="absolute z-20 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg mt-1 md:min-w-[350px] max-h-80 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    <div className="text-base font-semibold text-gray-900 dark:text-gray-50 border-b border-gray-100 dark:border-gray-700 pb-3">
                      {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.drop_down_title}
                    </div>
                    {/* Rooms */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-gray-50 text-sm">{isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.rooms_text}</div>
                        <div className=" text-gray-500 dark:text-gray-300 text-xs">{isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.rooms_subtex}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleDecrement("rooms", 1)}
                          disabled={form.rooms <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                          <Icon icon="material-symbols:check-indeterminate-small" className='text-lg'
                          width={25} height={25} />
                        </button>
                        <span className="w-8 text-center font-semibold text-lg">{form.rooms}</span>
                        <button
                          type="button"
                          onClick={() => handleIncrement("rooms", 8)}
                          disabled={form.rooms >= 8}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Icon icon="material-symbols:add" className='text-black dark:text-gray-100' width={25} height={25} />
                        </button>
                      </div>
                    </div>
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-gray-50 text-sm">{isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.adult_text}</div>
                        <div className=" text-gray-500 dark:text-gray-300 text-xs">{isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.adult_subtex}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleDecrement("adults", 1)}
                          disabled={form.adults <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                          <Icon icon="material-symbols:check-indeterminate-small" className='text-lg' width={25} height={25} />
                        </button>
                        <span className="w-8 text-center font-semibold text-lg">{form.adults}</span>
                        <button
                          type="button"
                          onClick={() => handleIncrement("adults", 16)}
                          disabled={form.adults >= 16}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Icon icon="material-symbols:add" className='text-black dark:text-gray-100' width="24" height="24" />
                        </button>
                      </div>
                    </div>
                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-gray-50 text-sm">{isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.children_text}</div>
                        <div className=" text-gray-500 dark:text-gray-300 text-xs">{isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.children_subtex}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleDecrement("children", 0)}
                          disabled={form.children <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Icon icon="material-symbols:check-indeterminate-small" className='text-lg'
                          width={25} height={25} />
                        </button>
                        <span className="w-8 text-center font-semibold text-lg">{form.children}</span>
                        <button
                          type="button"
                          onClick={() => handleIncrement("children", 10)}
                          disabled={form.children >= 10}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Icon icon="material-symbols:add" className='text-black dark:text-gray-100' width="24" height="24" />
                        </button>
                      </div>
                    </div>
                    {/* Nationality */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="font-semibold  text-sm text-gray-900 dark:text-gray-50 mb-1">{isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.nationality}</div>
                      <div className="relative">
                        <select
                          name="nationality"
                          value={form.nationality}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-50 focus:outline-none  appearance-none bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 transition-all duration-200"
                        >
                          <option value="">Select Nationality</option>
                          {countries.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none">
                          <Icon icon="mdi:chevron-down" width={16} height={16} />
                        </div>
                      </div>
                      <ErrorMessage error={errors.nationality} />
                      <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">
                        {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.for_booking}
                      </p>
                    </div>
                    {/* Total */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-md text-gray-900 dark:text-gray-50"> {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.total}:</span>
                        <span className="font-bold text-gray-900 text-sm   dark:text-gray-50">{form.adults + form.children}</span>
                      </div>
                    </div>
                    {/* Done Button */}
                    <button
                      type="button"
                      onClick={() => setShowGuestsDropdown(false)}
                      className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-sm text-sm hover:bg-blue-700 transition-all duration-200"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mt-3 md:mt-7 "></div> {/* Spacer to align with other fields */}

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSearching}
                className="w-full bg-blue-900  py-2 px-6 font-medium flex items-center
                hover:bg-gray-800 hover:border-gray-300 border border-gray-200 rounded-lg text-white
                dark:border-gray-600  dark:hover:bg-gray-700 dark:hover:border-gray-500
                justify-center gap-2  focus:outline-none  transition-all duration-200"
              >
                {isSearching ? (
                  <>
                    <div className="group animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className='hidden md:block' >Searching...</span>
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:magnify" width={25} className="text-white dark:text-gray-50" height={20} />
                    <span className='hidden md:block text-white dark:text-gray-50'>{isLoading ? "Loading..." : dict?.hotel_search?.search_btnText}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}