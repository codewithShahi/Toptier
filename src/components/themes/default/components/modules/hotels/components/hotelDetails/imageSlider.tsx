"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5L15 11L9 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L9 11L15 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Static image URLs - replace with your actual paths
// const images = [
//   'https://images.unsplash.com/photo-1755366282248-ebe47a7b33b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
//   'https://plus.unsplash.com/premium_photo-1722944969391-1d21a2d404ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D',
//   'https://plus.unsplash.com/premium_photo-1753982324741-839128d837ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
// ];

const SwiperImageSlider = (images:any) => {
    console.log("images in slider", images.images);
   const imagesArr=images.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate slide width based on screen size
  const getSlideWidth = () => {
    if (typeof window === 'undefined') return 300;

    const isMobile = window.innerWidth < 768;
    return isMobile ? 250 : 350;
  };

  const slideWidth = getSlideWidth();

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isAnimating) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // Only allow swipe if moving left or right significantly
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging && !isAnimating) {
      setIsDragging(false);
    }
  };

  // Handle mouse events for drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isAnimating) return;

    const currentX = e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && !isAnimating) {
      setIsDragging(false);
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative overflow-hidden mx-auto max-w-[1200px]">
      {/* Main slider container */}
      <div
        ref={containerRef}
        className="flex items-center justify-center relative"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * slideWidth}px)`,
            width: `${images.length * slideWidth}px`
          }}
        >
          {imagesArr.map((image:any, index:number) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] sm:w-[350px] h-[200px] sm:h-[250px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
              style={{
                marginRight: '1rem',
                width: '300px',
                height: '200px'
              }}
            >
              <Image
                src={image.src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAfFcSJYYAAAAJ0lEQVR42mNkYPhfDwAChwG/yN8eIAAAAABJRU5ErkJggg=="
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/default-placeholder.jpg";
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors disabled:opacity-50 z-10"
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors disabled:opacity-50 z-10"
          aria-label="Next"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dots navigation - hidden on desktop */}
      <div className="flex justify-center mt-4 md:hidden gap-2">
        {imagesArr.map((_:any, index:number) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwiperImageSlider;