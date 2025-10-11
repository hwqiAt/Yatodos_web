export default function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return (
    <div className="todo-stats">
      <span>📊 Total: {total}</span>
      <span>⏳ Active: {active}</span>
      <span>✔ Completed: {completed}</span>
    </div>
  );
}
