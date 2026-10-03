"use client";

import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, Plus, X } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { getMessages, createMessage, markAsRead, getUnreadCount } from "@/lib/storage/messages";
import { getUsers } from "@/lib/storage/users";
import { generateId } from "@/lib/utils/id";

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function initials(name) {
  return (name || "?").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages,     setMessages]     = useState([]);
  const [users,        setUsers]        = useState([]);
  const [selected,     setSelected]     = useState(null); // selected conversation partner userId
  const [reply,        setReply]        = useState("");
  const [showNew,      setShowNew]      = useState(false);
  const [newTo,        setNewTo]        = useState("");
  const [newSubject,   setNewSubject]   = useState("");
  const [newContent,   setNewContent]   = useState("");
  const [toast,        setToast]        = useState("");
  const bottomRef = useRef(null);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 2500); }

  function load() {
    setMessages(getMessages());
    setUsers(getUsers());
  }
  useEffect(load, [user]);

  // Get unique conversations for this user
  const myId = user?.id;
  const conversations = [];
  const seen = new Set();
  [...messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).forEach((m) => {
    const otherId = m.senderId === myId ? m.recipientId : m.recipientId === myId ? m.senderId : null;
    if (!otherId) return;
    if (seen.has(otherId)) return;
    seen.add(otherId);
    conversations.push({ userId: otherId, lastMessage: m });
  });

  // Messages in the selected conversation
  const thread = selected ? messages.filter((m) =>
    (m.senderId === myId && m.recipientId === selected) ||
    (m.senderId === selected && m.recipientId === myId)
  ).sort((a, b) => a.createdAt.localeCompare(b.createdAt)) : [];

  // Mark as read when opening conversation
  useEffect(() => {
    if (!selected) return;
    messages.filter((m) => m.senderId === selected && m.recipientId === myId && !m.read)
      .forEach((m) => markAsRead(m.id));
    load();
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected]);

  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

  function handleSend() {
    if (!reply.trim() || !selected) return;
    const selectedThread = thread;
    const subject = selectedThread[0]?.subject || "Conversation";
    createMessage({ senderId: myId, recipientId: selected, subject, content: reply.trim() });
    setReply(""); load();
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  function handleNewMessage() {
    if (!newTo || !newContent.trim()) return;
    createMessage({ senderId: myId, recipientId: newTo, subject: newSubject || "New Message", content: newContent.trim() });
    setShowNew(false); setNewTo(""); setNewSubject(""); setNewContent("");
    setSelected(newTo); load();
    showToast("Message sent.");
  }

  const availableRecipients = users.filter((u) => u.id !== myId && u.role !== "student");

  return (
    <div className="messages-layout">
      {/* Sidebar */}
      <div className="messages-sidebar">
        <div className="messages-sidebar__header">
          <h1 className="messages-sidebar__title">Messages</h1>
          <button className="mgmt-action-btn" onClick={() => setShowNew(true)} aria-label="New message"><Plus size={16} /></button>
        </div>
        {conversations.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>No conversations yet.</div>
        ) : (
          <ul className="messages-conv-list">
            {conversations.map(({ userId, lastMessage }) => {
              const other  = userMap[userId];
              const unread = messages.filter((m) => m.senderId === userId && m.recipientId === myId && !m.read).length;
              return (
                <li key={userId}>
                  <button
                    className={`messages-conv-item${selected === userId ? " messages-conv-item--active" : ""}`}
                    onClick={() => setSelected(userId)}
                    aria-label={`Conversation with ${other?.name || userId}`}
                  >
                    <div className="messages-conv-avatar" aria-hidden="true">{initials(other?.name)}</div>
                    <div className="messages-conv-body">
                      <div className="messages-conv-top">
                        <span className="messages-conv-name">{other?.name || userId}</span>
                        <span className="messages-conv-time">{timeAgo(lastMessage.createdAt)}</span>
                      </div>
                      <div className="messages-conv-preview">
                        <span>{lastMessage.content?.slice(0, 50)}…</span>
                        {unread > 0 && <span className="messages-unread-badge">{unread}</span>}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Chat area */}
      <div className="messages-chat">
        {!selected ? (
          <div className="messages-chat__empty">
            <MessageSquare size={40} style={{ opacity: 0.25 }} aria-hidden="true" />
            <p>Select a conversation or start a new one</p>
          </div>
        ) : (
          <>
            <div className="messages-chat__header">
              <div className="messages-conv-avatar" aria-hidden="true">{initials(userMap[selected]?.name)}</div>
              <div>
                <p className="messages-chat__name">{userMap[selected]?.name || selected}</p>
                <p className="messages-chat__role">{userMap[selected]?.role}</p>
              </div>
            </div>
            <div className="messages-chat__body">
              {thread.map((m) => {
                const isMine = m.senderId === myId;
                return (
                  <div key={m.id} className={`messages-bubble-wrap${isMine ? " messages-bubble-wrap--mine" : ""}`}>
                    <div className={`messages-bubble${isMine ? " messages-bubble--mine" : ""}`}>
                      <p className="messages-bubble__content">{m.content}</p>
                      <span className="messages-bubble__time">{timeAgo(m.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
            <div className="messages-chat__input">
              <textarea
                className="messages-input"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a message…"
                rows={2}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                aria-label="Message input"
              />
              <button className="messages-send-btn" onClick={handleSend} disabled={!reply.trim()} aria-label="Send message">
                <Send size={18} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* New message modal */}
      {showNew && (
        <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
          <div className="mgmt-modal">
            <div className="mgmt-modal__header">
              <h2 className="mgmt-modal__title">New Message</h2>
              <button className="mgmt-modal__close" onClick={() => setShowNew(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="mgmt-modal__body">
              <div className="mgmt-field">
                <label className="mgmt-label">To</label>
                <select className="mgmt-input" value={newTo} onChange={(e) => setNewTo(e.target.value)}>
                  <option value="">Select recipient</option>
                  {availableRecipients.map((u) => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                </select>
              </div>
              <div className="mgmt-field">
                <label className="mgmt-label">Subject</label>
                <input className="mgmt-input" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="e.g. Student Progress Update" />
              </div>
              <div className="mgmt-field">
                <label className="mgmt-label">Message</label>
                <textarea className="mgmt-input mgmt-textarea" rows={4} value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Type your message…" autoFocus />
              </div>
            </div>
            <div className="mgmt-modal__footer">
              <button className="mgmt-btn mgmt-btn--ghost" onClick={() => setShowNew(false)}>Cancel</button>
              <button className="mgmt-btn mgmt-btn--primary" onClick={handleNewMessage} disabled={!newTo || !newContent.trim()}>Send Message</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
    </div>
  );
}
