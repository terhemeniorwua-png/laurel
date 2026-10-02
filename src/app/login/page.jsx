"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "@/app/components/providers/AuthProvider";

const DEMO_ACCOUNTS = [
  { label: "Admin",     email: "admin@laurelacademy.edu",     password: "admin123",   color: "#532306" },
  { label: "Principal", email: "principal@laurelacademy.edu", password: "admin123",   color: "#7a3710" },
  { label: "Teacher",   email: "teacher@laurelacademy.edu",   password: "teacher123", color: "#1a5e3a" },
  { label: "Parent",    email: "parent@laurelacademy.edu",    password: "parent123",  color: "#1d4ed8" },
  { label: "Student",   email: "student@laurelacademy.edu",   password: "student123", color: "#7c3aed" },
  { label: "Bursar",    email: "bursar@laurelacademy.edu",    password: "bursar123",  color: "#b45309" },
];

export default function LoginPage() {
  const { signIn, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPwd, setShowPwd]     = useState(false);
  const [busy, setBusy]           = useState(false);
  const [error, setError]         = useState("");
  const [visible, setVisible]     = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && isAuthenticated) router.replace("/portal/dashboard");
  }, [loading, isAuthenticated, router]);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password)     { setError("Please enter your password."); return; }
    setBusy(true);
    // Small delay for UX realism
    await new Promise((r) => setTimeout(r, 700));
    const result = signIn(email.trim(), password);
    setBusy(false);
    if (result.success) {
      router.push("/portal/dashboard");
    } else {
      setError(result.error);
    }
  }

  function handleDemo(acc) {
    setError("");
    setBusy(true);
    setTimeout(() => {
      const result = signIn(acc.email, acc.password);
      setBusy(false);
      if (result.success) router.push("/portal/dashboard");
      else setError(result.error);
    }, 500);
  }

  if (loading) return null;

  return (
    <div className="login-page">
      {/* Brand panel — left */}
      <div className="login-brand" aria-hidden="true">
        <div className="login-brand__inner">
          <div className="login-brand__logo-mark">L</div>
          <p className="login-brand__name">Laurel Children Academy</p>
          <h1 className="login-brand__tagline">
            Growing Curious Minds.<br />Building Confident Futures.
          </h1>
          <p className="login-brand__sub">
            Your secure school portal for students, parents, teachers, and staff.
          </p>
        </div>
      </div>

      {/* Form panel — right */}
      <div className={`login-form-panel${visible ? " login-form-panel--visible" : ""}`}>
        <div className="login-form-card">
          {/* Header */}
          <Link href="/" className="login-form-card__back">← Back to website</Link>
          <h2 className="login-form-card__heading">Welcome Back</h2>
          <p className="login-form-card__sub">Sign in to access your Laurel Children Academy portal.</p>

          {/* Error */}
          {error && (
            <div className="login-error" role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="login-form">
            <div className="login-field">
              <label htmlFor="login-email" className="login-label">Email Address</label>
              <input
                id="login-email" type="email" className="login-input"
                value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="e.g. teacher@laurelacademy.edu"
                autoComplete="email" autoFocus
                aria-required="true"
              />
            </div>
            <div className="login-field">
              <div className="login-label-row">
                <label htmlFor="login-password" className="login-label">Password</label>
                <button type="button" className="login-forgot" onClick={() => setError("Password reset is not available in demo mode. Use a demo account below.")}>
                  Forgot password?
                </button>
              </div>
              <div className="login-password-wrap">
                <input
                  id="login-password" type={showPwd ? "text" : "password"}
                  className="login-input login-input--password"
                  value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-required="true"
                />
                <button type="button" className="login-eye" onClick={() => setShowPwd((v) => !v)} aria-label={showPwd ? "Hide password" : "Show password"}>
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <button type="submit" className="login-submit" disabled={busy} aria-busy={busy}>
              {busy ? <span className="login-spinner" aria-hidden="true" /> : <LogIn size={17} aria-hidden="true" />}
              {busy ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="login-demo">
            <p className="login-demo__label">Demo Accounts</p>
            <div className="login-demo__grid">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  className="login-demo__btn"
                  style={{ "--demo-color": acc.color }}
                  onClick={() => handleDemo(acc)}
                  disabled={busy}
                  aria-label={`Sign in as demo ${acc.label}`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
