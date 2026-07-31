import React, { useEffect, useState } from 'react'
import img01 from '../assets/img/img-01.png'
import bgImage from '../assets/image/new/back01.jpg'
import { Link } from "react-router-dom";

function Pixelgrade() {

    const [articles, setArticles] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Fetch API
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(
                    "https://jsonplaceholder.typicode.com/posts?_limit=6"
                );
                const data = await res.json();
                setArticles(data);
            } catch (err) {
                setError("โหลดข้อมูลไม่สำเร็จ");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Load more
    // const handleLoadMore = () => {
    //     setVisibleCount((prev) => prev + 3);
    // };

    return (
        <div
            className="relative py-10 w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}>

            <div className="max-w-7xl mx-auto px-4">

                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    📚 สาระน่ารู้
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {loading && (
                            <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
                        )}

                        {error && (
                            <p className="text-red-500">{error}</p>
                        )}

                        {/* แสดงตามจำนวน */}
                        {articles.slice(0, visibleCount).map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row"
                            >
                                <img
                                    src={`https://source.unsplash.com/600x400/?tech,${item.id}`}
                                    alt="article"
                                    className="w-full md:w-1/3 h-48 object-cover"
                                />

                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                                        {item.title}
                                    </h2>

                                    <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                                        {item.body}
                                    </p>

                                    <button className="mt-4 text-blue-600 hover:underline text-sm">
                                        อ่านเพิ่มเติม →
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* ปุ่ม Load More */}
                        {visibleCount < articles.length && (
                            <div className="text-center pt-4">
                                <Link
                                    to="/articles"
                                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
                                >
                                    ดูบทความเพิ่มเติม
                                </Link>
                                {/* <button
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
                                >
                                    ดูบทความเพิ่มเติม
                                </button> */}
                            </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        <div className="bg-white rounded-2xl shadow-md p-5">
                            <h3 className="font-semibold text-lg mb-4">
                                🔥 บทความแนะนำ
                            </h3>

                            {articles.slice(0, 3).map((item) => (
                                <p
                                    key={item.id}
                                    className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer mb-2"
                                >
                                    {item.title}
                                </p>
                            ))}
                        </div>

                        {/* <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold">
                                🚀 เรียน React + Tailwind
                            </h3>
                            <p className="text-sm mt-2">
                                เริ่มต้นทำเว็บสวย ๆ ได้ทันที
                            </p>
                            <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
                                เริ่มเลย
                            </button>
                        </div> */}

                    </div>
                </div>
            </div>


            {/* <div className='container mx-auto max-w-[1320px] p-10 grid grid-cols-1 md:grid-cols-2'>
                <div>
                    <img src={img01} alt="" />
                </div>
                <div>
                    <h3 className='mt-5 md:mt-0 text-[2.25rem] font-semibold text-[#1E3A8A]'>บริษัท โกลโฟล อินสตรูเมนท์ จำกัด</h3>
                    <p className='text-[#717171] my-5'>
                        เรามีความรู้และความเชี่ยวชาญในเครื่องมือต่างๆทางอุตสาหกรรม<br /><br />
                        - จำหน่ายเครื่องมือวัด/เครื่องชั่ง <br />
                        - จำหน่าย/จัดหาอุปกรณ์ตามความต้องการ <br />
                        - ให้บริการสอบเทียบเครื่องมือต่างๆ <br />
                        - บริการซ่อมเครื่องมือ/ปรับปรุงแก้ไขอุปกรณ์ต่างๆ <br />
                        - งานสั่งทำเครื่องมือตามความต้องการตามลักษณะงาน
                    </p>
                    <a href="" className='inline-flex justify-center items-center py-3 px-8 mt-5 bg-[#4CAF4F] text-white rounded-md'>ติดต่อเรา</a>
                </div>
            </div> */}
        </div>
    )
}

export default Pixelgrade