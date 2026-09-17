import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStorefrontArticles } from "../api/productApi";
import bg1 from "../assets/image/goalflows/PAGE02.03BG.png"

// "ข่าวสาร / บทความน่ารู้" section on the "เกี่ยวกับโกลโฟล" page (spec section
// 3) - pulls published Articles from the admin panel via
// GET /api/articles/storefront, newest first. Shows "ยังไม่มีบทความ" when
// there are none, per spec.
const ArticleSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStorefrontArticles({ limit: 6 })
      .then((data) => setArticles(data.items))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
   // <section className="bg-gray-50 py-12 md:py-16 px-4">
      <section
      className="
    relative 
    pt-[ุ80px] md:pt-[60px]

    min-h-[400px] md:min-h-[600px]

    bg-no-repeat

    /* 📱 Mobile (คงเดิม) */
    bg-right-top
    bg-contain

    /* 💻 Desktop */
    md:bg-left-top
    md:bg-cover

    bg-[#f3f4f6]
  "
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003b6e]">
            {/* ข่าวสาร / บทความน่ารู้ */}
          </h2>
        </div>

        {loading && <p className="text-center text-gray-400">กำลังโหลด...</p>}

        {!loading && articles.length === 0 && (
          <p className="text-center text-gray-400">ยังไม่มีบทความ</p>
        )}

        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {article.images?.[0] ? (
                  <img
                    src={article.images[0].secure_url}
                    alt={article.name}
                    className="w-full aspect-[8/3] object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-300">
                    ไม่มีรูปภาพ
                  </div>
                )}

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-[#003b6e] line-clamp-2">
                    {article.name}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(article.publishedAt).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <Link
                    to={`/articles/${article.id}`}
                    className="mt-3 inline-block text-sm font-semibold text-[#003b6e] hover:underline"
                  >
                    อ่านเพิ่มเติม →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
