// ============================================================================
// Product API layer
// ----------------------------------------------------------------------------
// Talks to the real backend (Express + Prisma, see ../../server) instead of
// the static mock JSON used during initial development.
//
// Base URL comes from VITE_API_BASE_URL (see .env.example). If it isn't set,
// this falls back to http://localhost:5001/api so the app "just works" when
// you run `npm run dev` in server/ locally with the default PORT.
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

async function handle(res) {
  if (res.status === 404) return null;
  if (!res.ok) {
    let message = "Request failed";
    try {
      message = (await res.json()).message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  return res.json();
}

// The Prisma Product row (flat fields + category/subcategory relations)
// is reshaped here into the { name, image, detail: {...} } shape that
// ProductList / ProductDetail already render, so those components didn't
// need to change when the backend swapped in for the mock JSON.
function mapProduct(row) {
  if (!row) return null;
  return {
    id: row.slug || String(row.id),
    name: row.title,
    category: row.category?.slug || null,
    subcategory: row.subcategory?.slug || null,
    image: row.thumbnail || row.mainImage,
    specPdf: row.specPdf,
    lineUrl: row.lineUrl,
    detail: {
      title: row.title,
      subtitle: row.subtitle,
      features: row.features || [],
      applications: row.applications || [],
      mainImage: row.mainImage || row.thumbnail,
      logo: row.logoImage,
      specImage: row.specImage,
      deliveryImage: row.deliveryImage,
    },
  };
}

/**
 * Get every product, optionally filtered by category / subcategory.
 * @param {{category?: string, subcategory?: string}} filters
 * @returns {Promise<Array>}
 */
export async function getProducts({ category, subcategory } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (subcategory) params.set("subcategory", subcategory);

  const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
  const data = await handle(res);
  return (data || []).map(mapProduct);
}

/**
 * Get a single product by its unique slug (e.g. "producthardness").
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getProductById(id) {
  if (!id) return null;
  const res = await fetch(`${API_BASE_URL}/product/slug/${id.toLowerCase()}`);
  const data = await handle(res);
  return mapProduct(data);
}

/**
 * Get display metadata (title/subtitle) for a category or category/subcategory.
 * @param {string} category
 * @param {string} [subcategory]
 */
export async function getCategoryMeta(category, subcategory) {
  const path = subcategory
    ? `/category-meta/${category}/${subcategory}`
    : `/category-meta/${category}`;
  const res = await fetch(`${API_BASE_URL}${path}`);
  return handle(res);
}

/**
 * Every enabled Category with its enabled Subcategory[], in display order -
 * what the dynamic Navbar renders directly (see components/Navbar.jsx).
 * @returns {Promise<Array<{id, name, slug, title, subcategories: Array}>>}
 */
export async function getNavbar() {
  const res = await fetch(`${API_BASE_URL}/navbar`);
  const data = await handle(res);
  return data || [];
}

/**
 * Enabled brands, sorted by sortOrder - for the storefront's brand strip
 * (see components/Clients.jsx).
 */
export async function getStorefrontBrands() {
  const res = await fetch(`${API_BASE_URL}/brands/storefront`);
  const data = await handle(res);
  return data || [];
}

/**
 * Enabled articles, sorted by publishedAt desc, paginated - for the
 * "เกี่ยวกับโกลโฟล" page's "ข่าวสาร/บทความน่ารู้" section.
 * @param {{page?: number, limit?: number}} params
 */
export async function getStorefrontArticles({ page, limit } = {}) {
  const usp = new URLSearchParams();
  if (page) usp.set("page", page);
  if (limit) usp.set("limit", limit);
  const res = await fetch(`${API_BASE_URL}/articles/storefront?${usp.toString()}`);
  const data = await handle(res);
  return data || { items: [], meta: { total: 0, page: 1, limit: limit || 6, totalPages: 1 } };
}

/**
 * A single published article, for the "อ่านเพิ่มเติม" (read more) page.
 * @param {string|number} id
 */
export async function getArticleById(id) {
  const res = await fetch(`${API_BASE_URL}/articles/storefront/${id}`);
  return handle(res);
}
