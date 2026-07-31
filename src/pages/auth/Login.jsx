import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useEcomStore from "../../store/eom-store";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";

const Login = () => {
  const login = useEcomStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goByRole = (role) => navigate(role === "admin" ? "/admin" : "/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      goByRole(data.payload.role);
    } catch (err) {
      setError(err.message || "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#003b6e] mb-6 text-center">
          เข้าสู่ระบบ
        </h1>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm rounded-lg p-2 mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <GoogleAuthButton onSuccess={(data) => goByRole(data.payload.role)} />
        </div>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">หรือเข้าสู่ระบบด้วยอีเมล</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b6e]"
          />

          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b6e]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003b6e] text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition disabled:opacity-60"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ยังไม่มีบัญชี?{" "}
          <Link to="/register" className="text-[#003b6e] font-semibold hover:underline">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
