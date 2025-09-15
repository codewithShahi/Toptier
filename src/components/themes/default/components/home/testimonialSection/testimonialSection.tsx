"use client";

import React, { useState } from 'react';

const ChevronLeft = () => (
  <svg width="14" height="10" className='rotate-180' viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_97_2398)">
      <g clipPath="url(#clip1_97_2398)">
        <g clipPath="url(#clip2_97_2398)">
          <path d="M0.333984 5.83724H10.4757L7.49232 8.82891L8.66732 10.0039L12.9602 5.71101C13.3507 5.32049 13.3507 4.68732 12.9602 4.2968L8.66732 0.00390625L7.49232 1.17891L10.4757 4.17057H0.333985L0.333984 5.83724Z" fill="#0F1112" />
        </g>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_97_2398"><rect width="14" height="10" fill="white" /></clipPath>
      <clipPath id="clip1_97_2398"><rect width="14" height="10" fill="white" /></clipPath>
      <clipPath id="clip2_97_2398"><rect width="14" height="10" fill="white" /></clipPath>
    </defs>
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_97_2398)">
      <g clipPath="url(#clip1_97_2398)">
        <g clipPath="url(#clip2_97_2398)">
          <path d="M0.333984 5.83724H10.4757L7.49232 8.82891L8.66732 10.0039L12.9602 5.71101C13.3507 5.32049 13.3507 4.68732 12.9602 4.2968L8.66732 0.00390625L7.49232 1.17891L10.4757 4.17057H0.333985L0.333984 5.83724Z" fill="#0F1112" />
        </g>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_97_2398"><rect width="14" height="10" fill="white" /></clipPath>
      <clipPath id="clip1_97_2398"><rect width="14" height="10" fill="white" /></clipPath>
      <clipPath id="clip2_97_2398"><rect width="14" height="10" fill="white" /></clipPath>
    </defs>
  </svg>
);

const Star = ({ className}:{className:string}) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      userImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      userName: "James R.",
      location: "New York",
      rating: 5,
      title: "Flawless from start to finish!",
      description: "Booked my entire trip in minutes. The hotel was exactly as shown — beautiful, clean, and perfectly located! Highly recommended!",
      roomImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
    },
    {
      userImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      userName: "James R.",
      location: "New York",
      rating: 5,
      title: "Flawless from start to finish!",
      description: "Booked my entire trip in minutes. The hotel was exactly as shown — beautiful, clean, and perfectly located! Highly recommended!",
      roomImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
    },
    {
      userImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      userName: "James R.",
      location: "New York",
      rating: 5,
      title: "Flawless from start to finish!",
      description: "Booked my entire trip in minutes. The hotel was exactly as shown — beautiful, clean, and perfectly located! Highly recommended!",
      roomImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
    },
    {
      userImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      userName: "James R.",
      location: "New York",
      rating: 5,
      title: "Flawless from start to finish!",
      description: "Booked my entire trip in minutes. The hotel was exactly as shown — beautiful, clean, and perfectly located! Highly recommended!",
      roomImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
    },
    {
      userImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      userName: "James R.",
      location: "New York",
      rating: 5,
      title: "Flawless from start to finish!",
      description: "Booked my entire trip in minutes. The hotel was exactly as shown — beautiful, clean, and perfectly located! Highly recommended!",
      roomImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
    },

  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500);
  };



  const renderStars = (rating:number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <div className="max-w-[1200px] mx-auto appHorizantalSpacing py-8 sm:py-12 lg:py-16 bg-white" style={{ fontFamily: 'Urbanist, sans-serif' }}>
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-12 gap-6 sm:gap-8">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our<br />
              Guests Are Saying
            </h2>
          </div>
          <div className="flex-1 sm:max-w-md">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              See why travelers trust us — real reviews of comfort, convenience, and unforgettable stays
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${isAnimating ? 'pointer-events-none' : ''}`}
              style={{
                transform: `translateX(-${currentIndex * (window.innerWidth < 640 ? 100 : 60)}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 px-2 sm:px-3 transition-all duration-500 ${
                    index === currentIndex
                      ? 'w-full sm:w-[75%] opacity-100 scale-100'
                      : 'w-full sm:w-[60%] opacity-50 scale-95 hidden sm:block'
                  }`}
                >
                  <div className="bg-[#F8F9FA] rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 min-h-[350px] sm:h-[390px] relative overflow-hidden border border-gray-100">
                    <div className="block sm:hidden">
                      <div className="flex items-start gap-3 mb-4">
                        <img
                          src={testimonial.userImg}
                          alt={testimonial.userName}
                          className="w-12 h-12 rounded-full object-cover shadow-sm flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-black mb-1">
                            {testimonial.userName}, {testimonial.location}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-black mb-3 leading-tight">
                        {testimonial.title}
                      </h4>
                      <p className="text-[#4B5154] text-base leading-relaxed mb-4">
                        {testimonial.description}
                      </p>
                      <div className="relative">
                        <img
                          src={testimonial.roomImage}
                          alt="Hotel Room"
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute bottom-3 right-3">
                          <button className="bg-black/40 text-white cursor-pointer px-3 py-2 rounded-md text-sm font-medium hover:bg-black/60 transition">
                            See Room
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="absolute top-2.5 right-3 bottom-8">
                        <div className="relative">
                          <img
                            src={testimonial.roomImage}
                            alt="Hotel Room"
                            className="w-[280px] lg:w-[400px] h-[320px] lg:h-[370px] object-cover rounded-lg shadow-md"
                          />
                          <div className="absolute bottom-3 right-3">
                            <button className="bg-black/40 text-white cursor-pointer px-3 py-2 rounded-md text-sm font-medium hover:bg-black/60 transition">
                              See Room
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-[60%] pr-4">
                        <div className="mb-4">
                          <img
                            src={testimonial.userImg}
                            alt={testimonial.userName}
                            className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover shadow-sm"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                          {testimonial.userName}, {testimonial.location}
                        </h3>
                        <div className="flex items-center gap-1 mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-black mb-3 leading-tight">
                          {testimonial.title}
                        </h4>
                        <p className="text-[#4B5154] text-base sm:text-lg leading-relaxed line-clamp-3 w-[95%] sm:w-[80%]">
                          {testimonial.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {currentIndex > 0 && (
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-6 z-20">
              <button
                onClick={goToPrev}
                disabled={isAnimating}
                className="bg-[#E5E5E5] shadow-xl cursor-pointer rounded-full p-4 hover:bg-gray-300 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft />
              </button>
            </div>
          )}

          <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-6 z-20">
            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="bg-[#E5E5E5] shadow-xl cursor-pointer rounded-full p-4 hover:bg-gray-300 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>


          <div className="flex sm:hidden justify-between items-center mt-4 px-4">
            <button
              onClick={goToPrev}
              disabled={isAnimating}
              className="bg-[#E5E5E5] shadow-lg cursor-pointer rounded-full p-3 hover:bg-gray-300 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="bg-[#E5E5E5] shadow-lg cursor-pointer rounded-full p-3 hover:bg-gray-300 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialSection;