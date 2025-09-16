"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "@components/core/button";
import HeaderLogo from "@components/themes/layout/components/common/headerLogo";
import { useUser } from "@hooks/use-user";
import Alert from "@components/core/alert";

const HeaderMenus = () => {
  const [isOpen, setIsOpen] = useState(false);
    const { user, error, isLoading: userLoading, checkSession } = useUser();
  return (
    <header className="w-full  max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between h-22 appHorizantalSpacing">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-800">
            <HeaderLogo imgClass='w-32' />
          </Link>

          {/* Desktop Menu */}
          <nav className="">
            <div className="hidden md:flex items-center gap-8 text-gray-700">
             <Link href="/hotels" className="header-nav-item">
              Hotels
            </Link>
            <Link href="/contact" className="header-nav-item">
              Contact
            </Link>
            <Link href="/support" className="header-nav-item">
              Support
            </Link>
            </div>

          </nav>
        </div>

        {/* Right: Auth Buttons */}
        {!(user || userLoading) && <div className="hidden md:flex items-center gap-3">
             <Link
             href="/auth/signup"
              className="border border-blue-900 text-blue-900 text-center rounded-full px-7 py-1.5 hover:bg-blue-50"
            >
              Sign up
            </Link>

            <Link
            href="/auth/login"
              className="bg-[#163C8C] text-center border-none hover:text-white ring-0 text-white rounded-full px-10 py-3 transition"
            >
              Login
            </Link>
        </div>}

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon
            icon={isOpen ? "mdi:close" : "mdi:menu"}
            width={28}
            height={28}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
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
          <button onClick={() => setIsOpen(false)}>
            <Icon icon="mdi:close" width={28} height={28} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col p-6 space-y-6 text-gray-700">
          <Link
            href="/hotels"
            className="block header-nav-item"
            onClick={() => setIsOpen(false)}
          >
            Hotels
          </Link>
          <Link
            href="/contact"
            className="block header-nav-item"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/support"
            className="block header-nav-item"
            onClick={() => setIsOpen(false)}
          >
            Support
          </Link>

          {/* Auth Buttons */}
           {!(user || userLoading) && <div className="hidden md:flex items-center gap-3">
             <Link
             href="/auth/signup"
              className="border border-blue-900 text-blue-900 text-center rounded-full px-7 py-1.5 hover:bg-blue-50"
            >
              Sign up
            </Link>

            <Link
            href="/auth/login"
              className="bg-[#163C8C] text-center border-none hover:text-white ring-0 text-white rounded-full px-10 py-3 transition"
            >
              Login
            </Link>
        </div>}
        </nav>
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
