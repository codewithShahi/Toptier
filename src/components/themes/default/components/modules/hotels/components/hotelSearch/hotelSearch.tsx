"use client"
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Icon } from "@iconify/react";
import DatePicker from "@components/core/DatePicker";
import useDictionary from "@hooks/useDict";
import useDirection from "@hooks/useDirection";
import { useParams } from "next/navigation";
import { z } from "zod";
import { fetchHotelsLocations } from "@src/actions";

const hotelSearchSchema = z
  .object({
    destination: z.string().min(2, "Destination must be at least 2 characters"),
    checkin: z.string().min(1, "Check-in date is required"),
    checkout: z.string().min(1, "Check-out date is required"),
    rooms: z.number().min(1).max(8),
    adults: z.number().min(1).max(16),
    children: z.number().min(0).max(10),
    nationality: z.string().min(1),
  })
  .refine((data) => new Date(data.checkout) > new Date(data.checkin), {
    message: "Check-out date must be after check-in date",
    path: ["checkout"],
  });

interface HotelForm {
  destination: string;
  checkin: string;
  checkout: string;
  rooms: number;
  adults: number;
  children: number;
  nationality: string;
  // optional: lat/lon can be added later
}

interface LocationObj {
  id: string;
  city: string;
  country: string;
  country_code: string;
  latitude?: string;
  longitude?: string;
  status?: string;
}

function useDebounce(value: string, delay = 400) {

  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function HotelSearch() {
  const { lang } = useParams();
  const { data: dict, isLoading } = useDictionary(lang as any);
  const [direction] = useDirection();

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

  // Destination dropdown states
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [hotelLocations, setHotelLocations] = useState<LocationObj[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1); // keyboard nav

  const debouncedDestination = useDebounce(form.destination, 450);

  const guestsDropdownRef = useRef<HTMLDivElement>(null);
  const destinationDropdownRef = useRef<HTMLDivElement>(null);
  const destInputRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false);


  // Outside click handler for dropdowns
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (guestsDropdownRef.current && !guestsDropdownRef.current.contains(e.target as Node)) {
        setShowGuestsDropdown(false);
      }
      if (destinationDropdownRef.current && !destinationDropdownRef.current.contains(e.target as Node)) {
        setShowDestinationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch locations when debounced destination changes and length >= 3
  useEffect(() => {
    const q = debouncedDestination.trim();
    if (q.length < 3) {
      setHotelLocations([]);
      setLocationError("");
      setLocationLoading(false);
      return;
    }

    let cancelled = false;
    const fetchData = async () => {
      setLocationLoading(true);
      setLocationError("");
      try {
        const res = await fetchHotelsLocations(q);
        // expected res shape: { status: boolean, data: [...] }
        if (cancelled) return;
        if (res?.status && Array.isArray(res.data) && res.data.length > 0) {
          setHotelLocations(res.data);
        } else if (res.error) {
          console.log('erro', res.error)
          setHotelLocations([]);
          setLocationError("Try different search");
        }
      } catch (err) {
        if (cancelled) return;
        setHotelLocations([]);
        setLocationError("Try different search");
      } finally {
        if (!cancelled) setLocationLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [debouncedDestination]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "destination") {
      setShowDestinationDropdown(true);
      setActiveIndex(-1);
      setLocationError("");
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectLocation = (loc: LocationObj) => {
    // Fill destination input and optionally lat/lon into your state
    setForm((prev) => ({
      ...prev,
      destination: loc.city, // or `${loc.city}, ${loc.country}`
      // If you want lat/lon: add keys to form and set them here
      // latitude: loc.latitude, longitude: loc.longitude
    }));
    setShowDestinationDropdown(false);
    setHotelLocations([]);
    setActiveIndex(-1);
  };

  const handleDestinationKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDestinationDropdown) return;
    const maxIndex = hotelLocations.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < maxIndex ? i + 1 : maxIndex));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && hotelLocations[activeIndex]) {
        handleSelectLocation(hotelLocations[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setShowDestinationDropdown(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true); // ✅ start spinner
      hotelSearchSchema.parse(form);
      setErrors({});

      // 🔹 Call your real API here
      // await searchHotels(form);

      console.log("valid form ready to submit:", form);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const msgMap: Record<string, string> = {};
        err.errors.forEach((zErr) => {
          msgMap[zErr.path[0] as string] = zErr.message;
        });
        setErrors(msgMap);
      }
    } finally {
      setSubmitting(false); // ✅ stop spinner
    }
  };


  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? (
      <div className={`flex items-center gap-2 mt-1 w-full text-red-500 text-xs ${direction === "rtl" ? "text-right" : "text-left"}`}>
        <span className="w-3 h-3 flex items-center justify-center rounded-full bg-red-500 p-1 text-white">!</span>
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
    <div className="md:w-full mx-auto p-4 rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 dark:text-gray-50 w-full rounded-3xl shadow-lg p-6 space-y-6">
          {/* Destination */}
          <div className="relative" ref={destinationDropdownRef}>
            <label className="block text-sm text-start font-medium text-gray-700 dark:text-gray-300 mb-2">
              {"where to? "}
            </label>
            <div className="relative">
              <div className={`absolute ${direction === "ltr" ? "left-2" : "right-2"} top-1/2 transform -translate-y-1/2 text-gray-400`}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.19514 17.1038C8.04735 17.2098 7.86998 17.2667 7.68803 17.2667C7.50607 17.2667 7.3287 17.2098 7.18091 17.1038C2.80793 13.9933 -1.83309 7.59516 2.85865 2.97186C4.14667 1.70746 5.88127 0.999208 7.68803 1C9.49916 1 11.2369 1.7094 12.5174 2.97096C17.2091 7.59426 12.5681 13.9915 8.19514 17.1038Z" stroke="#5B697E" stroke-opacity="0.7" stroke-width="1.35554" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7.68772 9.13333C8.16806 9.13333 8.62873 8.94291 8.96838 8.60396C9.30803 8.26501 9.49885 7.80529 9.49885 7.32594C9.49885 6.84659 9.30803 6.38688 8.96838 6.04793C8.62873 5.70898 8.16806 5.51855 7.68772 5.51855C7.20738 5.51855 6.74671 5.70898 6.40706 6.04793C6.0674 6.38688 5.87659 6.84659 5.87659 7.32594C5.87659 7.80529 6.0674 8.26501 6.40706 8.60396C6.74671 8.94291 7.20738 9.13333 7.68772 9.13333Z" stroke="#5B697E" stroke-opacity="0.7" stroke-width="1.35554" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </div>

              <input
                ref={destInputRef}
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                onFocus={() => {
                  if (form.destination.trim().length >= 3) setShowDestinationDropdown(true);
                }}
                onKeyDown={handleDestinationKeyDown}
                placeholder={"Search Destination..."}
                className={`w-full ${direction === "ltr" ? "pl-9" : "pr-9"}  pr-4 py-3 text-sm dark:text-gray-200 placeholder-gray-500 focus:outline-none hover:bg-gray-100 hover:border-gray-300 border border-gray-200 rounded-xl text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 transition-all duration-200`}
              />

              {/* Dropdown */}
              {showDestinationDropdown && form.destination.trim().length >= 3 && (
                <div className="absolute z-50 w-full bg-white border dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-600 rounded-xl shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {/* Small hint */}


                  {/* Loading */}
                  {locationLoading && (
                    <div className=" bg-white flex items-center justify-center min-h-24 gap-2 p-3 text-sm text-gray-500">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                      <span>Hotel Destination Loading...</span>
                    </div>
                  )}

                  {/* Results */}
                  {!locationLoading && hotelLocations.length > 0 && (
                    <ul role="list" className="divide-y divide-gray-100 dark:divide-gray-700">
                      {hotelLocations.map((loc, idx) => (
                        <li
                          key={loc.id ?? `${loc.city}-${idx}`}
                          onClick={() => handleSelectLocation(loc)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition flex justify-between items-center ${activeIndex === idx ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                        >
                          <div>
                            <div className="font-bold text-sm text-start  text-gray-900 dark:text-gray-50">{loc.city}</div>
                            <div className="text-xs text-start text-gray-500 dark:text-gray-300">{loc.country}</div>
                          </div>
                          <div className="text-xs text-gray-400">{loc.country_code}</div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* No results / error */}
                  {!locationLoading && locationError && (
                    <div className="flex bg-white items-center justify-center gap-2 p-4 min-h-25 text-sm text-gray-500">
                      <Icon icon="mdi:map-marker-off-outline" width={18} height={18} />
                      <span>{locationError}</span>
                    </div>
                  )}
                  {!locationLoading && hotelLocations.length === 0 && (
                    <div className="flex bg-white items-center justify-center gap-2 p-4 min-h-25 text-sm text-gray-500">
                      <Icon icon="mdi:map-marker-off-outline" width={18} height={18} />
                      <span>No Hotel Destination Found</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <ErrorMessage error={errors.destination} />
          </div>

          {/* Dates & Guests row (unchanged except submit) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Check-in */}
            <div className="relative">
              <label className="block text-sm text-start font-medium text-gray-700 dark:text-gray-300 mb-2">
                {isLoading ? "Loading..." : dict?.hotel_search?.checkin?.title}
              </label>
              <DatePicker
                direction={direction}
                showCalendarIcon
                className="w-full font-medium text-sm placeholder-gray-400 hover:bg-gray-100 hover:border-gray-300 border border-gray-200 rounded-xl text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 bg-white transition-all duration-200 focus:outline-none"
                onSelect={(date) => {
                  const newCheckin = date ? date.toISOString().slice(0, 10) : "";
                  setForm((prev) => ({ ...prev, checkin: newCheckin }));
                  if (errors.checkin) setErrors((p) => ({ ...p, checkin: "" }));
                }}
              />
              <ErrorMessage error={errors.checkin} />
            </div>

            {/* Check-out */}
            <div className="relative">
              <label className="block text-sm font-medium text-start text-gray-700 dark:text-gray-300 mb-2">
                {isLoading ? "Loading..." : dict?.hotel_search?.checkout?.title}
              </label>
              <DatePicker
                direction={direction}
                showCalendarIcon
                className="w-full font-medium text-sm placeholder-gray-400 hover:bg-gray-100 hover:border-gray-300 border border-gray-200 rounded-xl text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 bg-white transition-all duration-200 focus:outline-none"
                onSelect={(date) => {
                  const newCheckout = date ? date.toISOString().slice(0, 10) : "";
                  setForm((prev) => ({ ...prev, checkout: newCheckout }));
                  if (errors.checkout) setErrors((p) => ({ ...p, checkout: "" }));
                }}
              />
              <ErrorMessage error={errors.checkout} />
            </div>

            {/* Guests */}
          <div className="relative" ref={guestsDropdownRef}>
  <label className="block text-sm text-start font-medium text-gray-700 mb-2 dark:text-gray-300">
    {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.title}
  </label>
  <button
    type="button"
    onClick={() => setShowGuestsDropdown((s) => !s)}
    className={`w-full flex items-center justify-between ${direction === "ltr" ? "pl-12 pr-4" : "pr-12 pl-4"} py-2.5 text-xs hover:bg-gray-100 hover:border-gray-300 border border-gray-200 rounded-xl text-gray-900 dark:bg-gray-800 dark:border-gray-600 cursor-pointer dark:hover:bg-gray-700 dark:hover:border-gray-500 transition-all duration-200`}
  >
    <div className={`absolute ${direction === "ltr" ? "left-4" : "right-4"} top-12 transform -translate-y-1/2 text-gray-400`}>
      <svg width="18" height="18" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.01698 6.91855C8.65463 6.91855 9.98221 5.59097 9.98221 3.95332C9.98221 2.31568 8.65463 0.988098 7.01698 0.988098C5.37933 0.988098 4.05176 2.31568 4.05176 3.95332C4.05176 5.59097 5.37933 6.91855 7.01698 6.91855Z" stroke="#8C96A5" strokeWidth="1.11196" />
        <path d="M12.9476 12.4783C12.9476 14.3205 12.9476 15.8142 7.01712 15.8142C1.08667 15.8142 1.08667 14.3205 1.08667 12.4783C1.08667 10.6362 3.74203 9.14246 7.01712 9.14246C10.2922 9.14246 12.9476 10.6362 12.9476 12.4783Z" stroke="#8C96A5" strokeWidth="1.11196" />
      </svg>
    </div>
    <span className="font-medium text-[14px]">
      {form.adults + form.children} {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.guest_title}, {form.rooms} {isLoading ? "Loading..." : dict?.hotel_search?.guest_button?.room_title}
    </span>
    <Icon icon="mdi:chevron-down" width={20} height={20} className={`text-gray-400 transition-transform duration-200 ${showGuestsDropdown ? "rotate-180" : ""}`} />
  </button>

  {showGuestsDropdown && (
    <div className="absolute z-20 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg mt-1 md:min-w-[350px] max-h-80 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
            Adults
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  adults: Math.max(1, prev.adults - 1),
                }))
              }
              className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full border dark:border-gray-600 text-blue-900 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              -
            </button>
            <span className="text-blue-900 dark:text-blue-300 min-w-[1.25rem] text-center font-medium">
              {form.adults}
            </span>
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  adults: prev.adults + 1,
                }))
              }
              className="w-8 h-8 flex  cursor-pointer  items-center justify-center rounded-full border dark:border-gray-600 text-blue-900 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
            Children
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  children: Math.max(0, prev.children - 1),
                }))
              }
              className="w-8 h-8  cursor-pointer  flex items-center justify-center rounded-full border dark:border-gray-600 text-blue-900 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              -
            </button>
            <span className="text-blue-900 dark:text-blue-300 min-w-[1.25rem] text-center font-medium">
              {form.children}
            </span>
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  children: prev.children + 1,
                }))
              }
              className="w-8 h-8 flex items-center  cursor-pointer  justify-center rounded-full border dark:border-gray-600 text-blue-900 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
            Rooms
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  rooms: Math.max(1, prev.rooms - 1),
                }))
              }
              className="w-8 h-8 flex items-center justify-center rounded-full border dark:border-gray-600 text-blue-900 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              -
            </button>
            <span className="text-blue-900 dark:text-blue-300 min-w-[1.25rem] text-center font-medium">
              {form.rooms}
            </span>
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  rooms: prev.rooms + 1,
                }))
              }
              className="w-8 h-8 flex items-center justify-center rounded-full border dark:border-gray-600 text-blue-900 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
            {/* Search button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mt-3 md:mt-7" />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-900 py-2 px-6 cursor-pointer font-medium flex items-center hover:bg-gray-800 border border-gray-200 rounded-xl text-white dark:border-gray-600 dark:hover:bg-gray-700 justify-center gap-2 focus:outline-none transition-all duration-200"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>

                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.7761 13.5548L15.635 16.4137M14.7318 8.524C14.7318 10.3703 13.9984 12.141 12.6929 13.4465C11.3873 14.7521 9.61664 15.4855 7.77033 15.4855C5.92403 15.4855 4.15335 14.7521 2.84781 13.4465C1.54228 12.141 0.808838 10.3703 0.808838 8.524C0.808838 6.67769 1.54228 4.90701 2.84781 3.60148C4.15335 2.29594 5.92403 1.5625 7.77033 1.5625C9.61664 1.5625 11.3873 2.29594 12.6929 3.60148C13.9984 4.90701 14.7318 6.67769 14.7318 8.524Z" stroke="white" stroke-width="1.3923" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span className="hidden md:block text-white dark:text-gray-50">
                      {isLoading ? "Loading..." : dict?.hotel_search?.search_btnText}
                    </span>
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
