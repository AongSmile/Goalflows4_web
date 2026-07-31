import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../../api/productApi";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getArticleById(id)
      .then((data) => {
        if (!data) setError("ไม่พบบทความนี้");
        else setArticle(data);
      })
      .catch((err) => setError(err.message || "โหลดบทความไม่สำเร็จ"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen py-24 text-center text-gray-400">
        กำลังโหลด...
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="min-h-screen py-24 text-center text-red-500">
        {error || "ไม่พบบทความนี้"}
      </section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {article.images?.[0] && (
          <img
            src={article.images[0].secure_url}
            alt={article.name}
            className="w-full h-64 md:h-80 object-cover"
          />
        )}
        <div className="p-6 md:p-10">
          <Link to="/Goalflows" className="text-sm text-gray-500 hover:text-[#003b6e]">
            &larr; กลับไปหน้าเกี่ยวกับโกลโฟล
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[#003b6e] mt-3">
            {article.name}
          </h1>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(article.publishedAt).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
            {article.description}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;
