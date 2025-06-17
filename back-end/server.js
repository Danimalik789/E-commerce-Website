import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import path from "path"
import colors from "colors"
import cors from "cors"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config()

connectDB()

// Initialize App
const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://e-commerce-website-frontend-y562.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
)

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// For accepting json data in the body // Consider it as a middleware or a body parser
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Api is running.....")
})

// Use Routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/uploads", uploadRoutes)
app.use("/api/payments", paymentRoutes)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
