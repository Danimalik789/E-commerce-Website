import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import axios from "../config/axios"
import { useSelector } from "react-redux"

const PaymentForm = ({ amount, orderId }) => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState("")

  const userInfo = useSelector((state) => state.userLogin.userInfo)

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  useEffect(() => {
    console.log("🧾 Order ID received by PaymentForm:", orderId)
  }, [orderId])
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/payments/make-payment`,
        {
          amount: amount * 100,
        },
        config
      ) // amount in cents
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
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/pay`,
        {
          paymentResult: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            update_time: new Date().toISOString(),
          },
        },
        config
      )
      navigate(`/order/${orderId}`) // Redirect to order details
      alert("Payment Successful!")
      // Dispatch order update, mark as paid here using Redux
    } else {
      alert(result.error.message)
    }
  }

  return (
    <div
      className='container mt-4'
      style={{
        maxWidth: "500px",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 className='mb-4 text-center'>Complete Your Payment</h3>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
        <button
          type='submit'
          disabled={!stripe}
          className='btn btn-primary w-100'
        >
          Pay Now
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
