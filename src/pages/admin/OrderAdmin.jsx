import React, { useEffect, useState } from "react";
import { listOrders, changeOrderStatus } from "../../api/adminApi";
import AdminTable from "../../components/admin/AdminTable";

const STATUS_OPTIONS = ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"];

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const load = () => listOrders().then(setOrders).catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (orderId, orderStatus) => {
    try {
      await changeOrderStatus(orderId, orderStatus);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003b6e] mb-6">จัดการออร์เดอร์</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <AdminTable
        columns={[
          { key: "id", label: "#" },
          { key: "orderedBy", label: "ลูกค้า", render: (row) => row.orderedBy?.email || "-" },
          { key: "cartTotal", label: "ยอดรวม", render: (row) => row.cartTotal?.toLocaleString() },
          { key: "items", label: "จำนวนรายการ", render: (row) => row.products?.length || 0 },
          {
            key: "orderStatus",
            label: "สถานะ",
            render: (row) => (
              <select
                value={row.orderStatus}
                onChange={(e) => handleStatusChange(row.id, e.target.value)}
                className="border rounded-lg px-2 py-1 text-xs"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            ),
          },
          {
            key: "createdAt",
            label: "วันที่",
            render: (row) => new Date(row.createdAt).toLocaleDateString("th-TH"),
          },
        ]}
        rows={orders}
      />
    </div>
  );
};

export default OrderAdmin;
