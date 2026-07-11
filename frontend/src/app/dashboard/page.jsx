"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usageData } from "@/lib/mockData";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [meter, setMeter] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("voltpay_user") || "null"));
    setMeter(JSON.parse(localStorage.getItem("voltpay_meter") || "null"));
  }, []);

  const maxUnits = Math.max(...usageData.map((item) => item.units));

  return (
    <>
      <main className="dashboard-page">
        <section className="dashboard-hero">
          <Header />
          <div className="container dashboard-head">
            <div>
              <p className="eyebrow">Customer Dashboard</p>
              <h1>Welcome{user?.firstName ? `, ${user.firstName}` : ""}</h1>
              <p>Monitor your connected meter, usage trend, bill status, and service requests.</p>
            </div>
            <Link className="primary-btn" href="/add-meter">Add Meter</Link>
          </div>
        </section>

        <section className="section">
          <div className="container dashboard-grid">
            <div className="info-card meter-status-card">
              <p className="card-kicker">Smart Meter</p>
              <h2>{meter?.accountName || "No meter added"}</h2>
              <p>
                Status: <strong className={meter?.connected ? "success-text" : "warning-text"}>
                  {meter?.status || "Not connected"}
                </strong>
              </p>
              <div className="card-actions">
                <Link href="/connect-meter" className="small-link">Connect Meter</Link>
                <Link href="/usage" className="small-link">View Usage</Link>
              </div>
            </div>

            <div className="info-card">
              <p className="card-kicker">Current Bill</p>
              <h2>LKR 4,280.00</h2>
              <p>Due Date: 25 July 2026</p>
              <Link href="/easy-pay" className="yellow-btn small-pay-btn">Pay Now</Link>
            </div>

            <div className="info-card">
              <p className="card-kicker">This Month</p>
              <h2>170 kWh</h2>
              <p>Estimated cost: LKR 4,280.00</p>
              <span className="trend-pill">+8% from last month</span>
            </div>
          </div>

          <div className="container">
            <div className="info-card usage-chart-card">
              <div className="section-title-row">
                <div>
                  <p className="card-kicker">Usage Trend</p>
                  <h2>Monthly Electricity Usage</h2>
                </div>
                <Link href="/usage" className="text-button">Details</Link>
              </div>

              <div className="usage-chart">
                {usageData.map((item) => (
                  <div className="usage-bar" key={item.label}>
                    <span
                      className="bar"
                      style={{ height: `${(item.units / maxUnits) * 100}%` }}
                      title={`${item.units} kWh`}
                    />
                    <strong>{item.units}</strong>
                    <small>{item.label}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
