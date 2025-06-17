import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { getOrderDetails } from "../actions/orderActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import PaymentForm from "../components/PaymentForm"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
console.log("Stripe Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const PaymentFormScreen = () => {
  const { id: orderId } = useParams()
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Elements stripe={stripePromise}>
          <PaymentForm amount={order.totalPrice} orderId={order._id} />
        </Elements>
      )}
    </>
  )
}
export default PaymentFormScreen
