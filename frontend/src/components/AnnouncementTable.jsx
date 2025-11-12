import React from "react";

export default function AnnouncementTable({ items, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="ann-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th style={{ width: 120 }}>Type</th>
            <th style={{ width: 180 }}>Created</th>
            <th style={{ width: 160 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="4" style={{ padding: 30, color: "#6b7280" }}>
                No announcements yet. Create one above.
              </td>
            </tr>
          )}
          {items.map((a) => (
            <tr key={a._id || a.id}>
              <td>
                <div className="ann-title">{a.title}</div>
                <div className="ann-desc" dangerouslySetInnerHTML={{ __html: a.description || "" }} />
              </td>
              <td>{a.type || "-"}</td>
              <td className="ann-date">
                {a.createdAt ? new Date(a.createdAt).toLocaleString() : "-"}
              </td>
              <td>
                <button className="action-btn edit" onClick={() => onEdit(a)}>Edit</button>
                <button className="action-btn" onClick={() => onDelete(a)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
