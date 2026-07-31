import React, { useEffect, useState } from "react";
import {
  listPermissions,
  listRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../api/adminApi";

const emptyForm = { name: "", description: "", permissionKeys: [] };

// Groups the flat permission list ({key,label,group}) into
// { group: [permission, ...] } for a checkbox grid, in the same order
// server/config/permissions.js defines them.
function groupPermissions(permissions) {
  const groups = {};
  for (const p of permissions) {
    const g = p.group || "อื่นๆ";
    if (!groups[g]) groups[g] = [];
    groups[g].push(p);
  }
  return groups;
}

const RoleAdmin = () => {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setPermissions(await listPermissions());
      setRoles(await listRoles());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const togglePermission = (key) => {
    setForm((f) => ({
      ...f,
      permissionKeys: f.permissionKeys.includes(key)
        ? f.permissionKeys.filter((k) => k !== key)
        : [...f.permissionKeys, key],
    }));
  };

  const startEdit = (role) => {
    setEditingId(role.id);
    setForm({
      name: role.name,
      description: role.description || "",
      permissionKeys: role.permissions.map((p) => p.key),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      if (editingId) {
        await updateRole(editingId, form);
      } else {
        await createRole(form);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("ลบสิทธิ์นี้? พนักงานที่ใช้สิทธิ์นี้อยู่จะไม่มีสิทธิ์ใดๆ จนกว่าจะกำหนดใหม่")) return;
    try {
      await deleteRole(id);
      if (editingId === id) cancelEdit();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const groups = groupPermissions(permissions);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003b6e] mb-6">จัดการสิทธิ์ (Role & Permission)</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-3xl space-y-4 mb-8">
        <h2 className="font-semibold text-gray-700">
          {editingId ? "แก้ไขสิทธิ์" : "สร้างสิทธิ์ใหม่"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">ชื่อสิทธิ์ (เช่น Staff, Editor)</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">คำอธิบาย</label>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">สิทธิ์การใช้งาน</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(groups).map(([group, perms]) => (
              <div key={group} className="border rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{group}</p>
                <div className="space-y-1">
                  {perms.map((p) => (
                    <label key={p.key} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.permissionKeys.includes(p.key)}
                        onChange={() => togglePermission(p.key)}
                      />
                      {p.label || p.key}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-[#003b6e] text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-800">
            {editingId ? "บันทึกการแก้ไข" : "สร้างสิทธิ์"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2 rounded-lg text-sm border hover:bg-gray-50"
            >
              ยกเลิก
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">ชื่อสิทธิ์</th>
              <th className="px-4 py-3 font-medium">คำอธิบาย</th>
              <th className="px-4 py-3 font-medium">จำนวนสิทธิ์ที่ให้</th>
              <th className="px-4 py-3 font-medium">พนักงานที่ใช้</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {roles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  ยังไม่มีสิทธิ์
                </td>
              </tr>
            )}
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{role.name}</td>
                <td className="px-4 py-3 text-gray-500">{role.description || "-"}</td>
                <td className="px-4 py-3">{role.permissions.length}</td>
                <td className="px-4 py-3">{role._count?.users ?? 0}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => startEdit(role)} className="text-[#003b6e] text-xs hover:underline">
                      แก้ไข
                    </button>
                    <button onClick={() => handleDelete(role.id)} className="text-red-500 text-xs hover:underline">
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleAdmin;
