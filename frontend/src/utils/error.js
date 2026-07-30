export function getErrorMessage(error, fallbackMessage = "Something went wrong.") {
  const detail = error?.response?.data?.detail;
  const message = error?.response?.data?.message;
  const errorText = error?.response?.data?.error;

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (typeof errorText === "string" && errorText.trim()) {
    return errorText;
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
}