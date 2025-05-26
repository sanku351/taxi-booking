'use client'
import React, { useContext, useState } from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import Cars from './Cars'
import Cards from './Cards'
import { useRouter } from 'next/navigation'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'
import { useUser } from '@clerk/nextjs'

export default function Booking() {
  const screenHeight = typeof window !== 'undefined'
    ? window.innerHeight * 0.72
    : 500

  const { carAmount } = useContext(SelectedCarAmountContext)
  const router = useRouter()
  const { isSignedIn } = useUser()
  const [showDialog, setShowDialog] = useState(false)

  const isDisabled = !carAmount

  const handleBooking = () => {
    if (!isSignedIn) {
      setShowDialog(true)
      return
    }
    router.push('/payment')
  }

  return (
    <div className='p-5'>
      <h2 className='text-[20px] font-semibold'>Booking</h2>
      <div
        className='border-[1px] p-5 rounded-md'
        style={{ height: screenHeight }}
      >
        <AutocompleteAddress />
        <Cars />
        <Cards />

        <button
          className={`w-full p-1 rounded-md mt-4 transition-colors duration-300 ${
            isDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
          disabled={isDisabled}
          onClick={handleBooking}
        >
          Book
        </button>
      </div>

      {showDialog && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-xs text-center'>
            <h3 className='text-lg font-semibold mb-2'>Please Sign In</h3>
            <p className='text-sm mb-4'>
              You need to be signed in to complete a booking.
            </p>
            <button
              className='w-full mb-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700'
              onClick={() => router.push('/sign-in')}
            >
              Go to Sign In
            </button>
            <button
              className='text-sm text-gray-600 underline'
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
