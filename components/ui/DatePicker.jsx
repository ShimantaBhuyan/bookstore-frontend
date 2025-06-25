import { useState } from "react";

export default function DatePicker({
  value,
  onChange,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type="date"
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`rounded border px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none ${focused ? "ring-2 ring-blue-200" : ""} ${className}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}
