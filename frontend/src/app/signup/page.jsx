"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AuthShell from "@/components/AuthShell";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { API_BASE_URL } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  function isValidNic(value) {
    const oldNic = /^[0-9]{9}[vVxX]$/.test(value);
    const newNic = /^[0-9]{12}$/.test(value);
    return oldNic || newNic;
  }

  function isValidMobile(value) {
    return /^(?:\+94|0)?7\d{8}$/.test(value);
  }

  async function createBackendProfile(firebaseUser) {
    const token = await firebaseUser.getIdToken(true);

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        nic: form.nic.trim().toUpperCase(),
        mobile: form.mobile.trim(),
        email: form.email.trim()
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Failed to save user profile.");
    }

    return data.data;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setMessage("Enter first name and last name.");
      return;
    }

    if (!form.email.trim()) {
      setMessage("Enter your email address.");
      return;
    }

    if (!isValidNic(form.nic.trim())) {
      setMessage("Enter a valid NIC number.");
      return;
    }

    if (!isValidMobile(form.mobile.trim())) {
      setMessage("Enter a valid Sri Lankan mobile number.");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      await updateProfile(result.user, {
        displayName: `${form.firstName.trim()} ${form.lastName.trim()}`
      });

      const profile = await createBackendProfile(result.user);

      localStorage.setItem(
        "voltpay_user",
        JSON.stringify({
          uid: result.user.uid,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          nic: profile.nic,
          mobile: profile.mobile,
          role: "customer",
          loggedIn: true
        })
      );

      router.push("/add-meter");
    } catch (error) {
      setMessage(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Create Your VOLTPAY Account">
      <AuthCard>
        <form className="auth-form compact-form" onSubmit={handleSubmit}>
          <FormInput
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <FormInput
            label="NIC Number"
            name="nic"
            value={form.nic}
            onChange={handleChange}
          />

          <FormInput
            label="Mobile Number"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {message && <p className="form-message error">{message}</p>}

          <button className="gradient-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Next"}
          </button>

          <p className="auth-switch">
            Already registered? <Link href="/login">Log In</Link>
          </p>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
