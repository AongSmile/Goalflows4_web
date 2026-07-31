import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Shown briefly by ProtectRouteUser/ProtectRouteAdmin while redirecting an
// unauthenticated visitor to the login page.
const LoadingToRedirect = ({ to = "/login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 0) {
      navigate(to, { replace: true });
    }
  }, [count, navigate, to]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-[#003b6e]">
      <p className="text-lg font-semibold">กรุณาเข้าสู่ระบบก่อนใช้งานหน้านี้</p>
      <p className="text-sm text-gray-500">กำลังพาไปหน้าเข้าสู่ระบบใน {count} วินาที...</p>
    </div>
  );
};

export default LoadingToRedirect;
