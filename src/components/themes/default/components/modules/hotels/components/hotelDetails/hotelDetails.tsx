"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { hotel_details } from "@src/actions/server-actions";
import HotelDetailsSearch from "./hotelDetailsSearch";
import SwiperImageSlider from "./imageSlider";
// import { hotel_details } from "@src/actions/hotelDetails";

interface HotelDetailsPayload {
  hotel_id: string;
  checkin: string;
  checkout: string;
  rooms: number;
  adults: number;
  childs: number;
  child_age: string;
  nationality: string;
  language: string;
  currency: string;
  supplier_name: string;
}

const HotelsDetails = () => {
  const params = useParams();
  const slugArr = (params?.slug as string[]) || [];

  const payload: HotelDetailsPayload = {
    hotel_id: slugArr[0],
    checkin: slugArr[2],
    checkout: slugArr[3],
    rooms: Number(slugArr[4]),
    adults: Number(slugArr[5]),
    childs: Number(slugArr[6]),
    child_age: "", // 👉 optional: "5,8" if API expects ages
    nationality: slugArr[7],
    language: "en", // 👉 set default or detect from app
    currency: "USD", // 👉 set default or detect from user settings
    supplier_name: slugArr[8],
  };

  const { data: hotelDetails, isLoading } = useQuery({
    queryKey: ["hotel-details", payload],
    queryFn: () => hotel_details(payload),
    enabled: slugArr.length > 0,
    staleTime: Infinity,
  });
  const { img } = hotelDetails || {};
// console.log("hotel details payload", payload);
  console.log("hotel details data", hotelDetails);
  if (isLoading) return <p>Loading...</p>;
const images=img.images
  return (
    <div>
     <HotelDetailsSearch/>
     <SwiperImageSlider testimonials={img} />
        {/* ============>>> description section and amenties  */}
      <section className="manor&spa py-4 max-w-[1200px] mx-auto appHorizantalSpacing">
        <div className="grid grid-cols-12">
            <div className="lg:col-span-8 col-span-12 flex flex-col gap-2 lg:pe-4">
                <h1 className="text-2xl font-[800]">The Serene Vista Manor & Spa</h1>
                <p className="text-md font-[500] text-[#9297A0] md:hidden block">517 Lexington Avenue, New York, NY, 10017</p>
                <div className="flex items-center pb-1">
                    <div>
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.54662 14.6615L4.40353 17.1574C4.2205 17.2739 4.02915 17.3238 3.82949 17.3071C3.62982 17.2905 3.45511 17.2239 3.30536 17.1075C3.15561 16.991 3.03914 16.8456 2.95594 16.6712C2.87275 16.4968 2.85611 16.3011 2.90603 16.0842L4.00419 11.367L0.335316 8.19734C0.168927 8.04759 0.0651005 7.87687 0.023836 7.68519C-0.0174285 7.49351 -0.00511573 7.30649 0.0607743 7.12413C0.126664 6.94177 0.226498 6.79202 0.360275 6.67488C0.494051 6.55774 0.677079 6.48287 0.909358 6.45025L5.75128 6.02596L7.62316 1.58338C7.70635 1.38371 7.83547 1.23396 8.01051 1.13412C8.18555 1.03429 8.36425 0.984375 8.54662 0.984375C8.72898 0.984375 8.90768 1.03429 9.08272 1.13412C9.25776 1.23396 9.38688 1.38371 9.47007 1.58338L11.342 6.02596L16.1839 6.45025C16.4168 6.48353 16.5998 6.55841 16.733 6.67488C16.8661 6.79135 16.9659 6.9411 17.0325 7.12413C17.099 7.30716 17.1117 7.49451 17.0704 7.68619C17.0291 7.87787 16.925 8.04825 16.7579 8.19734L13.089 11.367L14.1872 16.0842C14.2371 16.3005 14.2205 16.4962 14.1373 16.6712C14.0541 16.8462 13.9376 16.9917 13.7879 17.1075C13.6381 17.2233 13.4634 17.2898 13.2637 17.3071C13.0641 17.3244 12.8727 17.2745 12.6897 17.1574L8.54662 14.6615Z" fill="#FE9A00"/>
                        </svg>
                    </div>
                    <div className="flex items-center pt-1">
                    <span className="text-md font-[700] pl-1">5.0</span>
                    <span className="pl-2"><svg width="7" height="7" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3.07317" cy="3.98436" r="3.07317" fill="#4F5E74"/></svg></span>
                    <span className="text-md pl-2 font-[500] text-[#9297A0]">(10)</span>
                    <span className="text-md pl-3 font-[500] text-[#9297A0] md:block hidden">517 Lexington Avenue, New York, NY, 10017</span>
                    <span className="pl-2"><svg width="7" height="7" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3.07317" cy="3.98436" r="3.07317" fill="#4F5E74"/></svg></span>
                    <span className="text-md pl-2 font-[500] text-[#9297A0]">101Km</span>
                    <span className="pl-2"><svg width="7" height="7" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3.07317" cy="3.98436" r="3.07317" fill="#4F5E74"/></svg></span>
                    <span className="text-md pl-2 font-[600]">Map</span>
                    </div>
                </div>
                <p className="text-[16px] leading-9 font-[500] text-[#555B6A] lg:pr-22">A peaceful boutique escape in Midtown Manhattan, just steps from Grand Central. Enjoy elegant rooms with city views, a full-service spa, and easy access to NYC's top attractions — perfect for both relaxation and exploration.</p>
                <div className="flex md:gap-3 gap-1 mt-2">
                    <div className="flex gap-1 py-1 bg-[#DBFCE7] rounded-[7.45px] md:px-3 px-1 items-center">

<svg width="17" height="17" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_358_1918)">
<path d="M11.4629 10.1147L12.5361 16.154C12.5481 16.2251 12.5381 16.2982 12.5075 16.3635C12.4768 16.4288 12.427 16.4832 12.3646 16.5194C12.3022 16.5555 12.2303 16.5718 12.1584 16.566C12.0865 16.5602 12.0181 16.5326 11.9623 16.4869L9.42648 14.5836C9.30407 14.4922 9.15536 14.4427 9.00255 14.4427C8.84974 14.4427 8.70103 14.4922 8.57861 14.5836L6.03853 16.4862C5.98279 16.5318 5.91447 16.5594 5.84267 16.5652C5.77087 16.571 5.699 16.5548 5.63666 16.5187C5.57432 16.4826 5.52447 16.4284 5.49376 16.3632C5.46305 16.298 5.45294 16.2251 5.46478 16.154L6.53719 10.1147" stroke="#246630" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 10.9011C11.3472 10.9011 13.25 8.99833 13.25 6.65112C13.25 4.30391 11.3472 2.40112 9 2.40112C6.65279 2.40112 4.75 4.30391 4.75 6.65112C4.75 8.99833 6.65279 10.9011 9 10.9011Z" stroke="#246630" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_358_1918">
<rect width="17" height="17" fill="white" transform="translate(0.5 0.984375)"/>
</clipPath>
</defs>
</svg>
<p className="text-sm font-[600] text-[#246630] text-ellipsis">Top Rated</p>
                    </div>
                    <div className="flex gap-1 py-1 bg-[#DBEAFE] rounded-[7.45px] md:px-3 px-1 items-center">


<svg width="17" height="17" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_358_1924)">
<path d="M2.72734 7.0902C2.62395 6.62449 2.63983 6.14021 2.77349 5.68227C2.90716 5.22433 3.15429 4.80755 3.49197 4.47058C3.82964 4.13361 4.24694 3.88736 4.70516 3.75465C5.16337 3.62194 5.64768 3.60708 6.11318 3.71145C6.36939 3.31074 6.72234 2.98098 7.13952 2.75257C7.55669 2.52415 8.02465 2.40442 8.50026 2.40442C8.97587 2.40442 9.44383 2.52415 9.861 2.75257C10.2782 2.98098 10.6311 3.31074 10.8873 3.71145C11.3535 3.60663 11.8387 3.62142 12.2976 3.75445C12.7566 3.88748 13.1744 4.13442 13.5123 4.4723C13.8502 4.81019 14.0971 5.22804 14.2302 5.68699C14.3632 6.14594 14.378 6.63108 14.2732 7.09728C14.6739 7.35349 15.0036 7.70645 15.2321 8.12362C15.4605 8.54079 15.5802 9.00875 15.5802 9.48436C15.5802 9.95997 15.4605 10.4279 15.2321 10.8451C15.0036 11.2623 14.6739 11.6152 14.2732 11.8714C14.3775 12.3369 14.3627 12.8212 14.23 13.2795C14.0973 13.7377 13.851 14.155 13.514 14.4927C13.1771 14.8303 12.7603 15.0775 12.3024 15.2111C11.8444 15.3448 11.3601 15.3607 10.8944 15.2573C10.6385 15.6595 10.2853 15.9907 9.86743 16.2201C9.44955 16.4496 8.98053 16.5699 8.5038 16.5699C8.02707 16.5699 7.55805 16.4496 7.14017 16.2201C6.72229 15.9907 6.36905 15.6595 6.11318 15.2573C5.64768 15.3616 5.16337 15.3468 4.70516 15.2141C4.24694 15.0814 3.82964 14.8351 3.49197 14.4981C3.15429 14.1612 2.90716 13.7444 2.77349 13.2865C2.63983 12.8285 2.62395 12.3442 2.72734 11.8785C2.32356 11.623 1.99097 11.2695 1.7605 10.8509C1.53003 10.4323 1.40918 9.96221 1.40918 9.48436C1.40918 9.00652 1.53003 8.53643 1.7605 8.11784C1.99097 7.69924 2.32356 7.34573 2.72734 7.0902Z" stroke="#193CB8" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.375 9.48442L7.79167 10.9011L10.625 8.06775" stroke="#193CB8" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_358_1924">
<rect width="17" height="17" fill="white" transform="translate(0 0.984375)"/>
</clipPath>
</defs>
</svg>

<p className="text-[13px] font-[600] text-[#193CB8]">Free Cancellation</p>
                    </div>
                    <div className="flex gap-1 py-1 bg-[#F3E8FF] rounded-[7.45px] md:px-3 px-1 items-center">


<svg width="17" height="17" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_358_1930)">
<path d="M14.1668 10.1927C14.1668 13.7344 11.6877 15.5052 8.741 16.5323C8.58669 16.5846 8.41909 16.5821 8.26641 16.5252C5.31266 15.5052 2.8335 13.7344 2.8335 10.1927V5.23441C2.8335 5.04655 2.90812 4.86638 3.04096 4.73354C3.1738 4.6007 3.35397 4.52608 3.54183 4.52608C4.9585 4.52608 6.72933 3.67608 7.96183 2.59941C8.11189 2.4712 8.30279 2.40076 8.50016 2.40076C8.69754 2.40076 8.88843 2.4712 9.0385 2.59941C10.2781 3.68316 12.0418 4.52608 13.4585 4.52608C13.6464 4.52608 13.8265 4.6007 13.9594 4.73354C14.0922 4.86638 14.1668 5.04655 14.1668 5.23441V10.1927Z" stroke="#6E11B0" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.375 9.48442L7.79167 10.9011L10.625 8.06775" stroke="#6E11B0" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_358_1930">
<rect width="17" height="17" fill="white" transform="translate(0 0.984375)"/>
</clipPath>
</defs>
</svg>

<p className="text-[13px] font-[600] text-[#6E11B0]">Best Price Guarantee</p>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:mt-0 mt-6">
                <h1 className="text-[22px] font-[700]">About this Property</h1>
                <div className="grid grid-cols-12 gap-y-10 mt-7">
                    <div className="lg:col-span-6 md:col-span-4 col-span-6 flex items-center gap-3">
                        <div className="bg-[#DBFCE780] rounded-[8px] p-1.5">

<svg width="19" height="19" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_358_1937)">
<path d="M10.7944 17.4979H10.8044" stroke="#112233" stroke-opacity="0.9" stroke-width="1.69383" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.32666 8.03126C4.65578 5.94804 7.67099 4.79633 10.7958 4.79633C13.9207 4.79633 16.9359 5.94804 19.265 8.03126" stroke="#112233" stroke-opacity="0.9" stroke-width="1.69383" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.875 11.4511C6.45813 9.89934 8.58659 9.03015 10.8034 9.03015C13.0202 9.03015 15.1487 9.89934 16.7318 11.4511" stroke="#112233" stroke-opacity="0.9" stroke-width="1.69383" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.83447 14.4705C8.62604 13.6946 9.69027 13.26 10.7987 13.26C11.9071 13.26 12.9713 13.6946 13.7629 14.4705" stroke="#112233" stroke-opacity="0.9" stroke-width="1.69383" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_358_1937">
<rect width="20.326" height="20.326" fill="white" transform="translate(0.628906 0.564453)"/>
</clipPath>
</defs>
</svg>
                        </div>
                        <p className="text-[16px] font-[500]">Wi-Fi</p>
                    </div>
                    <div className="lg:col-span-6 md:col-span-4 col-span-6 flex items-center gap-3">
                        <div className="bg-[#DBFCE780] rounded-[8px] p-1.5">


<svg width="20" height="20" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7911 4.77429C16.3386 4.77429 15.9046 4.95404 15.5847 5.274C15.2647 5.59396 15.085 6.02792 15.085 6.48041V15.864" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.28662 15.8611C2.79846 16.2876 3.31029 16.7142 4.41926 16.7142C6.55191 16.7142 6.55191 15.0081 8.68455 15.0081C10.9025 15.0081 10.7319 16.7142 12.9498 16.7142C15.0825 16.7142 15.0825 15.0081 17.2151 15.0081C18.3241 15.0081 18.8359 15.4346 19.3478 15.8611" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.55273 11.6008H15.0833" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.55273 8.1936H15.0833" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.25885 4.77429C7.80636 4.77429 7.3724 4.95404 7.05244 5.274C6.73249 5.59396 6.55273 6.02792 6.55273 6.48041V15.864" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        </div>
                        <p className="text-[16px] font-[500]">Pool</p>
                    </div>
                    <div className="lg:col-span-6 md:col-span-4 col-span-6 flex items-center gap-3">
                        <div className="bg-[#DBFCE780] rounded-[8px] p-1.5">


<svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.22 2.6145L12.2579 4.57653C11.789 5.05492 11.5264 5.69808 11.5264 6.36795C11.5264 7.03782 11.789 7.68099 12.2579 8.15937L13.7934 9.69488C14.2718 10.1638 14.915 10.4264 15.5848 10.4264C16.2547 10.4264 16.8979 10.1638 17.3763 9.69488L19.3383 7.73285" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3809 13.7L3.40008 3.71924C3.05961 4.05283 2.78913 4.45101 2.60447 4.89044C2.41982 5.32988 2.32471 5.80175 2.32471 6.27841C2.32471 6.75507 2.41982 7.22694 2.60447 7.66638C2.78913 8.10581 3.05961 8.50399 3.40008 8.83758L9.6274 15.0649C10.2245 15.662 11.3335 15.662 12.016 15.0649L13.3809 13.7ZM13.3809 13.7L19.3523 19.6714" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.37354 19.5007L7.8331 14.1265" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.78 5.1709L10.8086 11.1423" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        </div>
                        <p className="text-[16px] font-[500]">Restaurant</p>
                    </div>
                    <div className="lg:col-span-6 md:col-span-4 col-span-6 flex items-center gap-3">
                        <div className="bg-[#DBFCE780] rounded-[8px] p-1.5">


<svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.3478 11.1377C19.1172 9.03633 18.1192 7.09399 16.545 5.68304C14.9708 4.27209 12.9312 3.49182 10.8172 3.49182C8.70321 3.49182 6.66362 4.27209 5.08941 5.68304C3.5152 7.09399 2.51716 9.03633 2.28662 11.1377H19.3478Z" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.811 11.1329V17.9574C10.811 18.4099 10.9908 18.8438 11.3107 19.1638C11.6307 19.4838 12.0647 19.6635 12.5171 19.6635C12.9696 19.6635 13.4036 19.4838 13.7236 19.1638C14.0435 18.8438 14.2233 18.4099 14.2233 17.9574" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.811 2.60474V3.45779" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        </div>
                        <p className="text-[16px] font-[500]">Beach Access</p>
                    </div>
                    <div className="lg:col-span-6 md:col-span-4 col-span-6 flex items-center gap-3">
                        <div className="bg-[#DBFCE780] rounded-[8px] p-1.5">

<svg width="20" height="20" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8086 10.5275H10.8175" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.2302 5.4115V3.70538C14.2302 3.25289 14.0505 2.81894 13.7305 2.49898C13.4106 2.17902 12.9766 1.99927 12.5241 1.99927H9.11188C8.65939 1.99927 8.22543 2.17902 7.90547 2.49898C7.58551 2.81894 7.40576 3.25289 7.40576 3.70538V5.4115" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.3458 11.3783C16.8146 13.0494 13.8483 13.9403 10.8152 13.9403C7.78215 13.9403 4.81587 13.0494 2.28467 11.3783" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.6397 5.40649H3.99078C3.04852 5.40649 2.28467 6.17035 2.28467 7.11261V15.6432C2.28467 16.5854 3.04852 17.3493 3.99078 17.3493H17.6397C18.582 17.3493 19.3458 16.5854 19.3458 15.6432V7.11261C19.3458 6.17035 18.582 5.40649 17.6397 5.40649Z" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        </div>
                        <p className="text-[16px] font-[500]">Business Center</p>
                    </div>
                    <div className="lg:col-span-6 md:col-span-4 col-span-6 flex items-center gap-3">
                        <div className="bg-[#DBFCE780] rounded-[8px] p-1.5">

<svg width="20" height="20" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5947 11.1811C15.9147 11.5012 16.3487 11.681 16.8013 11.681C17.2539 11.681 17.688 11.5012 18.008 11.1811C18.328 10.8611 18.5078 10.4271 18.5078 9.9745C18.5078 9.52192 18.328 9.08787 18.008 8.76785L16.4998 7.26049C16.8198 7.5804 17.2538 7.76008 17.7063 7.76C17.9304 7.75996 18.1522 7.71579 18.3592 7.63001C18.5662 7.54424 18.7542 7.41853 18.9126 7.26007C19.0711 7.10161 19.1967 6.9135 19.2824 6.70649C19.3681 6.49947 19.4122 6.2776 19.4122 6.05354C19.4121 5.82949 19.3679 5.60763 19.2822 5.40065C19.1964 5.19366 19.0707 5.0056 18.9122 4.8472L16.4998 2.43475C16.1799 2.11473 15.7459 1.93489 15.2934 1.93481C14.8409 1.93473 14.4069 2.11441 14.0869 2.43432C13.7669 2.75423 13.587 3.18817 13.587 3.64067C13.5869 4.09317 13.7666 4.52717 14.0865 4.8472L12.5791 3.33899C12.4207 3.18053 12.2325 3.05483 12.0255 2.96908C11.8185 2.88332 11.5966 2.83918 11.3725 2.83918C11.1484 2.83918 10.9265 2.88332 10.7194 2.96908C10.5124 3.05483 10.3243 3.18053 10.1658 3.33899C10.0074 3.49745 9.88167 3.68557 9.79591 3.89261C9.71015 4.09964 9.66602 4.32154 9.66602 4.54564C9.66602 4.76974 9.71015 4.99164 9.79591 5.19867C9.88167 5.40571 10.0074 5.59383 10.1658 5.75229L15.5947 11.1811Z" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.71436 18.629L3.90864 17.4347" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.7144 3.62092L18.9086 2.42664" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.13455 18.6164C5.45446 18.9365 5.8884 19.1163 6.3409 19.1164C6.56495 19.1164 6.78682 19.0723 6.99384 18.9866C7.20085 18.9009 7.38896 18.7753 7.54742 18.6169C7.70588 18.4585 7.83159 18.2704 7.91737 18.0634C8.00315 17.8564 8.04732 17.6346 8.04736 17.4105C8.0474 17.1865 8.0033 16.9646 7.9176 16.7576C7.83189 16.5506 7.70625 16.3625 7.54785 16.204L9.0552 17.7122C9.37522 18.0322 9.80927 18.212 10.2618 18.212C10.7144 18.212 11.1485 18.0322 11.4685 17.7122C11.7885 17.3922 11.9683 16.9581 11.9683 16.5056C11.9683 16.053 11.7885 15.6189 11.4685 15.2989L6.03964 9.87005C5.88118 9.71159 5.69306 9.58589 5.48603 9.50014C5.27899 9.41438 5.05709 9.37024 4.83299 9.37024C4.6089 9.37024 4.387 9.41438 4.17996 9.50014C3.97292 9.58589 3.7848 9.71159 3.62634 9.87005C3.46788 10.0285 3.34219 10.2166 3.25643 10.4237C3.17067 10.6307 3.12653 10.8526 3.12653 11.0767C3.12653 11.3008 3.17067 11.5227 3.25643 11.7297C3.34219 11.9368 3.46788 12.1249 3.62634 12.2833L5.13455 13.7907C4.81453 13.4708 4.38053 13.2911 3.92802 13.2912C3.47552 13.2913 3.04159 13.4711 2.72168 13.7911C2.40177 14.1112 2.22209 14.5451 2.22217 14.9977C2.22225 15.4502 2.40208 15.8841 2.7221 16.204L5.13455 18.6164Z" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.77051 12.5737L12.8652 8.479" stroke="#112233" stroke-opacity="0.9" stroke-width="1.70611" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                        </div>
                        <p className="text-[16px] font-[500]">Gym</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
      {/* //============= room card  */}
         <section className="choose-your-room py-4 max-w-[1200px] mx-auto appHorizantalSpacing">
        <h1 className="text-2xl font-[700] my-4">Choose your room</h1>
        <div className="grid grid-cols-12 gap-3">
          <div className="lg:col-span-3 md:col-span-6 col-span-12 rounded-[45px] bg-[#FFFFFF] p-2 border border-[#E0E0E0]">
            <div className="relative h-[260px] w-fit rounded-4xl">
  <img
    className="h-full rounded-[40px]"
    src="/images/auth_bg.jpg"
    alt=""
  />

  <div className="absolute top-4 right-4 bg-[#EBEFF4] w-7 h-7 rounded-full flex items-center justify-center">
  <svg
    width="3"
    height="14"
    viewBox="0 0 3 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.63417 4.8692C1.34474 4.8692 1.06716 4.98418 0.862492 5.18884C0.657829 5.3935 0.542851 5.67108 0.542851 5.96052V12.5085C0.542851 12.7979 0.657829 13.0755 0.862492 13.2801C1.06716 13.4848 1.34474 13.5998 1.63417 13.5998C1.92361 13.5998 2.20119 13.4848 2.40586 13.2801C2.61052 13.0755 2.7255 12.7979 2.7255 12.5085V5.96052C2.7255 5.67108 2.61052 5.3935 2.40586 5.18884C2.20119 4.98418 1.92361 4.8692 1.63417 4.8692ZM1.63417 0.503906C1.36437 0.503906 1.10062 0.583912 0.876291 0.733807C0.651957 0.883703 0.47711 1.09675 0.373861 1.34602C0.270611 1.59529 0.243596 1.86957 0.296232 2.13419C0.348868 2.39881 0.478791 2.64188 0.669572 2.83266C0.860352 3.02344 1.10342 3.15337 1.36804 3.206C1.63266 3.25864 1.90695 3.23162 2.15621 3.12837C2.40548 3.02512 2.61853 2.85028 2.76843 2.62594C2.91832 2.40161 2.99833 2.13786 2.99833 1.86806C2.99833 1.50626 2.8546 1.15929 2.59878 0.903458C2.34295 0.647629 1.99597 0.503906 1.63417 0.503906Z"
      fill="black"
    />
  </svg>
</div>

</div>

            <div className="flex flex-col gap-1 p-3">
              <h1 className="text-xl text-[#0F172B] font-[800]">Studio, 1 Queen Bed</h1>
              <div className="flex gap-2 items-center my-1">
                <div className="">
                  <svg width="13" height="13" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.28602 12.0056L3.80326 14.1037C3.6494 14.2016 3.48855 14.2435 3.32071 14.2295C3.15286 14.2156 3.006 14.1596 2.88012 14.0617C2.75423 13.9638 2.65632 13.8415 2.58639 13.695C2.51645 13.5484 2.50247 13.3839 2.54443 13.2015L3.46757 9.23619L0.383436 6.57167C0.243566 6.44578 0.156287 6.30228 0.1216 6.14115C0.0869118 5.98002 0.0972621 5.8228 0.152651 5.66951C0.208039 5.51621 0.291961 5.39032 0.404417 5.29186C0.516872 5.19339 0.670729 5.13045 0.865988 5.10303L4.93621 4.74636L6.50974 1.01183C6.57968 0.843989 6.68822 0.718106 6.83536 0.634184C6.98251 0.550262 7.13273 0.508301 7.28602 0.508301C7.43932 0.508301 7.58954 0.550262 7.73668 0.634184C7.88383 0.718106 7.99237 0.843989 8.0623 1.01183L9.63584 4.74636L13.7061 5.10303C13.9019 5.13101 14.0557 5.19395 14.1676 5.29186C14.2795 5.38976 14.3634 5.51565 14.4194 5.66951C14.4753 5.82336 14.486 5.98086 14.4513 6.14199C14.4166 6.30312 14.329 6.44634 14.1886 6.57167L11.1045 9.23619L12.0276 13.2015C12.0696 13.3833 12.0556 13.5478 11.9857 13.695C11.9157 13.8421 11.8178 13.9644 11.6919 14.0617C11.566 14.1591 11.4192 14.215 11.2513 14.2295C11.0835 14.2441 10.9226 14.2021 10.7688 14.1037L7.28602 12.0056Z" fill="#FE9A00"/>
                  </svg>
                </div>
              <p className="text-sm font-[500]">9.5 (245 reviews)</p>
              </div>
              <div className="flex flex-col gap-y-3 py-2 text-[#112233E5]">
                <div className="flex gap-2 items-center">
                  <div>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1621 11.3366C15.3213 11.4953 15.4477 11.6839 15.5339 11.8916C15.6202 12.0992 15.6646 12.3219 15.6646 12.5467C15.6646 12.7716 15.6202 12.9942 15.5339 13.2019C15.4477 13.4096 15.3213 13.5982 15.1621 13.7569L13.3112 15.6077C13.1525 15.767 12.9639 15.8934 12.7562 15.9796C12.5486 16.0659 12.3259 16.1102 12.1011 16.1102C11.8762 16.1102 11.6536 16.0659 11.4459 15.9796C11.2382 15.8934 11.0496 15.767 10.8909 15.6077L1.92143 6.63828C1.60149 6.31679 1.42188 5.88168 1.42188 5.42811C1.42188 4.97455 1.60149 4.53944 1.92143 4.21795L3.77227 2.36711C4.09376 2.04717 4.52887 1.86755 4.98244 1.86755C5.436 1.86755 5.87111 2.04717 6.1926 2.36711L15.1621 11.3366Z" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.3252 9.33962L11.7489 7.91589" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.18848 7.20327L9.6122 5.77954" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.05225 5.07045L7.47597 3.64673" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.4541 11.4761L13.8778 10.0524" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm font-[500]">333 sq ft</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5242 15.3923V13.9685C13.5242 13.2134 13.2242 12.4891 12.6902 11.9551C12.1562 11.4211 11.4319 11.1211 10.6767 11.1211H6.40555C5.65036 11.1211 4.9261 11.4211 4.3921 11.9551C3.8581 12.4891 3.55811 13.2134 3.55811 13.9685V15.3923" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.54227 8.27376C10.1149 8.27376 11.3897 6.99891 11.3897 5.42631C11.3897 3.8537 10.1149 2.57886 8.54227 2.57886C6.96967 2.57886 5.69482 3.8537 5.69482 5.42631C5.69482 6.99891 6.96967 8.27376 8.54227 8.27376Z" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm font-[500]">Sleeps 2</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.2409 7.55964C14.2409 11.114 10.2979 14.8157 8.9738 15.9589C8.85045 16.0517 8.7003 16.1018 8.54597 16.1018C8.39164 16.1018 8.24149 16.0517 8.11814 15.9589C6.79408 14.8157 2.85107 11.114 2.85107 7.55964C2.85107 6.04926 3.45107 4.60074 4.51907 3.53274C5.58707 2.46474 7.03559 1.86475 8.54597 1.86475C10.0564 1.86475 11.5049 2.46474 12.5729 3.53274C13.6409 4.60074 14.2409 6.04926 14.2409 7.55964Z" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.54477 9.69781C9.72422 9.69781 10.6804 8.74167 10.6804 7.56222C10.6804 6.38277 9.72422 5.42664 8.54477 5.42664C7.36531 5.42664 6.40918 6.38277 6.40918 7.56222C6.40918 8.74167 7.36531 9.69781 8.54477 9.69781Z" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm font-[500]">City view</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.13623 14.6786V8.98366C2.13623 8.60607 2.28623 8.24394 2.55323 7.97694C2.82023 7.70994 3.18236 7.55994 3.55996 7.55994H13.526C13.9036 7.55994 14.2658 7.70994 14.5328 7.97694C14.7998 8.24394 14.9498 8.60607 14.9498 8.98366V14.6786" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.55811 7.56182V4.71437C3.55811 4.33678 3.7081 3.97465 3.9751 3.70765C4.2421 3.44065 4.60423 3.29065 4.98183 3.29065H12.1005C12.478 3.29065 12.8402 3.44065 13.1072 3.70765C13.3742 3.97465 13.5242 4.33678 13.5242 4.71437V7.56182" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.13623 13.2546H14.9498" stroke="#112233" stroke-opacity="0.9" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm font-[500]">1 Queen Bed</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <h1 className="text-xl font-[900] text-[#0F172B]">$420</h1>
                  <p className="text-[#5B697E] text-sm font-[500] ps-1">/night</p>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <svg width="8" height="8" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4.41933" cy="5.07655" r="4.41933" fill="#00A63E"/>
                    </svg>
                  </div>
                  <p className="text-[#00A63E] text-sm font-[500]">2 rooms left</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-[#163C8C] text-white cursor-pointer font-[600] text-sm w-full rounded-full">Reserve</button>
                <button className="bg-[#EBEFF4] cursor-pointer rounded-full p-4">
                  <svg width="16" height="15" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.08315 1.00586C2.87423 1.00586 1.08301 2.90908 1.08301 5.25612C1.08301 9.95355 8.66222 15.3222 8.66222 15.3222C8.66222 15.3222 16.2414 9.95355 16.2414 5.25612C16.2414 2.34822 14.4502 1.00586 12.2413 1.00586C10.6749 1.00586 9.31909 1.96252 8.66222 3.35542C8.00536 1.96252 6.64952 1.00586 5.08315 1.00586Z" stroke="black" stroke-opacity="0.7" stroke-width="1.2632" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          </div>
          </section>
          <section className="way-to-travel my-10 max-w-[1200px] mx-auto appHorizantalSpacing">
        <h1 className="font-[700] text-2xl my-6">The Toptier Way to Travel</h1>
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-3">
            <img className="h-32 rounded-sm" src="/images/auth_bg.jpg" alt="" />
            <p className="font-[500] text-lg text-[#0F172B] truncate">Stay in a Historic Skyline Studio</p>
          </div>
          <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-3">
            <img className="h-32 rounded-sm" src="/images/auth_bg.jpg" alt="" />
            <p className="font-[500] text-lg text-[#0F172B] truncate">Sunset Moments on the Rooftop</p>
          </div>
          <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-3">
            <img className="h-32 rounded-sm" src="/images/auth_bg.jpg" alt="" />
            <p className="font-[500] text-lg text-[#0F172B] truncate">Welcome Glass of Sparkling Wine</p>
          </div>
          <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-3">
            <img className="h-32 rounded-sm" src="/images/auth_bg.jpg" alt="" />
            <p className="font-[500] text-lg text-[#0F172B] truncate">Gourmet Breakfast with a View</p>
          </div>
          <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col gap-3">
            <img className="h-32 rounded-sm" src="/images/auth_bg.jpg" alt="" />
            <p className="font-[500] text-lg text-[#0F172B] truncate">Wellness & Rejuvenation at the Spa</p>
          </div>
        </div>
      </section>







    </div>
  );
};

export default HotelsDetails;
