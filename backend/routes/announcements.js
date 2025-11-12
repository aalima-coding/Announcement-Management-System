
import express from "express";
import mongoose from "mongoose";
import Announcement from "../models/Announcement.js";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  try {
    const list = await Announcement.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error("GET /api/announcements error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET single
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });
  try {
    const doc = await Announcement.findById(id);
    if (!doc) return res.status(404).json({ error: "Announcement not found" });
    res.json(doc);
  } catch (err) {
    console.error("GET /api/announcements/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Title and description required" });

    const newDoc = new Announcement({ title, description });
    const saved = await newDoc.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST /api/announcements error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const { title, description } = req.body;
    const updated = await Announcement.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Announcement not found" });
    res.json(updated);
  } catch (err) {
    console.error("PUT /api/announcements/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const removed = await Announcement.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: "Announcement not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/announcements/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
