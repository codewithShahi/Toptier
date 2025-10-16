"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
// import Button from "@components/core/button";
import HeaderLogo from "@components/themes/layout/components/common/headerLogo";
import { useUser } from "@hooks/use-user";
import ProfileDropdown from "./userDropDown"
import { useAppSelector } from "@lib/redux/store";
import useLocale from "@hooks/useLocale";
import useDictionary from "@hooks/useDict";

const HeaderMenus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const {modules , cms} = useAppSelector((state) => state.appData?.data)
const activeModules = modules.filter((mod:any) => mod.status === "1");
 const { locale } = useLocale();
  const { data: dict } = useDictionary(locale as any);
const uniqueModules = Array.from(
  new Map(activeModules.map((mod: any) => [mod.type, mod])).values()
);
const headerPages = cms
  .filter((page:any) => page.name === "Header")
  .map((page:any) => ({
    page_name: page.page_name,
    slug_url: page.slug_url,
  }));
  return (
    <header className="w-full  max-w-[1200px] mx-auto overflow-visible">
      <div className="flex items-center justify-between h-22 appHorizantalSpacing">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-800">
            <HeaderLogo imgClass='w-32' />
          </Link>

          {/* Desktop Menu */}
          <nav className="text-[16px] pt-1.5">
            <div className="hidden md:flex items-center gap-8 text-gray-700">
{uniqueModules.map((mod: any) => (
  <Link
    key={mod.id}
    href={`/${mod.type.toLowerCase()}`}
    className="header-nav-item capitalize text-gray-800 hover:text-blue-700"
  >
    {mod.type}
  </Link>
))}
{headerPages.map((page: any, index:number) => (
  <Link
    key={index}
    href={`/pages/${page.slug_url}`}
    className="header-nav-item capitalize text-gray-800 hover:text-blue-700"
  >
    {page.page_name}
  </Link>
))}


            </div>
          </nav>
        </div>

        {/* Right: Auth Buttons - Desktop Only */}
        {!(user ) ? <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/signup"
            className="border border-[#061026] text-[#061026] cursor-pointer text-center text-[16px] rounded-full w-[113px] h-[39px] pt-1.5 hover:bg-blue-50"
          >
            {dict?.home_page?.hero_section?.signup || "Sign Up"}
          </Link>
          <Link
            href="/auth/login"
            className="bg-[#163C8C] border border-[#061026] cursor-pointer text-center border-none hover:bg-gray-800 text-[16px] hover:text-white ring-0 text-white rounded-full w-[113px] h-[39px] pt-1.5 transition"
          >
            {dict?.home_page?.hero_section?.login || "Login"}
          </Link>
        </div> :
        <div className="hidden md:block">
          <ProfileDropdown/>
          </div>
        }

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon
            icon={isOpen ? "mdi:close" : "mdi:menu"}
            width={28}
            height={28}
            className="cursor-pointer"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <Link
            href="/"
            className="text-lg font-bold text-blue-800"
            onClick={() => setIsOpen(false)}
          >
            <HeaderLogo imgClass='w-32' />
          </Link>
          <button onClick={() => setIsOpen(false)} className="cursor-pointer">
            <Icon icon="mdi:close" width={28} height={28} />
          </button>
        </div>

        {/* Mobile Nav Links */}
     <nav className="flex flex-col p-6 space-y-3 text-gray-700">
  {/* Dynamic Modules */}
  {uniqueModules.map((mod: any) => (
    <Link
      key={mod.id}
      href={`/${mod.type.toLowerCase()}`}
      className="block capitalize text-gray-800 hover:text-blue-700"
    >
      {mod.type}
    </Link>
  ))}

          {/* Mobile Auth Buttons */}
          {!(user) ? <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/auth/signup"
              className="border border-[#061026] text-[#061026] text-center rounded-full px-7 py-2 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
             {dict?.home_page?.hero_section?.signup || "Sign Up"}
            </Link>

            <Link
              href="/auth/login"
              className="bg-[#163C8C] text-center border-none hover:text-white hover:bg-gray-800 ring-0 text-white rounded-full px-9 py-2 transition"
              onClick={() => setIsOpen(false)}
            >
             {dict?.home_page?.hero_section?.login || "Login"}
            </Link>
          </div> :   <div className="">
          <ProfileDropdown/>
          </div>}
        </nav>
  {/* Static Pages */}


      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
    </header>
  );
};

export default HeaderMenus;