"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";

export default function ConnectMeterPage() {
  const router = useRouter();
  const [accountName, setAccountName] = useState("");
  const [method, setMethod] = useState("wifi");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedMeter = JSON.parse(localStorage.getItem("voltpay_meter") || "{}");
    if (storedMeter.accountName) {
      setAccountName(storedMeter.accountName);
    }
  }, []);

  function handleConnect(event) {
    event.preventDefault();

    if (!accountName.trim()) {
      setMessage("Select or enter an account name first.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("voltpay_meter") || "{}");
    localStorage.setItem(
      "voltpay_meter",
      JSON.stringify({
        ...existing,
        accountName,
        method,
        status: "Connected",
        connected: true,
        connectedAt: new Date().toISOString()
      })
    );

    router.push("/dashboard");
  }

  return (
    <AuthShell title="Connect Your Smart Meter To VOLTPAY">
      <div className="auth-card connect-card">
        <h2>Connect Smart Meter To App</h2>

        <form onSubmit={handleConnect} className="connect-form">
          <label className="form-control">
            <span className="sr-only">Name Of Account</span>
            <input
              value={accountName}
              onChange={(event) => {
                setAccountName(event.target.value);
                setMessage("");
              }}
              placeholder="Name Of Account"
            />
          </label>

          <div className="connect-options">
            <button
              type="button"
              className={`connect-option ${method === "wifi" ? "selected" : ""}`}
              onClick={() => setMethod("wifi")}
            >
              <span className="connect-label">Auto</span>
              <span className="wifi-icon">≋</span>
              <span className="toggle on"><i /></span>
            </button>

            <span className="or-text">or</span>

            <button
              type="button"
              className={`connect-option ${method === "camera" ? "selected" : ""}`}
              onClick={() => setMethod("camera")}
            >
              <span className="connect-label">Scan</span>
              <span className="camera-icon">▣</span>
              <span className={`toggle ${method === "camera" ? "on" : ""}`}><i /></span>
            </button>
          </div>

          {message && <p className="form-message error">{message}</p>}

          <button className="yellow-btn connect-submit" type="submit">
            Connect
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
