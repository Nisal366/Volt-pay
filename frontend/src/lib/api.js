"use client";

import { auth } from "./firebase";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export async function getFirebaseToken(forceRefresh = false) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No Firebase user is logged in.");
  }

  return user.getIdToken(forceRefresh);
}

export async function apiFetch(path, options = {}) {
  const token = await getFirebaseToken();

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}
