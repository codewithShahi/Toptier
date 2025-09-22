'use client'
import React from 'react'
import { HotelsListing } from '@components/themes/default'
import useHotelSearch from '@hooks/useHotelSearch'

const HotelsListingMain = () => {
  // use your custom hook
  const {   allHotelsData,
 isSearching } = useHotelSearch()

  return (
    <div className="">
      {isSearching ? <div className="fixed inset-0 flex flex-col items-center justify-center w-full h-screen bg-white z-[99999999999]">
          <div className="loader">Loading...</div>
        </div> : <HotelsListing  />}


    </div>
  )
}

export default HotelsListingMain
