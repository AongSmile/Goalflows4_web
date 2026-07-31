import React from "react";

// Mirrors the server's PASSWORD_RULE (see server/controllers/auth.js):
// at least 8 characters, containing both a letter and a number.
export function isPasswordValid(password) {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
}

const rules = [
  { label: "อย่างน้อย 8 ตัวอักษร", test: (p) => p.length >= 8 },
  { label: "มีตัวอักษรอย่างน้อย 1 ตัว", test: (p) => /[A-Za-z]/.test(p) },
  { label: "มีตัวเลขอย่างน้อย 1 ตัว", test: (p) => /\d/.test(p) },
];

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  return (
    <ul className="mt-1 space-y-0.5">
      {rules.map((rule) => {
        const passed = rule.test(password);
        return (
          <li
            key={rule.label}
            className={`text-xs flex items-center gap-1 ${
              passed ? "text-green-600" : "text-gray-400"
            }`}
          >
            <span>{passed ? "✓" : "○"}</span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
};

export default PasswordStrength;
