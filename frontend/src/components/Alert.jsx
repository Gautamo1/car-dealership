const variants = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
};

export default function Alert({
  type = "info",
  children,
  className = "",
}) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`rounded-2xl border px-4 py-3 text-sm shadow-sm ${variants[type]} ${className}`}
    >
      {children}
    </div>
  );
}