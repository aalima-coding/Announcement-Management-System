
import React from "react";

export default function AnnouncementItem({ item, onEdit, onDelete }) {
  return (
    <div style={{ background: "#fff", padding: 18, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.04)", marginBottom: 12 }}>
      <h4 style={{ margin: 0 }}>{item.title}</h4>
      <div style={{ color: "#666", fontSize: 13, marginTop: 8 }} dangerouslySetInnerHTML={{ __html: item.description }} />
      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(item)} style={{ padding: "6px 10px" }}>Edit</button>
        <button onClick={() => onDelete(item._id)} style={{ padding: "6px 10px", background: "#f44336", color: "#fff", border: "none", borderRadius: 6 }}>
          Delete
        </button>
      </div>
      <div style={{ marginTop: 8, color: "#999", fontSize: 12 }}>{new Date(item.createdAt).toLocaleString()}</div>
    </div>
  );
}
