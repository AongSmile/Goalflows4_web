import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import useEcomStore from "../../store/eom-store";

// Shared "เข้าสู่ระบบด้วย Google" button used by both Login.jsx and
// Register.jsx - either page, success behaves identically (Google doesn't
// distinguish "login" from "register": a new Google account just gets a
// User row created on the fly by the backend's /google-login endpoint).
const GoogleAuthButton = ({ onSuccess, onError }) => {
  const loginWithGoogle = useEcomStore((state) => state.loginWithGoogle);
  const [error, setError] = useState("");

  const handleSuccess = async (credentialResponse) => {
    setError("");
    try {
      const data = await loginWithGoogle(credentialResponse.credential);
      onSuccess?.(data);
    } catch (err) {
      const message = err.message || "เข้าสู่ระบบด้วย Google ไม่สำเร็จ";
      setError(message);
      onError?.(message);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          setError("เข้าสู่ระบบด้วย Google ไม่สำเร็จ");
          onError?.("เข้าสู่ระบบด้วย Google ไม่สำเร็จ");
        }}
        width="320"
        text="continue_with"
        locale="th"
      />
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default GoogleAuthButton;
