import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaLine, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getProducts, getCategoryMeta } from "../../api/productApi";
import ProductSpecModal from "./ProductSpecModal";

const ITEMS_PER_PAGE = 8;

const ProductList = () => {
  const { category, subcategory } = useParams();

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [previewSpec, setPreviewSpec] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setCurrentPage(1);

    Promise.all([
      getProducts({ category, subcategory }),
      getCategoryMeta(category, subcategory),
    ])
      .then(([productList, categoryMeta]) => {
        if (cancelled) return;

        setProducts(productList);
        setMeta(categoryMeta);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load products");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [category, subcategory]);

  // SEARCH
  const filtered = useMemo(() => {
    if (!search.trim()) return products;

    const q = search.trim().toLowerCase();

    return products.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }, [products, search]);

  // เมื่อค้นหาใหม่ ให้กลับไปหน้า 1
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // จำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  // รายการสินค้าที่แสดงในหน้าปัจจุบัน
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filtered.slice(startIndex, endIndex);
  }, [filtered, currentPage]);

  // เปลี่ยนหน้า
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    // เลื่อนกลับขึ้นด้านบน
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-[#003b6e]">
          {meta?.title || "Products"}
        </h1>

        {meta?.subtitle && (
          <p className="text-gray-500 mt-2">
            {meta.subtitle}
          </p>
        )}
      </div>

      {/* SEARCH */}
      <div className="relative w-[90%] sm:w-[70%] md:w-[400px] mx-auto mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาสินค้า..."
          className="
            w-full
            pl-4 pr-12 py-2
            border rounded-xl
            text-sm md:text-base
            focus:outline-none
            focus:ring-2
            focus:ring-[#003b6e]
          "
        />

        <button
          type="button"
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-[#003b6e]
          "
        >
          <FaSearch />
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400">
          กำลังโหลดสินค้า...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-500">
          {error}
        </p>
      )}

      {/* EMPTY */}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-center text-gray-400">
          ไม่พบสินค้า
        </p>
      )}

      {/* PRODUCT GRID */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <div
            className="
              max-w-7xl
              mx-auto
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >
            {paginatedProducts.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  hover:shadow-xl
                  transition
                  duration-300
                  overflow-hidden
                  group
                "
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-full
                        h-auto
                        object-cover
                        group-hover:scale-105
                        transition
                        duration-500
                      "
                    />
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-[#003b6e]">
                    Product: {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    เครื่องมือคุณภาพสูง
                  </p>

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      justify-center
                      items-center
                      gap-3
                      mt-4
                    "
                  >
                    {/* SPECIFICATION */}
                    <button
                      onClick={() => setPreviewSpec(item.specPdf)}
                      className="
                        w-[160px]
                        bg-[#003b6e]
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        hover:bg-blue-800
                        transition
                      "
                    >
                      Preview <br />
                      Specification
                    </button>

                    {/* LINE */}
                    <a
                      href={item.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-[160px]
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-green-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        hover:bg-green-600
                        transition
                      "
                    >
                      <FaLine className="text-xl md:text-2xl" />

                      <span className="leading-tight text-center">
                        สนใจ
                        <br />
                        สอบถาม
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-12">

              {/* PREVIOUS */}
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-lg
                  border
                  bg-white
                  text-[#003b6e]
                  hover:bg-[#003b6e]
                  hover:text-white
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                <FaChevronLeft />
                <span className="hidden sm:inline">
                  ก่อนหน้า
                </span>
              </button>

              {/* PAGE NUMBERS */}
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`
                    min-w-[40px]
                    h-[40px]
                    px-3
                    rounded-lg
                    border
                    transition
                    ${
                      currentPage === page
                        ? "bg-[#003b6e] text-white border-[#003b6e]"
                        : "bg-white text-[#003b6e] hover:bg-gray-100"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              {/* NEXT */}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-lg
                  border
                  bg-white
                  text-[#003b6e]
                  hover:bg-[#003b6e]
                  hover:text-white
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                <span className="hidden sm:inline">
                  ถัดไป
                </span>
                <FaChevronRight />
              </button>

            </div>
          )}

          {/* RESULT COUNT */}
          <div className="text-center text-gray-400 text-sm mt-4">
            แสดง{" "}
            {Math.min(
              (currentPage - 1) * ITEMS_PER_PAGE + 1,
              filtered.length
            )}
            -
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filtered.length
            )}{" "}
            จาก {filtered.length} รายการ
          </div>
        </>
      )}

      {/* SPEC MODAL */}
      <ProductSpecModal
        specUrl={previewSpec}
        onClose={() => setPreviewSpec(null)}
      />

    </section>
  );
};

export default ProductList;

// import React, { useEffect, useMemo, useState } from "react";
// import { FaSearch, FaLine } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import { getProducts, getCategoryMeta } from "../../api/productApi";
// import ProductSpecModal from "./ProductSpecModal";

// // ============================================================================
// // ProductList
// // ----------------------------------------------------------------------------
// // One single, data-driven component that replaces every hard-coded listing
// // page that used to live under:
// //   components/Products/*.jsx
// //   components/SmallTools/*.jsx
// //   components/IndustrialBalance/IndustrialBalance.jsx
// //   components/AnimalBalance/AnimalBalance.jsx
// //   components/HostpitalBalance/HospitalBalance.jsx
// //
// // The page it shows is entirely controlled by the :category / :subcategory
// // route params, and the product data is loaded through src/api/productApi.js
// // (which today reads a mock JSON file and tomorrow can point at the real
// // backend API just by setting VITE_API_BASE_URL).
// // ============================================================================
// const ProductList = () => {
//   const { category, subcategory } = useParams();

//   const [products, setProducts] = useState([]);
//   const [meta, setMeta] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [previewSpec, setPreviewSpec] = useState(null);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError(null);

//     Promise.all([
//       getProducts({ category, subcategory }),
//       getCategoryMeta(category, subcategory),
//     ])
//       .then(([productList, categoryMeta]) => {
//         if (cancelled) return;
//         setProducts(productList);
//         setMeta(categoryMeta);
//       })
//       .catch((err) => {
//         if (!cancelled) setError(err.message || "Failed to load products");
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });

//     return () => {
//       cancelled = true;
//     };
//   }, [category, subcategory]);

//   const filtered = useMemo(() => {
//     if (!search.trim()) return products;
//     const q = search.trim().toLowerCase();
//     return products.filter((p) => p.name.toLowerCase().includes(q));
//   }, [products, search]);

//   return (
//     <section className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto mb-10 text-center">
//         <h1 className="text-2xl md:text-4xl font-bold text-[#003b6e]">
//           {meta?.title || "Products"}
//         </h1>
//         {meta?.subtitle && (
//           <p className="text-gray-500 mt-2">{meta.subtitle}</p>
//         )}
//       </div>

//       {/* SEARCH */}
//       <div className="relative w-[90%] sm:w-[70%] md:w-[400px] mx-auto mb-8">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="ค้นหาสินค้า..."
//           className="w-full pl-4 pr-12 py-2 border rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#003b6e]"
//         />
//         <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003b6e]">
//           <FaSearch />
//         </button>
//       </div>

//       {loading && (
//         <p className="text-center text-gray-400">กำลังโหลดสินค้า...</p>
//       )}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && filtered.length === 0 && (
//         <p className="text-center text-gray-400">ไม่พบสินค้า</p>
//       )}

//       {/* PRODUCT GRID */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filtered.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
//           >
//             <div className="overflow-hidden">
//               <Link to={`/product/${item.id}`}>
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
//                 />
//               </Link>
//             </div>

//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-[#003b6e]">
//                 Product: {item.name}
//               </h2>
//               <p className="text-gray-500 text-sm mt-1">เครื่องมือคุณภาพสูง</p>

//               <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
//                 <button
//                   onClick={() => setPreviewSpec(item.specPdf)}
//                   className="w-[160px] bg-[#003b6e] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800"
//                 >
//                   Preview <br />
//                   Specification
//                 </button>

//                 <a
//                   href={item.lineUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-[160px] flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition"
//                 >
//                   <FaLine className="text-xl md:text-2xl" />
//                   <span className="leading-tight text-center">
//                     สนใจ<br />สอบถาม
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <ProductSpecModal
//         specUrl={previewSpec}
//         onClose={() => setPreviewSpec(null)}
//       />
//     </section>
//   );
// };

// export default ProductList;
