import * as React from "react";
import Image from "next/image";

export interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
  dict?: any;
}

export function Layout({ children, dict }: LayoutProps): React.JSX.Element {
  return (
    <div className="min-h-screen w-full bg-amber-200 flex flex-col md:flex-row">
      {/* ------------------ FORMS SECTION ------------------ */}
      <div className="bg-white dark:bg-gray-800 w-full md:w-1/2 min-h-screen flex items-center justify-center">
        <section className="w-full h-full">
          {children}
        </section>
      </div>

      {/* ------------------ IMAGE SECTION ------------------ */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="max-w-lg xl:max-w-md lg:max-w-full mx-auto flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 dark:text-gray-50">
            {dict?.login_form?.image_section?.title || ""}
          </h2>
          <p className="text-gray-600 text-sm mb-6 dark:text-gray-100">
            {dict?.login_form?.image_section?.subtext || ""}
          </p>
          <div className="text-blue-600 uppercase font-bold mb-8">
            {dict?.login_form?.image_section?.lets_do || ""}
          </div>

          <Image
            src="/images/auth_bg.png"
            alt="Travel management"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
