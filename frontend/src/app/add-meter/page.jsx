"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";

export default function AddMeterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    accountName: "",
    premisesId: "",
    accountNumber: ""
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.accountName || !form.premisesId || !form.accountNumber) {
      setMessage("Complete all meter details before continuing.");
      return;
    }

    localStorage.setItem(
      "voltpay_meter",
      JSON.stringify({
        ...form,
        status: "Pending connection",
        connected: false
      })
    );

    router.push("/connect-meter");
  }

  return (
    <AuthShell title="Add Your Smart Meter">
      <AuthCard>
        <form className="auth-form meter-form" onSubmit={handleSubmit}>
          <FormInput
            label="Name For Account"
            name="accountName"
            value={form.accountName}
            onChange={handleChange}
            placeholder="Name For Account (Home, Office)"
          />
          <FormInput
            label="Premises ID"
            name="premisesId"
            value={form.premisesId}
            onChange={handleChange}
          />
          <FormInput
            label="Account Number"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
          />

          {message && <p className="form-message error">{message}</p>}

          <button className="border-btn" type="button">
            Help
          </button>
          <button className="yellow-btn" type="submit">
            Add
          </button>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
