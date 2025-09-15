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
     {/* Content Container */}
<div className="relative max-w-[1200px] w-full mx-auto  z-10 min-h-[500px] flex items-center justify-center flex-col text-center px-4">
  <p className="text-4xl font-extrabold text-white mb-6 max-w-xl">
    Discover the <br/> World's Hidden Treasures
  </p>
  <div className="w-full ">
    <HotelSearch />
  </div>
</div>

    </motion.section>
  );
};

export default HeroSection;