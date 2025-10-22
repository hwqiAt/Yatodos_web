// (Giả sử bạn có API_BASE_URL ở đây)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function fetchAPI(endpoint, options) {
  const res = await fetch(`${API_BASE_URL}/auth/${endpoint}`, options);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || "Một lỗi đã xảy ra");
  }
  return data;
}

export function requestPasswordReset(email) {
  return fetchAPI("forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export function verifyResetCode(email, code) {
  return fetchAPI("verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
}

export function resetPassword(resetToken, password) {
  return fetchAPI("reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetToken, password }),
  });
}
