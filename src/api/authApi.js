const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

async function handle(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    /* no body */
  }
  if (!res.ok) {
    throw new Error(body?.message || "Request failed");
  }
  return body;
}

export async function register({ email, password, name }) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  return handle(res); // { payload: { id, email, role }, token } - registering also logs you in
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handle(res); // { payload: { id, email, role }, token }
}

/**
 * @param {string} credential - the Google ID token from <GoogleLogin/>'s onSuccess callback
 */
export async function googleLogin(credential) {
  const res = await fetch(`${API_BASE_URL}/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });
  return handle(res); // { payload: { id, email, role }, token }
}

export async function getCurrentUser(token) {
  const res = await fetch(`${API_BASE_URL}/current-user`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handle(res); // { user }
}

export async function getCurrentAdmin(token) {
  const res = await fetch(`${API_BASE_URL}/current-admin`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handle(res); // { user }
}
