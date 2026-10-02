"use client";

import { useState } from "react";
import { Search, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { getAdmissionByAppId } from "@/lib/storage/admissions";
import { ADMISSION_STATUSES } from "@/data/public/admissionsData";

const STATUS_ORDER = ADMISSION_STATUSES.map((s) => s.key);

function StatusTimeline({ currentStatus }) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);
  return (
    <ol className="asc-timeline" aria-label="Application status timeline">
      {ADMISSION_STATUSES.map((s, i) => {
        const isDone    = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <li key={s.key} className={["asc-timeline__item", isDone ? "asc-timeline__item--done" : "", isCurrent ? "asc-timeline__item--current" : ""].filter(Boolean).join(" ")}>
            <div className="asc-timeline__marker" aria-hidden="true">
              {isDone ? <CheckCircle size={20} strokeWidth={2} /> : <Circle size={20} strokeWidth={1.5} />}
            </div>
            <div className="asc-timeline__content">
              <span className="asc-timeline__label">{s.label}</span>
              {isCurrent && <span className="asc-timeline__current-badge">Current Status</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function AdmissionStatusChecker({ prefillId = "" }) {
  const [inputId, setInputId]       = useState(prefillId);
  const [result, setResult]         = useState(null);   // found application
  const [notFound, setNotFound]     = useState(false);
  const [searched, setSearched]     = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = inputId.trim();
    if (!trimmed) return;
    const found = getAdmissionByAppId(trimmed);
    setSearched(true);
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <div className="asc-wrapper">
      {/* Search form */}
      <form className="asc-search" onSubmit={handleSearch} aria-label="Check application status">
        <div className="asc-search__inner">
          <label htmlFor="asc-input" className="asc-search__label">
            Enter your Application ID
          </label>
          <div className="asc-search__row">
            <input
              id="asc-input"
              type="text"
              className="asc-search__input"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              placeholder="e.g. LCA-2026-0001"
              autoComplete="off"
              aria-describedby="asc-hint"
            />
            <button type="submit" className="asc-search__btn" disabled={!inputId.trim()}>
              <Search size={18} aria-hidden="true" />
              Check Status
            </button>
          </div>
          <p id="asc-hint" className="asc-search__hint">
            Your Application ID was shown on the confirmation screen after you submitted your application.
          </p>
        </div>
      </form>

      {/* Not found */}
      {searched && notFound && (
        <div className="asc-not-found" role="alert">
          <AlertCircle size={24} aria-hidden="true" />
          <div>
            <p className="asc-not-found__title">Application not found</p>
            <p className="asc-not-found__desc">
              No application was found with ID <strong>{inputId.trim()}</strong>. Please check the ID and try again.
            </p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="asc-result" aria-live="polite">
          <div className="asc-result__header">
            <div>
              <p className="asc-result__app-id">{result.applicationId}</p>
              <p className="asc-result__child-name">{result.child?.firstName} {result.child?.lastName}</p>
            </div>
            <span className="af-status-badge af-status-badge--submitted">
              {ADMISSION_STATUSES.find((s) => s.key === result.status)?.label ?? result.status}
            </span>
          </div>

          <div className="asc-result__details">
            <div className="asc-result__detail-item">
              <span>Child</span>
              <strong>{result.child?.firstName} {result.child?.lastName}</strong>
            </div>
            <div className="asc-result__detail-item">
              <span>Preferred Class</span>
              <strong>{result.child?.preferredClass}</strong>
            </div>
            <div className="asc-result__detail-item">
              <span>Submitted</span>
              <strong>{formatDate(result.submittedAt)}</strong>
            </div>
            <div className="asc-result__detail-item">
              <span>Guardian</span>
              <strong>{result.guardian?.name}</strong>
            </div>
          </div>

          <StatusTimeline currentStatus={result.status} />
        </div>
      )}
    </div>
  );
}
