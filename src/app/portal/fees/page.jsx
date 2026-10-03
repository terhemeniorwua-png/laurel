"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, X } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";
import { getFees, createFee, updateFee } from "@/lib/storage/fees";
import { getPayments, createPayment } from "@/lib/storage/payments";
import { getStudents } from "@/lib/storage/students";
import { getParents } from "@/lib/storage/parents";

const FEE_TYPES = ["Tuition", "Books", "Uniform", "Transport", "Activities", "Other"];
const METHODS   = ["Cash", "Bank Transfer", "Online", "Card"];

function statusColor(s) { return { paid: "#15803d", partial: "#b45309", pending: "#78716C", overdue: "#dc2626" }[s] || "#78716C"; }

function PaymentModal({ fee, student, onClose, onSave }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Bank Transfer");
  const [ref,    setRef]    = useState(`LCA-PAY-${Date.now().toString().slice(-5)}`);
  const balance = fee.amount - (fee.amountPaid || 0);

  function handleSave() {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    onSave({ feeId: fee.id, studentId: fee.studentId, amount: amt, method, reference: ref, paymentDate: new Date().toISOString(), status: "successful" });
  }

  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
      <div className="mgmt-modal mgmt-modal--sm">
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">Record Payment</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            <strong>{student?.firstName} {student?.lastName}</strong> · {fee.feeType} · Balance: <strong>₦{balance.toLocaleString()}</strong>
          </p>
          <div className="mgmt-field">
            <label className="mgmt-label">Amount (₦)</label>
            <input type="number" className="mgmt-input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`Max ₦${balance.toLocaleString()}`} max={balance} min={1} autoFocus />
          </div>
          <div className="mgmt-field">
            <label className="mgmt-label">Payment Method</label>
            <select className="mgmt-input" value={method} onChange={(e) => setMethod(e.target.value)}>
              {METHODS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="mgmt-field">
            <label className="mgmt-label">Reference</label>
            <input className="mgmt-input" value={ref} onChange={(e) => setRef(e.target.value)} />
          </div>
        </div>
        <div className="mgmt-modal__footer">
          <button className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="mgmt-btn mgmt-btn--primary" onClick={handleSave}>Record Payment</button>
        </div>
      </div>
    </div>
  );
}

function AddFeeModal({ students, onClose, onSave }) {
  const [form, setForm] = useState({ studentId: "", feeType: "Tuition", amount: "", session: "2026/2027", term: "First Term", dueDate: "", status: "pending" });
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  return (
    <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
      <div className="mgmt-modal">
        <div className="mgmt-modal__header">
          <h2 className="mgmt-modal__title">Add Fee</h2>
          <button className="mgmt-modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mgmt-modal__body">
          <div className="mgmt-field">
            <label className="mgmt-label">Student</label>
            <select className="mgmt-input" value={form.studentId} onChange={set("studentId")}>
              <option value="">Select student</option>
              {students.map((s) => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
            </select>
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Fee Type</label>
              <select className="mgmt-input" value={form.feeType} onChange={set("feeType")}>
                {FEE_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Amount (₦)</label>
              <input type="number" className="mgmt-input" value={form.amount} onChange={set("amount")} placeholder="e.g. 85000" />
            </div>
          </div>
          <div className="mgmt-form-row">
            <div className="mgmt-field">
              <label className="mgmt-label">Term</label>
              <select className="mgmt-input" value={form.term} onChange={set("term")}>
                {["First Term","Second Term","Third Term"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="mgmt-field">
              <label className="mgmt-label">Due Date</label>
              <input type="date" className="mgmt-input" value={form.dueDate} onChange={set("dueDate")} />
            </div>
          </div>
        </div>
        <div className="mgmt-modal__footer">
          <button className="mgmt-btn mgmt-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="mgmt-btn mgmt-btn--primary" onClick={() => onSave(form)}>Add Fee</button>
        </div>
      </div>
    </div>
  );
}

export default function FeesPage() {
  const { user } = useAuth();
  const role = user?.role;
  const [fees,     setFees]     = useState([]);
  const [students, setStudents] = useState([]);
  const [search,   setSearch]   = useState("");
  const [modalFee, setModalFee] = useState(null);
  const [showAdd,  setShowAdd]  = useState(false);
  const [toast,    setToast]    = useState("");
  const [receipt,  setReceipt]  = useState(null);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 3000); }

  function load() {
    const allStudents = getStudents();
    if (role === "parent") {
      const parent = getParents().find((p) => p.userId === user?.id);
      const ids    = parent?.studentIds || [];
      const studs  = allStudents.filter((s) => ids.includes(s.id));
      setStudents(studs);
      setFees(getFees().filter((f) => ids.includes(f.studentId)));
    } else {
      setStudents(allStudents);
      setFees(getFees());
    }
  }
  useEffect(load, [user, role]);

  const studentMap = useMemo(() => Object.fromEntries(students.map((s) => [s.id, s])), [students]);

  const filtered = useMemo(() => {
    if (!search) return fees;
    const q = search.toLowerCase();
    return fees.filter((f) => {
      const s = studentMap[f.studentId];
      return `${s?.firstName} ${s?.lastName} ${f.feeType}`.toLowerCase().includes(q);
    });
  }, [fees, search, studentMap]);

  const totalFees     = fees.reduce((a, f) => a + f.amount, 0);
  const totalPaid     = fees.reduce((a, f) => a + (f.amountPaid || 0), 0);
  const totalOutstanding = totalFees - totalPaid;

  function handlePayment(paymentData) {
    const pmt = createPayment(paymentData);
    const fee = getFees().find((f) => f.id === paymentData.feeId);
    if (fee) {
      const newPaid    = (fee.amountPaid || 0) + paymentData.amount;
      const newStatus  = newPaid >= fee.amount ? "paid" : "partial";
      updateFee(fee.id, { amountPaid: newPaid, status: newStatus });
    }
    load(); setModalFee(null);
    setReceipt({ ...pmt, studentName: `${studentMap[paymentData.studentId]?.firstName || ""} ${studentMap[paymentData.studentId]?.lastName || ""}`.trim() });
    showToast("Payment recorded successfully.");
  }

  function handleAddFee(form) {
    const amt = parseFloat(form.amount);
    if (!form.studentId || isNaN(amt)) return;
    createFee({ ...form, amount: amt, amountPaid: 0 });
    load(); setShowAdd(false); showToast("Fee added.");
  }

  return (
    <div className="mgmt-page">
      <div className="mgmt-page__header">
        <div>
          <h1 className="mgmt-page__title">Fees & Payments</h1>
          <p className="mgmt-page__sub">Manage school fees and record payments</p>
        </div>
        {(role === "bursar" || role === "admin") && (
          <button className="mgmt-btn mgmt-btn--primary" onClick={() => setShowAdd(true)}>
            <Plus size={16} /> Add Fee
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="fees-summary">
        <div className="fees-summary__item"><span>Total Fees</span><strong>₦{totalFees.toLocaleString()}</strong></div>
        <div className="fees-summary__item fees-summary__item--green"><span>Collected</span><strong>₦{totalPaid.toLocaleString()}</strong></div>
        <div className="fees-summary__item fees-summary__item--red"><span>Outstanding</span><strong>₦{totalOutstanding.toLocaleString()}</strong></div>
        <div className="fees-summary__item">
          <span>Progress</span>
          <div className="fees-progress-wrap">
            <div className="fees-progress"><div className="fees-progress-fill" style={{ width: totalFees ? `${Math.round((totalPaid/totalFees)*100)}%` : "0%" }} /></div>
            <strong>{totalFees ? Math.round((totalPaid/totalFees)*100) : 0}%</strong>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mgmt-filters">
        <div className="mgmt-search-wrap">
          <input className="mgmt-search" placeholder="Search by student or fee type…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search fees" />
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="mgmt-empty"><p className="mgmt-empty__msg">No fee records found.</p></div>
      ) : (
        <div className="mgmt-table-wrap">
          <table className="mgmt-table" aria-label="Fees list">
            <thead><tr>
              <th className="mgmt-th">Student</th>
              <th className="mgmt-th">Fee Type</th>
              <th className="mgmt-th">Amount</th>
              <th className="mgmt-th">Paid</th>
              <th className="mgmt-th">Balance</th>
              <th className="mgmt-th">Term</th>
              <th className="mgmt-th">Status</th>
              {(role === "bursar" || role === "admin") && <th className="mgmt-th">Action</th>}
            </tr></thead>
            <tbody>
              {filtered.map((f) => {
                const s       = studentMap[f.studentId];
                const paid    = f.amountPaid || 0;
                const balance = f.amount - paid;
                return (
                  <tr key={f.id} className="mgmt-tr">
                    <td className="mgmt-td mgmt-td--name">{s ? `${s.firstName} ${s.lastName}` : "—"}</td>
                    <td className="mgmt-td">{f.feeType}</td>
                    <td className="mgmt-td">₦{f.amount.toLocaleString()}</td>
                    <td className="mgmt-td">₦{paid.toLocaleString()}</td>
                    <td className="mgmt-td" style={{ color: balance > 0 ? "#dc2626" : "#15803d", fontWeight: 600 }}>₦{balance.toLocaleString()}</td>
                    <td className="mgmt-td">{f.term}</td>
                    <td className="mgmt-td"><span className="mgmt-badge" style={{ background: `${statusColor(f.status)}20`, color: statusColor(f.status) }}>{f.status}</span></td>
                    {(role === "bursar" || role === "admin") && (
                      <td className="mgmt-td">
                        {balance > 0 && (
                          <button className="mgmt-action-btn" onClick={() => setModalFee(f)} aria-label="Record payment">Record Payment</button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modalFee && <PaymentModal fee={modalFee} student={studentMap[modalFee.studentId]} onClose={() => setModalFee(null)} onSave={handlePayment} />}
      {showAdd   && <AddFeeModal students={students} onClose={() => setShowAdd(false)} onSave={handleAddFee} />}

      {/* Receipt */}
      {receipt && (
        <div className="mgmt-modal-overlay" role="dialog" aria-modal="true">
          <div className="mgmt-modal mgmt-modal--sm">
            <div className="mgmt-modal__header">
              <h2 className="mgmt-modal__title">Payment Receipt</h2>
              <button className="mgmt-modal__close" onClick={() => setReceipt(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="mgmt-modal__body">
              <div className="receipt-body">
                <p className="receipt-school">Laurel Children Academy</p>
                <p className="receipt-label">Receipt — {receipt.reference}</p>
                {[["Student", receipt.studentName], ["Amount", `₦${receipt.amount?.toLocaleString()}`], ["Method", receipt.method], ["Date", new Date(receipt.paymentDate).toLocaleDateString("en-GB")], ["Status", "Successful"]].map(([l,v]) => (
                  <div key={l} className="receipt-row"><span>{l}</span><strong>{v}</strong></div>
                ))}
              </div>
            </div>
            <div className="mgmt-modal__footer">
              <button className="mgmt-btn mgmt-btn--ghost" onClick={() => window.print()}>Print</button>
              <button className="mgmt-btn mgmt-btn--primary" onClick={() => setReceipt(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="mgmt-toast" role="alert">{toast}</div>}
    </div>
  );
}
