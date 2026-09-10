//rafce
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import Header from "../components/Header";
import Productforsale from "../components/Productforsale";
import Community from "../components/Community";
import Pixelgrade from "../components/Pixelgrade";
import AllArticlesPage from "../pages/AllArticlesPage";
import Contactus from "../components/Contactus";
import CatalogProduct from "../catalog/CatalogProduct";
import Workandservices from "../pages/Workandservices";
import Goalflows from "../pages/Goalflows";
import Productsoffered from "../components/Productsoffered";

// ----------------------------------------------------------------------------
// All product listing & detail pages (previously ~130 separate components,
// one file per product/category) are now served by these two generic,
// API-driven components. See src/components/Product/ and src/api/productApi.js
// ----------------------------------------------------------------------------
import ProductList from "../components/Product/ProductList";
import ProductDetail from "../components/Product/ProductDetail";
import ArticleDetail from "../pages/public/ArticleDetail";

// ---- Auth + Admin Dashboard ----
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectRouteCMS from "./ProtectRouteCMS";
import RequireAdmin from "./RequireAdmin";
import RequirePermission from "./RequirePermission";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductAdmin from "../pages/admin/ProductAdmin";
import ProductForm from "../pages/admin/ProductForm";
import CategoryAdmin from "../pages/admin/CategoryAdmin";
import BrandAdmin from "../pages/admin/BrandAdmin";
import OrderAdmin from "../pages/admin/OrderAdmin";
import UserAdmin from "../pages/admin/UserAdmin";
import ArticleAdmin from "../pages/admin/ArticleAdmin";
import RoleAdmin from "../pages/admin/RoleAdmin";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/admin",
    // Lets in "admin" AND "staff" - see ProtectRouteCMS for why this is no
    // longer the old admin-only ProtectRouteAdmin.
    element: <ProtectRouteCMS />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },

          // Products & Articles: Staff can be granted these individually
          // (spec section 5) - each route is wrapped in RequirePermission
          // for its specific action rather than a blanket admin check.
          {
            element: <RequirePermission permission="product.view" />,
            children: [{ path: "products", element: <ProductAdmin /> }],
          },
          {
            element: <RequirePermission permission="product.create" />,
            children: [{ path: "products/new", element: <ProductForm /> }],
          },
          {
            element: <RequirePermission permission="product.edit" />,
            children: [{ path: "products/:id/edit", element: <ProductForm /> }],
          },
          {
            element: <RequirePermission permission="article.view" />,
            children: [{ path: "articles", element: <ArticleAdmin /> }],
          },

          // Category/Subcategory, Brand, Orders, Users, Role & Permission:
          // admin-only, full stop, per the spec - Staff never sees these,
          // regardless of what permissions they're granted.
          {
            element: <RequireAdmin />,
            children: [
              { path: "categories", element: <CategoryAdmin /> },
              { path: "brands", element: <BrandAdmin /> },
              { path: "orders", element: <OrderAdmin /> },
              { path: "users", element: <UserAdmin /> },
              { path: "roles", element: <RoleAdmin /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "header", element: <Header /> },
      { path: "Productforsale", element: <Productforsale /> },
      { path: "Community", element: <Community /> },
      { path: "Pixelgrade", element: <Pixelgrade /> },
      { path: "articles", element: <AllArticlesPage /> },
      { path: "contact", element: <Contactus /> },
      { path: "Catalog", element: <CatalogProduct /> },
      { path: "Workandservices", element: <Workandservices /> },
      { path: "Goalflows", element: <Goalflows /> },
      { path: "Productsoffered", element: <Productsoffered /> },

      // ---- New, consolidated product routes ----
      // Listing: /products/products/phardness, /products/industrial-balance, /products/small-tools/pmitutoyo ...
      { path: "products/:category", element: <ProductList /> },
      { path: "products/:category/:subcategory", element: <ProductList /> },
      // Detail: /product/producthardness, /product/pbmseries ...
      { path: "product/:id", element: <ProductDetail /> },
      { path: "articles/:id", element: <ArticleDetail /> },

      // ---- Backward-compatible redirects for every old product URL ----
      // (so existing links/bookmarks such as /Phardness or /ProductHardness
      // keep working without having to touch Navbar.jsx etc.)
      { path: "ProductCcdCamera", element: <Navigate to="/product/productccdcamera" replace /> },
      { path: "ProductCncAutoVideo", element: <Navigate to="/product/productcncautovideo" replace /> },
      { path: "productcontourmeasuring", element: <Navigate to="/product/productcontourmeasuring" replace /> },
      { path: "ProductCoordinate", element: <Navigate to="/product/productcoordinate" replace /> },
      { path: "ProductManualCutting", element: <Navigate to="/product/productmanualcutting" replace /> },
      { path: "ProductMetallographic", element: <Navigate to="/product/productmetallographic" replace /> },
      { path: "ProductAutoMetallographic", element: <Navigate to="/product/productautometallographic" replace /> },
      { path: "ProductManualMetallographic", element: <Navigate to="/product/productmanualmetallographic" replace /> },
      { path: "ProductHardness", element: <Navigate to="/product/producthardness" replace /> },
      { path: "ProductTouchhardness", element: <Navigate to="/product/producttouchhardness" replace /> },
      { path: "ProductMicrovickers", element: <Navigate to="/product/productmicrovickers" replace /> },
      { path: "ProductDigitalhardness", element: <Navigate to="/product/productdigitalhardness" replace /> },
      { path: "ProductOvenmachine", element: <Navigate to="/product/productovenmachine" replace /> },
      { path: "ProductSingleColumn", element: <Navigate to="/product/productsinglecolumn" replace /> },
      { path: "ProductProfileVertical", element: <Navigate to="/product/productprofilevertical" replace /> },
      { path: "ProductProfileHorizontal", element: <Navigate to="/product/productprofilehorizontal" replace /> },
      { path: "ProductManualVideo", element: <Navigate to="/product/productmanualvideo" replace /> },
      { path: "ProductArm", element: <Navigate to="/product/productarm" replace /> },
      { path: "ProductRoundness", element: <Navigate to="/product/productroundness" replace /> },
      { path: "ProductSaltspray", element: <Navigate to="/product/productsaltspray" replace /> },
      { path: "ProductSurfaceTexture", element: <Navigate to="/product/productsurfacetexture" replace /> },
      { path: "ProductTemperature", element: <Navigate to="/product/producttemperature" replace /> },
      { path: "ProductDualColumn", element: <Navigate to="/product/productdualcolumn" replace /> },
      { path: "ProductCncVideo", element: <Navigate to="/product/productcncvideo" replace /> },
      { path: "Ppushpullgaugerze1", element: <Navigate to="/product/ppushpullgaugerze1" replace /> },
      { path: "Pthicknessdt156", element: <Navigate to="/product/pthicknessdt156" replace /> },
      { path: "Pbrixgf10", element: <Navigate to="/product/pbrixgf10" replace /> },
      { path: "Pthickness600in", element: <Navigate to="/product/pthickness600in" replace /> },
      { path: "Pthermoth02", element: <Navigate to="/product/pthermoth02" replace /> },
      { path: "Ppingaugeet03", element: <Navigate to="/product/ppingaugeet03" replace /> },
      { path: "Pthicknesselcometer456", element: <Navigate to="/product/pthicknesselcometer456" replace /> },
      { path: "Pmultimeter", element: <Navigate to="/product/pmultimeter" replace /> },
      { path: "Plasermeter414d", element: <Navigate to="/product/plasermeter414d" replace /> },
      { path: "Pradiusgauge178ma", element: <Navigate to="/product/pradiusgauge178ma" replace /> },
      { path: "Ptoolmakervise", element: <Navigate to="/product/ptoolmakervise" replace /> },
      { path: "Pphmeterhi6221", element: <Navigate to="/product/pphmeterhi6221" replace /> },
      { path: "Pplatichammer", element: <Navigate to="/product/pplatichammer" replace /> },
      { path: "Ptorquetesterdtxs", element: <Navigate to="/product/ptorquetesterdtxs" replace /> },
      { path: "Pdepthguages1147", element: <Navigate to="/product/pdepthguages1147" replace /> },
      { path: "Ppluggaugem4", element: <Navigate to="/product/ppluggaugem4" replace /> },
      { path: "Pblockkya8b", element: <Navigate to="/product/pblockkya8b" replace /> },
      { path: "Ptorgue30spk", element: <Navigate to="/product/ptorgue30spk" replace /> },
      { path: "Pmeterht3007sd", element: <Navigate to="/product/pmeterht3007sd" replace /> },
      { path: "Pfeelergauge172mb", element: <Navigate to="/product/pfeelergauge172mb" replace /> },
      { path: "PdigitalMicro103", element: <Navigate to="/product/pdigitalmicro103" replace /> },
      { path: "Pfineholderma61003", element: <Navigate to="/product/pfineholderma61003" replace /> },
      { path: "Pdialcaliperla2", element: <Navigate to="/product/pdialcaliperla2" replace /> },
      { path: "PRuller11215", element: <Navigate to="/product/pruller11215" replace /> },
      { path: "Pfeelergaugesfg005", element: <Navigate to="/product/pfeelergaugesfg005" replace /> },
      { path: "Plasermeterar861", element: <Navigate to="/product/plasermeterar861" replace /> },
      { path: "Pdurometer", element: <Navigate to="/product/pdurometer" replace /> },
      { path: "Pwrenchql5n", element: <Navigate to="/product/pwrenchql5n" replace /> },
      { path: "Pfeellergauge100my", element: <Navigate to="/product/pfeellergauge100my" replace /> },
      { path: "P3JawSelf", element: <Navigate to="/product/p3jawself" replace /> },
      { path: "Phardnesshrc", element: <Navigate to="/product/phardnesshrc" replace /> },
      { path: "Pbmseries", element: <Navigate to="/product/pbmseries" replace /> },
      { path: "Papseries", element: <Navigate to="/product/papseries" replace /> },
      { path: "Pehbseries", element: <Navigate to="/product/pehbseries" replace /> },
      { path: "Plpbseries", element: <Navigate to="/product/plpbseries" replace /> },
      { path: "Pbwseries", element: <Navigate to="/product/pbwseries" replace /> },
      { path: "Ptwi700c", element: <Navigate to="/product/ptwi700c" replace /> },
      { path: "Pt7eseries", element: <Navigate to="/product/pt7eseries" replace /> },
      { path: "Pti01series", element: <Navigate to="/product/pti01series" replace /> },
      { path: "Ptnseries", element: <Navigate to="/product/ptnseries" replace /> },
      { path: "Pthp03series", element: <Navigate to="/product/pthp03series" replace /> },
      { path: "Pbw7842", element: <Navigate to="/product/pbw7842" replace /> },
      { path: "Ptas01", element: <Navigate to="/product/ptas01" replace /> },
      { path: "PtcsD300", element: <Navigate to="/product/ptcsd300" replace /> },
      { path: "Pac168", element: <Navigate to="/product/pac168" replace /> },
      { path: "Pids707", element: <Navigate to="/product/pids707" replace /> },
      { path: "Ppf110h", element: <Navigate to="/product/ppf110h" replace /> },
      { path: "Panimalbigsize", element: <Navigate to="/product/panimalbigsize" replace /> },
      { path: "Panimalsmallsize", element: <Navigate to="/product/panimalsmallsize" replace /> },
      { path: "Pdc360", element: <Navigate to="/product/pdc360" replace /> },
      { path: "Ptcs200a", element: <Navigate to="/product/ptcs200a" replace /> },
      { path: "Pm301", element: <Navigate to="/product/pm301" replace /> },
      { path: "Pids851", element: <Navigate to="/product/pids851" replace /> },
      { path: "Pbw1410xxl", element: <Navigate to="/product/pbw1410xxl" replace /> },
      { path: "Pbw5156lm", element: <Navigate to="/product/pbw5156lm" replace /> },
      { path: "Pbw3133", element: <Navigate to="/product/pbw3133" replace /> },
      { path: "Pbd590", element: <Navigate to="/product/pbd590" replace /> },
      { path: "Phd380", element: <Navigate to="/product/phd380" replace /> },
      { path: "PccdCamera", element: <Navigate to="/products/products/pccdcamera" replace /> },
      { path: "Pcontourmeasuring", element: <Navigate to="/products/products/pcontourmeasuring" replace /> },
      { path: "Pcoordinate", element: <Navigate to="/products/products/pcoordinate" replace /> },
      { path: "Pcustting", element: <Navigate to="/products/products/pcustting" replace /> },
      { path: "Phardness", element: <Navigate to="/products/products/phardness" replace /> },
      { path: "Povenmachine", element: <Navigate to="/products/products/povenmachine" replace /> },
      { path: "Pprofileprojecter", element: <Navigate to="/products/products/pprofileprojecter" replace /> },
      { path: "Pprotablecmm", element: <Navigate to="/products/products/pprotablecmm" replace /> },
      { path: "Proundness", element: <Navigate to="/products/products/proundness" replace /> },
      { path: "Psaltspray", element: <Navigate to="/products/products/psaltspray" replace /> },
      { path: "Psurfacetexture", element: <Navigate to="/products/products/psurfacetexture" replace /> },
      { path: "Ptemperature", element: <Navigate to="/products/products/ptemperature" replace /> },
      { path: "Ptensilemachine", element: <Navigate to="/products/products/ptensilemachine" replace /> },
      { path: "Pvideomeasuring", element: <Navigate to="/products/products/pvideomeasuring" replace /> },
      { path: "Paikoh", element: <Navigate to="/products/small-tools/paikoh" replace /> },
      { path: "Pcem", element: <Navigate to="/products/small-tools/pcem" replace /> },
      { path: "Pchuer", element: <Navigate to="/products/small-tools/pchuer" replace /> },
      { path: "Pdefelshko", element: <Navigate to="/products/small-tools/pdefelshko" replace /> },
      { path: "Pdigicon", element: <Navigate to="/products/small-tools/pdigicon" replace /> },
      { path: "Peisens", element: <Navigate to="/products/small-tools/peisens" replace /> },
      { path: "Pelcometers", element: <Navigate to="/products/small-tools/pelcometers" replace /> },
      { path: "Pextech", element: <Navigate to="/products/small-tools/pextech" replace /> },
      { path: "Pfluke", element: <Navigate to="/products/small-tools/pfluke" replace /> },
      { path: "Pfujitools", element: <Navigate to="/products/small-tools/pfujitools" replace /> },
      { path: "Pgin", element: <Navigate to="/products/small-tools/pgin" replace /> },
      { path: "Phanna", element: <Navigate to="/products/small-tools/phanna" replace /> },
      { path: "Phunters", element: <Navigate to="/products/small-tools/phunters" replace /> },
      { path: "Pimada", element: <Navigate to="/products/small-tools/pimada" replace /> },
      { path: "Pinsizes", element: <Navigate to="/products/small-tools/pinsizes" replace /> },
      { path: "Pissokus", element: <Navigate to="/products/small-tools/pissokus" replace /> },
      { path: "Pkanetec", element: <Navigate to="/products/small-tools/pkanetec" replace /> },
      { path: "Pkanon", element: <Navigate to="/products/small-tools/pkanon" replace /> },
      { path: "Plutron", element: <Navigate to="/products/small-tools/plutron" replace /> },
      { path: "Pmitsuwas", element: <Navigate to="/products/small-tools/pmitsuwas" replace /> },
      { path: "Pmitutoyo", element: <Navigate to="/products/small-tools/pmitutoyo" replace /> },
      { path: "Pnoga", element: <Navigate to="/products/small-tools/pnoga" replace /> },
      { path: "Ppeacocks", element: <Navigate to="/products/small-tools/ppeacocks" replace /> },
      { path: "Pshinnwas", element: <Navigate to="/products/small-tools/pshinnwas" replace /> },
      { path: "Psk", element: <Navigate to="/products/small-tools/psk" replace /> },
      { path: "Psmartsensor", element: <Navigate to="/products/small-tools/psmartsensor" replace /> },
      { path: "Pteclocks", element: <Navigate to="/products/small-tools/pteclocks" replace /> },
      { path: "Ptohnichi", element: <Navigate to="/products/small-tools/ptohnichi" replace /> },
      { path: "Ptsks", element: <Navigate to="/products/small-tools/ptsks" replace /> },
      { path: "Pvertex", element: <Navigate to="/products/small-tools/pvertex" replace /> },
      { path: "Pyamamoto", element: <Navigate to="/products/small-tools/pyamamoto" replace /> },
      { path: "IndustrialBalance", element: <Navigate to="/products/industrial-balance" replace /> },
      { path: "AnimalBalance", element: <Navigate to="/products/animal-balance" replace /> },
      { path: "HospitalBalance", element: <Navigate to="/products/hospital-balance" replace /> },
      { path: "Videomeasuring", element: <Navigate to="/products/products/pvideomeasuring" replace /> },

    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
