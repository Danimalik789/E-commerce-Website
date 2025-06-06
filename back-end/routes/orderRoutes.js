import express from "express"
const router = express.Router()
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from "../controllers/orderControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderByID)
router.route("/:id/pay").put(protect, updateOrderToPaid)

export default router
