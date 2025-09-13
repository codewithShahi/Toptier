"use client";
import React, { useState } from "react";
import {
  HotelSearch,
} from "@components/themes/default/components/modules";
import { useAppSelector } from "@lib/redux/store";
import useLocale from "@hooks/useLocale";
import useDictionary from "@hooks/useDict";
import ImageBlur from "@src/utils/blurImage";
import defaultImage from "../../../../../../../public/images/heroBG.jpg";
import { motion } from "framer-motion";

// 🔁 Animation Variants
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}


const HeroSection = () => {
  const app = useAppSelector((state) => state?.appData?.data);
  const { locale } = useLocale();
  const { data: dict } = useDictionary(locale as any);

  // =====> Background image with fallback
  const coverImage =
    app?.app?.coverimage && app?.app?.coverimage.trim() !== ""
      ? app.app.coverimage
      : defaultImage;

  const [bgError, setBgError] = useState(false);

  return (
    // ✅ Animate the entire section
    <motion.section
      className="relative w-full min-h-100 h-full "
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image */}
      <ImageBlur
        src={bgError ? defaultImage.src : coverImage}
        alt="Hero Background"
        fill
        onError={() => setBgError(true)}
        style={{ objectFit: "cover" }}
        priority
      />

      {/* Gradient Overlay */}
<div className="absolute inset-0 bg-black/40 bg-opacity-50 z-0 pointer-events-none" />


      {/* Content Container */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-50">
       {/* <HotelSearch/>
       <h1>hello world</h1> */}
      </div>
    </motion.section>
  );
};

export default HeroSection;