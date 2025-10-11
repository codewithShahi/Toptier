"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import Input from "@components/core/input";
import Select from "@components/core/select";
import Button from "@components/core/button";
import useCountries from "@hooks/useCountries";
import { useUser } from "@hooks/use-user";
import { toast } from "react-toastify";
import { update_profile } from "@src/actions"; // 👈 Add this action
import { useRouter } from "next/navigation";

// Define schema for profile update
const profileSchema = zod.object({
  first_name: zod.string().min(1, "First name is required"),
  last_name: zod.string().min(1, "Last name is required"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string()
    .min(8, "Phone number is required")
    .regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid international phone number"),
  phone_country_code: zod.string().min(1, "Country code is required"),
  password: zod.string().min(6, "Password must be at least 6 characters").optional(),
  country_code: zod.string().optional(),
  state: zod.string().optional(),
  city: zod.string().optional(),
  address1: zod.string().optional(),
  address2: zod.string().optional(),
});

type ProfileFormValues = zod.infer<typeof profileSchema>;

export default function CustomerProfile() {
  const { user } = useUser(); // 👈 Get user from session
  const { countries } = useCountries();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with user data
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      phone_country_code: "",
      password: "",
      country_code: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
    },
  });

  // Load user data into form on mount
  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        phone_country_code: user.phone_country_code?.toString() || "",
        country_code: user.country_code || "",
        state: user.state || "",
        city: user.city || "",
        address1: user.address1 || "",
        address2: user.address2 || "",
      });
    }
  }, [user, reset]);

  // Transform countries to select options
  const countryOptions = (countries || []).map((c: any) => ({
    value: c.iso || c.code,
    label: c.nicename || c.name,
    iso: c.iso,
    phonecode: c.phonecode?.toString() || "0",
  }));

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        user_id: user?.user_id, //  From session
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        phone_country_code: parseInt(data.phone_country_code, 10),
        password: data.password || undefined, // Optional
        country_code: data.country_code || undefined,
        state: data.state || undefined,
        city: data.city || undefined,
        address1: data.address1 || undefined,
        address2: data.address2 || undefined,
      };
console.log("update", payload)
    //   const response = await update_profile(payload); // Call your API

    //   if (response.error) {
    //     throw new Error(response.error);
    //   }

      toast.success("Profile updated successfully!");
      // Optionally refresh user data or redirect
      // router.push("/profile"); // or window.location.reload();

    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

//   if (userLoading) {
//     return (
//       <div className="bg-gray-50 flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
//       </div>
//     );
//   }

  if (!user) {
    return (
      <div className="bg-gray-50 flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex justify-center">
      <div className="bg-white shadow-md rounded-xl px-8 py-5 mt-4 w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1.5">First Name</label>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="First Name"
                  size="lg"
                  invalid={!!errors.first_name}
                />
              )}
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs">{errors.first_name.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Last Name</label>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Last Name"
                  size="lg"
                  invalid={!!errors.last_name}
                />
              )}
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Email Address"
                  size="lg"
                  invalid={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Password (Optional)</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="New Password (leave blank to keep current)"
                  size="lg"
                  invalid={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Phone Code */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Phone Code</label>
            <Controller
              name="phone_country_code"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countryOptions.map((c:any) => ({ ...c, label: `+${c.phonecode}` }))}
                  value={countryOptions.find((c:any) => c.value === field.value)}
                  onChange={(option) => field.onChange(option?.value)}
                  placeholder="Select Country Code"
                  size="lg"
                  isSearchable
                          classNames={{
                    control: () =>
                      'border border-gray-300 cursor-pointer rounded-lg px-3 py-0 flex items-center min-h-[44px] text-base focus:ring-1 focus:ring-[#163C8C] focus:border-[#163C8C] shadow-none'}}
                />
              )}
            />
            {errors.phone_country_code && (
              <p className="text-red-500 text-xs">{errors.phone_country_code.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Phone Number</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Phone Number (e.g., 923483344559)"
                  size="lg"
                  invalid={!!errors.phone}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Country</label>
            <Controller
              name="country_code"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countryOptions}
                  value={countryOptions.find((c:any) => c.value === field.value)}
                  onChange={(option) => field.onChange(option?.value)}
                  placeholder="Select Country"
                  size="lg"
                  isSearchable
                                  classNames={{
                    control: () =>
                      'border border-gray-300 cursor-pointer rounded-lg px-3 py-0 flex items-center min-h-[44px] text-base focus:ring-1 focus:ring-[#163C8C] focus:border-[#163C8C] shadow-none'}}
                />
              )}
            />
          </div>

          {/* State */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">State</label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="State"
                  size="lg"
                />
              )}
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">City</label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="City"
                  size="lg"
                />
              )}
            />
          </div>

          {/* Address 1 */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Address 1</label>
            <Controller
              name="address1"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Address Line 1"
                  size="lg"
                />
              )}
            />
          </div>

          {/* Address 2 */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Address 2</label>
            <Controller
              name="address2"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Address Line 2"
                  size="lg"
                />
              )}
            />
          </div>

        </form>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            disabled={isSubmitting}
            className={`w-full bg-blue-900  text-center flex justify-center text-white ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V6a6 6 0 016 6 6 6 0 01-6 6H6a6 6 0 01-6-6z"></path>
                </svg>
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}