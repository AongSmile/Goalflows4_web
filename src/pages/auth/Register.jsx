import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useEcomStore from "../../store/eom-store";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";
import PasswordStrength, { isPasswordValid } from "../../components/auth/PasswordStrength";

const Register = () => {
  const register = useEcomStore((state) => state.register);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordValid = isPasswordValid(password);
  const passwordsMatch = password && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordValid) {
      setError("รหัสผ่านยังไม่ตรงตามเงื่อนไข");
      return;
    }
    if (!passwordsMatch) {
      setError("รหัสผ่านยืนยันไม่ตรงกัน");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name);
      navigate("/");
    } catch (err) {
      setError(err.message || "สมัครสมาชิกไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#003b6e] mb-6 text-center">
          สมัครสมาชิก
        </h1>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm rounded-lg p-2 mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <GoogleAuthButton onSuccess={() => navigate("/")} />
        </div>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">หรือสมัครด้วยอีเมล</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-600 mb-1">ชื่อ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b6e]"
          />

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
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b6e]"
          />
          <PasswordStrength password={password} />

          <label className="block text-sm text-gray-600 mb-1 mt-4">
            ยืนยัน Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 mb-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b6e]"
          />
          {confirmPassword && !passwordsMatch && (
            <p className="text-xs text-red-500 mb-4">รหัสผ่านไม่ตรงกัน</p>
          )}
          {(!confirmPassword || passwordsMatch) && <div className="mb-4" />}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003b6e] text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition disabled:opacity-60"
          >
            {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          มีบัญชีอยู่แล้ว?{" "}
          <Link to="/login" className="text-[#003b6e] font-semibold hover:underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
