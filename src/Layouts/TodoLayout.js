import React from "react";
import TodoForm from "../Components/Todo/TodoForm";
import TodoList from "../Components/Todo/TodoList";
import TodoFilters from "../Components/Todo/TodoFilters";
import TodoStats from "../Components/Todo/TodoStats";

export default function TodoLayout({
  todos,
  filter,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onFilterChange,
  onClearCompleted,
}) {
  const getFilteredTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="todo-app">
      <h1>🎆 My Todo App</h1>

      <TodoForm onAddTodo={onAddTodo} />

      <TodoFilters
        filter={filter}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />

      <TodoList
        todos={getFilteredTodos()}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
      />

      <TodoStats todos={todos} />
    </div>
  );
}
