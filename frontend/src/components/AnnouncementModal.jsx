import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TYPES = ["General", "Policy Update", "Notification", "Other"];

export default function AnnouncementModal({ open, onClose, onSave, initial }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setType(initial.type || TYPES[0]);
      setDescription(initial.description || "");
    } else {
      setTitle("");
      setType(TYPES[0]);
      setDescription("");
    }
  }, [initial, open]);

  if (!open) return null;

  function handleSave() {
    if (!title.trim() || !description.trim()) {
      alert("Title and description required");
      return;
    }
    onSave({
      ...initial,
      title: title.trim(),
      type,
      description
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card" role="dialog" aria-modal="true">
        <h3>Create Announcement</h3>

        <label>Title</label>
        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement title" />

        <label>Type</label>
        <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <label>Description</label>
        <ReactQuill theme="snow" value={description} onChange={setDescription} />

        <div style={{ marginTop: 14, textAlign: "right" }}>
          <button className="action-btn" onClick={onClose} style={{ marginRight: 8 }}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Create</button>
        </div>
      </div>
    </div>
  );
}
