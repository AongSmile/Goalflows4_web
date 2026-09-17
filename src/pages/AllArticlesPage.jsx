import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AllArticlesPage = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => setArticles(data));
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4">

                <h1 className="text-3xl font-bold mb-8">
                    📚 บทความทั้งหมด
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                        >
                            <img
                                src={`https://source.unsplash.com/600x400/?tech,${item.id}`}
                                alt="article"
                                {/* className="w-full h-48 object-cover" */}
                                className="w-full h-full object-contain block"
                            />

                            <div className="p-4">
                                <h2 className="font-semibold text-lg line-clamp-2">
                                    {item.title}
                                </h2>

                                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                                    {item.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default AllArticlesPage
