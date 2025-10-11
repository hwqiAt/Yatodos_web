export default function Label({ children, htmlFor }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}
