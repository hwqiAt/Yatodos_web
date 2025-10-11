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
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
          onDelete={() => onDeleteTodo(todo.id)}
        ></TodoItem>
      ))}
    </ul>
  );
}
export default TodoList;
