import express from "express"
const router = express.Router()
import createPaymentIntent from "../controllers/paymentControllers.js"

router.get("/test", (req, res) => {
  res.json({ message: "Payment routes are working!" })
})
router.route("/make-payment").post(createPaymentIntent)
// The above route is used to create a payment intent with Stripe.
// It expects a POST request with the amount in the request body.

export default router
// This route will handle the payment processing logic using Stripe.
// It exports the router so it can be used in the main server file.
