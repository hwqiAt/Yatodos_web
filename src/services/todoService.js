const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
function getAuthHeaders() {
  const token = localStorage.getItem("token"); // <-- Lấy token từ localStorage

  if (!token) {
    // Nếu không có token, trả về headers rỗng (request sẽ bị lỗi 401)
    return {};
  }

  // Trả về object headers
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // <-- Định dạng chuẩn
  };
}
export async function fetchTodos() {
  const res = await fetch(`${API_BASE_URL}/todos`, {
    method: "GET",
    headers: getAuthHeaders(), // <-- SỬ DỤNG HEADERS
  });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(newTodo) {
  const res = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: getAuthHeaders(), // <-- SỬ DỤNG HEADERS
    body: JSON.stringify({ title: newTodo }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function toggleTodo(id, newCompletedState) {
  const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PUT", // (Hoặc PUT, tùy vào file backend routes/todos.ts của bạn)
    headers: getAuthHeaders(), // <-- SỬ DỤNG HEADERS
    body: JSON.stringify({ completed: newCompletedState }),
  });
  if (!res.ok) throw new Error("Failed to toggle todo");
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(), // <-- SỬ DỤNG HEADERS
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
}
export async function deleteCompletedTodos() {
  const res = await fetch(`${API_BASE_URL}/todos/clear/completed`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to clear completed todos");
  return res.json();
}
