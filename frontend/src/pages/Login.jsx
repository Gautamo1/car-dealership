import { useState } from "react";
import { login } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    async function handleSubmit(e) {
      e.preventDefault();
    
      try {
        const data = await login({
          email,
          password,
        });
    
        localStorage.setItem("token", data.access_token);
    
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Car Dealership
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}