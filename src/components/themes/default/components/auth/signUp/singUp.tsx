"use client";
import { Icon } from "@iconify/react";
import useDirection from "@hooks/useDirection";
import Input from "@components/core/input";
import { z as zod } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import Select from '@components/core/select'
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from "@components/core/checkbox";
import { useState, FormEvent, useCallback } from "react";
import { useRouter,useParams } from "next/navigation";
import useDictionary from "@hooks/useDict";
import { useMutation } from "@tanstack/react-query";
import { sign_up } from "@src/actions";
import Button from "@components/core/button";
import Alert from "@components/core/alert";
import Link from "next/link";
import { useAppSelector } from "@lib/redux/store";
import { mode as selectMode } from "@lib/redux/base/selectors";
import useDarkMode from "@hooks/useDarkMode";
import useCountries from "@hooks/useCountries"
import type { StylesConfig, ControlProps, OptionProps, MenuProps, SingleValueProps, PlaceholderProps, CSSObjectWithLabel } from 'react-select';





const schema = zod.object({
  first_name: zod.string().min(1, "First name is required"),
  last_name: zod.string().min(1, "Last name is required"),
  email: zod.string().email("Invalid email address"),
  country_id: zod.string().min(1, "Country is required"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  terms: zod.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});
// ----- generate automatic type from schema obhect
type Values = zod.infer<typeof schema>;
const defaultValues = { first_name: "", last_name: "", email: "", country_id: "", password: "", terms: false } satisfies Values;





export default function SignUpForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    //--------- adding default values , and connecting from-hook with zode librery
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const [direction] = useDirection();
  const { lang } = useParams();
  const { data: dict, isLoading } = useDictionary(lang as any);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // Individual hover states for each input

  const [loading, setLoading] = useState<boolean>(false);
  const mutate = useMutation({
    mutationFn: sign_up,
    onSuccess: (data) => {
      if (data.error) {
        const message = data.error;
        if (message.toLowerCase().includes("password")) {
          setError("password", { type: "manual", message });
        } else if (message.toLowerCase().includes("email")) {
          setError("email", { type: "manual", message });
        } else {
          setError("root", { type: "manual", message });
        }
        setLoading(false);
        return;
      }
      // Redirect to login page after successful sign up
      router.push(`/${lang}/auth/login`);
    }
  })
  const onSubmit = useCallback(
    async (values: Values): Promise<void> => {
      setLoading(true);
      const { error } = await mutate.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        country_id: parseInt(values.country_id, 10),
        password: values.password,
      });
    },
    [router, setError]
  );
  // Helper to get input style with hover
  const [isDarkMode] = useDarkMode();


  type CountryOptionType = {
    label: string;
    value: string;
    icon?: string;
  };
// custom style for select
  const customStyles: StylesConfig<CountryOptionType, false> = {
    control: (base: CSSObjectWithLabel, props: ControlProps<CountryOptionType, false>) => ({
      ...base,
      width: '100%',
      paddingLeft: '0.1rem',
      height: '2.9rem',
      fontSize: '0.875rem',
      borderRadius: '0.5rem',
      fontWeight: 400,
      color: isDarkMode ? '#F9FAFB' : '#1F2937', // hover/focus
      backgroundColor: props.isFocused
        ? (isDarkMode ? '#374151' : '#F3F4F6') // hover/focus
        : (isDarkMode ? '#1F2937' : '#fff'), // hover/focus
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      boxShadow: 'none',
      transition: 'all 0.2s',
      outline: 'none',
      '&:hover': {
        backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
        borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      },
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      color: '#9CA3AF', // placeholder-gray-400
      fontWeight: 400,
    }),
    singleValue: (base: CSSObjectWithLabel, props: SingleValueProps<CountryOptionType, false>) => ({
      ...base,
      color:isDarkMode ? "#ffff" : '#1F2937', // text-gray-800
      fontWeight: 400,
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      borderRadius: '0.5rem',
      zIndex: 20,
      cursor: "pointer",
      fontWeight: 300,
      backgroundColor: isDarkMode ? '#1F2937' : '#fff', // dark:bg-gray-800, light:bg-white
      color: isDarkMode ? '#F9FAFB' : '#1F2937', // dark:text-gray-50, light:text-gray-800
    }),
    option: (base: CSSObjectWithLabel, props: OptionProps<CountryOptionType, false>) => ({
      ...base,
      backgroundColor: props.isFocused
        ? (isDarkMode ? '#374151' : '#F3F4F6')
        : (isDarkMode ? '#1F2937' : '#fff'),
      color: isDarkMode ? '#F9FAFB' : '#1F2937',
      fontWeight: 400,
      cursor: 'pointer',
    }),
  };
  const mode = useAppSelector(selectMode);
  const { countries, selectedCountry, isLoading: isCountriesLoading } = useCountries();
  const countryOptions = (countries || []).map((country: any) => ({
    label: country.label || country.name,
    value: country.value || country.id,
    icon: country.icon,
  }));
  return (
    <div className="relative w-full min-h-screen  flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full  flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-6 sm:space-y-8 animate-fade-in">
          <div className="text-start">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 dark:text-gray-100">
              {isLoading
                ? "Loading..."
                : dict?.signup_form?.title || "Create an Account"}
            </h2>
            <p className="text-gray-600 text-sm sm:text-sm dark:text-gray-100">
              {isLoading
                ? "Loading..."
                : dict?.signup_form?.subtitle ||
                "Join us and start your journey today"}
            </p>

          </div>

          <form
            className="space-y-4 sm:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {errors.root ? <Alert showIcon className="my-2 font-medium text-sm" type="danger">{errors.root.message}</Alert> : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>

                <label className="block text-sm font-medium text-gray-700  mb-2 dark:text-gray-100">
                  {
                    dict?.signup_form?.fields?.first_name?.label
                  }
                </label>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex flex-col gap-2">
                      <Input

                        {...field}
                        type="text"
                        placeholder={dict?.signup_form?.fields?.first_name?.placeholder}
                        size="lg"
                        // className={`w-full px-3 py-2 h-11 text-sm border rounded-lg font-medium placeholder-gray-400 dark:placeholder-gray-400 text-gray-800 dark:text-gray-50 focus:outline-none  transition-all duration-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 ${direction === "rtl" ? "pr-10 pl-10" : "pl-10 pr-10"}`}
                        className="w-full text-xs focus:ring-none "
                        invalid={!!errors.first_name}

                      />
                      {errors.first_name && (
                        <div className="text-red-500 flex items-center gap-1 text-xs">
                          <span>
                            <Icon icon="mdi:warning-circle" width="15" height="15" />
                          </span>
                          <span>{errors.first_name.message}</span>
                        </div>
                      )}
                    </div>

                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  {dict?.signup_form?.fields?.last_name.label}
                </label>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex flex-col gap-2">
                      <Input
                        {...field}
                        type="text"
                        placeholder={dict?.signup_form?.fields?.last_name?.placeholder}
                        size="lg"

                        invalid={!!errors.last_name}


                      />
                      {errors.last_name && (
                        <div className="text-red-500 flex items-center gap-1 text-xs">
                          <span>
                            <Icon icon="mdi:warning-circle" width="15" height="15" />
                          </span>
                          <span>{errors.last_name.message}</span>
                        </div>
                      )}
                    </div>

                  )} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-100">
                {dict?.signup_form?.fields?.email?.label}
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="relative flex flex-col gap-2">
                    <Input
                      {...field}
                      type="email"
                      placeholder={dict?.signup_form?.fields?.email?.placeholder}
                      size="lg"
                      className="w-full text-xs"
                      invalid={!!errors.email}

                    />
                    {errors.email && (
                      <div className="text-red-500 flex items-center gap-1 text-xs">
                        <span>
                          <Icon icon="mdi:warning-circle" width="15" height="15" />
                        </span>
                        <span>{errors.email.message}</span>
                      </div>
                    )}
                  </div>

                )}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-100">
                {dict?.signup_form?.fields?.country?.label}
              </label>
              <Controller
                name="country_id"
                control={control}
                render={({ field }) => (
                  <div className="relative flex flex-col gap-2">
                    <Select
                      {...field}
                      options={countryOptions}
                      value={countryOptions.find((option: CountryOptionType) => option.value === field.value)}
                      onChange={(option: CountryOptionType | null) => field.onChange(option?.value)}
                      placeholder={dict?.signup_form?.fields?.country?.placeholder}
                      size="sm"
                      isSearchable
                      invalid={!!errors.country_id}
                      styles={customStyles}
                      isLoading={isCountriesLoading}
                      isDisabled={isCountriesLoading}
                    />
                    {errors.country_id && (
                      <div className="text-red-500 flex items-center gap-1 text-xs">
                        <span>
                          <Icon icon="mdi:warning-circle" width="15" height="15" />
                        </span>
                        <span>{errors.country_id.message}</span>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-100">
                {isLoading
                  ? "Loading..."
                  : dict?.signup_form?.fields?.password?.label || "Password *"}
              </label>
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex flex-col gap-2">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder={dict?.login_form?.fields?.password?.placeholder}
                        size="lg"
                        className="w-full"
                        invalid={!!errors.password}

                        suffix={<button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          >
                          {showPassword ? (
                            <Icon icon="mdi:eye-off" width="20" height="20" />
                          ) : (
                            <Icon icon="mdi:eye" width="20" height="20" />
                          )}
                        </button>}
                      />
                      {errors.password && (
                        <div className="text-red-500 flex items-center gap-1 text-xs">
                          <span>
                            <Icon icon="mdi:warning-circle" width="15" height="15" />
                          </span>
                          <span>{errors.password.message}</span>
                        </div>
                      )}

                    </div>
                  )}
                />
              </div>
            </div>

            <div className="flex items-start space-x-3 gap-2">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    id="terms_checkbox"
                    checked={field.value}
                    onChange={(value: boolean) => {
                      field.onChange(value);
                    }}


                  />
                )}
              />
              <label
                htmlFor="terms-checkbox"
                className="text-sm text-gray-600 dark:text-gray-100 leading-relaxed cursor-pointer flex-1"
              >
                By creating an account, you agree to our{" "}
                <a
                  href="/terms-and-conditions"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                  target="_blank"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                  target="_blank"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <div className="text-red-500 flex items-center gap-1 text-xs mt-1">
                <span>
                  <Icon icon="mdi:warning-circle" width="15" height="15" />
                </span>
                <span>{errors.terms.message}</span>
              </div>
            )}

            <Button size="lg"

              {...(loading && {
                icon: <Icon icon="line-md:loading-twotone-loop" width="24" height="24" />
              })}

              disabled={loading} variant="solid" className={`w-full flex gap-2 justify-center rounded-lg py-3 font-medium  ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-[#101828]"}`} type="submit">
              <span>{dict?.signup_form?.create_account_button}</span>
              <Icon icon="mdi:arrow-right" width="20" height="20" />
              </Button>

            <div className="text-center mt-4 md:mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-100">
                {dict?.signup_form?.sign_in_prompt}
                {" "}
                <Link
                  href={`/${lang}/auth/login`}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  {dict?.signup_form?.sign_in_link}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
