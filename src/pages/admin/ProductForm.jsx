import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  createProduct,
  updateProduct,
  listCategories,
  listSubcategories,
  listBrands,
} from "../../api/adminApi";
import ImageField from "../../components/admin/ImageField";

const emptyForm = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  subcategoryId: "",
  brandId: "",
  lineUrl: "",
  specPdf: "",
  thumbnail: "",
  mainImage: "",
  logoImage: "",
  specImage: "",
  deliveryImage: "",
  featuresText: "",
  applicationsText: "",
};

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // listCategories/listSubcategories/listBrands now return
    // { items, meta } (Phase 2's pagination) - these dropdowns need the
    // FULL list, not just one page, so request a high limit and unwrap
    // .items ourselves.
    listCategories({ limit: 100 }).then((data) => setCategories(data.items)).catch(() => {});
    listSubcategories({ limit: 200 }).then((data) => setSubcategories(data.items)).catch(() => {});
    listBrands({ limit: 100 }).then((data) => setBrands(data.items)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    getProduct(id).then((p) => {
      setForm({
        slug: p.slug || "",
        title: p.title || "",
        subtitle: p.subtitle || "",
        description: p.description || "",
        price: p.price ?? "",
        quantity: p.quantity ?? "",
        categoryId: p.categoryId || "",
        subcategoryId: p.subcategoryId || "",
        brandId: p.brandId || "",
        lineUrl: p.lineUrl || "",
        specPdf: p.specPdf || "",
        thumbnail: p.thumbnail || "",
        mainImage: p.mainImage || "",
        logoImage: p.logoImage || "",
        specImage: p.specImage || "",
        deliveryImage: p.deliveryImage || "",
        featuresText: (p.features || []).join("\n"),
        applicationsText: (p.applications || []).join("\n"),
      });
    }).catch((err) => setError(err.message));
  }, [id, isEdit]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const visibleSubcategories = subcategories.filter(
    (s) => String(s.categoryId) === String(form.categoryId)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle,
      description: form.description,
      price: form.price || 0,
      quantity: form.quantity || 0,
      categoryId: form.categoryId || null,
      subcategoryId: form.subcategoryId || null,
      brandId: form.brandId || null,
      lineUrl: form.lineUrl,
      specPdf: form.specPdf,
      thumbnail: form.thumbnail,
      mainImage: form.mainImage,
      logoImage: form.logoImage,
      specImage: form.specImage,
      deliveryImage: form.deliveryImage,
      features: form.featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
      applications: form.applicationsText.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.message || "บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003b6e] mb-6">
        {isEdit ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-3xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Slug (URL, ไม่ซ้ำ)</label>
            <input value={form.slug} onChange={set("slug")} required className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">ชื่อสินค้า</label>
            <input value={form.title} onChange={set("title")} required className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">คำโปรย (subtitle)</label>
          <input value={form.subtitle} onChange={set("subtitle")} className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">รายละเอียด (description)</label>
          <textarea value={form.description} onChange={set("description")} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">ราคา</label>
            <input type="number" value={form.price} onChange={set("price")} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">จำนวนคงเหลือ</label>
            <input type="number" value={form.quantity} onChange={set("quantity")} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">หมวดหมู่หลัก</label>
            <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value, subcategoryId: "" })} className="w-full border rounded-lg px-3 py-2 text-sm">
              <option value="">- ไม่ระบุ -</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">หมวดหมู่ย่อย</label>
            <select value={form.subcategoryId} onChange={set("subcategoryId")} className="w-full border rounded-lg px-3 py-2 text-sm">
              <option value="">- ไม่ระบุ -</option>
              {visibleSubcategories.map((s) => (
                <option key={s.id} value={s.id}>{s.title || s.slug}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">แบรนด์</label>
          <select value={form.brandId} onChange={set("brandId")} className="w-full max-w-xs border rounded-lg px-3 py-2 text-sm">
            <option value="">- ไม่ระบุ -</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">ลิงก์ LINE (สนใจสอบถาม)</label>
            <input value={form.lineUrl} onChange={set("lineUrl")} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">ลิงก์ไฟล์ Spec PDF</label>
            <input value={form.specPdf} onChange={set("specPdf")} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageField label="รูปสำหรับหน้ารายการ (thumbnail)" value={form.thumbnail} onChange={(v) => setForm({ ...form, thumbnail: v })} />
          <ImageField label="รูปหลักหน้ารายละเอียด (mainImage)" value={form.mainImage} onChange={(v) => setForm({ ...form, mainImage: v })} />
          <ImageField label="โลโก้แบรนด์ (logo)" value={form.logoImage} onChange={(v) => setForm({ ...form, logoImage: v })} />
          <ImageField label="รูป Specification" value={form.specImage} onChange={(v) => setForm({ ...form, specImage: v })} />
          <ImageField label="รูป Standard Delivery" value={form.deliveryImage} onChange={(v) => setForm({ ...form, deliveryImage: v })} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">คุณสมบัติผลิตภัณฑ์ (บรรทัดละ 1 ข้อ)</label>
            <textarea value={form.featuresText} onChange={set("featuresText")} rows={5} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">การใช้งานผลิตภัณฑ์ (บรรทัดละ 1 ข้อ)</label>
            <textarea value={form.applicationsText} onChange={set("applicationsText")} rows={5} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-[#003b6e] text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-800 disabled:opacity-60">
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
          <button type="button" onClick={() => navigate("/admin/products")} className="px-5 py-2 rounded-lg text-sm border hover:bg-gray-50">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
