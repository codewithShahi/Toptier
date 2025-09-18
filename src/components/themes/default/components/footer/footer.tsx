'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useAppSelector } from '@lib/redux/store'
import Alert from '@src/components/core/alert'
import LanguageDropdown from './languageDropdown'
import CurrencyDropdown from './currenciesDropDown'

const Footer = () => {
  const app = useAppSelector((state) => state.appData?.data)
  const {
    social_facebook,
    social_instagram,
    social_linkedin,
    social_twitter,
    social_youtube,
    business_name,
    home_title,
  } = app.app
const {languages,currencies }=useAppSelector((state) => state.appData?.data)
  // states
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; msg: string } | null>(null)

  // dummy API call
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setAlert(null)

    try {
      // send dummy payload
      const payload = {
        name: 'Dummy Name',
        email,
      }

      // simulate API
      await new Promise((res) => setTimeout(res, 1500))

      // success
      setAlert({ type: 'success', msg: 'You have successfully subscribed!' })
      setEmail('')
    } catch (err) {
      setAlert({ type: 'danger', msg: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const explorePages = app?.cms?.filter((page: any) => page.name === 'Footer' && page.category === 'explore')
  const supportPages = app?.cms?.filter((page: any) => page.name === 'Footer' && page.category === 'support')
  const companyPages = app?.cms?.filter((page: any) => page.name === 'Footer' && page.category === 'company')
  const downloadsPages = app?.cms?.filter((page: any) => page.name === 'Footer' && page.category === 'downloads')

  const footerItems = [
    { title: 'Explore', links: [...explorePages] },
    { title: 'Support', links: [...supportPages] },
    { title: 'Company', links: [...companyPages] },
    { title: 'Downloads', links: [...downloadsPages] },
  ]

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto appHorizantalSpacing py-12 lg:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{home_title}</h1>
          </div>
          <div className="text-base text-[#11223399] max-w-md lg:mt-4 md:mt-0 lead-6">
            Unlock extraordinary stays with our expert-curated hotels and exclusive access to the world's finest
            destinations.
          </div>
        </div>

        {/* Grid Layout for Links */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {footerItems.map((page, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-gray-800 mb-4">{page.title}</h3>
              <ul className="space-y-4">
                {page.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={`/${link.slug_url}`}
                      className="text-[#11223399] text-base hover:text-blue-700 transition-colors duration-200"
                    >
                      {link.page_name.charAt(0).toUpperCase() + link.page_name.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay Connected */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stay Connected</h3>
            <p className="text-[#11223399] mb-6 leading-6 max-w-md">
              Subscribe to get travel tips, exclusive deals, and the latest updates.
            </p>

            {/* Alert */}
            {alert && (
              <div className="mb-4">
                <Alert type={alert.type} closable showIcon>
                  {alert.msg}
                </Alert>
              </div>
            )}

            <form onSubmit={handleSubscribe} className="flex flex-col items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 w-full px-5 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent shadow-[0px_2px_12px_rgba(20,20,43,0.08)]"
              />
              <div className="w-full flex justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-900 text-white w-[119px] h-[54px] pl-6 rounded-full cursor-pointer hover:bg-gray-800 transition-colors duration-200 font-medium whitespace-nowrap flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Icon icon="eos-icons:loading" className="animate-spin" width="20" height="20" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     {/* <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6"> */}
  <div className="max-w-[1200px] mx-auto py-6 border-t border-gray-200 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
    {/* Copyright */}
    <p className="text-base font-medium text-gray-800 dark:text-gray-400">
      © 2025  {home_title.toUpperCase()} All rights reserved.
    </p>

    {/* Language & Currency Dropdowns */}
    <div className='flex items-center gap-5'>
   <div className="flex items-center gap-5">
  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">

  {/* Language Select with Custom Arrow */}
  <div className="relative w-19"> {/* 👈 Fixed width for alignment */}
    {/* <select
      id="language-select"
      className="w-full bg-transparent border-none outline-none cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors appearance-none pr-2 text-leftnp"
      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
    >
      {languages
        .filter((lang: any) => lang.status === "1")
        .map((lang: any) => (
          <option key={lang.id} value={lang.language_code}>
            {lang.name}
          </option>
        ))}
    </select> */}
    <LanguageDropdown/>
    {/* Custom Dropdown Arrow */}

  </div>

  {/* Currency Select with Custom Arrow */}
  <div className="relative w-15"> {/* 👈 Fixed width for alignment (USD, EUR, JPY are short) */}
  <CurrencyDropdown/>
  </div>

</div>

  {/* Social Icons */}
  <div className="flex space-x-5">
    {/* ... your social icons here ... */}
  </div>
</div>
    {/* Social Icons */}


<div className="flex space-x-5">
  {/* Facebook */}
  <a
    target="_blank"
    href={social_facebook}
    aria-label="Follow us on Facebook"
    className="text-blue-900 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
  >
    <Icon icon="mdi:facebook" width="24" height="24" />
  </a>

  {/* Twitter */}
  <a
    href={social_twitter}
      target="_blank"
    aria-label="Follow us on Twitter"
    className="text-blue-900 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
  >
    <Icon icon="mdi:twitter" width="24" height="24" />
  </a>

  {/* Instagram */}
  <a
    href={social_instagram}
      target="_blank"
    aria-label="Follow us on Instagram"
    className="text-blue-900 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
  >
    <Icon icon="mdi:instagram" width="24" height="24" />
  </a>

  {/* LinkedIn */}
  <a
    href={social_linkedin}
      target="_blank"
    aria-label="Follow us on LinkedIn"
    className="text-blue-900 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
  >
    <Icon icon="mdi:linkedin" width="24" height="24" />
  </a>

  {/* YouTube */}
  <a
    href={social_youtube}
      target="_blank"
    aria-label="Follow us on YouTube"
    className="text-blue-900 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
  >
    <Icon icon="mdi:youtube" width="24" height="24" />
  </a>
</div>
    </div>

  </div>
{/* </footer> */}
    </footer>
  )
}

export default Footer
