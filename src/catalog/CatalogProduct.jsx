import React, { useEffect, useState } from "react";

function CatalogProduct() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products"); // 🔥 เปลี่ยนเป็น API จริงได้
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // filter search
  const filtered = products.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto max-w-[1320px] px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            🛒 Catalog Product
          </h1>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            className="w-full md:w-[300px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">กำลังโหลดสินค้า...</p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* GRID */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="h-[220px] flex items-center justify-center bg-gray-100 p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/200x200?text=No+Image")
                    }
                    className="h-full object-contain group-hover:scale-105 transition"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-blue-600 font-bold mt-2">
                    ฿ {item.price}
                  </p>

                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* NO RESULT */}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            😅 ไม่พบสินค้าที่ค้นหา
          </p>
        )}

      </div>
    </div>
  );
}

export default CatalogProduct;