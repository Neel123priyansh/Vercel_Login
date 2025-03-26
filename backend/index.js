import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from './user.js';
import dotenv from "dotenv";

dotenv.config({ path: ".env" });  // ✅ Correct dotenv import

// ✅ CORS Configuration applied at the top
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://vercel-login-backend.vercel.app/register",
    "https://postman.com"
  ],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(json());
app.use(cors(corsOptions));

// ✅ Use MongoDB connection from `.env`
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/versel";
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// ✅ Route to register a user
app.post('/register', async (req, res) => {
  try {
    const { program, name, phone, email, city } = req.body;
    console.log("Received data:", { program, name, phone, email, city });

    const userCreated = await User.create({ program, name, phone, email, city });
    console.log("User created:", userCreated);

    res.status(201).json({
      msg: "User registered successfully!",
      userId: userCreated._id.toString()
    });
  } catch (error) {
    console.error("Error in register route:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// ✅ Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Route to test the server
app.get('/', (req, res) => {
  res.status(200).send({
    activeStatus: true,
    error: false,
    message: "Server is working!"
  });
});

// ✅ Global CORS Middleware (Apply at the top instead of here)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://vercel-login-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Port Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
