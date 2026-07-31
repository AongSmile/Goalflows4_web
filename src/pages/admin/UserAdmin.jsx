import React, { useEffect, useState } from "react";
import { listUsers, changeUserStatus, changeUserRole, listRoles } from "../../api/adminApi";
import AdminTable from "../../components/admin/AdminTable";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setUsers(await listUsers());
      setRoles(await listRoles());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // "user"/"admin" need no roleId; "staff" keeps whatever roleId it already
  // had (or null, picked separately below) so switching to "staff" doesn't
  // silently wipe an existing assignment.
  const handleRoleChange = async (row, role) => {
    try {
      await changeUserRole(row.id, role, role === "staff" ? row.roleId : undefined);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRoleIdChange = async (row, roleId) => {
    try {
      await changeUserRole(row.id, "staff", roleId || null);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleEnabled = async (id, enabled) => {
    try {
      await changeUserStatus(id, !enabled);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003b6e] mb-6">จัดการผู้ใช้</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <AdminTable
        columns={[
          { key: "email", label: "Email" },
          { key: "name", label: "ชื่อ", render: (row) => row.name || "-" },
          {
            key: "role",
            label: "ประเภทบัญชี",
            render: (row) => (
              <select
                value={row.role}
                onChange={(e) => handleRoleChange(row, e.target.value)}
                className="border rounded-lg px-2 py-1 text-xs"
              >
                <option value="user">user (ลูกค้า)</option>
                <option value="staff">staff (พนักงาน)</option>
                <option value="admin">admin</option>
              </select>
            ),
          },
          {
            key: "roleId",
            label: "สิทธิ์ (สำหรับ staff)",
            render: (row) =>
              row.role === "staff" ? (
                <select
                  value={row.roleId || ""}
                  onChange={(e) => handleRoleIdChange(row, e.target.value)}
                  className="border rounded-lg px-2 py-1 text-xs"
                >
                  <option value="">- ยังไม่กำหนด -</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              ) : (
                "-"
              ),
          },
          {
            key: "enabled",
            label: "สถานะ",
            render: (row) => (
              <button
                onClick={() => handleToggleEnabled(row.id, row.enabled)}
                className={`text-xs px-2 py-1 rounded-lg ${
                  row.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                }`}
              >
                {row.enabled ? "เปิดใช้งาน" : "ปิดใช้งาน"}
              </button>
            ),
          },
        ]}
        rows={users}
      />
    </div>
  );
};

export default UserAdmin;
