export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  icon
}) {
  return (
    <label className="form-control">
      <span className="sr-only">{label}</span>
      {icon && <span className="input-icon">{icon}</span>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        required={required}
      />
    </label>
  );
}
