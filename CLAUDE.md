# CLAUDE.md — Product Module Refactor Log

This file documents a refactor performed on the product-related code in this
repo. Keep it up to date if the product system changes further — future work
(by Claude or anyone else) should read this first.

## What changed and why

**Before:** product listing & detail pages were ~130 separate hard-coded
`.jsx` files spread across 10 folders under `src/components/`:

```
components/Products/                 (14 files - "general" category listing pages)
components/SmallTools/               (30 files - per-brand listing pages)
components/IndustrialBalance/        (1 file  - category listing page)
components/AnimalBalance/            (1 file  - category listing page)
components/HostpitalBalance/         (1 file  - category listing page)
components/ViewProducts/             (23 files - detail pages, "Products" group)
components/ProductIndustrialBalance/ (10 files - detail pages)
components/ProductAnimalBalance/     (8 files  - detail pages)
components/Producthopitalbalance/    (9 files  - detail pages)
components/ProductSmalltool/         (30 files - detail pages)
pages/product/Videomeasuring.jsx     (thin wrapper around Products/Pvideomeasuring)
```

Every product's name/image/spec/features were hard-coded inline in JSX, and
every product had its own dedicated route in `routes/AppRoutes.jsx`
(~150 route entries, ~150 import lines).

**After:** all of the above was consolidated into a single folder:

```
src/components/Product/
  ProductList.jsx       — generic listing page (loops over products for a
                           given category/subcategory, fetched via API)
  ProductDetail.jsx      — generic detail page (fetched via API by id)
  ProductSpecModal.jsx   — shared "preview specification" PDF modal
                           (was copy-pasted into every single old file)

src/api/productApi.js    — single API layer: getProducts(), getProductById(),
                           getCategoryMeta()
```

The old 10 folders and the `pages/product/` wrapper were **deleted**.

## Data migration

All product data (name, image, spec PDF, LINE contact link, and — for
products that had a detail page — title, subtitle, feature bullets,
application bullets, main image, brand logo, spec-tab image, delivery-tab
image) was extracted programmatically from the old `.jsx` files via a
one-off Python script (regex-based JSX parsing) and written to:

```
public/mock-api/products.json     — 88 products, unified schema (see below)
public/mock-api/categories.json   — display title/subtitle per category page
public/product-media/             — all product images + spec PDFs, copied
                                     out of src/assets/ so they can be served
                                     as plain URL strings (like a real backend
                                     would return)
```

**Product schema** (one object per entry in `products.json`):

```json
{
  "id": "producthardness",
  "name": "Manual Hardness Rockwell Tester",
  "category": "products",
  "subcategory": "phardness",
  "image": "/product-media/....png",
  "specPdf": "/product-media/....pdf",
  "lineUrl": "https://lin.ee/v7Kf7rD",
  "detail": {
    "title": "...",
    "subtitle": "...",
    "features": ["...", "..."],
    "applications": ["...", "..."],
    "mainImage": "/product-media/....png",
    "logo": "/product-media/....png",
    "specImage": "/product-media/....png",
    "deliveryImage": "/product-media/....png"
  }
}
```

`category` is one of: `products`, `small-tools`, `industrial-balance`,
`animal-balance`, `hospital-balance`. `subcategory` is only set for
`products` (e.g. `phardness`, `pcontourmeasuring`) and `small-tools`
(brand slug, e.g. `pmitutoyo`); the balance categories have no subcategory.

`detail` is `null` for the one product that never had a real detail page in
the old code (its old link was `"#"`).

### Known migration gap
One image failed to copy: `Animal Big Size` — the source file
`src/assets/image/animalbalance/กรงใหญ่.png` has a Thai filename that got
mangled during zip extraction (shows up on disk as garbled `#U0e01...`
characters instead of proper UTF-8). Its `image` field in `products.json`
is currently missing — re-export/re-upload that one image and re-run the
copy step, or manually add the file to `public/product-media/` and update
that product's `image`/`detail.mainImage` fields.

## API layer (`src/api/productApi.js`)

Right now there is **no real backend** — `VITE_API_BASE_URL` is unset, so all
three functions fall back to `fetch()`-ing the static JSON files in
`public/mock-api/`. This was a deliberate placeholder (per user's choice —
see decision below) so the frontend already has the exact shape a real
backend integration will need.

To connect a real backend later:

1. Set `VITE_API_BASE_URL` in `.env` (e.g. `VITE_API_BASE_URL=https://api.goalflows.com/api`).
2. Backend must expose:
   - `GET {BASE}/products` and `GET {BASE}/products?category=&subcategory=`
   - `GET {BASE}/products/:id`
   - `GET {BASE}/categories/:key` (key is `category` or `category/subcategory`)
3. Nothing else in the app needs to change — no component reaches into
   `public/mock-api/` directly, everything goes through `productApi.js`.

## Routing (`src/routes/AppRoutes.jsx`)

Old routes (one per product/category, ~150 lines) were replaced with:

```
/products/:category                  -> <ProductList />
/products/:category/:subcategory     -> <ProductList />
/product/:id                         -> <ProductDetail />
```

**Backward compatibility:** every old route path (e.g. `/Phardness`,
`/ProductHardness`, `/Pmitutoyo`, `/IndustrialBalance`, `/Videomeasuring`,
...) still exists as a `<Navigate replace />` redirect to its new URL. This
means `components/Navbar.jsx` (which still links to the old paths in ~50
places) did **not** need to be touched and continues to work. If you ever
update Navbar.jsx to link directly to the new `/products/...` and
`/product/...` paths, the redirect entries for those specific old paths can
be deleted from `AppRoutes.jsx`.

The full old→new redirect map (131 entries) was generated from the same
extraction data as `products.json`, so it should be complete and accurate.

## Decisions made during this refactor (asked & confirmed by user)

- No real backend existed yet → built the fetch/API structure now with a
  placeholder (mock JSON) endpoint, designed so swapping in a real backend
  later is a one-line env var change.
- Scope: consolidate **all** product categories (Products, SmallTool,
  IndustrialBalance, AnimalBalance, HospitalBalance, ViewProducts, etc.),
  not just the main "Products" folder.

## If you touch this again

- `src/data/mockProducts.js` and `src/data/products.json` are unrelated
  leftover mock files (still used by `HeroInfiniteSlide.jsx` / `Header.jsx`
  for something else) — do not confuse them with the new
  `public/mock-api/products.json`.
- The original images/PDFs still exist in their old `src/assets/image/...`
  locations too (untouched, just no longer imported by any component) —
  safe to delete later once you've confirmed `public/product-media/` has
  everything needed, but left alone for now to minimize risk.
- This refactor was not build-tested (no network access in the sandbox that
  did the migration, so `npm install` could not run). Run `npm install &&
  npm run dev` and click through a few category pages + product detail pages
  before shipping.

---

# Phase 2 — Connected to the real backend + built the Admin Dashboard

This section documents the second round of work: wiring `client/` up to the
real `server/` (Express + Prisma/Supabase) API, and building out a full
Admin Dashboard. Read this alongside `../server/README.md`.

## What changed on the client

**`src/api/productApi.js`** — completely rewritten. It no longer reads
`public/mock-api/*.json`; it calls the real backend
(`VITE_API_BASE_URL`, defaults to `http://localhost:5001/api`):

- `getProducts({category, subcategory})` → `GET /api/products?category=&subcategory=`
- `getProductById(slug)` → `GET /api/product/slug/:slug`
- `getCategoryMeta(category, subcategory)` → `GET /api/category-meta/:category/:subcategory?`

The backend's Prisma `Product` row (flat fields + `category`/`subcategory`
relation objects) is reshaped by a `mapProduct()` helper inside
`productApi.js` back into the `{ name, image, detail: {...} }` shape that
`ProductList.jsx` / `ProductDetail.jsx` already expected from Phase 1 — so
**those two components did not need to change**. If you ever add a field to
the Prisma `Product` model that the storefront should display, add it to
`mapProduct()` rather than reaching into the raw API response from the
components.

`public/mock-api/products.json` and `categories.json` are no longer read by
the app at runtime — they were only the seed source, copied into
`server/prisma/seed-data/` (see server README). They're still in
`public/mock-api/` here as a historical snapshot; safe to delete once you've
confirmed the Supabase data is seeded correctly, but left alone for now.

## New: authentication

- **`src/api/authApi.js`** — `register()`, `login()`, `googleLogin(credential)`,
  `getCurrentUser()`, `getCurrentAdmin()`, all calling the matching `/api/*`
  endpoints.
- **`src/store/eom-store.jsx`** — zustand store (persisted to
  `localStorage` under the key `eom-store`). Holds `user` and `token`.
  `login(email, password)`, `register(email, password, name)`, and
  `loginWithGoogle(credential)` all call their respective API and set
  `user`/`token` the same way (registering logs you straight in - the
  backend returns a token immediately); `logout()` clears them;
  `hydrateUser()` re-validates the token against `/api/current-user` (call
  this once on app load if you want to catch an expired token early — not
  currently wired into `App`/`Layout`, left for you to decide where).
- **`src/routes/ProtectRouteUser.jsx`** / **`ProtectRouteAdmin.jsx`** —
  route guards (`<Outlet/>` if authenticated / right role, otherwise
  `<LoadingToRedirect/>`). Only `ProtectRouteAdmin` is wired into
  `AppRoutes.jsx` right now (wrapping `/admin`); `ProtectRouteUser` exists
  and works but nothing uses it yet — wrap it around a future
  cart/checkout/account section when that's built.
- **`src/routes/LoadingToRedirect.jsx`** — 3-second countdown then
  `navigate("/login")`.
- **`src/pages/auth/Login.jsx`** (`/login`) and **`Register.jsx`**
  (`/register`) — each link to the other, and both include a
  **"เข้าสู่ระบบด้วย Google"** button (`src/components/auth/GoogleAuthButton.jsx`,
  wrapping `@react-oauth/google`'s `<GoogleLogin/>`). On success, admins are
  sent to `/admin`, everyone else to `/`. There is no public "Login" link
  in `Navbar.jsx` yet — you reach `/login`/`/register` by URL directly (or
  add links yourself).
- **`src/components/auth/PasswordStrength.jsx`** — live checklist shown
  under the password field on Register (8+ chars, letter, number) plus the
  `isPasswordValid()` helper used to block submission client-side. Mirrors
  the same rule the server enforces (see `server/README.md`'s Auth
  section) — the server is still the real source of truth.
- **`src/main.jsx`** now wraps `<App/>` in `<GoogleOAuthProvider
  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>` — see `.env.example`
  for `VITE_GOOGLE_CLIENT_ID` (must match the server's `GOOGLE_CLIENT_ID`
  exactly, same Google Cloud OAuth Client ID for both).
- Added `zustand` and `@react-oauth/google` to `package.json` dependencies
  (run `npm install`).

You still need to manually promote your first admin: register a normal
account through the UI (or Google Sign-In), then in the database (Supabase
table editor, or a one-off Prisma script) set that user's `role` to
`"admin"`.

## New: Admin Dashboard (`/admin`, protected by `ProtectRouteAdmin`)

- **`src/layouts/AdminLayout.jsx`** — sidebar (ภาพรวม / สินค้า / หมวดหมู่ /
  แบรนด์ / ออร์เดอร์ / ผู้ใช้ / บทความ) + logout button, `<Outlet/>` for
  page content.
- **`src/api/adminApi.js`** — every admin CRUD call in one file, all
  attaching `Authorization: Bearer <token>` from the zustand store.
- **`src/components/admin/AdminTable.jsx`** — generic list table
  (`columns`/`rows` props) reused by every admin list page.
- **`src/components/admin/ImageField.jsx`** — URL text input + optional
  "อัปโหลด" button that uploads to Cloudinary via `POST /api/images` and
  fills the field with the returned `secure_url`. Used for every image
  field on the product form and the article form.

Pages, one per entity, under `src/pages/admin/`:

| Page | Route(s) | Notes |
|---|---|---|
| `AdminDashboard.jsx` | `/admin` | counts across all 6 entities |
| `ProductAdmin.jsx` + `ProductForm.jsx` | `/admin/products`, `/products/new`, `/products/:id/edit` | full form: slug, title, subtitle, description, price, quantity, category, subcategory (filtered by chosen category), brand, LINE link, spec PDF, 5 image-role fields, features/applications (one bullet per line) |
| `CategoryAdmin.jsx` | `/admin/categories` | manages both `Category` (top-level) and `Subcategory` (second-level) in one page — create/list/delete only, no edit (matches what the backend exposes) |
| `BrandAdmin.jsx` | `/admin/brands` | create/list/delete |
| `OrderAdmin.jsx` | `/admin/orders` | list + change `orderStatus` via dropdown |
| `UserAdmin.jsx` | `/admin/users` | list + change role (`user`/`admin`) + toggle `enabled` |
| `ArticleAdmin.jsx` | `/admin/articles` | create (with one image via `ImageField`) / list / delete |

None of these have an "edit" action beyond `ProductForm` — Category, Brand,
and Article only support create/delete because that's all the backend
exposes (see `server/README.md`'s endpoint table). If you add PUT endpoints
for those later, the admin pages will need an edit form added too.

## Known gaps / things to check before shipping

1. **Not build-tested.** This was all written in a sandbox with no internet
   access (`npm install` could not run — see the very first message in this
   chat). Run `npm install` in both `client/` and `server/`, then
   `npm run dev` in both, and click through: login → each admin section →
   a couple of storefront category/product pages.
2. **No `/register` page** — see above, create the first admin manually.
3. **`hydrateUser()` is unused** — decide if/where you want a stale-token
   check on app load.
4. **Migrated product images/PDFs are still relative paths**
   (`/product-media/...`) served out of `client/public/`, not Cloudinary.
   That's fine as long as `client/public/product-media/` ships with every
   deploy of this app; if you ever split the storefront and API onto
   different domains without a shared CDN, those 88 products' images will
   need to be re-uploaded to Cloudinary and the URLs updated in the
   database.
5. **`Navbar.jsx`** still has no visible "เข้าสู่ระบบ" (login) link — add one
   if admins shouldn't have to know the `/login` URL by heart.

---

# Phase 1 of the CMS spec — backend-only pass, client patched to keep working

The full CMS spec (dynamic Navbar/Category/Subcategory/Brand/Article + a
Staff role with configurable permissions) is being built in phases -
**Phase 1 (database + backend API) is done; see `../server/README.md`'s
"Phase 1" section for the real detail** (new `status` fields, `Role`/
`Permission` models, plural REST paths, pagination/search, new public
`/navbar`, `/brands/storefront`, `/articles/storefront` endpoints).

**On the client, only `src/api/adminApi.js` changed** - just enough so the
existing admin pages (CategoryAdmin/SubcategoryAdmin/BrandAdmin/ArticleAdmin)
keep working against the new plural endpoints and `{ items, meta }` response
shape, with zero changes to any `.jsx` page. `updateCategory`,
`updateSubcategory`, `updateBrand`, `updateArticle`, `listPermissions`,
`listRoles`, `createRole`, `updateRole`, `deleteRole` were all added to
`adminApi.js` too (matching new server endpoints) but **nothing calls them
yet** - no edit forms, status toggles, or Role/Permission screen exist in
the UI. That's Phase 2, not done yet:

- Edit forms + enable/disable toggles for Category, Subcategory, Brand,
  Article (currently create/list/delete only)
- "ย้ายไปยังหมวดหมู่หลักอื่น" - move a Subcategory to a different Category
  (`updateSubcategory` already supports sending a new `categoryId`, just no
  UI for it)
- A Role & Permission management screen (checkboxes per permission, per
  Role) - a default **"Staff"** Role already exists in the DB (seeded) with
  exactly the spec's example permissions (product + article create/edit, no
  delete, no category/brand/user/role access)
- Permission-aware admin sidebar (hide menu items Staff can't use) and
  route guards beyond the existing all-or-nothing `ProtectRouteAdmin`
- Pagination/search/status-filter controls in the admin list UIs (the APIs
  support `?page=&limit=&search=&status=`, nothing in the UI sends those
  params yet - every list just shows page 1 with the default limit)

Phase 3 (public frontend: dynamic Navbar reading `/api/navbar`, a Brand
section reading `/api/brands/storefront`, an Article section on the "about"
page reading `/api/articles/storefront`) also hasn't started - `Navbar.jsx`
is still whatever it was before this pass.

Phase 4 (TypeScript + Clean Architecture rewrite of the whole backend) was
explicitly deferred until last, per instruction - do not start it before
Phases 2-3 are stable and tested.

---

# Phase 2 of the CMS spec — Admin UI (edit forms, status, Role/Permission screen)

Builds on "Phase 1" above. No new npm dependencies.

## Auth/store changes

- **`src/store/eom-store.jsx`** - `login()`/`register()`/`loginWithGoogle()`
  now all call `hydrateUser()` right after setting the token, so
  `user.permissions` (a `string[]` of granted keys, only meaningful for
  `role === "staff"`) and `user.roleName` are populated immediately, not
  just `id`/`email`/`role` from the lean JWT payload. New `hasPermission(key)`
  selector: `true` for any key if `role === "admin"`, checks
  `user.permissions.includes(key)` for `"staff"`, always `false` otherwise.
- **`src/api/adminApi.js`** - `listCategories`, `listSubcategories`,
  `listBrands`, `listArticles` now take a params object
  (`{ page, limit, search, status }`) and return the raw
  `{ items, meta }` from the server (Phase 1's pagination) - **no longer
  auto-unwrapped** like the Phase 1 patch did. Every page that calls them
  was updated accordingly (see below). Added `updateCategory`,
  `updateSubcategory`, `updateBrand`, `updateArticle` (all `PUT`).

## New route guards (replacing the old all-or-nothing admin check)

- **`src/routes/ProtectRouteCMS.jsx`** (NEW) - top-level guard for `/admin`:
  lets in `role === "admin"` **or** `"staff"` (the old `ProtectRouteAdmin.jsx`
  was admin-only and has been deleted - nothing else referenced it).
- **`src/routes/RequireAdmin.jsx`** (NEW) - nested guard wrapping
  Category/Brand/Orders/Users/Roles routes: admin-only, full stop. Shows
  `AccessDenied` inline (not a redirect - the user IS logged in, just
  lacks the role) rather than bouncing to `/login`.
- **`src/routes/RequirePermission.jsx`** (NEW) - nested guard taking a
  `permission` prop, wrapping the Products/Articles routes individually
  (`product.view`/`product.create`/`product.edit`, `article.view`) so
  Staff can be granted exactly what the spec's example describes.
- **`src/components/admin/AccessDenied.jsx`** (NEW) - the "🔒 ไม่มีสิทธิ์
  เข้าถึงหน้านี้" placeholder both guards render.

`AppRoutes.jsx`'s `/admin` tree was restructured to nest routes under
these guards - see the file directly, the comments there explain which
guard covers which routes and why.

## `AdminLayout.jsx` sidebar is now permission-aware

Each nav item declares either `permission: "<key>"` (checked via
`hasPermission`) or `requiresAdmin: true` (checked via `user.role ===
"admin"`) or neither (always shown). Items failing their check are filtered
out of the sidebar entirely - per the spec, Staff should never even see a
menu entry for something they can't use. Also now calls `hydrateUser()` on
every mount, so a Staff member whose Role an admin just edited sees the
correct sidebar without logging out/in.

## New page: `src/pages/admin/RoleAdmin.jsx` (`/admin/roles`, admin-only)

The "จัดการสิทธิ์" screen: create/edit/delete `Role`s, with a checkbox grid
of every `Permission` (fetched from `GET /api/permissions`, grouped by
their `group` field - product/article/category/brand/user/role/order/
settings/media/dashboard). Editing a Role's checkboxes and saving sends the
full `permissionKeys` array, which the backend treats as a full replace
(`set`), not a merge - matches a checkbox form's semantics exactly. Also
lists how many `User`s currently have each Role (`_count.users` from the
API) as a heads-up before deleting one.

## Existing admin pages, extended

- **`CategoryAdmin.jsx`** - both the Category and Subcategory sections now
  have: an edit mode (click "แก้ไข" to populate the form instead of create;
  submitting calls `updateCategory`/`updateSubcategory`), a status toggle
  column (`StatusToggle`, calls `updateX(id, {status: !current})`), a
  search box + status filter (`AdminSearchBar`), and pagination
  (`AdminPagination`). "ย้ายไปยังหมวดหมู่หลักอื่น" for a Subcategory is just
  editing it and changing the "เลือกหมวดหมู่หลัก" dropdown before saving -
  there's a small hint text reminding you of that while editing. The
  category dropdown always fetches up to 100 categories (not paginated)
  since there are realistically only a handful and it needs to be complete
  for the subcategory form.
- **`BrandAdmin.jsx`** - form gained `logoUrl` (via the shared `ImageField`
  Cloudinary uploader), `url`, `sortOrder`; same edit/status/search/
  pagination pattern as Category.
- **`ArticleAdmin.jsx`** - form gained `excerpt` (separate from the full
  `description`); same edit/status/search/pagination pattern. The
  create/edit form itself is hidden entirely if the current user lacks
  `article.create` (for a new one) or `article.edit` (while editing an
  existing one) - relevant once Staff without `article.edit` somehow reach
  this page (they normally can't, since the sidebar/route already require
  `article.view` to even land here, but this covers e.g. a `article.view`-
  only Role). Same permission gating on the row-level "แก้ไข"/"ลบ" buttons
  and the status toggle (falls back to a plain read-only badge without
  `article.edit`).
- **`ProductAdmin.jsx`** - "+ เพิ่มสินค้า" / row "แก้ไข" / row "ลบ" are each
  now gated by `hasPermission("product.create"/"product.edit"/"product.delete")`
  respectively - a Staff member with the default seeded "Staff" Role sees
  create+edit but not delete, matching the spec exactly.
- **`UserAdmin.jsx`** - the role `<select>` gained a `"staff"` option
  (previously only `user`/`admin`); a new second column shows a Role
  `<select>` **only when a row's role is `"staff"`**, listing every `Role`
  from `GET /api/roles` - picking one calls `changeUserRole(id, "staff",
  roleId)`. Switching a user *to* `"staff"` from something else keeps
  their existing `roleId` if they had one (doesn't silently wipe an
  assignment), so re-promoting someone back to staff restores their old
  permission set.
- **`AdminDashboard.jsx`** - now fetches only what the current user is
  actually allowed to see: Staff gets product + article counts,
  Admin gets everything (categories/brands/orders/users too) - previously
  this page would have thrown a 403 and shown nothing for a Staff user,
  since it unconditionally called every admin-only list endpoint. Also
  switched to reading `meta.total` from the paginated Category/Brand/
  Article responses instead of `.length` (which would've only been page 1's
  count).

## Still not done (deliberately out of scope for Phase 2)

- **Phase 3** (public frontend): `Navbar.jsx` is still whatever it was
  before - nothing yet reads the new `GET /api/navbar`,
  `GET /api/brands/storefront`, or `GET /api/articles/storefront`
  endpoints from Phase 1. That's next.
- **Phase 4** (TypeScript + Clean Architecture): still explicitly deferred.
- No UI edits **Permission** rows themselves (the fixed catalog in
  `server/config/permissions.js`) - only which ones a Role grants. Adding a
  wholly new permission key is still a code change (by design - it's a
  fixed vocabulary the code actually checks against, not arbitrary
  strings an admin could type in and have silently do nothing).
- `Article.excerpt` editing doesn't currently let you *clear* a cover image
  once set (leaving the image field blank on an edit just leaves the old
  cover alone rather than removing it) - minor gap, not a functional block.

---

# Phase 3 of the CMS spec — public frontend goes dynamic

Builds on Phases 1-2 above. No new npm dependencies. One tiny backend
addition: `GET /api/articles/storefront/:id` (public single-article lookup
for "read more" - see `server/README.md`'s Phase 3 note).

## `src/api/productApi.js` gained four functions

`getNavbar()`, `getStorefrontBrands()`, `getStorefrontArticles({page,limit})`,
`getArticleById(id)` - thin wrappers around the Phase 1 public endpoints,
living here (not `adminApi.js`) because they're unauthenticated/storefront-
facing, matching this file's existing purpose.

## `components/Navbar.jsx` - rewritten from ~820 lines to fully data-driven

Previously: one static `<ul>` with a single "สินค้าของเรา ▼" dropdown
containing four hand-written groups (measuring machines, testing machines,
brand tools, balance types), each with hardcoded `<Link>`s to old product
routes - duplicated almost identically between the desktop and mobile
markup.

Now: fetches `getNavbar()` once on mount into a `categories` array, and
**each Category becomes its own top-level nav item** (both desktop hover-
dropdown and mobile accordion render off the same array) - a Category with
`subcategories.length > 0` gets a dropdown linking to
`/products/:categorySlug/:subSlug`; one with none (industrial-balance/
animal-balance/hospital-balance) is just a plain link to
`/products/:categorySlug`. This is a deliberate change from the old
"one products menu with internal groupings" shape to "one menu item per
Category" - it's what actually matches the Category/Subcategory data model
built in Phase 1, and is exactly the spec's own example (add a
"โปรโมชั่น" Category → it shows up as a new top-level item automatically,
no code change).

Still static (not part of the Category/Subcategory model at all): หน้าแรก,
เกี่ยวกับโกลโฟลฯ, บริการ (its own dropdown, hardcoded `SERVICE_LINKS` array
at the top of the file), Catalog, ติดต่อเรา.

**Also fixed while already rewriting this file:** the Login/Sign up buttons
were static dead buttons before (noted as a gap back in Phase 0's CLAUDE.md
entry) - now real `<Link to="/login">`/`<Link to="/register">`, and when
`useEcomStore`'s `user` is set, they're replaced with an "Admin" link
(shown for `role === "admin"` or `"staff"`) and a working logout button, on
both desktop and mobile.

## `components/Clients.jsx` - the brand strip, rewritten

Previously: ~70 hardcoded `import aN from ".../brandsale/N.png"` lines
feeding a hardcoded `clientsImgLogo` array into a CSS marquee. Now: fetches
`getStorefrontBrands()` on mount and maps over the real list instead -
same marquee/animation/styling, each logo now optionally links out to
`brand.url` if the admin set one (opens in a new tab), and shows
"ยังไม่มีแบรนด์" if the list is empty. The old hardcoded image files under
`src/assets/image/brandsale/` are unreferenced now but left in place
(same reasoning as Phase 1 - low risk, not worth the cleanup risk right now).

Note: `components/BrandSlider.jsx` / `components/Client.jsx` (singular -
a *different*, separate hardcoded brand carousel) were **not** touched -
grep confirms neither is actually rendered anywhere (`Client.jsx` is
imported by `Home.jsx` but never placed in its JSX, just dead code already,
pre-existing). Not part of this pass since nothing reachable uses them, but
flagging in case they turn out to matter later.

## New: Article section on the "เกี่ยวกับโกลโฟล" page

- **`components/ArticleSection.jsx`** (NEW) - fetches
  `getStorefrontArticles({limit: 6})`, renders a card grid: cover image,
  name, excerpt, formatted `publishedAt` date (Thai locale), "อ่านเพิ่มเติม →"
  link to `/articles/:id`. Shows "ยังไม่มีบทความ" when the list is empty -
  exactly per spec section 3's requirements list.
- **`pages/public/ArticleDetail.jsx`** (NEW) at route `/articles/:id` - the
  "read more" destination: full cover image, name, formatted date, and the
  full `description` body (`whitespace-pre-line` so paragraph breaks in the
  admin's textarea are preserved). 404s (shows "ไม่พบบทความนี้") for a
  disabled or nonexistent article id.
- **`components/Goalflows.jsx`** now renders `<ArticleSection />` right
  after `<Clients />` (the brand strip) - one line added, nothing else on
  that page touched.

(Route `/articles/:id` coexists fine with the pre-existing `/articles`
route - unrelated demo page `pages/AllArticlesPage.jsx`, which fetches from
`jsonplaceholder.typicode.com` and was already there before any of this
work; left alone, different path shape, no conflict.)

## Still not done

**Phase 4** (TypeScript + Clean Architecture rewrite of the whole backend)
remains deliberately deferred, per instruction, until last.

---

# Post-Phase-4 fixes: Navbar redesign + ProductForm dropdown bug

Two issues reported after Phase 4:

## Navbar changed again: back to a nested "สินค้าของเรา" menu

The Phase 3 entry above says each Category became its own top-level nav
item. **That's been superseded** - the user wanted the original site's
2-level flyout interaction back (screenshot: "สินค้าของเรา ▼" → a vertical
list of Categories → hovering one with Subcategories opens a second panel
to its right listing them), just driven by real data instead of the old
hardcoded groups.

`components/Navbar.jsx` now has a single "สินค้าของเรา" top-level item
again. Desktop: hovering it opens a panel listing every Category
top-to-bottom (a Category with `subcategories.length > 0` shows a `›`
chevron and, on hover, a second panel positioned `left-[300px]` of the
first showing that Category's Subcategories; one with none is a direct
link right there in the first panel - industrial-balance/animal-balance/
hospital-balance all render this way since they have no Subcategories).
State: `hoveredCategoryId` tracks which Category's flyout is open, cleared
on `onMouseLeave` of the whole "สินค้าของเรา" `<li>`.

Mobile: "สินค้าของเรา" is now one accordion toggle (`productsOpen`)
containing the Category list; each Category with Subcategories gets its
own nested toggle (`openCategoryId`) revealing its Subcategories indented
further - a genuine 2-level accordion now, not a flat list of top-level
accordions like the Phase 3 version had.

Everything else about the Navbar (static "บริการ" dropdown, Login/Register/
Admin/logout buttons, the `getNavbar()` fetch itself) is unchanged from
Phase 3 - just the products menu's shape.

## Bug fix: `brands.map is not a function` on the "เพิ่มสินค้า" (add product) page

**Root cause:** Phase 2 changed `listCategories()`/`listSubcategories()`/
`listBrands()` in `adminApi.js` to return the raw `{ items, meta }` shape
(for pagination) instead of auto-unwrapping `.items` like the Phase 1
patch originally did. Every admin list page that consumes them was
updated at the time (`CategoryAdmin`, `BrandAdmin`, `ArticleAdmin`,
`AdminDashboard`) - **except `ProductForm.jsx`**, which was missed. It
kept doing `listBrands().then(setBrands)`, so `brands` state became the
whole `{items, meta}` object, and `brands.map(...)` in the JSX threw.

**Fix:** `ProductForm.jsx`'s three dropdown-loading calls now request a
high `limit` (100-200, since these are "give me everything for a select
dropdown" calls, not a paginated table) and unwrap `data.items`:
```js
listCategories({ limit: 100 }).then((data) => setCategories(data.items))
listSubcategories({ limit: 200 }).then((data) => setSubcategories(data.items))
listBrands({ limit: 100 }).then((data) => setBrands(data.items))
```
Grepped the rest of `src/` for other unmigrated call sites - none found;
this was the only one.

## Follow-up: subcategory flyout now aligns with the hovered row

The "สินค้าของเรา" flyout above originally opened fixed at the top of the
menu regardless of which Category row was hovered. Now `onMouseEnter` on
each row also captures `e.currentTarget.offsetTop` (the row's pixel
position within the first panel) into `hoveredRowOffset` state, and the
flyout's `top` is set inline to `calc(100% + ${hoveredRowOffset}px)`
instead of the `top-full` class - so it opens aligned with whichever row
you're actually hovering, like a native OS-style nested menu.
