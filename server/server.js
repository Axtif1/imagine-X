// import express from "express"
// import dotenv from "dotenv"
// import colors from "colors"
// import connectDB from "./config/dbconfig.js"
// import path from "path";
// import { fileURLToPath } from "url";

// //Local Imports
// import authRoutes from "./routes/authRoutes.js" 
// import followRoutes from "./routes/followRoutes.js"
// import profileRoutes from "./routes/profileRoutes.js"
// import errorHandler from "./middleware/errorhandler.js"
// import adminRoutes from "./routes/adminRoutes.js"
// import postRoutes from "./routes/postRoutes.js"
// import savedPostRoutes from "./routes/savedPostRoutes.js"

// dotenv.config()

// const PORT = process.env.PORT || 5000

// const app = express()


// //DB Connection
// connectDB()

// //Body Parser
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))  



// app.use(express.static("client/build"));
// // console.log(process.env.MONGO_URI)

// // Default Route
// // app.get("/" , (req , res) => {
// //     res.json({
// //         message : "WELCOME TO IMAGINEX API"
// //     })
// // })


// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });


// // Auth Routes
// app.use("/api/auth" , authRoutes)


// //Follow Routes
// app.use("/api/user" , followRoutes)

// //Profile Routes
// app.use("/api/profile" , profileRoutes)

// //Admin Routes
// app.use("/api/admin" , adminRoutes)

// //Post Routes
// app.use("/api/posts" , postRoutes)

// //Save Post Routes
// app.use("/api/saved-posts" , savedPostRoutes)


// //Error Handler 
// app.use(errorHandler)

// app.listen(PORT , () => {
//     console.log(`SERVER IS RUNNING AT : ${PORT}`)
// })

import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/dbconfig.js"
import path from "path"
import { fileURLToPath } from "url"

// Routes
import authRoutes from "./routes/authRoutes.js" 
import followRoutes from "./routes/followRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import errorHandler from "./middleware/errorhandler.js"
import adminRoutes from "./routes/adminRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import savedPostRoutes from "./routes/savedPostRoutes.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// DB Connection
connectDB()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// API routes
app.use("/api/auth", authRoutes)
app.use("/api/user", followRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/saved-posts", savedPostRoutes)

// Serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")))

// Error handler FIRST
app.use(errorHandler)

// Fallback route LAST
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"))
})

// Start server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT : ${PORT}`)
})