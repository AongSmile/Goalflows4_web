import React, { useEffect, useState } from "react";
import { listBrands, createBrand, updateBrand, deleteBrand } from "../../api/adminApi";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import StatusToggle from "../../components/admin/StatusToggle";
import ImageField from "../../components/admin/ImageField";

const emptyForm = { name: "", logoUrl: "", url: "", sortOrder: 0 };

const BrandAdmin = () => {
  const [brands, setBrands] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await listBrands({ page, search, status });
      setBrands(data.items);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, status]);

  const startEdit = (brand) => {
    setEditingId(brand.id);
    setForm({
      name: brand.name,
      logoUrl: brand.logoUrl || "",
      url: brand.url || "",
      sortOrder: brand.sortOrder ?? 0,
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
        await updateBrand(editingId, form);
      } else {
        await createBrand(form);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("ลบแบรนด์นี้?")) return;
    try {
      await deleteBrand(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleStatus = async (brand) => {
    try {
      await updateBrand(brand.id, { status: !brand.status });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003b6e] mb-6">จัดการแบรนด์</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 mb-6 max-w-xl space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">ชื่อแบรนด์</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <ImageField label="Logo" value={form.logoUrl} onChange={(v) => setForm({ ...form, logoUrl: v })} />
        <div>
          <label className="block text-sm text-gray-600 mb-1">URL เว็บไซต์แบรนด์ (ถ้ามี)</label>
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">ลำดับการแสดงผล (เลขน้อย = แสดงก่อน)</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
            className="w-32 border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-[#003b6e] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
            {editingId ? "บันทึกการแก้ไข" : "เพิ่มแบรนด์"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-50">
              ยกเลิก
            </button>
          )}
        </div>
      </form>

      <AdminSearchBar search={search} onSearchChange={(v) => { setPage(1); setSearch(v); }} status={status} onStatusChange={(v) => { setPage(1); setStatus(v); }} />

      <AdminTable
        columns={[
          {
            key: "logoUrl",
            label: "Logo",
            render: (row) => (row.logoUrl ? <img src={row.logoUrl} alt="" className="h-8 object-contain" /> : "-"),
          },
          { key: "name", label: "ชื่อแบรนด์" },
          { key: "sortOrder", label: "ลำดับ" },
          { key: "status", label: "สถานะ", render: (row) => <StatusToggle status={row.status} onToggle={() => toggleStatus(row)} /> },
          {
            key: "actions",
            label: "",
            render: (row) => (
              <div className="flex gap-3">
                <button onClick={() => startEdit(row)} className="text-[#003b6e] text-xs hover:underline">แก้ไข</button>
                <button onClick={() => handleDelete(row.id)} className="text-red-500 text-xs hover:underline">ลบ</button>
              </div>
            ),
          },
        ]}
        rows={brands}
      />
      <AdminPagination meta={meta} onPageChange={setPage} />
    </div>
  );
};

export default BrandAdmin;
