import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import deckRoutes from "./routes/deck.route.js";
import cardRoutes from "./routes/card.route.js";
import { protectRoute } from "./middleware/auth.middleware.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/deck", protectRoute, deckRoutes);
app.use("/api/cards", protectRoute, cardRoutes);


app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
    connectDB();
})