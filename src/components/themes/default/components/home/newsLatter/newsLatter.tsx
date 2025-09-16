"use client";

import Alert from "@components/core/alert";
import { Icon } from "@iconify/react";
import { subscribe_to_newsLatter } from "@src/actions";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { z } from "zod";
// import Alert from "@src/components/core/Alert";

// ✅ Define schema
const newsLatterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

interface FormData {
  name: string;
  email: string;
}

const NewsLatter: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const handleSubmit = async () => {
    setMessage(null);

    try {
      // ✅ Validate with Zod
      newsLatterSchema.parse(formData);

      setLoading(true);
      const res = await subscribe_to_newsLatter(formData);

      if (res?.error) {
        setMessage({ type: "danger", text: res.error });
      } else {
        setMessage({ type: "success", text: "Subscribed successfully!" });
        setFormData({ name: "", email: "" });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // collect field errors
        const fieldErrors: Partial<FormData> = {};
        err.errors.forEach((e) => {
          const field = e.path[0] as keyof FormData;
          fieldErrors[field] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        setMessage({ type: "danger", text: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 appHorizantalSpacing">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/images/newsletter.jpg"
              width={1200}
              height={393}
              alt="Newsletter Banner"
              className="w-full h-[250px] sm:h-[320px] lg:h-[393px] object-cover rounded-[20px_50px_20px_50px] sm:rounded-[30px_70px_30px_70px] lg:rounded-[40px_100px_40px_100px]"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="flex flex-col gap-2 sm:gap-4 order-1 lg:order-2">
            <button className="text-white bg-[#010101]/60 hover:bg-black/60 transition cursor-pointer text-sm font-medium px-3 w-[91px] h-[28px] rounded-md mb-2">
              Newsletter
            </button>
            <div>
              <p className="text-[28px] sm:text-[36px] lg:text-[44px] text-[#051036] font-[900] leading-8">
                Your Travel
              </p>
              <p className="text-[28px] sm:text-[36px] lg:text-[44px] text-[#051036] font-[900]">
                Journey Starts Here
              </p>
            </div>

            <p className="text-[16px] sm:text-[17px] lg:text-[18px] font-[400] text-[#697488]">
              Begin your adventure with handpicked stays, exclusive deals, and
              effortless booking — everything you need for a perfect getaway, all
              in one place.
            </p>

            {/* Input Fields */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
              {/* Name */}
              <div className="relative w-full sm:w-1/2">
                <Icon
                  icon="mdi:account-outline"
                  width="20"
                  height="20"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-[#F3F3F3] pl-10 px-4 h-[45px] sm:h-[47px] lg:h-[49px] rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "focus:ring-red-500 border border-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="absolute -bottom-5 left-2 text-red-500 text-xs">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative w-full sm:w-1/2">
                <Icon
                  icon="mdi:email-outline"
                  width="20"
                  height="20"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[#F3F3F3] pl-10 px-4 h-[45px] sm:h-[47px] lg:h-[49px] rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "focus:ring-red-500 border border-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                {errors.email && (
                  <p className="absolute -bottom-5 left-2 text-red-500 text-xs">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-lg bg-[#163C8C] cursor-pointer text-white w-full py-2 h-[45px] sm:h-[47px] lg:h-[49px] flex items-center justify-center"
              >
                {loading ? (
                  <Icon
                    icon="eos-icons:loading"
                    className="animate-spin text-white"
                    width="24"
                    height="24"
                  />
                ) : (
                  "Continue"
                )}
              </button>
            </div>

            {/* Status Message using Alert */}
            {message && (
              <div className="mt-3">
                <Alert type={message.type} closable showIcon>
                  {message.text}
                </Alert>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;
