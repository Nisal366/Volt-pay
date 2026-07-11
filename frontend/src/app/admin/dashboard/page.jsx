"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { auth } from "@/lib/firebase";
import { API_BASE_URL } from "@/lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    users: 0,
    activeMeters: 0,
    activeReports: 0,
    unpaidBills: 0
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/login");
        return;
      }

      try {
        const token = await firebaseUser.getIdToken(true);

        const [dashboardResponse, usersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/dashboard`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          fetch(`${API_BASE_URL}/admin/users`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]);

        if (dashboardResponse.status === 401 || dashboardResponse.status === 403) {
          localStorage.removeItem("voltpay_user");
          router.replace("/login");
          return;
        }

        const dashboardData = await dashboardResponse.json();
        const usersData = await usersResponse.json();

        if (!dashboardResponse.ok) {
          throw new Error(dashboardData.message || "Failed to load admin dashboard.");
        }

        if (!usersResponse.ok) {
          throw new Error(usersData.message || "Failed to load users.");
        }

        setAdmin(firebaseUser);
        setStats(dashboardData.data || {});
        setUsers(usersData.data || []);
        setChecking(false);
      } catch (error) {
        setMessage(error.message || "Failed to load admin data.");
        setChecking(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    await signOut(auth);
    localStorage.removeItem("voltpay_user");
    router.push("/login");
  }

  if (checking) {
    return (
      <main className="dashboard-page">
        <section className="section">
          <div className="container">
            <div className="info-card">
              <h2>Loading real admin data...</h2>
              <p>Please wait while VOLTPAY checks Firebase admin access.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="dashboard-page">
        <section className="dashboard-hero">
          <Header />

          <div className="container dashboard-head">
            <div>
              <p className="eyebrow">Admin Dashboard</p>
              <h1>Welcome, {admin?.email || "Admin"}</h1>
              <p>
                Live admin panel connected to Firebase Authentication,
                Firestore, and the VOLTPAY backend API.
              </p>
            </div>

            <button className="primary-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </section>

        <section className="section">
          {message && (
            <div className="container">
              <p className="form-message error">{message}</p>
            </div>
          )}

          <div className="container dashboard-grid">
            <div className="info-card">
              <p className="card-kicker">Total Users</p>
              <h2>{stats.users ?? 0}</h2>
              <p>Registered users saved in Firestore.</p>
            </div>

            <div className="info-card">
              <p className="card-kicker">Connected Meters</p>
              <h2>{stats.activeMeters ?? 0}</h2>
              <p>Active smart meters registered in the system.</p>
            </div>

            <div className="info-card">
              <p className="card-kicker">Open Reports</p>
              <h2>{stats.activeReports ?? 0}</h2>
              <p>Open or in-progress service reports.</p>
            </div>
          </div>

          <div className="container dashboard-grid">
            <div className="info-card">
              <p className="card-kicker">Unpaid Bills</p>
              <h2>{stats.unpaidBills ?? 0}</h2>
              <p>Unpaid customer bills recorded in Firestore.</p>
            </div>

            <div className="info-card">
              <p className="card-kicker">Backend</p>
              <h2>Live API</h2>
              <p>{API_BASE_URL}</p>
            </div>

            <div className="info-card">
              <p className="card-kicker">Admin Email</p>
              <h2>{admin?.email}</h2>
              <p>Authenticated using Firebase Auth token verification.</p>
            </div>
          </div>

          <div className="container">
            <div className="info-card usage-chart-card">
              <div className="section-title-row">
                <div>
                  <p className="card-kicker">Registered Users</p>
                  <h2>Customer & Admin Accounts</h2>
                </div>
              </div>

              {users.length === 0 ? (
                <p>No registered user profiles found in Firestore yet.</p>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>NIC</th>
                        <th>Mobile</th>
                        <th>Role</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            {(user.firstName || user.lastName)
                              ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                              : "Not provided"}
                          </td>
                          <td>{user.email || "Not provided"}</td>
                          <td>{user.nic || "Not provided"}</td>
                          <td>{user.mobile || "Not provided"}</td>
                          <td>
                            <span className={user.role === "admin" ? "status-admin" : "status-customer"}>
                              {user.role || "customer"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
