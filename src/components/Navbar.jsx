import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/image/GF-1.png";
import { getNavbar } from "../api/productApi";
import useEcomStore from "../store/eom-store";

// Static, non-DB menu items (spec section 2/7 is specifically about
// product Category/Subcategory being dynamic - "บริการ", Catalog, and
// Contact aren't modeled in the Category table and stay hardcoded here).
const SERVICE_LINKS = [
  { label: "สอบเทียบ ISO17025", to: "/Workandservices" },
  { label: "ซ่อมเครื่องมือ", to: "/Workandservices" },
  { label: "บำรุงรักษาเครื่องมือ เครื่องจักร", to: "/Workandservices" },
  { label: "อบรมการใช้งาน", to: "/Workandservices" },
];

function categoryHref(category, subcategory) {
  return subcategory
    ? `/products/${category.slug}/${subcategory.slug}`
    : `/products/${category.slug}`;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop: which top-level Category's subcategory flyout is currently
  // shown to the right of the "สินค้าของเรา" panel (2-level hover).
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  // Pixel offset (within the first panel) of whichever Category row is
  // currently hovered - the subcategory flyout aligns its `top` to this so
  // it appears next to that specific row, not fixed at the top of the menu.
  const [hoveredRowOffset, setHoveredRowOffset] = useState(0);

  // Mobile: "สินค้าของเรา" accordion open/closed, which Category's
  // subcategory list is expanded, and the separate static "บริการ" accordion.
  const [productsOpen, setProductsOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [serviceOpen, setServiceOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);

  // Powers both the desktop 2-level flyout and the mobile nested accordion
  // below - this single fetch is what makes the whole menu dynamic (spec
  // section 2). Adding/editing/disabling a Category or Subcategory via the
  // admin panel shows up here on next page load, with zero code changes.
  useEffect(() => {
    getNavbar()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMobile = () => {
    setMenuOpen(false);
    setProductsOpen(false);
    setOpenCategoryId(null);
    setServiceOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-[#003b6e]/80 backdrop-blur-md border-b border-[#003b6e]/40 shadow-xl transition-all top-0">
      <div className="max-w-[1320px] mx-auto px-4 flex justify-between items-center h-[70px]">
        {/* LOGO */}
        <Link to="/">
          <img src={logo} className="h-20 drop-shadow-md transition-transform hover:scale-105" alt="" />
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          <li className="drop-shadow-md transition-transform hover:scale-105">
            <Link to="/">หน้าแรก</Link>
          </li>
          <li className="drop-shadow-md transition-transform hover:scale-105">
            <Link to="/Goalflows">เกี่ยวกับโกลโฟลฯ</Link>
          </li>

          {/* สินค้าของเรา - one top-level item, dropdown lists every
              Category top-to-bottom; hovering a Category that has
              Subcategories opens a second panel to its right listing them. */}
          <li
            className="relative group cursor-pointer"
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <div className="flex items-center gap-1">สินค้าของเรา ▼</div>

            <div
              className="absolute left-0 top-full w-[300px] bg-white text-black shadow-2xl
                opacity-0 invisible translate-y-3
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                transition-all duration-300 z-50 rounded-md max-h-[70vh] overflow-y-auto py-2"
            >
              {categories.length === 0 && (
                <p className="p-4 text-sm text-gray-400">ยังไม่มีหมวดหมู่สินค้า</p>
              )}
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onMouseEnter={(e) => {
                    setHoveredCategoryId(cat.subcategories.length > 0 ? cat.id : null);
                    setHoveredRowOffset(e.currentTarget.offsetTop);
                  }}
                  className={`px-4 py-3 flex items-center justify-between hover:bg-gray-100 ${
                    hoveredCategoryId === cat.id ? "bg-gray-100" : ""
                  }`}
                >
                  {cat.subcategories.length > 0 ? (
                    <span>{cat.title || cat.name}</span>
                  ) : (
                    <Link to={categoryHref(cat)} className="flex-1" onClick={closeMobile}>
                      {cat.title || cat.name}
                    </Link>
                  )}
                  {cat.subcategories.length > 0 && <span>›</span>}
                </div>
              ))}
            </div>

            {/* SUBCATEGORY FLYOUT - positioned to the right of the Category
                panel above (left-[300px]), vertically aligned with
                whichever Category row is hovered (hoveredRowOffset),
                rather than fixed at the top of the whole menu. */}
            {hoveredCategoryId && (
              <div
                className="absolute left-[300px] w-[280px] bg-white text-black shadow-2xl
                  rounded-md max-h-[70vh] overflow-y-auto py-2 z-50"
                style={{ top: `calc(100% + ${hoveredRowOffset}px)` }}
                onMouseEnter={() => setHoveredCategoryId(hoveredCategoryId)}
              >
                {categories
                  .find((c) => c.id === hoveredCategoryId)
                  ?.subcategories.map((sub) => (
                    <div key={sub.id} className="px-4 py-3 hover:bg-gray-100">
                      <Link to={categoryHref(categories.find((c) => c.id === hoveredCategoryId), sub)}>
                        {sub.title || sub.slug}
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </li>

          {/* SERVICE (static) */}
          <li className="relative group cursor-pointer">
            <div className="flex items-center gap-1">บริการ ▼</div>
            <div className="absolute left-0 top-full w-[220px] bg-white text-black shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {SERVICE_LINKS.map((item) => (
                <div key={item.label} className="p-3 hover:bg-gray-100">
                  <Link to={item.to}>{item.label}</Link>
                </div>
              ))}
            </div>
          </li>

          <li className="drop-shadow-md transition-transform hover:scale-105">
            <Link to="/Catalog">Catalog</Link>
          </li>
          <li>
            <Link to="/contact">ติดต่อเรา</Link>
          </li>
        </ul>

        {/* RIGHT BUTTON (desktop) */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              {(user.role === "admin" || user.role === "staff") && (
                <Link to="/admin" className="text-white text-sm hover:underline">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="bg-white/10 px-4 py-1 rounded text-white text-sm hover:bg-white/20">
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="bg-green-500 px-4 py-1 rounded text-white">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden text-white text-xl" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div className={`md:hidden bg-white transition-all duration-300 ${menuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
        <div className="overflow-y-auto max-h-screen">
          <ul className="flex flex-col text-black">
            <li className="p-4 border-b">
              <Link to="/" onClick={closeMobile}>หน้าแรก</Link>
            </li>
            <li className="p-4 border-b">
              <Link to="/Goalflows" onClick={closeMobile}>เกี่ยวกับโกลโฟลฯ</Link>
            </li>

            {/* สินค้าของเรา (accordion) -> Category list -> per-Category
                Subcategory list (nested accordion), same data as desktop. */}
            <li className="border-b">
              <div
                className="p-4 pr-6 flex justify-between items-center cursor-pointer"
                onClick={() => setProductsOpen(!productsOpen)}
              >
                สินค้าของเรา
                <span className="ml-2 text-lg font-semibold">{productsOpen ? "−" : "+"}</span>
              </div>
              <div className={`${productsOpen ? "block" : "hidden"} bg-gray-50`}>
                {categories.length === 0 && (
                  <p className="p-4 text-sm text-gray-400">ยังไม่มีหมวดหมู่สินค้า</p>
                )}
                {categories.map((cat) => (
                  <div key={cat.id} className="border-t">
                    {cat.subcategories.length > 0 ? (
                      <>
                        <div
                          className="p-3 pl-6 pr-6 flex justify-between items-center cursor-pointer"
                          onClick={() => setOpenCategoryId(openCategoryId === cat.id ? null : cat.id)}
                        >
                          {cat.title || cat.name}
                          <span>{openCategoryId === cat.id ? "−" : "+"}</span>
                        </div>
                        <div className={`${openCategoryId === cat.id ? "block" : "hidden"} bg-white pl-10`}>
                          {cat.subcategories.map((sub) => (
                            <p key={sub.id} className="p-2 hover:bg-gray-100">
                              <Link to={categoryHref(cat, sub)} onClick={closeMobile}>
                                {sub.title || sub.slug}
                              </Link>
                            </p>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link to={categoryHref(cat)} onClick={closeMobile} className="block p-3 pl-6">
                        {cat.title || cat.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </li>

            <li className="p-4 border-b">
              <Link to="/Catalog" onClick={closeMobile}>Catalog</Link>
            </li>

            {/* SERVICE (static, accordion) */}
            <li className="border-b">
              <div
                className="p-4 pr-6 flex justify-between items-center cursor-pointer"
                onClick={() => setServiceOpen(!serviceOpen)}
              >
                บริการ
                <span>{serviceOpen ? "−" : "+"}</span>
              </div>
              <div className={`${serviceOpen ? "block" : "hidden"} pl-6 bg-gray-50`}>
                {SERVICE_LINKS.map((item) => (
                  <p key={item.label} className="py-2 hover:bg-gray-100">
                    <Link to={item.to} onClick={closeMobile}>{item.label}</Link>
                  </p>
                ))}
              </div>
            </li>

            <li className="p-4 border-b">
              <Link to="/contact" onClick={closeMobile}>ติดต่อเรา</Link>
            </li>

            {/* AUTH */}
            <li className="p-4 flex flex-col gap-2">
              {user ? (
                <>
                  {(user.role === "admin" || user.role === "staff") && (
                    <Link to="/admin" onClick={closeMobile} className="border py-2 rounded text-center">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); closeMobile(); }}
                    className="bg-gray-200 py-2 rounded"
                  >
                    ออกจากระบบ
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMobile} className="border py-2 rounded text-center">
                    Login
                  </Link>
                  <Link to="/register" onClick={closeMobile} className="bg-green-500 text-white py-2 rounded text-center">
                    Sign up
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
