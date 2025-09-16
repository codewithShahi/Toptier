"use client";

import { Icon } from "@iconify/react";
import React, { useState, ChangeEvent } from "react";

interface FormData {
  name: string;
  email: string;
}

const NewsLatter: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          <div className="order-2 lg:order-1">
            <img
              src="./images/newsletter.jpg"
              className="w-full h-[250px] sm:h-[320px] lg:h-[393px] object-cover rounded-[20px_50px_20px_50px] sm:rounded-[30px_70px_30px_70px] lg:rounded-[40px_100px_40px_100px]"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 order-1 lg:order-2">
            <button className="text-white bg-[#010101]/60 hover:bg-black/60 transition cursor-pointer text-sm font-medium px-3 w-[91px] h-[28px] rounded-md">
            Newsletter
          </button>
            <p className="text-[28px] sm:text-[36px] lg:text-[44px] text-[#051036] font-[900] ">
              Your Travel Journey Starts Here
            </p>
            <p className="text-[16px] sm:text-[17px] lg:text-[18px] font-[400] text-[#697488] ">
              Begin your adventure with handpicked stays, exclusive deals, and
              effortless booking — everything you need for a perfect getaway, all
              in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 ">
              <div className="relative w-full sm:w-1/2">
                <Icon icon="mdi:account-outline" width="20" height="20" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
                  className="w-full bg-[#F3F3F3] pl-10 px-4 h-[45px] sm:h-[47px] lg:h-[49px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative w-full sm:w-1/2">
                <Icon icon="mdi:email-outline" width="20" height="20"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                  className="w-full bg-[#F3F3F3] pl-10 px-4 h-[45px] sm:h-[47px] lg:h-[49px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="">
              <button onClick={handleSubmit}
                className="rounded-lg bg-[#163C8C] text-white w-full py-2 h-[45px] sm:h-[47px] lg:h-[49px]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;