
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import announcementsRouter from "./routes/announcements.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/announcements", announcementsRouter);


app.get("/", (req, res) => res.send("Backend running successfully!"));


const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error(" MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(" MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err.message || err);
    
  });
