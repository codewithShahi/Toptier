import React from 'react'
import TransitionLayout from '@src/utils/pageTransition'
import { HotelInvoice } from '@components/themes/default'
import { hotel_invoice } from '@src/actions'
import { Icon } from '@iconify/react'

interface InvoicePageProps {
  params: {
    lang: 'en' | 'ar' | 'ch' | 'fr' | 'ge'
    invoiceId: string
  }
}

export default async function Page({ params }: InvoicePageProps) {
  const { lang, invoiceId } = params

  // ✅ Data fetch as usual
  const response = await hotel_invoice(invoiceId)
  const result = response?.response

  return (
    <TransitionLayout>
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-50 min-h-screen items-center justify-center">
        {response?.status ? (
          // ✅ If invoice found
          <HotelInvoice invoiceDetails={result} />
        ) : (
          // ❌ If not found / error
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Icon
              icon="mdi:alert-circle-outline"
              className="text-red-500 w-14 h-14"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Invoice Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Please check your invoice ID and try again.
            </p>
          </div>
        )}
      </div>
    </TransitionLayout>
  )
}

export const dynamic = 'force-dynamic'
