"use client";

import { useAppSelector } from '@lib/redux/store';
import Image from 'next/image';
import React, { useState } from 'react';

const ChevronLeft = () => (
  <svg width="14" height="10" className="rotate-180" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.333984 5.83724H10.4757L7.49232 8.82891L8.66732 10.0039L12.9602 5.71101C13.3507 5.32049 13.3507 4.68732 12.9602 4.2968L8.66732 0.00390625L7.49232 1.17891L10.4757 4.17057H0.333985L0.333984 5.83724Z" fill="#0F1112" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.333984 5.83724H10.4757L7.49232 8.82891L8.66732 10.0039L12.9602 5.71101C13.3507 5.32049 13.3507 4.68732 12.9602 4.2968L8.66732 0.00390625L7.49232 1.17891L10.4757 4.17057H0.333985L0.333984 5.83724Z" fill="#0F1112" />
  </svg>
);

const Star = ({ className }: { className: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TestimonialSection = () => {
  const { testimonials } = useAppSelector((state) => state.appData.data);
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

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rounded ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      <div
        className="max-w-[1200px] mx-auto appHorizantalSpacing py-8 sm:py-12 lg:py-16 bg-white"
        style={{ fontFamily: 'Urbanist, sans-serif' }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-12 gap-6 sm:gap-8">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[900] text-[#051036] lg:mb-2">
              What Our<br />
              Guests Are Saying
            </h2>
          </div>
          <div className="flex-1 sm:max-w-md">
            <p className="text-[10px] text-base sm:text-lg leading-relaxed">
              See why travelers trust us — real reviews of comfort, convenience, and unforgettable stays
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${isAnimating ? 'pointer-events-none' : ''}`}
              style={{
                transform: `translateX(-${currentIndex * (typeof window !== "undefined" && window.innerWidth < 768 ? 100 : 60)}%)`
              }}
            >
              {testimonials?.map((testimonial: any, index: number) => (
                <div
                  key={testimonial.id}
                  className={`flex-shrink-0 px-2 sm:px-3 transition-all duration-500 ${
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? 'w-full opacity-100 scale-100'
                      : index === currentIndex
                      ? 'w-full sm:w-[75%] opacity-100 scale-100'
                      : 'w-full sm:w-[60%] opacity-70 scale-95 hidden md:block'
                  }`}
                >
                  <div className="bg-[#F5F6F7] rounded-2xl p-4 sm:p-6 lg:p-8 min-h-[350px] sm:min-h-[390px] relative overflow-hidden border border-gray-100">

                    {/* Profile section - responsive layout */}
                    <div className="flex md:block items-start gap-3 md:gap-0 mb-4">
                      <Image
                        src={testimonial.profile_photo || "/images/default-user.jpg"}
                        alt={testimonial.name || "User"}
                        width={64}
                        height={64}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-sm flex-shrink-0 md:mb-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/default-user.jpg";
                        }}
                      />
                      <div className="flex-1 md:flex-none min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-black mb-1 md:mb-2 truncate md:truncate-none">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2 md:mb-4">
                          {renderStars(parseFloat(testimonial.ratings))}
                        </div>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="relative z-10 md:w-[60%] md:pr-4">
                      <h4 className="text-lg md:text-xl font-bold text-black mb-3 leading-tight">
                        {testimonial.title}
                      </h4>
                      <p
                        className="text-[#4B5154] text-base md:text-lg leading-relaxed mb-4 md:mb-0 md:line-clamp-3 md:w-[80%]"
                        dangerouslySetInnerHTML={{ __html: testimonial.description }}
                      />
                    </div>

                    {/* Background image - only on desktop */}
                    {testimonial.photo && (
                      <div className="absolute hidden md:block top-2 bottom-2 right-2.5 w-[50%] h-[370px] rounded-md">
                        <Image
                          src={testimonial.photo}
                          alt={`${testimonial.name} testimonial image`}
                          fill
                          className=""
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows - desktop only */}
          {currentIndex > 0 && (
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-6 z-20">
              <button
                onClick={goToPrev}
                disabled={isAnimating}
                className="bg-[#E5E5E5] shadow-xl cursor-pointer rounded-full p-4 hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                <ChevronLeft />
              </button>
            </div>
          )}

          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-6 z-20">
            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="bg-[#E5E5E5] shadow-xl cursor-pointer rounded-full p-4 hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Navigation dots - mobile and tablet */}
        <div className="flex md:hidden justify-center mt-6 gap-2">
          {testimonials?.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TestimonialSection;