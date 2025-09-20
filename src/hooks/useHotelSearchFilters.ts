import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { fetchHotelsLocations, hotel_search } from "@src/actions";
import { z } from "zod";
import { useAppSelector } from "@lib/redux/store";

import { useRouter } from "next/navigation";



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
  const [form, setForm] = useState<HotelForm>({
    destination: "",
    checkin: "2025-07-17",
    checkout: "2025-07-19",
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
  const [submitting, setSubmitting] = useState(false);
  const [hotelsData, setHotelsData] = useState<any[]>([]);
    const {modules} = useAppSelector((state) => state.appData?.data);
    const router = useRouter();

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
    enabled: debouncedDestination.trim().length >= 3,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Update locations when query data changes
  useEffect(() => {
    if (locationData?.status && Array.isArray(locationData.data) && locationData.data.length > 0) {
      setHotelLocations(locationData.data);
      setLocationError("");
    } else if (locationData?.error || locationsQueryError) {
      setHotelLocations([]);
      setLocationError("Try different search");
    } else if (debouncedDestination.trim().length >= 3) {
      setHotelLocations([]);
      setLocationError("No Hotel Destination Found");
    } else {
      setHotelLocations([]);
      setLocationError("");
    }
  }, [locationData, locationsQueryError, debouncedDestination]);

  // Hotel search mutation
//   const hotelSearchMutation = useMutation({
//     mutationFn: hotel_search,
//     onSuccess:
//     (data) => {
//         const result=data?.response
//          setHotelsData(result);
// //  console.log('mutatin fun dta',data?.response)
//       // Handle the actual API response structure
//       if (data?.status) {
//         // console.log('mutatin fun dta',data)
//         setHotelsData(result); // Set the entire response array
//       }
//     //    else {
//     //     setHotelsData([]);
//     //   }
//       setErrors({});
//     },
//     onError: (error: any) => {
//       setErrors({ destination: error?.message || "Search failed" });
//     },
//   });

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
  }, [showDestinationDropdown, hotelLocations, activeIndex, handleSelectLocation]);
const hotelSearchMutation = useMutation({
  mutationFn: hotel_search,
  onSuccess: (data) => {
    queryClient.setQueryData(
      ["hotel-search"],
      data?.response || []
    );
     setHotelsData(data?.response);
    setErrors({});
  },
});
// Then use:
const hotels_Data= useQueryClient().getQueryData<any[]>(['hotel-search'])
console.log('query dta',hotels_Data)
// const handleSubmit = useCallback(
//   async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setSubmitting(true);
//       hotelSearchSchema.parse(form);
//   const page=1
//       // ✅ Save form values in localStorage
//     //   localStorage.setItem("hotelSearchForm", JSON.stringify(form));
// // const payload = { ...form, page, modules: hotelModuleNames };
//       // ✅ Call API for each module (N times)
//       const results = await Promise.all(
//         hotelModuleNames.map((mod:any) =>
//           hotelSearchMutation.mutateAsync({
//             ...form,
//             page,
//             modules: mod, // send one module at a time
//           })
//         )
//       );
// router.push('/hotel_search')
// console.log('hook submit result ',results)
//     //   const result = await hotelSearchMutation.mutateAsync(payload);
//       return { success: true, data: results };
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         const msgMap: Record<string, string> = {};
//         err.errors.forEach((zErr) => {
//           msgMap[zErr.path[0] as string] = zErr.message;
//         });
//         setErrors(msgMap);
//       }
//       return { success: false, error: "Search failed" };
//     } finally {
//       setSubmitting(false);
//     }
//   },
//   [form, hotelSearchMutation]
// );

const handleSubmit = useCallback(
  async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      hotelSearchSchema.parse(form);

      const page = 1;

      // Call API for each module (N times, safely)
      const results = await Promise.all(
        hotelModuleNames.map((mod: string) =>
          hotelSearchMutation
            .mutateAsync({
              ...form,
              page,
              modules: mod,
            })
            .catch(() => null) // prevent failure from breaking Promise.all
        )
      );
console.log('all result hook',results)
      // ✅ Filter out null/empty results
      const validResults = results.filter(
        (res) => res && res.response && res.response.length > 0
      );

      let finalData: any[] = [];

      if (validResults.length === 1) {
        // Agar ek hi module ka data mila
        finalData = validResults[0].response;
      } else if (validResults.length > 1) {
        // Agar multiple modules ka data mila → sab combine kar do
        finalData = validResults.flatMap((res) => res.response);
      }

      // ✅ Cache me set karo
      queryClient.setQueryData(["hotel-search"], finalData);
      setHotelsData(finalData);

      console.log("Final merged results 👉", finalData);

      // ✅ Redirect to search results page
      router.push("/hotel_search");

      return { success: true, data: finalData };
    } catch (err) {
      if (err instanceof z.ZodError) {
        const msgMap: Record<string, string> = {};
        err.errors.forEach((zErr) => {
          msgMap[zErr.path[0] as string] = zErr.message;
        });
        setErrors(msgMap);
      }
      return { success: false, error: "Search failed" };
    } finally {
      setSubmitting(false);
    }
  },
  [form, hotelModuleNames, hotelSearchMutation, queryClient, router]
);

// load more data on scrolllllllllllllllllllllllllllllll


// Inside your hook:

const loadMoreData = useCallback(async (e) => {
    e.preventDefault();
        try {
      setSubmitting(true);
      hotelSearchSchema.parse(form);

      const savedForm = localStorage.getItem("hotelSearchForm");
    if (!savedForm) return;

    const parsedForm: HotelForm = JSON.parse(savedForm);

const page=2

      // Call API for each module (N times, safely)
      const results = await Promise.all(
        hotelModuleNames.map((mod: string) =>
          hotelSearchMutation
            .mutateAsync({
              ...parsedForm,
              page,
              modules: mod,
            })
            .catch(() => null) // prevent failure from breaking Promise.all
        )
      );

      // ✅ Filter out null/empty results
      const validResults = results.filter(
        (res) => res && res.response && res.response.length > 0
      );

      let finalData: any[] = [];

      if (validResults.length === 1) {
        // Agar ek hi module ka data mila
        finalData = validResults[0].response;
      } else if (validResults.length > 1) {
        // Agar multiple modules ka data mila → sab combine kar do
        finalData = validResults.flatMap((res) => res.response);
      }

      // ✅ Cache me set karo
      queryClient.setQueryData(["hotel-search"], finalData);
      setHotelsData(finalData);

      console.log("Final merged results 👉", finalData);

      // ✅ Redirect to search results page
      router.push("/hotel_search");

      return { success: true, data: finalData };
    } catch (err) {
      if (err instanceof z.ZodError) {
        const msgMap: Record<string, string> = {};
        err.errors.forEach((zErr) => {
          msgMap[zErr.path[0] as string] = zErr.message;
        });
        setErrors(msgMap);
      }
      return { success: false, error: "Search failed" };
    } finally {
      setSubmitting(false);
    }

}, [hotelModuleNames, hotelSearchMutation, queryClient]);


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
      checkin: "2025-07-17",
      checkout: "2025-07-19",
      rooms: 1,
      adults: 2,
      children: 0,
      nationality: "PK",
    });
    setErrors({});
    setShowDestinationDropdown(false);
    setShowGuestsDropdown(false);
    setHotelLocations([]);
    setActiveIndex(-1);
    setHotelsData([]);
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
console.log("hotels data from hook",hotelsData)
// console.log('locationdata',locationData)
  // Computed values
  const totalGuests = form.adults + form.children;
  const isFormValid = Object.keys(errors).length === 0;
  const hasLocationResults = hotelLocations.length > 0;
  const isSearching = submitting || hotelSearchMutation.isPending;

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
   isSearching: submitting || hotelSearchMutation.isPending,
    submitting,
    hotelsData,
    hotels_Data,
    searchError: hotelSearchMutation.error,

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