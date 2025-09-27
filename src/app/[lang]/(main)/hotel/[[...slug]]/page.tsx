import React from 'react'
import { getDictionary } from '@src/get-dictionary'
// import { Icon } from '@iconify/react'
// import { HomeWrapper } from '@components/themes/default'
import TransitionLayout from '@src/utils/pageTransition'
// import HomeWrapper from '@components/themes/default/components/home/homeWrapper/homeWrapper'
import { HotelDetailsMain ,HotelsListingMain} from '@components/themes/default'

export default async function Page({ params }: {
  params: Promise<{ lang: 'en' | 'ar' ,slug: string[]}>
}) {
  const { lang,slug } = await params
  const dict = await getDictionary(lang)

  const isListingPage = isNaN(Number(slug[0])) // true if not a number

  return (
    <TransitionLayout>
      <div className="flex flex-col bg-white dark:bg-gray-900 dark:text-gray-50">
          <HotelDetailsMain  />
      </div>
    </TransitionLayout>
  )
}

export const dynamic = "force-dynamic"