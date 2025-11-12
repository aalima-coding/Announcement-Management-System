
import React from "react";
import AnnouncementItem from "./AnnouncementItem";

export default function AnnouncementList({ items = [], onEdit, onDelete }) {
  if (!items.length) {
    return (
      <div style={{ background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
        <h3>Announcements</h3>
        <p style={{ color: "#666" }}>No announcements yet. Create one above.</p>
      </div>
    );
  }
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Announcements</h3>
      <p style={{ color: "#666" }}>Total: {items.length}</p>
      {items.map((i) => (
        <AnnouncementItem key={i._id} item={i} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
