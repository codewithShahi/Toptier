"use client";
import { JSX, useEffect, useRef, useState } from "react";
import Image from "next/image";
import image from "public/images/fd4.jpg"

type CountryCode = {
  code: string;
  name: string;
  flag?: JSX.Element;
};

export default function BookingDetails() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<CountryCode[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ✅ Country codes list
  const countryCodes: CountryCode[] = [
    {
      code: "+92",
      name: "Pakistan",
      flag: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="15"
          viewBox="0 0 640 480"
        >
          <path fill="#01411C" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M0 0h240v480H0z" />
          <circle cx="400" cy="240" r="120" fill="#fff" />
          <circle cx="420" cy="240" r="120" fill="#01411C" />
          <path
            fill="#fff"
            d="m465 180-21.6 30.4-34.8-10.8 21.5 30.5-21.5 30.4 34.8-10.8 21.6 30.4v-37.7l34.8-10.8-34.8-10.7z"
          />
        </svg>
      ),
    },
    {
      code: "+91",
      name: "India",
      flag: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="15"
          viewBox="0 0 640 480"
        >
          <path fill="#f93" d="M0 0h640v160H0z" />
          <path fill="#fff" d="M0 160h640v160H0z" />
          <path fill="#128807" d="M0 320h640v160H0z" />
          <circle cx="320" cy="240" r="40" fill="#000080" />
        </svg>
      ),
    },
    {
      code: "+1",
      name: "United States",
      flag: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="15"
          viewBox="0 0 7410 3900"
        >
          <path fill="#b22234" d="M0 0h7410v3900H0z" />
          <path
            stroke="#fff"
            strokeWidth="300"
            d="M0 450h7410M0 1050h7410M0 1650h7410M0 2250h7410M0 2850h7410M0 3450h7410"
          />
          <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
        </svg>
      ),
    },
    { code: "+44", name: "United Kingdom" },
    { code: "+1", name: "Canada" },
    { code: "+966", name: "Saudi Arabia" },
  ];

  // ✅ Filter options
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredOptions(countryCodes);
    } else {
      setFilteredOptions(
        countryCodes.filter((item) =>
          (item.code + " " + item.name)
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
      );
    }
  }, [inputValue]);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-[#F9FAFB]">
      <div className="min-h-screen w-full max-w-[1200px] mx-auto justify-between flex flex-col md:flex-row lg:flex-row p-4 md:p-6 lg:p-12 mb-6 gap-8">
        {/* form */}
        <div className="flex-1 space-y-8">
          {/* Back Button and Header */}
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-white border border-[#CACACA] flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#0F172B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-3xl font-extrabold text-[#0F172B]">
              Booking Details
            </h2>
          </div>
          <div className="border-b border-[#CACACA] mb-8"></div>

          {/* personal info */}
          <div>
            <h3 className="text-xl text-[#0F172BE5] font-semibold mb-2">
              Personal Information
            </h3>
            <p className="text-[#0F172B66] font-medium text-base mb-4">
              Tell us the name of the person checking in.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {/* firstname */}
              <div className="w-full max-w-sm">
                <label htmlFor="firstname" className="block text-base font-medium text-[#5B697E] mb-2">
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                  autoComplete="off"
                />
              </div>
              {/* lastname */}
              <div className="w-full max-w-sm">
                <label htmlFor="lastname" className="block text-base font-medium text-[#5B697E] mb-2">
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl text-[#0F172BE5] font-semibold">
              Contact Information
            </h3>
            <p className="text-[#0F172B66] text-base font-medium">
              We'll send your confirmation to this email address.
            </p>
            {/* Email Address */}
            <div className="w-full max-w-sm">
              <label htmlFor="email" className="block text-base font-medium text-[#5B697E] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Country Code */}
              <div className="w-full sm:max-w-44">
                <label htmlFor="countrynumber" className="block text-base font-medium text-[#5B697E] mb-2">
                  Country
                </label>
                <div className="relative" ref={dropdownRef}>
                  <input
                    id="countrynumber"
                    type="tel"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsOpen(true);
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C] [appearance:textfield]"
                    autoComplete="off"
                  />
                  {/* Dropdown */}
                  {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow max-h-48 overflow-y-auto">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setInputValue(option.code);
                              setIsOpen(false);
                            }}
                            className="px-3 py-2 flex gap-2 items-center hover:bg-gray-100 cursor-pointer"
                          >
                            {option.flag && <span>{option.flag}</span>}
                            <span>{option.code}</span>
                            <span className="text-gray-600 text-sm">
                              {option.name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-500">
                          No options found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Phone Number */}
              <div className="w-full sm:max-w-sm">
                <label htmlFor="number" className="block text-base font-medium text-[#0F172B] mb-2">
                  Number
                </label>
                <input
                  id="number"
                  type="tel"
                  className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C] [appearance:textfield]"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Travelers Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl text-[#0F172BE5] font-semibold">
              Travelers Information
            </h3>
            <p className="text-[#0F172B66] text-base font-medium">
              Important details to complete your booking
            </p>

            {/* Adult Traveler 1 */}
            <div className="space-y-4">
              <h4 className="text-lg text-[#0F172BE5] font-medium">Adult Travelers 1</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Title */}
                <div className="w-full">
                  <label htmlFor="title1" className="block text-base font-medium text-[#0F172B] mb-2">
                    Title
                  </label>
                  <div className="relative">
                    <select
                      id="title1"
                      className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C] bg-white appearance-none"
                    >
                      <option value="">Select Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* First Name */}
                <div className="w-full">
                  <label htmlFor="traveler1-firstname" className="block text-base font-medium text-[#0F172B] mb-2">
                    First Name
                  </label>
                  <input
                    id="traveler1-firstname"
                    type="text"
                    className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                    autoComplete="off"
                  />
                </div>

                {/* Last Name */}
                <div className="w-full">
                  <label htmlFor="traveler1-lastname" className="block text-base font-medium text-[#0F172B] mb-2">
                    Last Name
                  </label>
                  <input
                    id="traveler1-lastname"
                    type="text"
                    className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            {/* Adult Traveler 2 */}
            <div className="space-y-4">
              <h4 className="text-lg text-[#0F172BE5] font-medium">Adult Travelers 2</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Title */}
                <div className="w-full">
                  <label htmlFor="title2" className="block text-base font-medium text-[#0F172B] mb-2">
                    Title
                  </label>
                  <div className="relative">
                    <select
                      id="title2"
                      className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C] bg-white appearance-none"
                    >
                      <option value="">Select Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* First Name */}
                <div className="w-full">
                  <label htmlFor="traveler2-firstname" className="block text-base font-medium text-[#0F172B] mb-2">
                    First Name
                  </label>
                  <input
                    id="traveler2-firstname"
                    type="text"
                    className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                    autoComplete="off"
                  />
                </div>

                {/* Last Name */}
                <div className="w-full">
                  <label htmlFor="traveler2-lastname" className="block text-base font-medium text-[#0F172B] mb-2">
                    Last Name
                  </label>
                  <input
                    id="traveler2-lastname"
                    type="text"
                    className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl text-[#0F172BE5] font-semibold">
              Payment Method
            </h3>
            <p className="text-[#0F172B66] text-base font-medium">
              Safe, secure transactions. Your personal information is protected.
            </p>
            {/* name of card owner */}
            <div className="w-full max-w-sm">
              <label htmlFor="cardownername" className="block text-base font-medium text-[#0F172B] mb-2">
                Name
              </label>
              <input
                id="cardownername"
                type="text"
                className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                autoComplete="off"
              />
            </div>
            {/* card number */}
            <div className="w-full max-w-sm">
              <label htmlFor="card" className="block text-base font-medium text-[#0F172B] mb-2">
                Card
              </label>
              <div className="relative">
                <input
                  id="card"
                  type="number"
                  className="block border border-gray-300 rounded-xl px-3 py-4 pr-32 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoComplete="off"
                />
                {/* card svgs */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 pointer-events-none">
                  <svg width="24" height="15" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_401_1485)">
                      <path d="M5.76528 0.245483H13.1094C14.1346 0.245483 14.7722 1.08113 14.5331 2.10978L11.1138 16.7898C10.8726 17.8149 9.84601 18.6512 8.82024 18.6512H1.47671C0.453021 18.6512 -0.186067 17.8149 0.0531016 16.7898L3.47378 2.10978C3.71295 1.08113 4.73883 0.245483 5.76528 0.245483Z" fill="#E21836"/>
                      <path d="M12.5011 0.245483H20.9467C21.9717 0.245483 21.5096 1.08113 21.2684 2.10978L17.8496 16.7898C17.6099 17.8149 17.6846 18.6512 16.6574 18.6512H8.21192C7.18477 18.6512 6.54913 17.8149 6.79038 16.7898L10.2089 2.10978C10.4516 1.08113 11.4754 0.245483 12.5011 0.245483Z" fill="#00447C"/>
                      <path d="M20.6121 0.245483H27.9562C28.9829 0.245483 29.6205 1.08113 29.3795 2.10978L25.9606 16.7898C25.7194 17.8149 24.6922 18.6512 23.6657 18.6512H16.325C15.2979 18.6512 14.6607 17.8149 14.9014 16.7898L18.3206 2.10978C18.5598 1.08113 19.5849 0.245483 20.6121 0.245483Z" fill="#007B84"/>
                    </g>
                  </svg>

                  <svg width="24" height="18" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2285 1.94702H19.1912V16.2547H11.2285V1.94702Z" fill="#FF5F00"/>
                    <path d="M11.7304 9.09929C11.7304 6.19231 13.0954 3.61384 15.1935 1.94542C13.6516 0.732075 11.7052 -0.000976562 9.58183 -0.000976562C4.55123 -0.000976562 0.481445 4.06881 0.481445 9.09929C0.481445 14.1298 4.55123 18.1996 9.58172 18.1996C11.7051 18.1996 13.6515 17.4665 15.1935 16.2531C13.0954 14.61 11.7304 12.0063 11.7304 9.09929Z" fill="#EB001B"/>
                    <path d="M29.9259 9.09929C29.9259 14.1297 25.8561 18.1996 20.8256 18.1996C18.7023 18.1996 16.7559 17.4665 15.2139 16.2531C17.3373 14.5847 18.677 12.0063 18.677 9.09929C18.677 6.19231 17.3119 3.61384 15.2139 1.94542C16.7557 0.732075 18.7023 -0.000976562 20.8256 -0.000976562C25.8561 -0.000976562 29.9259 4.09414 29.9259 9.09929Z" fill="#F79E1B"/>
                  </svg>

                  <svg width="24" height="16" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.2292 11.662H24.4636C24.583 11.3464 24.8645 10.583 25.308 9.37174L25.3464 9.25659C25.3805 9.17129 25.4232 9.06041 25.4743 8.92393C25.5255 8.78746 25.5639 8.67657 25.5895 8.59127L25.743 9.29497L26.2292 11.662Z" fill="#163C8C"/>
                  </svg>
                </div>
              </div>
            </div>
            {/* Expiration and security code */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Expiration */}
              <div className="w-full sm:max-w-62">
                <label htmlFor="expiration" className="block text-base font-medium text-[#0F172B] mb-2">
                  Expiration
                </label>
                <input
                  id="expiration"
                  type="text"
                  placeholder="MM/YY"
                  className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C]"
                  autoComplete="off"
                />
              </div>
              {/* security code */}
              <div className="w-full sm:max-w-62">
                <label htmlFor="securitycode" className="block text-base font-medium text-[#0F172B] mb-2">
                  Security Code
                </label>
                <input
                  id="securitycode"
                  type="number"
                  className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoComplete="off"
                />
              </div>
            </div>
            {/* zipcode */}
            <div className="w-full max-w-sm">
              <label htmlFor="zipcode" className="block text-base font-medium text-[#0F172B] mb-2">
                Zip Code
              </label>
              <input
                id="zipcode"
                type="number"
                className="block border border-gray-300 rounded-xl px-3 py-4 text-base w-full outline-none focus:border-[#163C8C] focus:ring-1 focus:ring-[#163C8C] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-[#0F172BE5] font-semibold">
              Cancellation Policy
            </h3>
            <div className="flex gap-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 10.5C1 6.729 1 4.843 2.172 3.672C3.344 2.501 5.229 2.5 9 2.5H13C16.771 2.5 18.657 2.5 19.828 3.672C20.999 4.844 21 6.729 21 10.5V12.5C21 16.271 21 18.157 19.828 19.328C18.656 20.499 16.771 20.5 13 20.5H9C5.229 20.5 3.343 20.5 2.172 19.328C1.001 18.156 1 16.271 1 12.5V10.5Z"
                  stroke="#EB001B"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 2.5V1M16 2.5V1M1.5 7.5H20.5"
                  stroke="#EB001B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6 15C6.13261 15 6.25975 15.0527 6.35352 15.1465C6.44728 15.2403 6.5 15.3674 6.5 15.5C6.5 15.6326 6.44728 15.7597 6.35352 15.8535C6.25975 15.9473 6.13261 16 6 16C5.86739 16 5.74025 15.9473 5.64648 15.8535C5.55272 15.7597 5.5 15.6326 5.5 15.5C5.5 15.3674 5.55272 15.2403 5.64648 15.1465C5.74025 15.0527 5.86739 15 6 15ZM11 15C11.1326 15 11.2597 15.0527 11.3535 15.1465C11.4473 15.2403 11.5 15.3674 11.5 15.5C11.5 15.6326 11.4473 15.7597 11.3535 15.8535C11.2597 15.9473 11.1326 16 11 16C10.8674 16 10.7403 15.9473 10.6465 15.8535C10.5527 15.7597 10.5 15.6326 10.5 15.5C10.5 15.3674 10.5527 15.2403 10.6465 15.1465C10.7403 15.0527 10.8674 15 11 15ZM16 15C16.1326 15 16.2597 15.0527 16.3535 15.1465C16.4473 15.2403 16.5 15.3674 16.5 15.5C16.5 15.6326 16.4473 15.7597 16.3535 15.8535C16.2597 15.9473 16.1326 16 16 16C15.8674 16 15.7403 15.9473 15.6465 15.8535C15.5527 15.7597 15.5 15.6326 15.5 15.5C15.5 15.3674 15.5527 15.2403 15.6465 15.1465C15.7403 15.0527 15.8674 15 16 15ZM6 11C6.13261 11 6.25975 11.0527 6.35352 11.1465C6.44728 11.2403 6.5 11.3674 6.5 11.5C6.5 11.6326 6.44728 11.7597 6.35352 11.8535C6.25975 11.9473 6.13261 12 6 12C5.86739 12 5.74025 11.9473 5.64648 11.8535C5.55272 11.7597 5.5 11.6326 5.5 11.5C5.5 11.3674 5.55272 11.2403 5.64648 11.1465C5.74025 11.0527 5.86739 11 6 11ZM11 11C11.1326 11 11.2597 11.0527 11.3535 11.1465C11.4473 11.2403 11.5 11.3674 11.5 11.5C11.5 11.6326 11.4473 11.7597 11.3535 11.8535C11.2597 11.9473 11.1326 12 11 12C10.8674 12 10.7403 11.9473 10.6465 11.8535C10.5527 11.7597 10.5 11.6326 10.5 11.5C10.5 11.3674 10.5527 11.2403 10.6465 11.1465C10.7403 11.0527 10.8674 11 11 11ZM16 11C16.1326 11 16.2597 11.0527 16.3535 11.1465C16.4473 11.2403 16.5 11.3674 16.5 11.5C16.5 11.6326 16.4473 11.7597 16.3535 11.8535C16.2597 11.9473 16.1326 12 16 12C15.8674 12 15.7403 11.9473 15.6465 11.8535C15.5527 11.7597 15.5 11.6326 15.5 11.5C15.5 11.3674 15.5527 11.2403 15.6465 11.1465C15.7403 11.0527 15.8674 11 16 11Z"
                  fill="#EB001B"
                  stroke="#EB001B"
                />
              </svg>

              <h3 className="font-medium text-lg text-[#EB001B]">
                Cancel up to Sat 15 Nov 2025
              </h3>
            </div>
            <p className="text-[#0F172B66] text-base font-medium">
              The full cost of the booking will be refunded. No cancellation
              charges apply.
            </p>
            <div className="flex gap-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.92871 3.92896L18.0697 18.071"
                  stroke="#EB001B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                  stroke="#EB001B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h3 className="font-medium text-lg text-[#EB001B]">
                Cancel on or after Sun 16 Nov 2025
              </h3>
            </div>
            <p className="text-[#0F172B66] text-base font-medium">
              No refund will be given.
            </p>
            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border border-[#0F172B66] mt-0.5 focus:ring-[#163C8C] focus:border-[#163C8C]"
              />
              <span className="text-[#0F172B66] text-base font-medium">
                I accept the cancellation policy for this booking and the{" "}
                <span className="text-[#163C8C] underline cursor-pointer hover:text-[#0f2d6b]">
                  Terms & Conditions
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* Right Side Summary */}
        <div className="w-full sm:max-w-full md:max-w-95 lg:max-w-95 border border-[#CACACA] shadow rounded-xl p-5 h-fit">
          <div className="flex gap-3 mb-4">
            <img
              src="/images/fh4.jpg"
              alt="Hotel"
              className="w-19 h-18 rounded-md object-cover"
            />
            <div>
              <h3 className="font-semibold text-[#0F172B] text-lg">
                The Serene Vista Manor & Spa
              </h3>
              <p className="text-sm font-semibold text-[#0F172B]">
                Monday, Jul 28 → Tuesday, Jul 29
              </p>
              <p className="text-sm font-semibold text-[#0F172B]">2 adults</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-[#0F172B]">
                Experience
              </span>
              <span className="text-lg font-bold text-[#0F172B]">$247.20</span>
            </div>
            <div className="text-xs text-gray-500">
              <p className="font-medium text-base text-[#72726D]">
                Classic Double Room (King size double bed){" "}
                <span className="w-1 h-1 rounded-full bg-[#72726D] inline-block mb-0.5"></span>
              </p>
              <p className="font-medium text-base text-[#72726D]">
                Estate access{" "}
                <span className="w-1 h-1 rounded-full bg-[#72726D] inline-block mb-0.5"></span>{" "}
                Indoor pool access{" "}
                <span className="w-1 h-1 rounded-full bg-[#72726D] inline-block mb-0.5"></span>{" "}
                Indoor hot
              </p>
              <p className="font-medium text-base text-[#72726D]">
                Tub access{" "}
                <span className="w-1 h-1 rounded-full bg-[#72726D] inline-block mb-0.5"></span>{" "}
                Sauna access{" "}
                <span className="w-1 h-1 rounded-full bg-[#72726D] inline-block mb-0.5"></span>{" "}
                Hammam access
              </p>
              <p className="font-medium text-base text-[#72726D]">
                Gym access{" "}
                <span className="w-1 h-1 rounded-full bg-[#72726D] inline-block mb-0.5"></span>{" "}
                Breakfast{" "}
              </p>
            </div>

            <div className="flex justify-between">
              <span className="text-lg font-semibold text-[#0F172B]">
                TopTier fee
              </span>
              <span className="text-lg font-bold text-[#0F172B]">$2.90</span>
            </div>
          </div>
          <p className="font-medium text-base text-[#72726D] my-3 w-73">
            This covers the cost of running the toptier service
          </p>
          <div className="flex justify-between font-bold text-lg">
            <span className="text-lg font-semibold text-[#0F172B]">Total</span>
            <span className="text-lg font-bold text-[#0F172B]">$250.10</span>
          </div>

          <button className="cursor-pointer w-full bg-[#163C8C] text-lg text-white py-3 font-medium rounded-lg mt-5 hover:bg-[#0f2d6b] transition-colors focus:ring-2 focus:ring-[#163C8C] focus:ring-offset-2">
            Confirm & Book
          </button>
        </div>
      </div>
    </section>
  );
}