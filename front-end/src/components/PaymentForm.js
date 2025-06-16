import React, { useEffect, useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import axios from "axios"

const PaymentForm = ({ amount, orderId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    axios
      .post("/api/payments/make-payment", { amount: amount * 100 }) // amount in cents
      .then((res) => setClientSecret(res.data.clientSecret))
  }, [amount])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      alert("Payment Successful!")
      // Dispatch order update, mark as paid here using Redux
    } else {
      alert(result.error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type='submit' disabled={!stripe}>
        Pay Now
      </button>
    </form>
  )
}

export default PaymentForm
