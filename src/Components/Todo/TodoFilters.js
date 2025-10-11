export default function TodoFilters({
  filter,
  onFilterChange,
  onClearCompleted,
}) {
  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="todo-filters">
      <div className="filter-buttons">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={` filter-btn ${filter === f.key ? "active" : ""}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button onClick={onClearCompleted} className="clear-btn">
        🧽 Clear Completed!
      </button>
    </div>
  );
}
