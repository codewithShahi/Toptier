'use client'
import React from 'react'
import { HotelsListing } from '@components/themes/default'
import useHotelSearch from '@hooks/useHotelSearchFilters'

const HotelsListingMain = () => {
  // use your custom hook
  const { hotelsData, isSearching } = useHotelSearch()

  return (
    <div className="">
      <HotelsListing
       
      />
    </div>
  )
}

export default HotelsListingMain
