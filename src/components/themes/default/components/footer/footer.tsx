
import React from 'react';
import { useAppSelector } from '@lib/redux/store';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const Footer = () => {
  const app=useAppSelector(state=>state.appData?.data)
  const {social_facebook,
    social_instagram,
    social_linkedin,
    social_twitter,
    social_youtube,
    business_name,
    home_title
  }=app.app;
  const explorePages = app?.cms?.filter(
  (page:any) => page.name === "Footer" && page.category === "explore"
);
  const supportPages = app?.cms?.filter(
  (page:any) => page.name === "Footer" && page.category === "support"
);
  const companyPages = app?.cms?.filter(
  (page:any) => page.name === "Footer" && page.category === "company"
);
  const downloadsPages = app?.cms?.filter(
  (page:any) => page.name === "Footer" && page.category === "downloads"
);


  // Define footer sections as arrays
  const footerItems = [
    {
      title: 'Explore',
      links: [...explorePages]
    },
    {
      title: 'Support',
      links:[...supportPages],
    },
    {
      title: 'Company',
      links: [...companyPages],
    },
    {
      title: 'Downloads',
      links:[...downloadsPages],
    },
    // {
    //   title: 'Social Media',
    //   links: [] ['iOS', 'Android', 'Mac', 'Windows', 'Chrome'],
    // },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Top Section */}
      <div className="max-w-[1200px] mx-auto appHorizantalSpacing py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{home_title}</h1>
          </div>
          <div className="text-base text-[#11223399] max-w-md mt-4 md:mt-0 lead-6">
            Unlock extraordinary stays with our expert-curated hotels and exclusive access to the world's finest destinations.
          </div>
        </div>

        {/* Grid Layout for Links */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {footerItems.map((page, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-gray-800 mb-4">{page.title}</h3>
              <ul className="space-y-4">
                {page.links.map((link, i) => (
                 <li key={i}>
  <Link
    href={`/${link.slug_url}`}
    className="text-[#11223399] text-lg hover:text-blue-700 transition-colors duration-200"
  >
   {link.page_name.charAt(0).toUpperCase() + link.page_name.slice(1)}

  </Link>
</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay Connected */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stay Connected</h3>
            <p className="text-[#11223399] mb-4 leading-6">
              Subscribe to get travel tips, exclusive deals, and the latest updates.
            </p>
            <form className="space-y-5">
  <div>
  <input
    type="email"
    placeholder="Enter your email"
    className="w-full px-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent shadow-[0px_2px_12px_rgba(20,20,43,0.08)]"
  />
</div>


              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-4 px-6 rounded-full hover:bg-blue-800 transition-colors duration-200 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-[1200px] mx-auto appHorizantalSpacing py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg text-gray-900 font-normal">
            © 2025 {business_name}. All rights reserved.
          </p>
          <div className="flex items-center  gap-4 space-x-6 mt-4 md:mt-0">
            <div className='flex gap-4 items-center'>


<select className="text-sm text-gray-600 bg-transparent border-none outline-none">
  {app.languages
    .filter((lang:any) => lang.status === "1") // only active languages
    .map((lang:any) => (
      <option key={lang.id} value={lang.name} selected={lang.default === "1"}>
        {lang.name}
      </option>
    ))}
</select>
<select className="text-sm text-gray-600 bg-transparent border-none outline-none">
  {app.currencies
    .filter((c:any) => c.status === "1") // only active currencies
    .map((c:any, i:number) => (
      <option key={i} value={c.name} selected={c.default === "1"}>
       {c.name}
      </option>
    ))}
</select>

            </div>

            <div className="flex space-x-4">
              <a href={social_facebook || "#"} aria-label="Facebook" className="text-blue-900 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.991 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.064 24 12.073z"/>
                </svg>
              </a>
              <a href={social_twitter || "#"} aria-label="Twitter" className="text-blue-900 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.564-2.005.954-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.66 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.219c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A10.01 10.01 0 0024 4.59z"/>
                </svg>
              </a>
              <a href={social_instagram || "#"} aria-label="Instagram" className="text-blue-900 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.06 3.252.148 4.771 1.691 4.919 4.919.048 1.265.059 1.645.059 4.849 0 3.205-.012 3.584-.059 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.048-1.644.06-4.85.06-3.204 0-3.584-.012-4.849-.06-3.227-.149-4.771-1.694-4.919-4.919-.048-1.265-.06-1.644-.06-4.849 0-3.204.013-3.583.06-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.047 1.645-.059 4.849-.059zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.358-.2 6.78-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href={social_linkedin || "#"} aria-label="LinkedIn" className="text-blue-900 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.13 0 2.064.925 2.064 2.063 0 1.139-.935 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href={social_youtube || "#"} aria-label="YouTube" className="text-blue-900 hover:text-blue-700 transition-colors">
               <Icon icon="entypo-social:youtube" width="24" height="22" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;