import React, { useEffect, useState } from "react";
import { listArticles, createArticle, updateArticle, deleteArticle } from "../../api/adminApi";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminSearchBar from "../../components/admin/AdminSearchBar";
import StatusToggle from "../../components/admin/StatusToggle";
import ImageField from "../../components/admin/ImageField";
import useEcomStore from "../../store/eom-store";

const emptyForm = { name: "", excerpt: "", description: "", imageUrl: "" };

const ArticleAdmin = () => {
  const hasPermission = useEcomStore((state) => state.hasPermission);
  const [articles, setArticles] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await listArticles({ page, search, status });
      setArticles(data.items);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, status]);

  const startEdit = (article) => {
    setEditingId(article.id);
    setForm({
      name: article.name,
      excerpt: article.excerpt || "",
      description: article.description,
      imageUrl: article.images?.[0]?.secure_url || "",
    });
  };
  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return;
    const payload = {
      name: form.name,
      excerpt: form.excerpt,
      description: form.description,
      images: form.imageUrl
        ? [{ asset_id: "manual", public_id: "manual", url: form.imageUrl, secure_url: form.imageUrl }]
        : undefined,
    };
    try {
      if (editingId) {
        await updateArticle(editingId, payload);
      } else {
        await createArticle(payload);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("ลบบทความนี้?")) return;
    try {
      await deleteArticle(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleStatus = async (article) => {
    try {
      await updateArticle(article.id, { status: !article.status });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003b6e] mb-6">จัดการบทความ</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {(hasPermission("article.create") || (editingId && hasPermission("article.edit"))) && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 mb-6 max-w-xl space-y-3">
          <input
            placeholder="ชื่อบทความ"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            placeholder="คำอธิบายย่อ (แสดงในหน้ารายการ)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <textarea
            placeholder="เนื้อหาบทความแบบเต็ม"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <ImageField label="รูปปก" value={form.imageUrl} onChange={(v) => setForm({ ...form, imageUrl: v })} />
          <div className="flex gap-2">
            <button className="bg-[#003b6e] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
              {editingId ? "บันทึกการแก้ไข" : "เพิ่มบทความ"}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-50">
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      )}

      <AdminSearchBar search={search} onSearchChange={(v) => { setPage(1); setSearch(v); }} status={status} onStatusChange={(v) => { setPage(1); setStatus(v); }} />

      <AdminTable
        columns={[
          {
            key: "image",
            label: "รูป",
            render: (row) =>
              row.images?.[0] ? (
                <img src={row.images[0].secure_url} alt="" className="h-10 w-10 object-cover rounded" />
              ) : (
                "-"
              ),
          },
          { key: "name", label: "ชื่อ" },
          { key: "excerpt", label: "คำอธิบายย่อ", render: (row) => row.excerpt || "-" },
          {
            key: "publishedAt",
            label: "วันที่เผยแพร่",
            render: (row) => new Date(row.publishedAt).toLocaleDateString("th-TH"),
          },
          {
            key: "status",
            label: "สถานะ",
            render: (row) =>
              hasPermission("article.edit") ? (
                <StatusToggle status={row.status} onToggle={() => toggleStatus(row)} />
              ) : (
                <span className={`text-xs px-2 py-1 rounded-lg ${row.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {row.status ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                </span>
              ),
          },
          {
            key: "actions",
            label: "",
            render: (row) => (
              <div className="flex gap-3">
                {hasPermission("article.edit") && (
                  <button onClick={() => startEdit(row)} className="text-[#003b6e] text-xs hover:underline">แก้ไข</button>
                )}
                {hasPermission("article.delete") && (
                  <button onClick={() => handleDelete(row.id)} className="text-red-500 text-xs hover:underline">ลบ</button>
                )}
              </div>
            ),
          },
        ]}
        rows={articles}
      />
      <AdminPagination meta={meta} onPageChange={setPage} />
    </div>
  );
};

export default ArticleAdmin;
