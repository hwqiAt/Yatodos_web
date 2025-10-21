import React, { useState, useEffect } from "react";
import TodoLayout from "../Layouts/TodoLayout";
import "../assets/styles.css";
import {
  fetchTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  deleteCompletedTodos,
} from "../services/todoService";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodos();
        setTodos(data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      const response = await createTodo(newTodo);
      if (response.data) {
        setTodos((prev) => [...prev, response.data]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const todoToToggle = todos.find((todo) => todo._id === id);
      if (!todoToToggle) return;

      const newCompletedState = !todoToToggle.completed;

      const response = await toggleTodo(id, newCompletedState);

      if (response.data) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? response.data : todo))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const clearCompleted = async () => {
    try {
      await deleteCompletedTodos();

      setTodos((prev) => prev.filter((todo) => !todo.completed));
    } catch (err) {
      console.error(err);
    }
  };
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <TodoLayout
      todos={filteredTodos}
      filter={filter}
      onAddTodo={addTodo}
      onToggleTodo={handleToggle}
      onDeleteTodo={handleDelete}
      onFilterChange={setFilter}
      onClearCompleted={clearCompleted}
    />
  );
}
