'use client'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

export default function CheckOutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      console.warn('Stripe.js not yet loaded')
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: 'http://localhost:3000/' },
    })

    if (error) {
      console.error('Payment error:', error.message)
    } else {
      console.log('Payment successful! Redirecting…')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center py-1'>
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements} className='bg-yellow-500 rounded-lg w-full py-2'>
        Pay
      </button>
    </form>
    </div>
  )
}
