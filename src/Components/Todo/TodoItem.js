export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <lable className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </lable>
      <button className="delete-btn" onClick={onDelete} title="Delete todo">
        🚮
      </button>
    </li>
  );
}
