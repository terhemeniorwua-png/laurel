"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { getNotificationsForUser, markAsRead, markAllAsRead, getUnreadCount } from "@/lib/storage/notifications";

const TYPE_COLORS = {
  assignment:   "#1d4ed8",
  attendance:   "#1a5e3a",
  result:       "#7c3aed",
  payment:      "#b45309",
  announcement: "#532306",
  event:        "#0f766e",
  message:      "#dc2626",
  admission:    "#7c3aed",
  system:       "#78716C",
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifs, setNotifs] = useState([]);
  const [filter, setFilter] = useState("all");

  function load() {
    setNotifs(getNotificationsForUser(user?.id));
  }
  useEffect(load, [user]);

  function handleMarkRead(id) { markAsRead(id); load(); }
  function handleMarkAll()   { markAllAsRead(user?.id); load(); }

  const filtered = filter === "unread" ? notifs.filter((n) => !n.read) : notifs;
  const unread   = notifs.filter((n) => !n.read).length;

  return (
    <div className="mgmt-page">
      <div className="mgmt-page__header">
        <div>
          <h1 className="mgmt-page__title">Notifications</h1>
          <p className="mgmt-page__sub">{unread} unread · {notifs.length} total</p>
        </div>
        {unread > 0 && (
          <button className="mgmt-btn mgmt-btn--ghost" onClick={handleMarkAll}>
            <CheckCheck size={16} /> Mark All Read
          </button>
        )}
      </div>

      <div className="mgmt-filters">
        {["all","unread"].map((f) => (
          <button key={f} className={`att-status-btn${filter === f ? " att-status-btn--active" : ""}`} style={{ "--att-color": "#532306" }} onClick={() => setFilter(f)}>
            {f === "all" ? "All" : `Unread (${unread})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mgmt-empty"><Bell size={36} style={{ opacity: 0.3 }} /><p className="mgmt-empty__msg">{filter === "unread" ? "No unread notifications." : "No notifications yet."}</p></div>
      ) : (
        <div className="notif-list">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={`notif-item${n.read ? "" : " notif-item--unread"}`}
              onClick={() => !n.read && handleMarkRead(n.id)}
              role={!n.read ? "button" : undefined}
              tabIndex={!n.read ? 0 : undefined}
              onKeyDown={(e) => e.key === "Enter" && !n.read && handleMarkRead(n.id)}
              aria-label={n.read ? undefined : `Mark notification as read: ${n.title}`}
            >
              <div className="notif-item__dot-wrap">
                {!n.read && <span className="notif-item__dot" aria-label="Unread" />}
              </div>
              <div className="notif-item__icon" style={{ "--nt-color": TYPE_COLORS[n.type] || "#532306" }} aria-hidden="true">
                <Bell size={16} />
              </div>
              <div className="notif-item__body">
                <p className="notif-item__title">{n.title}</p>
                <p className="notif-item__msg">{n.message}</p>
                <div className="notif-item__meta">
                  <span className="mgmt-badge" style={{ background: `${TYPE_COLORS[n.type] || "#532306"}15`, color: TYPE_COLORS[n.type] || "#532306", fontSize: "0.7rem" }}>{n.type}</span>
                  <span className="notif-item__time">{timeAgo(n.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
