"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import AuthShell from "@/components/AuthShell";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { API_BASE_URL } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

    setMessage("");
  }

  function saveLocalUser(user, role, profile = null) {
    localStorage.setItem(
      "voltpay_user",
      JSON.stringify({
        uid: user.uid,
        firstName: profile?.firstName || (role === "admin" ? "VOLTPAY" : "VOLTPAY"),
        lastName: profile?.lastName || (role === "admin" ? "Admin" : "User"),
        email: user.email,
        nic: profile?.nic || "",
        mobile: profile?.mobile || "",
        role,
        loggedIn: true
      })
    );
  }

  async function checkAdminAccess(token) {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.ok;
  }

  async function loadProfile(token) {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result?.data?.profile || null;
  }

  async function completeLogin(firebaseUser) {
    const token = await firebaseUser.getIdToken(true);
    const isAdmin = await checkAdminAccess(token);

    if (isAdmin) {
      saveLocalUser(firebaseUser, "admin");
      router.push("/admin/dashboard");
      return;
    }

    const profile = await loadProfile(token);
    saveLocalUser(firebaseUser, "customer", profile);
    router.push("/dashboard");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      setMessage("Enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result = await signInWithEmailAndPassword(auth, email, password);
      await completeLogin(result.user);
    } catch (error) {
      setMessage(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      setMessage("");

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await completeLogin(result.user);
    } catch (error) {
      setMessage(error.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Welcome To VOLT-PAY">
      <AuthCard>
        <form className="auth-form" onSubmit={handleSubmit}>
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Your Email Address"
            icon="◉"
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            icon="▢"
          />

          {message && <p className="form-message error">{message}</p>}

          <button className="gradient-btn" type="submit" disabled={loading}>
            {loading ? "Checking..." : "Log In"}
          </button>

          <div className="divider">or</div>

          <button
            className="outline-auth-btn"
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <span className="google-mark">G</span>
            Continue With Google
          </button>

          <button
            className="outline-auth-btn"
            type="button"
            onClick={() => setMessage("Apple login is not enabled in this version.")}
          >
            <span className="apple-mark">●</span>
            Continue With Apple
          </button>

          <p className="auth-switch">
            Don’t Have Account{" "}
            <Link href="/signup">
              Register
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
