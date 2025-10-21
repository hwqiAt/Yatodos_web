import React, { useState } from "react";
function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await onAddTodo(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Set your todo..."
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        ➕ Add
      </button>
    </form>
  );
}

export default TodoForm;
