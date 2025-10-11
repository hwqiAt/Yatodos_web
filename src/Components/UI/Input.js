export default function Input({ id, onChange, type = "text", props }) {
  return <input id={id} type={type} onChange={onChange} {...props} />;
}
