'use client'

import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckOutForm from '@/components/Payment/CheckOutForm'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Payment() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    // create the PaymentIntent as soon as this page loads
    fetch('/api/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 58 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret)
        else console.error('Failed to get clientSecret:', data)
      })
      .catch((err) => console.error(err))
  }, [])

  if (!clientSecret) {
    // you could show a spinner here
    return <div>Loading payment details…</div>
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckOutForm />
    </Elements>
  )
}
