import React, { useEffect, useState } from "react";
import {
  listProducts,
  listCategories,
  listBrands,
  listOrders,
  listUsers,
  listArticles,
} from "../../api/adminApi";
import useEcomStore from "../../store/eom-store";

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-3xl font-bold text-[#003b6e] mt-1">{value}</p>
  </div>
);

// Category/Subcategory/Brand/Order/User endpoints are admin-only (see
// server/README.md's Phase 1 section) - a Staff user calling them gets a
// 403, so the dashboard only fetches what the current user can actually
// see. This matches the spec's "Dashboard (เฉพาะข้อมูล)" note for Staff -
// a narrower dashboard, not a broken one.
const AdminDashboard = () => {
  const isAdmin = useEcomStore((state) => state.user?.role === "admin");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const calls = [
      listProducts(1000).then((data) => ({ products: data.length })),
      // listArticles() now returns { items, meta } - meta.total is the
      // real count across all pages, items.length would only be page 1.
      listArticles({ limit: 1 }).then((data) => ({ articles: data.meta.total })),
    ];

    if (isAdmin) {
      calls.push(
        listCategories({ limit: 1 }).then((data) => ({ categories: data.meta.total })),
        listBrands({ limit: 1 }).then((data) => ({ brands: data.meta.total })),
        listOrders().then((data) => ({ orders: data.length })),
        listUsers().then((data) => ({ users: data.length }))
      );
    }

    Promise.all(calls)
      .then((results) => {
        setStats(Object.assign({}, ...results));
      })
      .catch((err) => setError(err.message || "โหลดข้อมูลไม่สำเร็จ"));
  }, [isAdmin]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003b6e] mb-6">ภาพรวมระบบ</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!stats && !error && <p className="text-gray-400">กำลังโหลด...</p>}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="สินค้า" value={stats.products} />
          <StatCard label="บทความ" value={stats.articles} />
          {isAdmin && (
            <>
              <StatCard label="หมวดหมู่" value={stats.categories} />
              <StatCard label="แบรนด์" value={stats.brands} />
              <StatCard label="ออร์เดอร์" value={stats.orders} />
              <StatCard label="ผู้ใช้" value={stats.users} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
