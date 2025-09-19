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
        // hotelsData={hotelsData}      // <-- list of hotels
        // isLoading={isSearching}    // <-- pass loading state
        // title="Search Results"
      />
    </div>
  )
}

export default HotelsListingMain
