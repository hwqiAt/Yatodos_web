import React, { useState } from "react";
function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo({
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Money is comming. Lets set needs 🤑"
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        ➕ Add
      </button>
    </form>
  );
}

export default TodoForm;
