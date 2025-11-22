import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// connect to DB
connectDB();

// ✅ Corrected CORS config
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API test route
app.get('/', (req, res) => res.send("API working fine"));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
