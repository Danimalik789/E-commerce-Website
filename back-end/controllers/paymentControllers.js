import Stripe from "stripe"
import asyncHandler from "express-async-handler"
import dotenv from "dotenv"

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// @desc    Create a Stripe payment intent

const createPaymentIntent = asyncHandler(async (req, res) => {
  console.log("Payment intent request received:", req.body)
  const { amount } = req.body // Amount should be in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
})

export default createPaymentIntent
