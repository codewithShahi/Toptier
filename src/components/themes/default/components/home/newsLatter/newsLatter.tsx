import { Icon } from "@iconify/react";
import React, { useState, ChangeEvent } from "react";

interface FormData {
  name: string;
  email: string;
}

const NewsLatter: React.FC = () => {
  // Single state object
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle button click
  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
        <div className="p-8">
      <div className="grid grid-cols-2 gap-14">
        <div>
          <img
            src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-[393px] object-cover rounded-[40px_100px_40px_100px]"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4">
          <button className="text-white bg-[#626262] text-[14px] font-[400] w-[91px] h-[25px] rounded-[7px]">
            Newsletter
          </button>
          <p className="text-[44px] text-[#051036] font-[900] ">
            Your Travel Journey Starts Here
          </p>
          <p className="text-[18px] font-[400] text-[#697488] ">
            Begin your adventure with handpicked stays, exclusive deals, and
            effortless booking — everything you need for a perfect getaway, all
            in one place.
          </p>
          <div className="flex gap-4 ">
            <div className="relative w-1/2">
  {/* <Icon
    icon="mdi:account"
    width="20"
    height="20"
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
  /> */}
  <Icon icon="mdi:account-outline" width="20" height="20" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  <input
    type="text"
    name="name"
    placeholder="Name"
    value={formData.name}
    onChange={handleChange}
    className="w-full bg-[#F3F3F3] pl-10 px-4 h-[49px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="relative w-1/2">
  <Icon
    icon="mdi:email-outline"
    width="20"
    height="20"
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    className="w-full bg-[#F3F3F3] pl-10 px-4 h-[49px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
          </div>
          <div className="">
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-[#163C8C] text-white w-full py-2 h-[49px]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default NewsLatter;
