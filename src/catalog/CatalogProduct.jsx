import { Children, useState } from "react";
import { FaLine, FaFacebook } from "react-icons/fa6";
import { motion, useScroll, useTransform } from "framer-motion";
import bgImage from "../assets/image/bg/PAGE05.png";
import mitutoyo from "../assets/image/catalog/mitutoyo.png"

export default function Contactus() {

  return (
    <section className="relative overflow-hidden py-4 min-h-[100vh] sm:min-h-[90vh]">
      {/* 🌫️ Background Parallax Layer 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* HEADER */}
        <motion.dev
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 uppercase drop-shadow-sm">
            Catalog Product
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            แคตตาล็อกสินค้า
          </p>
        </motion.dev>
        {/* MAIN GRID*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {/* LEFT : MAP + CONTACT INFO */}
          {/* แคต 1 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/40"
          >
            <img src={mitutoyo} className="py-2" alt="" />
            <div className="text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200 shadow-md"
              >
                <a href="https://online.anyflip.com/yctny/nsao/mobile/index.html?1602822912753" target="_blank" rel="noopener noreferrer">Read me</a>
              </motion.button>
            </div>
          </motion.div>
          {/* แคต1 */}

          {/* RIGHT : CONTACT FORM */}
          {/* แคต2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/40"
          >

            <div className="text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200 shadow-md"
              >

                <a href="#">Read me</a>
              </motion.button>
            </div>
          </motion.div>
          {/* แคต2 */}
        </div>
      </div>
    </section>
  );
}




