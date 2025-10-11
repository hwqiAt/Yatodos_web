export default function ActionLayout({ title, children }) {
  return (
    <div className="full-screen-container">
      <div className="main-container">
        <h1 className="main-title">{title}</h1>
        {children}
      </div>
    </div>
  );
}
