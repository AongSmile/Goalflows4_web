import React, { useEffect, useState } from "react";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  listSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../../api/adminApi";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import StatusToggle from "../../components/admin/StatusToggle";

const emptyCategory = { name: "", slug: "", title: "", subtitle: "" };
const emptySub = { slug: "", title: "", subtitle: "", categoryId: "" };

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [catMeta, setCatMeta] = useState(null);
  const [catPage, setCatPage] = useState(1);
  const [catSearch, setCatSearch] = useState("");
  const [catStatus, setCatStatus] = useState("");

  const [subcategories, setSubcategories] = useState([]);
  const [subMeta, setSubMeta] = useState(null);
  const [subPage, setSubPage] = useState(1);
  const [subSearch, setSubSearch] = useState("");
  const [subStatus, setSubStatus] = useState("");

  const [form, setForm] = useState(emptyCategory);
  const [editingCatId, setEditingCatId] = useState(null);
  const [subForm, setSubForm] = useState(emptySub);
  const [editingSubId, setEditingSubId] = useState(null);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      const data = await listCategories({ page: catPage, limit: 100, search: catSearch, status: catStatus });
      setCategories(data.items);
      setCatMeta(data.meta);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadSubcategories = async () => {
    try {
      const data = await listSubcategories({ page: subPage, search: subSearch, status: subStatus });
      setSubcategories(data.items);
      setSubMeta(data.meta);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catPage, catSearch, catStatus]);

  useEffect(() => {
    loadSubcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subPage, subSearch, subStatus]);

  // ---- Category form ----
  const startEditCategory = (cat) => {
    setEditingCatId(cat.id);
    setForm({ name: cat.name, slug: cat.slug || "", title: cat.title || "", subtitle: cat.subtitle || "" });
  };
  const cancelEditCategory = () => {
    setEditingCatId(null);
    setForm(emptyCategory);
  };
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      if (editingCatId) {
        await updateCategory(editingCatId, form);
      } else {
        await createCategory(form);
      }
      cancelEditCategory();
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDeleteCategory = async (id) => {
    if (!confirm("ลบหมวดหมู่นี้? สินค้าที่อยู่ในหมวดนี้จะไม่ถูกลบแต่จะไม่มีหมวดหมู่")) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  };
  const toggleCategoryStatus = async (cat) => {
    try {
      await updateCategory(cat.id, { status: !cat.status });
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  // ---- Subcategory form ----
  const startEditSub = (sub) => {
    setEditingSubId(sub.id);
    setSubForm({
      slug: sub.slug,
      title: sub.title || "",
      subtitle: sub.subtitle || "",
      categoryId: sub.categoryId,
    });
  };
  const cancelEditSub = () => {
    setEditingSubId(null);
    setSubForm(emptySub);
  };
  const handleCreateSub = async (e) => {
    e.preventDefault();
    if (!subForm.slug.trim() || !subForm.categoryId) return;
    try {
      if (editingSubId) {
        await updateSubcategory(editingSubId, subForm);
      } else {
        await createSubcategory(subForm);
      }
      cancelEditSub();
      loadSubcategories();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDeleteSub = async (id) => {
    if (!confirm("ลบหมวดหมู่ย่อยนี้?")) return;
    try {
      await deleteSubcategory(id);
      loadSubcategories();
    } catch (err) {
      setError(err.message);
    }
  };
  const toggleSubStatus = async (sub) => {
    try {
      await updateSubcategory(sub.id, { status: !sub.status });
      loadSubcategories();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003b6e] mb-6">จัดการหมวดหมู่</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* CATEGORY */}
      <h2 className="font-semibold text-gray-700 mb-2">หมวดหมู่หลัก</h2>
      <form onSubmit={handleCreateCategory} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 max-w-3xl">
        <input placeholder="ชื่อ (name)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
        <input placeholder="slug (เช่น industrial-balance)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
        <input placeholder="หัวข้อที่แสดง (title)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
        <input placeholder="คำอธิบายย่อย (subtitle)" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
        <div className="col-span-2 md:col-span-4 flex gap-2">
          <button className="bg-[#003b6e] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
            {editingCatId ? "บันทึกการแก้ไข" : "เพิ่มหมวดหมู่หลัก"}
          </button>
          {editingCatId && (
            <button type="button" onClick={cancelEditCategory} className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-50">
              ยกเลิก
            </button>
          )}
        </div>
      </form>

      <AdminSearchBar search={catSearch} onSearchChange={(v) => { setCatPage(1); setCatSearch(v); }} status={catStatus} onStatusChange={(v) => { setCatPage(1); setCatStatus(v); }} />

      <AdminTable
        columns={[
          { key: "name", label: "ชื่อ" },
          { key: "slug", label: "slug" },
          { key: "title", label: "title" },
          { key: "status", label: "สถานะ", render: (row) => <StatusToggle status={row.status} onToggle={() => toggleCategoryStatus(row)} /> },
          {
            key: "actions",
            label: "",
            render: (row) => (
              <div className="flex gap-3">
                <button onClick={() => startEditCategory(row)} className="text-[#003b6e] text-xs hover:underline">แก้ไข</button>
                <button onClick={() => handleDeleteCategory(row.id)} className="text-red-500 text-xs hover:underline">ลบ</button>
              </div>
            ),
          },
        ]}
        rows={categories}
      />
      <AdminPagination meta={catMeta} onPageChange={setCatPage} />

      {/* SUBCATEGORY */}
      <h2 className="font-semibold text-gray-700 mt-8 mb-2">หมวดหมู่ย่อย</h2>
      <form onSubmit={handleCreateSub} className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 max-w-4xl">
        <select value={subForm.categoryId} onChange={(e) => setSubForm({ ...subForm, categoryId: e.target.value })} className="border rounded-lg px-3 py-2 text-sm">
          <option value="">เลือกหมวดหมู่หลัก</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input placeholder="slug (เช่น phardness)" value={subForm.slug} onChange={(e) => setSubForm({ ...subForm, slug: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
        <input placeholder="title" value={subForm.title} onChange={(e) => setSubForm({ ...subForm, title: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
        <input placeholder="subtitle" value={subForm.subtitle} onChange={(e) => setSubForm({ ...subForm, subtitle: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <button className="bg-[#003b6e] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
            {editingSubId ? "บันทึก" : "เพิ่ม"}
          </button>
          {editingSubId && (
            <button type="button" onClick={cancelEditSub} className="px-3 py-2 rounded-lg text-sm border hover:bg-gray-50">
              ยกเลิก
            </button>
          )}
        </div>
      </form>
      {editingSubId && (
        <p className="text-xs text-gray-500 mb-2 max-w-4xl">
          เปลี่ยน "เลือกหมวดหมู่หลัก" ด้านบนแล้วกด บันทึก เพื่อย้ายหมวดหมู่ย่อยนี้ไปหมวดหมู่อื่น
        </p>
      )}

      <AdminSearchBar search={subSearch} onSearchChange={(v) => { setSubPage(1); setSubSearch(v); }} status={subStatus} onStatusChange={(v) => { setSubPage(1); setSubStatus(v); }} />

      <AdminTable
        columns={[
          { key: "slug", label: "slug" },
          { key: "title", label: "title" },
          { key: "category", label: "หมวดหมู่หลัก", render: (row) => row.category?.name || "-" },
          { key: "status", label: "สถานะ", render: (row) => <StatusToggle status={row.status} onToggle={() => toggleSubStatus(row)} /> },
          {
            key: "actions",
            label: "",
            render: (row) => (
              <div className="flex gap-3">
                <button onClick={() => startEditSub(row)} className="text-[#003b6e] text-xs hover:underline">แก้ไข / ย้าย</button>
                <button onClick={() => handleDeleteSub(row.id)} className="text-red-500 text-xs hover:underline">ลบ</button>
              </div>
            ),
          },
        ]}
        rows={subcategories}
      />
      <AdminPagination meta={subMeta} onPageChange={setSubPage} />
    </div>
  );
};

export default CategoryAdmin;
