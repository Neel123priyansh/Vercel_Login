import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from './user.js';

// CORS Configuration
const corsOptions = {
  origin:[
     "http://localhost:5173",
     "https://vercel-login-frontend.vercel.app",
  ],

  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

const app = express();
app.use(json());
app.use(cors(corsOptions));

const MONGO_URI = "mongodb://localhost:27017/versel";
mongoose.connect('mongodb+srv://SRM-Bot:0cvOFJu52YPOyCws@srmdatabase.azx6q.mongodb.net/?retryWrites=true&w=majority&appName=SRMDataBase')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));


app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const register = async (req, res) => {
  try {
      const { program, name, phone, email, city } = req.body;
      console.log("Received data: ", { program, name, phone, email, city });
       
      const userCreated = await User.create({program, name, phone, email, city})
      console.log("User created: ", userCreated);

      res.status(200).json({ msg: "User registered successfullyy", userId: userCreated._id.toString(), }); 
  }   catch (error) {
      console.error("Error in register function:", error.message);
      res.status(500).json({ msg: "Internal Server Error" });
  }   
};

// Get All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/reg", (req, res) => {
  register(req, res);
  console.log("Hello, it's working")
});

app.listen(3000, () => console.log("Server running on port 3000"));
