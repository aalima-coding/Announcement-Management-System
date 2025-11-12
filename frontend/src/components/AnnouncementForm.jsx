
import React, { useState, useEffect } from "react";

export default function AnnouncementForm({ onCreate, editing, onUpdate, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setDescription(editing.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return alert("Title and description required");
    const payload = { title: title.trim(), description: description.trim() };
    if (editing) {
      onUpdate(editing._id, payload);
    } else {
      onCreate(payload);
    }
  };

  return (
    <form onSubmit={submit} style={{ background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
      <h3>{editing ? "Edit announcement" : "Create announcement"}</h3>

      <label style={{ display: "block", marginTop: 10 }}>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement title" style={{ width: "100%", padding: 8 }} />

      <label style={{ display: "block", marginTop: 12 }}>
        Description <small style={{ color: "#777" }}>(rich HTML allowed: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;)</small>
      </label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add description (you can include small HTML)" rows={6} style={{ width: "100%", padding: 8 }} />

      <div style={{ marginTop: 12 }}>
        <button type="submit" style={{ background: "#0a66ff", color: "#fff", padding: "8px 14px", borderRadius: 6, border: "none" }}>
          {editing ? "Update" : "Create announcement"}
        </button>
        {editing ? (
          <button type="button" onClick={onCancel} style={{ marginLeft: 8, padding: "8px 12px" }}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
