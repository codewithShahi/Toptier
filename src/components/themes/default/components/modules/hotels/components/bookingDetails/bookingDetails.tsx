"use client";
import { JSX, useEffect, useRef, useState } from "react";

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
    <div className="min-h-screen w-full max-w-[1200px] mx-auto 
    justify-between  flex flex-col md:flex-row lg:flex-row p-4 md:p-6 lg:p-12 mb-6 gap-8">
      {/* form  */}
      <div className="flex-1 space-y-8">
        {/* personal info  */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#0F172B] border-b border-[#CACACA] mb-8 pb-8">
            Booking Details
          </h2>
          <h3 className="text-xl text-[#0F172BE5] font-semibold mb-2">
            Personal Information
          </h3>
          <p className="text-[#0F172B66] font-medium text-base mb-4">
            Tell us the name of the person checking in.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {/* firstname  */}
            <div className="w-full max-w-sm ">
              <div className="relative">
                <input
                  id="firstname"
                  type="text"
                  placeholder=" "
                  className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:w-lg outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="firstname"
                  className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium  pointer-events-none transition-all duration-200 transform origin-left -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 "
                >
                  First Name
                </label>
              </div>
            </div>
            {/* lastname */}
            <div className="w-full max-w-sm ">
              <div className="relative">
                <input
                  id="lastname"
                  type="text"
                  placeholder=" "
                  className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:w-lg outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="lastname"
                  className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium  pointer-events-none transition-all duration-200 transform origin-left -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 "
                >
                  Last Name
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl text-[#0F172BE5] font-semibold">
            Contact Information
          </h3>
          <p className="text-[#0F172B66] text-base font-medium">
            We’ll send your confirmation to this email address.
          </p>
          {/* Email Address */}
          <div className="w-full max-w-sm ">
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder=" "
                className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:w-lg outline-none mb-2"
                autoComplete="off"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium  pointer-events-none transition-all duration-200 transform origin-left -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 "
              >
                Email Address
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Country Code */}
            <div className="w-full max-w-44">
              {/* Country Code Dropdown */}
              <div className=" relative" ref={dropdownRef}>
                <input
                  id="countrynumber"
                  type="tel"
                  placeholder=" "
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsOpen(true);
                  }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:max-w-44 outline-none mb-2 [appearance:textfield]"
                  autoComplete="off"
                />
                <label
                  htmlFor="countrynumber"
                  className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium 
              pointer-events-none transition-all duration-200 transform origin-left 
              -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 
              peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85"
                >
                  Country
                </label>

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
            <div className="w-full max-w-sm">
              <div className="relative">
                <input
                  id="number"
                  type="tel"
                  placeholder=" "
                  className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:max-w-82 outline-none mb-2 [appearance:textfield]"
                  autoComplete="off"
                />
                <label
                  htmlFor="number"
                  className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium 
              pointer-events-none transition-all duration-200 transform origin-left 
              -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 
              peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85"
                >
                  Number
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Payment Method */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl text-[#0F172BE5] font-semibold">
            Payment Method
          </h3>
          <p className="text-[#0F172B66] text-base font-medium ">
            Safe, secure transactions. Your personal information is protected.
          </p>
          {/* name of card onwer  */}
          <div className="w-full max-w-sm ">
            <div className="relative">
              <input
                id="cardownername"
                type="text"
                placeholder=" "
                className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:w-lg outline-none mb-2"
                autoComplete="off"
              />
              <label
                htmlFor="cardownername"
                className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium  pointer-events-none transition-all duration-200 transform origin-left -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 "
              >
                Name
              </label>
            </div>
          </div>
          {/* card number  */}
          <div className="w-full max-w-sm ">
            <div className="relative">
              <input
                id="card"
                type="number"
                placeholder=" "
                className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:w-lg outline-none mb-2 [appearance:textfield] 
          
                  [&::-webkit-outer-spin-button]:appearance-none 
                  [&::-webkit-inner-spin-button]:appearance-none"
                autoComplete="off"
              />

              <label
                htmlFor="card"
                className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium  pointer-events-none transition-all duration-200 transform origin-left -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 "
              >
                Card
              </label>
            </div>
          </div>
          {/* Expiration and secruity code  */}
          <div className="flex gap-4">
            {/* Expiration */}
            <div className="w-full max-w-62 ">
              <div className="relative">
                <input
                  id="expiration"
                  type="text"
                  placeholder=" "
                  className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:w-62 outline-none mb-2"
                  autoComplete="off"
                />
                <label
                  htmlFor="expiration"
                  className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium  pointer-events-none transition-all duration-200 transform origin-left -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 "
                >
                  Expiration
                </label>
              </div>
            </div>
            {/* security code  */}
            <div className="w-full max-w-62 ">
              <div className="relative">
                <input
                  id="securitycode"
                  type="number"
                  placeholder=" "
                  className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:w-62 outline-none mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                  [&::-webkit-inner-spin-button]:appearance-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="securitycode"
                  className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium  pointer-events-none transition-all duration-200 transform origin-left -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 "
                >
                  Security code
                </label>
              </div>
            </div>
          </div>
          {/* zipcode  */}
          <div className="w-full max-w-sm">
          <div className="relative">
            <input
              id="zipcode"
              type="number"
              placeholder=" "
              className="peer block border border-gray-300 rounded-xl px-3 pt-4 pb-4 text-base w-full lg:w-lg outline-none mb-2 [appearance:textfield] 
          
                  [&::-webkit-outer-spin-button]:appearance-none 
                  [&::-webkit-inner-spin-button]:appearance-none"
              autoComplete="off"
            />
            <label
              htmlFor="zipcode"
              className="absolute left-3 top-3 text-base text-[#9A9A9A] bg-[#F9FAFB] font-medium  pointer-events-none transition-all duration-200 transform origin-left -translate-y-6 scale-85 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 "
            >
              Zip Code
            </label>
          </div>
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
          <label className="flex gap-2">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border border-[#0F172B66]"
            />
            <span className="text-[#0F172B66] text-base font-medium">
              I accept the cancellation policy for this booking and the{" "}
              <span className="text-[#163C8C] underline">
                Terms & Conditions
              </span>
            </span>
          </label>
        </div>{" "}
      </div>
      {/* Right Side Summary */}
      <div className="sm:max-w-full md:max-w-95 lg:max-w-95 border border-[#CACACA] shadow rounded-xl p-5 h-fit">
        <div className="flex gap-3 mb-4">
          <img
            src="images/img-7.jpg"
            alt="Hotel"
            className="w-19 h-18 object-cover rounded-md"
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

        <button className="cursor-pointer w-full bg-[#163C8C] text-lg text-white py-2 font-normal rounded-lg mt-5">
          Confirm & Book
        </button>
      </div>
    </div>
    </section>
  );
}
      