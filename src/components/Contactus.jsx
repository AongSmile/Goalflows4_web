import { Children, useState } from "react";
import { FaLine, FaFacebook } from "react-icons/fa6";
import { motion, useScroll, useTransform } from "framer-motion";
import bgImage from "../assets/image/bg/PAGE05.png";

export default function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // --- Parallex Effect ---
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API endpoint
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;
    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };
  const Callto = ({ phone, children }) => {
    return <a href={`tel:${phone}`}>{children}</a>;
  };

  return (
     <section className="relative overflow-hidden py-4 min-h-[100vh] sm:min-h-[90vh]">
        {/* 🌫️ Background Parallax Layer 2 */}
       <motion.div
        className="absolute inset-0 -z-20 bg-no-repeat bg-center opacity-40 bg-[length:120%_auto] sm:bg-[length:110%_auto] md:bg-cover"style={{ backgroundImage: `url(${bgImage})` }}
      ></motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
           {/* HEADER */}
          <motion.dev
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 uppercase drop-shadow-sm">
            GOAL FLOW INSTRUMENT CO., LTD.
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            บริษัท โกลโฟล อินสตรูเมนท์ จำกัด
          </p>
          </motion.dev>
          {/* MAIN GRID*/}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
         {/* LEFT : MAP + CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-white/40"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123970.1963705854!2d100.47753046592196!3d13.834917030933486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e283f9364bc15d%3A0x499cf3f20fd88569!2z4Lia4LiI4LiBLiDguYLguIHguKXguYLguJ_guKUg4Lit4Li04LiZ4Liq4LiV4Lij4Li54LmA4Lih4LiZ4LiX4LmM!5e0!3m2!1sth!2sth!4v1749024758237!5m2!1sth!2sth"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              className="border-none"
            ></iframe>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Our Address
              </h3>
              <p className="text-gray-700 mb-4">
                1/35 ซอย รังสิต-นครนายก 63/1 ต.ประชาธิปัตย์ อ.ธัญบุรี จ.ปทุมธานี
                12130
              </p>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <p className="text-gray-700">
                  Email:{" "}
                  <Mailto
                    email="goalflow4@gmail.com"
                    subject="สนใจสินค้า"
                    body="อยากจะขอข้อมูลสินค้าเพิ่มเติม"
                  >
                    <span className="text-blue-600 font-medium hover:underline">
                      goalflow4@gmail.com
                    </span>
                  </Mailto>
                </p>
                <p className="text-gray-700">
                  Phone:{" "}
                  <Callto phone="+66841594643">
                    <span className="text-blue-600 font-medium hover:underline">
                      +66 84-159-4643
                    </span>
                  </Callto>
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://line.me/ti/p/jfZGdWx11H"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full font-medium hover:bg-green-600 transition"
                  >
                    <FaLine size={20} /> LINE
                  </a>

                  <a
                    href="https://www.facebook.com/share/16zLLRnBio/?mibextid=wwXlfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition"
                  >
                    <FaFacebook size={20} /> Facebook
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

           {/* RIGHT : CONTACT FORM */}
         <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/40"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
              ติดต่อเรา / Contact Form
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  ชื่อของคุณ
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="กรอกชื่อของคุณ"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  ข้อความ
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  placeholder="เขียนข้อความของคุณ..."
                ></textarea>
              </div>
              <div className="text-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200 shadow-md"
                >
                  ส่งข้อความ / Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
         </div>
       </div>
     </section>
  );
}




