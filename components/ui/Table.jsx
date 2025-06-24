export default function Table({ children, className = "" }) {
  return (
    <table className={`mb-2 min-w-full border ${className}`}>{children}</table>
  );
}
