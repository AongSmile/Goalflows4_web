import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listProducts, deleteProduct } from "../../api/adminApi";
import AdminTable from "../../components/admin/AdminTable";
import useEcomStore from "../../store/eom-store";

const ProductAdmin = () => {
  const hasPermission = useEcomStore((state) => state.hasPermission);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const load = () => listProducts(500).then(setProducts).catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("ลบสินค้านี้?")) return;
    try {
      await deleteProduct(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#003b6e]">จัดการสินค้า</h1>
        {hasPermission("product.create") && (
          <Link
            to="/admin/products/new"
            className="bg-[#003b6e] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800"
          >
            + เพิ่มสินค้า
          </Link>
        )}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <AdminTable
        columns={[
          {
            key: "thumbnail",
            label: "รูป",
            render: (row) =>
              row.thumbnail ? (
                <img src={row.thumbnail} alt="" className="h-10 w-10 object-cover rounded" />
              ) : (
                "-"
              ),
          },
          { key: "title", label: "ชื่อสินค้า" },
          { key: "category", label: "หมวดหมู่", render: (row) => row.category?.name || "-" },
          { key: "subcategory", label: "หมวดหมู่ย่อย", render: (row) => row.subcategory?.title || "-" },
          {
            key: "actions",
            label: "",
            render: (row) => (
              <div className="flex gap-3">
                {hasPermission("product.edit") && (
                  <Link to={`/admin/products/${row.id}/edit`} className="text-[#003b6e] text-xs hover:underline">
                    แก้ไข
                  </Link>
                )}
                {hasPermission("product.delete") && (
                  <button onClick={() => handleDelete(row.id)} className="text-red-500 text-xs hover:underline">
                    ลบ
                  </button>
                )}
              </div>
            ),
          },
        ]}
        rows={products}
      />
    </div>
  );
};

export default ProductAdmin;
