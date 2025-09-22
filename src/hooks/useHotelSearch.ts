import { useState, useCallback, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { fetchHotelsLocations, hotel_search } from "@src/actions";
import { z } from "zod";
import { useAppSelector } from "@lib/redux/store";
import { setHotels } from "@lib/redux/base";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";



// Define the hotel search schema
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
  latitude?: string;
  longitude?: string;

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
interface Module {
  id: string;
  name: string;
  active: string;
  type: string;
  status: string;
  c1: string | null;
  c2: string | null;
  c3: string | null;
  c4: string | null;
  c5: string | null;
  c6: string | null;
  dev_mode: string;
  payment_mode: string;
  currency: string;
  module_color: string;
  order: string;
  prn_type: string;
}


function useDebounce(value: string, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}


const useHotelSearch = () => {
  const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

// Today (checkin)
const today = new Date();
const checkin = formatDate(today);

// Tomorrow (checkout example)
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const checkout = formatDate(tomorrow);
  const [form, setForm] = useState<HotelForm>({
    destination: "",
    checkin: checkin,
    checkout: checkout,
    rooms: 1,
    adults: 2,
    children: 0,
    nationality: "PK",
  });
const queryClient = useQueryClient();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [hotelLocations, setHotelLocations] = useState<LocationObj[]>([]);
  const [locationError, setLocationError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isloadingMore, setIsLoadingMore] = useState(false);
  const [isearching, setIsSearching] = useState(false);
  // const [hotelsData, setHotelsData] = useState<any[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
const [page, setPage] = useState(1);
    const {modules} = useAppSelector((state) => state.appData?.data);
    const router = useRouter();
    const allHotelsData=useAppSelector((state=> state.root.hotels))
    const dispatch = useDispatch();
// const modules: Module[] = [/* your data */];
const hotelModuleNames = modules
  .filter((module: Module) => module.type === "hotels")
  .map((module: Module) => module.name);




  const debouncedDestination = useDebounce(form.destination, 450);

  // Fetch locations when debounced destination changes and length >= 3
  const {
    data: locationData,
    isLoading: locationLoading,
    error: locationsQueryError,
  } = useQuery({
    queryKey: ["hotel-locations", debouncedDestination],
    queryFn: () => fetchHotelsLocations(debouncedDestination.trim()),
    enabled: debouncedDestination.trim()?.length >= 3,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Update locations when query data changes
  useEffect(() => {
    if (locationData?.status && Array.isArray(locationData?.data) && locationData?.data?.length > 0) {
      setHotelLocations(locationData.data);
      setLocationError("");
    } else if (locationData?.error || locationsQueryError) {
      setHotelLocations([]);
      setLocationError("Try different search");
    } else if (debouncedDestination.trim()?.length >= 3) {
      setHotelLocations([]);
      setLocationError("No Hotel Destination Found");
    } else {
      setHotelLocations([]);
      setLocationError("");
    }
  }, [locationData, locationsQueryError, debouncedDestination]);


  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  }, [errors]);

  const handleSelectLocation = useCallback((loc: LocationObj) => {
    setForm((prev) => ({
      ...prev,
      destination: loc.city,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
    setShowDestinationDropdown(false);
    setHotelLocations([]);
    setActiveIndex(-1);
  }, []);

  const handleDestinationKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDestinationDropdown) return;
    const maxIndex = hotelLocations?.length - 1;
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
  }, [showDestinationDropdown, hotelLocations, activeIndex, handleSelectLocation]);
  // utils: merge + dedupe hotels

// Add this function inside your useHotelSearch hook (after your state declarations)
const removeDuplicates = useCallback((hotels: any[]) => {
  if (!Array.isArray(hotels) || hotels?.length === 0) {
    return [];
  }

  const seen = new Set();
  return hotels.filter(hotel => {
    if (!hotel || !hotel.hotel_id) {
      return false;
    }

    if (seen.has(hotel.hotel_id)) {
      return false;
    }

    seen.add(hotel.hotel_id);
    return true;
  });
}, []);
const hotelSearchMutation = useMutation({
  mutationFn: hotel_search,
  onSuccess: (data) => {
    if (!data?.response) return;

    //  Get existing hotels from redux
    // const currentHotels = queryClient.getQueryData<any[]>(["hotel-search"]) || [];
     console.log('current hotel',data.response)
    //  Merge old + new
    const merged = [...allHotelsData, ...data.response];

    //  Update react-query cache
    queryClient.setQueryData(["hotel-search"], merged);

    // Update redux store
    dispatch(setHotels(merged));

    setErrors({});
  },
});

// Then use:
const hotels_Data= useQueryClient().getQueryData<any[]>(['hotel-search'])
// console.log('hook state',hotelsData)
const handleSubmit = useCallback(
  async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(setHotels([])); // ✅ Clear old data
      setIsSearching(true);

      hotelSearchSchema.parse(form);

      // ✅ Save form for pagination
      localStorage.setItem("hotelSearchForm", JSON.stringify(form));

      // ✅ Fetch for each module
      const results = await Promise.all(
        hotelModuleNames.map((mod: string) =>
          hotelSearchMutation
            .mutateAsync({
              ...form,
              page: 1, // Always start from page 1 on new search
              modules: mod,
            })
            .catch(() => null)
        )
      );

      // ✅ Filter valid
      const validResults = results.filter(
        (res) => res && res.response && res.response?.length > 0
      );

      let finalData: any[] = [];
      if (validResults?.length === 1) {
        finalData = validResults[0].response;
      } else if (validResults?.length > 1) {
        finalData = validResults.flatMap((res) => res.response);
      }

      // ✅ DEDUPE before saving!
      finalData = removeDuplicates(finalData);

      // ✅ Update cache + Redux
      queryClient.setQueryData(["hotel-search"], finalData);
      dispatch(setHotels(finalData));

      // ✅ Reset page to 1 for future loadMore
      setPage(1);

      // ✅ Redirect
         setIsSearching(false);
      router.push("/hotel_search");

      return { success: true, data: finalData };
    } catch (err) {
      if (err instanceof z.ZodError) {
        const msgMap: Record<string, string> = {};
        err.errors.forEach((zErr) => {
          msgMap[zErr.path[0] as string] = zErr.message;
        });
        setErrors(msgMap);
           setIsSearching(false);
      }
      return { success: false, error: "Search failed" };
    } finally {
      setIsSearching(false);
    }
  },
  [form, hotelModuleNames, hotelSearchMutation, queryClient, router, dispatch, removeDuplicates] // ✅ Add removeDuplicates
);

// QUWEN CODDEEEEEEEEEEEEEEEEEEEEEEEEE
const loadMoreData = useCallback(
  async (e?: React.SyntheticEvent) => {
    e?.preventDefault();

    if (isloadingMore) return;
    setIsLoadingMore(true);

    try {
      const savedForm = localStorage.getItem("hotelSearchForm");
      if (!savedForm) return;

      const parsedForm: HotelForm = JSON.parse(savedForm);
      const nextPage = page + 1;

      const results = await Promise.all(
        hotelModuleNames.map((mod: string) =>
          hotelSearchMutation
            .mutateAsync({
              ...parsedForm,
              page: nextPage,
              modules: mod,
            })
            .catch(() => null)
        )
      );

      const validResults = results.filter(
        (res) => res && res.response && res.response?.length > 0
      );

      if (validResults?.length === 0) {
        console.log("No more results.");
        setIsLoadingMore(false);
        return { success: false, error: "No more data" };
      }

      let newData: any[] = [];
      if (validResults?.length === 1) {
        newData = validResults[0].response;
      } else {
        newData = validResults.flatMap((res) => res.response);
      }

      //  Get IDs of existing hotels
      const existingIds = new Set(allHotelsData.map(h => h.hotel_id));

      //  Filter ONLY new unique hotels
      const trulyNewHotels = newData.filter(hotel => {
        if (!hotel || !hotel.hotel_id) return false;
        return !existingIds.has(hotel.hotel_id);
      });

      if (trulyNewHotels?.length === 0) {
        console.log("No new unique hotels found.");
        setIsLoadingMore(false);
        return { success: false, error: "No new data" };
      }

      //  Append only new hotels to Redux (don't replace entire array)
      const updatedHotels = [...allHotelsData, ...trulyNewHotels];
      dispatch(setHotels(updatedHotels));

      //  Also update React Query cache
      queryClient.setQueryData(["hotel-search"], updatedHotels);

      //  Update page number
      setPage(nextPage);

      setIsLoadingMore(false);
      return { success: true, data: trulyNewHotels }; // 👈 Only return new ones
    } catch (err) {
      setIsLoadingMore(false);
      if (err instanceof z.ZodError) {
        const msgMap: Record<string, string> = {};
        err.errors.forEach((zErr) => {
          msgMap[zErr.path[0] as string] = zErr.message;
        });
        setErrors(msgMap);
      }
      return { success: false, error: "Load more failed" };
    }
  },
  [page, allHotelsData, hotelModuleNames, hotelSearchMutation, isloadingMore, dispatch, queryClient]
);
//use effect for laod more data qwen and correct code dont modify
// useEffect(() => {
//   const handleScroll = () => {
//     if (isloadingMore || !allHotelsData.length) return; // ✅ Don’t load if no data or submitting

//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     if (scrollTop + clientHeight >= scrollHeight - 300) {
//       loadMoreData();
//     }
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, [loadMoreData, isloadingMore, allHotelsData.length]); // ✅ Add allHotelsData.length

// loading this more data on scroll (final code )
 useEffect(() => {
    const handleScroll = () => {
      if (isloadingMore || !allHotelsData?.length) return;

      if (listRef.current) {
        const rect = listRef.current.getBoundingClientRect();
        const offset = 0; // fire before 300px

        // rect.bottom = distance from top of viewport to bottom of container
        if (rect.bottom - offset <= window.innerHeight) {
          loadMoreData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreData, isloadingMore, allHotelsData?.length]);
  const updateForm = useCallback((updates: Partial<HotelForm>) => {
    setForm((prev) => ({ ...prev, ...updates }));

    // Clear related errors
    const updatedFields = Object.keys(updates);
    setErrors((prev) => {
      const newErrors = { ...prev };
      updatedFields.forEach((field) => {
        if (newErrors[field]) {
          delete newErrors[field];
        }
      });
      return newErrors;
    });
  }, []);

  const resetForm = useCallback(() => {
    setForm({
      destination: "",
      checkin: checkin,
      checkout: checkout,
      rooms: 1,
      adults: 2,
      children: 0,
      nationality: "CN",
    });
    setErrors({});
    setShowDestinationDropdown(false);
    setShowGuestsDropdown(false);
    setHotelLocations([]);
    setActiveIndex(-1);
    // setHotelsData([]);
    dispatch(setHotels([]))
    setPage(1);
  }, []);

  const validateForm = useCallback(() => {
    try {
      hotelSearchSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err) => {
          errorMap[err.path[0] as string] = err.message;
        });
        setErrors(errorMap);
      }
      return false;
    }
  }, [form]);
// console.log("hotels data from hook",hotelsData)
// console.log('locationdata',locationData)
  // Computed values
  const totalGuests = form.adults + form.children;
  const isFormValid = Object.keys(errors)?.length === 0;
  const hasLocationResults = hotelLocations?.length > 0;
  const isSearching =  hotelSearchMutation.isPending;

  return {
    // Form state
    form,
    setForm,
    updateForm,
    resetForm,
    errors,
    setErrors,
    isFormValid,
    totalGuests,
    validateForm,

    // Location search
    hotelLocations,
    locationLoading,
    locationError,
    hasLocationResults,
    showDestinationDropdown,
    setShowDestinationDropdown,
    activeIndex,
    setActiveIndex,

    // Guests dropdown
    showGuestsDropdown,
    setShowGuestsDropdown,

    // Search state
   isSearching:hotelSearchMutation.isPending,
    setIsLoadingMore,
    isloadingMore,
    allHotelsData,
    hotels_Data,
    searchError: hotelSearchMutation.error,
    listRef,


    // Event handlers
    handleChange,
    handleSelectLocation,
    handleDestinationKeyDown,
    handleSubmit,
    loadMoreData,

    // Schema for external validation
    hotelSearchSchema,
  };
};

export default useHotelSearch;