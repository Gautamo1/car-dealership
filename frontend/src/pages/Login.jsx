export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}