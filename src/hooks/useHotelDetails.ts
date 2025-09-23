'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Define types
export interface HotelForm {
  checkin: string;
  checkout: string;
  rooms: number;
  adults: number;
  children: number;
  nationality: string;
}

// Validation schema
export const hotelSearchSchema = z
  .object({
    checkin: z.string().min(1, "Check-in date is required"),
    checkout: z.string().min(1, "Check-out date is required"),
    rooms: z.number().min(1).max(8),
    adults: z.number().min(1).max(16),
    children: z.number().min(0).max(10),
    nationality: z.string().min(1, "Nationality is required"),
  })
  .refine((data) => new Date(data.checkout) > new Date(data.checkin), {
    message: "Check-out date must be after check-in date",
    path: ["checkout"],
  });

interface UseHotelDetailsOptions {
  initialCheckin?: string;
  initialCheckout?: string;
  initialNationality?: string;
  onSearchSuccess?: (formData: HotelForm) => void;
  onSearchError?: (error: string) => void;
}

export const useHotelDetails = ({
  initialCheckin,
  initialCheckout,
  initialNationality = "PK",
  onSearchSuccess,
  onSearchError,
}: UseHotelDetailsOptions = {}) => {
  const router = useRouter();

  // Format today and tomorrow for default dates
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const today = new Date();
  const defaultCheckin = initialCheckin || formatDate(today);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const defaultCheckout = initialCheckout || formatDate(tomorrow);

  // State
  const [form, setForm] = useState<HotelForm>({
    checkin: defaultCheckin,
    checkout: defaultCheckout,
    rooms: 1,
    adults: 2,
    children: 0,
    nationality: initialNationality,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Refs
  const guestsDropdownRef = useRef<HTMLDivElement | null>(null);

  // Computed values
  const totalGuests = form.adults + form.children;
  const isFormValid = Object.keys(errors).length === 0;

  // Handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error if field is being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const updateForm = useCallback((updates: Partial<HotelForm>) => {
    setForm((prev) => ({ ...prev, ...updates }));

    // Clear errors for updated fields
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

  const toggleGuestsDropdown = useCallback(() => {
    setShowGuestsDropdown(prev => !prev);
  }, []);

  const closeGuestsDropdown = useCallback(() => {
    setShowGuestsDropdown(false);
  }, []);

  const onSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validate
    const isValid = validateForm();
    if (!isValid) {
      return { success: false, errors };
    }

    // Set loading
    setIsSearching(true);

    try {
      // Simulate API call delay (replace with your actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In real app: call your search API here
      console.log('Search submitted with:', form);

      // Save to localStorage for persistence
      localStorage.setItem('hotelSearchForm', JSON.stringify(form));

      // Callback if provided
      onSearchSuccess?.(form);

      // Redirect to search results
      router.push('/hotel_search');

      return { success: true, data: form };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Search error:', errorMessage);

      setErrors({ submit: 'Search failed. Please try again.' });
      onSearchError?.(errorMessage);

      return { success: false, error: errorMessage };
    } finally {
      setIsSearching(false);
    }
  }, [form, validateForm, router, errors, onSearchSuccess, onSearchError]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        guestsDropdownRef.current &&
        !guestsDropdownRef.current.contains(event.target as Node)
      ) {
        closeGuestsDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeGuestsDropdown]);

  // Reset form function
  const resetForm = useCallback(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setForm({
      checkin: formatDate(today),
      checkout: formatDate(tomorrow),
      rooms: 1,
      adults: 2,
      children: 0,
      nationality: initialNationality,
    });
    setErrors({});
    closeGuestsDropdown();
  }, [initialNationality, closeGuestsDropdown, formatDate]);

  // Update form externally
  const setExternalForm = useCallback((newForm: Partial<HotelForm>) => {
    setForm(prev => ({
      ...prev,
      ...newForm
    }));
  }, []);

  return {
    // State
    form,
    errors,
    showGuestsDropdown,
    isSearching,
    totalGuests,
    isFormValid,

    // Refs
    guestsDropdownRef,

    // Handlers
    handleChange,
    updateForm,
    toggleGuestsDropdown,
    closeGuestsDropdown,
    onSubmit,
    resetForm,
    setExternalForm,
    validateForm,

    // Utilities
    formatDate,
  };
};