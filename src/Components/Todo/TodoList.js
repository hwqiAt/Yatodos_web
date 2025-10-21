import TodoItem from "./TodoItem";
function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  if (!todos.length) {
    return (
      <div className="empty-state">
        <p>🎉 No todes ~ Set new one</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={() => onToggleTodo(todo._id)}
          onDelete={() => onDeleteTodo(todo._id)}
        ></TodoItem>
      ))}
    </ul>
  );
}
export default TodoList;
