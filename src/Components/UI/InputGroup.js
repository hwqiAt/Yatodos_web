import Label from "./Label";
import Input from "./Input";

export default function InputGroup({
  id,
  label,
  type,
  value,
  onChange,
  message,
}) {
  return (
    <div className="form-group">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={onChange} />
      {message && <span className="error-message">{message}</span>}
    </div>
  );
}
