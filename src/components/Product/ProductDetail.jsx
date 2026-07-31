import React, { useEffect, useState } from "react";
import { FaSearch, FaLine } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import ProductSpecModal from "./ProductSpecModal";

// ============================================================================
// ProductDetail
// ----------------------------------------------------------------------------
// One single, data-driven component that replaces every hard-coded detail
// page that used to live under:
//   components/ViewProducts/*.jsx
//   components/ProductIndustrialBalance/*.jsx
//   components/ProductAnimalBalance/*.jsx
//   components/Producthopitalbalance/*.jsx
//   components/ProductSmalltool/*.jsx
//
// It is reached via /product/:id and fetches everything (title, images,
// feature list, spec tabs...) from src/api/productApi.js.
// ============================================================================
const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("spec");
  const [previewSpec, setPreviewSpec] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setActiveTab("spec");

    getProductById(id)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setError("ไม่พบสินค้านี้");
        } else {
          setProduct(data);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load product");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-10 px-4 md:px-10 text-center text-gray-400">
        กำลังโหลดข้อมูลสินค้า...
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-10 px-4 md:px-10 text-center text-red-500">
        {error || "ไม่พบสินค้านี้"}
      </section>
    );
  }

  const detail = product.detail || {};
  const backTo = product.subcategory
    ? `/products/${product.category}/${product.subcategory}`
    : `/products/${product.category}`;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-10 px-4 md:px-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-[#003b6e] tracking-wide">
          {detail.title || product.name}
        </h1>
        {detail.subtitle && (
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            {detail.subtitle}
          </p>
        )}
      </div>

      {/* BACK */}
      <div className="max-w-7xl mx-auto mb-4 flex justify-end">
        <Link to={backTo} className="text-sm text-gray-500 hover:text-[#003b6e] mr-4 md:mr-6">
          &larr; Back to Products
        </Link>
      </div>

      {/* PRODUCT */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* IMAGE */}
          <div className="group overflow-hidden rounded-xl">
            <img
              src={detail.mainImage || product.image}
              alt={product.name}
              className="w-full h-[250px] sm:h-[320px] md:h-[380px] object-cover rounded-xl group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* DETAIL */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
                {product.name}
              </h2>
              {detail.logo && (
                <div className="flex justify-start sm:justify-end">
                  <img
                    src={detail.logo}
                    alt="logo"
                    className="h-[50px] sm:h-[60px] md:h-[80px] w-auto object-contain"
                  />
                </div>
              )}
            </div>

            {detail.features?.length > 0 && (
              <div className="mb-4 mt-4">
                <h3 className="font-semibold text-[#003b6e] mb-2">
                  คุณสมบัติผลิตภัณฑ์ (Product Features)
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 leading-relaxed">
                  {detail.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {detail.applications?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-[#003b6e] mb-2">
                  การใช้งานผลิตภัณฑ์ (Product Application)
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {detail.applications.map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* BUTTON */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setPreviewSpec(product.specPdf)}
                className="flex items-center justify-center gap-2 w-full sm:w-[180px] bg-[#003b6e] text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-800 transition"
              >
                <FaSearch />
                Preview Spec
              </button>

              <a
                href={product.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-[180px] bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600 transition"
              >
                <FaLine className="text-lg" />
                ติดต่อ LINE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SPEC / DELIVERY TABS */}
      {(detail.specImage || detail.deliveryImage) && (
        <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-4 md:p-6">
          <div className="flex border-b mb-2">
            {detail.specImage && (
              <button
                onClick={() => setActiveTab("spec")}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  activeTab === "spec"
                    ? "border-b-2 border-[#003b6e] text-[#003b6e]"
                    : "text-gray-500 hover:text-[#003b6e]"
                }`}
              >
                Specification
              </button>
            )}
            {detail.deliveryImage && (
              <button
                onClick={() => setActiveTab("delivery")}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  activeTab === "delivery"
                    ? "border-b-2 border-[#003b6e] text-[#003b6e]"
                    : "text-gray-500 hover:text-[#003b6e]"
                }`}
              >
                Standard Delivery
              </button>
            )}
          </div>

          <div className="mt-0">
            {activeTab === "spec" && detail.specImage && (
              <div className="overflow-x-auto">
                <img src={detail.specImage} alt="Specification" className="w-full object-contain block transition duration-500" />
              </div>
            )}
            {activeTab === "delivery" && detail.deliveryImage && (
              <div className="overflow-x-auto">
                <img src={detail.deliveryImage} alt="Standard Delivery" className="w-full object-contain block transition duration-500" />
              </div>
            )}
          </div>
        </div>
      )}

      <ProductSpecModal specUrl={previewSpec} onClose={() => setPreviewSpec(null)} />
    </section>
  );
};

export default ProductDetail;
