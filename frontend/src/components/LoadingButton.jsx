export default function LoadingButton({
  isLoading = false,
  loadingText = "Loading...",
  children,
  className = "",
  disabled,
  ...props
}) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
}