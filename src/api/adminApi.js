import useEcomStore from "../store/eom-store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

function authHeaders() {
  const token = useEcomStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    /* some endpoints (e.g. delete) respond with plain text */
  }
  if (!res.ok) {
    throw new Error(body?.message || "Request failed");
  }
  return body;
}

function request(path, { method = "GET", body } = {}) {
  return fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then(handle);
}

// Builds "?page=&limit=&search=&status=" from a plain params object,
// skipping anything undefined/empty so a bare listX() still works.
function toQuery(params = {}) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      usp.set(key, value);
    }
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

// ---- Products ----
export const listProducts = (count = 200) => request(`/products/${count}`);
export const getProduct = (id) => request(`/product/${id}`);
export const createProduct = (data) => request(`/product`, { method: "POST", body: data });
export const updateProduct = (id, data) => request(`/product/${id}`, { method: "PUT", body: data });
export const deleteProduct = (id) => request(`/product/${id}`, { method: "DELETE" });

// ---- Categories ----
// Every list* function below returns { items, meta: { total, page, limit,
// totalPages } } - see server/README.md's Phase 1 section. Pass
// { page, limit, search, status } to page/filter/search.
export const listCategories = (params) => request(`/categories${toQuery(params)}`);
export const createCategory = (data) => request(`/categories`, { method: "POST", body: data });
export const updateCategory = (id, data) => request(`/categories/${id}`, { method: "PUT", body: data });
export const deleteCategory = (id) => request(`/categories/${id}`, { method: "DELETE" });

// ---- Subcategories ----
export const listSubcategories = (params) => request(`/subcategories${toQuery(params)}`);
export const createSubcategory = (data) => request(`/subcategories`, { method: "POST", body: data });
export const updateSubcategory = (id, data) => request(`/subcategories/${id}`, { method: "PUT", body: data });
export const deleteSubcategory = (id) => request(`/subcategories/${id}`, { method: "DELETE" });

// ---- Brands ----
export const listBrands = (params) => request(`/brands${toQuery(params)}`);
export const createBrand = (data) => request(`/brands`, { method: "POST", body: data });
export const updateBrand = (id, data) => request(`/brands/${id}`, { method: "PUT", body: data });
export const deleteBrand = (id) => request(`/brands/${id}`, { method: "DELETE" });

// ---- Orders ----
export const listOrders = () => request(`/admin/orders`);
export const changeOrderStatus = (orderId, orderStatus) =>
  request(`/admin/order-status`, { method: "PUT", body: { orderId, orderStatus } });

// ---- Users ----
export const listUsers = () => request(`/users`);
export const changeUserStatus = (id, enabled) =>
  request(`/change-status`, { method: "POST", body: { id, enabled } });
// roleId only matters when role === "staff" - see server/controllers/admin.js
export const changeUserRole = (id, role, roleId) =>
  request(`/change-role`, { method: "POST", body: { id, role, roleId } });

// ---- Roles & Permissions ----
export const listPermissions = () => request(`/permissions`);
export const listRoles = () => request(`/roles`);
export const createRole = (data) => request(`/roles`, { method: "POST", body: data });
export const updateRole = (id, data) => request(`/roles/${id}`, { method: "PUT", body: data });
export const deleteRole = (id) => request(`/roles/${id}`, { method: "DELETE" });

// ---- Articles ----
export const listArticles = (params) => request(`/articles${toQuery(params)}`);
export const createArticle = (data) => request(`/articles`, { method: "POST", body: data });
export const updateArticle = (id, data) => request(`/articles/${id}`, { method: "PUT", body: data });
export const deleteArticle = (id) => request(`/articles/${id}`, { method: "DELETE" });

// ---- Image upload (Cloudinary, used by both products & articles) ----
export const uploadImage = (base64Image) =>
  request(`/images`, { method: "POST", body: { image: base64Image } });
export const removeUploadedImage = (public_id) =>
  request(`/removeimages`, { method: "POST", body: { public_id } });
