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
         <HotelsListing  />
    </div>
  )
}

export default HotelsListingMain
