import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import LoadingButton from "../components/LoadingButton";
import { getErrorMessage } from "../utils/error";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await registerUser({
        ...form,
      });

      navigate("/", {
        state: { successMessage: "Registration successful" },
      });
    } catch (error) {
      setError(getErrorMessage(error, "Unable to register. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">
          Create Account
        </h1>

        <p className="mb-6 text-center text-sm text-slate-600">
          Register as an admin or customer.
        </p>

        {error ? (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        ) : null}

        <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
          Username
        </label>

        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          value={form.username}
          onChange={onChange}
          required
        />

        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          value={form.email}
          onChange={onChange}
          required
        />

        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
          Password
        </label>

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="mb-6 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          value={form.password}
          onChange={onChange}
          required
        />

        <label htmlFor="role" className="mb-1 block text-sm font-medium text-slate-700">
          Role
        </label>

        <select
          id="role"
          name="role"
          className="mb-6 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          value={form.role}
          onChange={onChange}
          required
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Creating account..."
          className="w-full bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 focus:ring-blue-500"
        >
          Register
        </LoadingButton>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}