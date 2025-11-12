import React, { useEffect, useState } from "react";
import AnnouncementTable from "./components/AnnouncementTable";
import AnnouncementModal from "./components/AnnouncementModal";
import "./App.css";


import {
  fetchAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} from "./api";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnnouncements();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(payload) {
    try {
      if (editing && (editing._id || editing.id)) {
        await updateAnnouncement(editing._id || editing.id, payload);
      } else {
        await createAnnouncement(payload);
      }
      setModalOpen(false);
      setEditing(null);
      await load();
    } catch (err) {
      alert("Create/Update failed: " + (err.message || err));
    }
  }

  async function handleDelete(a) {
    if (!confirm("Delete this announcement?")) return;
    try {
      await deleteAnnouncement(a._id || a.id);
      await load();
    } catch (err) {
      alert("Delete failed: " + (err.message || err));
    }
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(a) {
    setEditing(a);
    setModalOpen(true);
  }

  return (
    <div>
      <div className="app-header">
        <div className="header-inner">
          <div>
            <h1 className="app-title">Announcements</h1>
            
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={openCreate}>Add announcement</button>
            <button className="btn btn-ghost" onClick={load}>Refresh</button>
          </div>
        </div>
      </div>

      <div className="app-main">
        <div className="panel">
      
          <div className="panel-sub">Total: {items.length}</div>

          {error && <div style={{ color: "red" }}>Error: {error}</div>}

          {loading ? (
            <div style={{ padding: 30 }}>Loading...</div>
          ) : (
            <AnnouncementTable items={items} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      <AnnouncementModal
        open={modalOpen}
        initial={editing}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
      />
    </div>
  );
}
