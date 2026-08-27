import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { ADMIN_PASSWORD } from "@/lib/admin-config";

export type NetworkStoreStatus = "pending" | "approved" | "suspended";
export type NetworkOrderStatus = "new" | "processing" | "shipped" | "completed";
export interface NetworkStore { id: string; name: string; owner: string; email: string; phone: string; city: string; category: string; status: NetworkStoreStatus; products: number; sales: number; createdAt: string; }
export interface NetworkProduct { id: string; name: string; storeId: string; category: string; price: number; stock: number; status: "active" | "review" | "hidden"; createdAt: string; }
export interface NetworkOrder { id: string; buyer: string; storeId: string; items: number; total: number; status: NetworkOrderStatus; createdAt: string; }
export interface NetworkState { stores: NetworkStore[]; products: NetworkProduct[]; orders: NetworkOrder[]; }

const filePath = path.join(process.cwd(), "data", "network.json");
const seedState: NetworkState = {
  stores: [
    { id: "store-aden", name: "مؤسسة عدن للتجارة", owner: "أحمد القباطي", email: "aden@example.com", phone: "+967 2XX XXX XXX", city: "عدن", category: "الإلكترونيات", status: "approved", products: 12, sales: 184, createdAt: "2026-05-16" },
    { id: "store-sanaa", name: "متجر صنعاء للإلكترونيات", owner: "محمد الحرازي", email: "sanaa@example.com", phone: "+967 1XX XXX XXX", city: "أمانة العاصمة صنعاء", category: "الإلكترونيات", status: "approved", products: 8, sales: 96, createdAt: "2026-05-20" },
    { id: "store-taiz", name: "مصنع تعز للملابس", owner: "سارة الشيباني", email: "taiz@example.com", phone: "+967 4XX XXX XXX", city: "تعز", category: "الملابس والأزياء", status: "pending", products: 4, sales: 0, createdAt: "2026-06-02" },
  ],
  products: [
    { id: "net-prod-1", name: "سماعات بلوتوث احترافية", storeId: "store-sanaa", category: "الإلكترونيات", price: 8.5, stock: 420, status: "active", createdAt: "2026-05-21" },
    { id: "net-prod-2", name: "طقم ملابس أطفال قطني", storeId: "store-taiz", category: "الملابس والأزياء", price: 12, stock: 160, status: "review", createdAt: "2026-06-03" },
    { id: "net-prod-3", name: "ماكينة تعبئة صغيرة", storeId: "store-aden", category: "الآلات والمعدات", price: 450, stock: 18, status: "active", createdAt: "2026-05-18" },
  ],
  orders: [
    { id: "SHP-2026-001", buyer: "متجر النخبة - إب", storeId: "store-sanaa", items: 50, total: 425, status: "new", createdAt: "2026-06-06" },
    { id: "SHP-2026-002", buyer: "بقالة الوادي - الحديدة", storeId: "store-aden", items: 12, total: 5400, status: "processing", createdAt: "2026-06-05" },
    { id: "SHP-2026-003", buyer: "مؤسسة الجبل - ذمار", storeId: "store-taiz", items: 30, total: 360, status: "completed", createdAt: "2026-06-03" },
  ],
};

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }
function ensureFile() { const dir = path.dirname(filePath); if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify(seedState, null, 2)); }
export function isValidAdminToken(value: string | null) {
  if (!value?.startsWith("Bearer ")) return false;
  const expected = createHash("sha256").update(`${ADMIN_PASSWORD}|shibam-admin-session`).digest("hex");
  return value.slice(7) === expected;
}

export function getServerNetwork(): NetworkState { ensureFile(); try { return JSON.parse(fs.readFileSync(filePath, "utf8")) as NetworkState; } catch { return clone(seedState); } }
export function saveServerNetwork(state: NetworkState) { ensureFile(); fs.writeFileSync(filePath, JSON.stringify(state, null, 2)); return state; }
export function addServerStore(store: NetworkStore) { const state = getServerNetwork(); if (state.stores.some((item) => item.id === store.id)) return state; return saveServerNetwork({ ...state, stores: [store, ...state.stores] }); }
export function addServerProduct(product: NetworkProduct) { const state = getServerNetwork(); if (state.products.some((item) => item.id === product.id)) return state; return saveServerNetwork({ ...state, products: [product, ...state.products] }); }
export function addServerOrder(order: NetworkOrder) { const state = getServerNetwork(); if (state.orders.some((item) => item.id === order.id)) return state; return saveServerNetwork({ ...state, orders: [order, ...state.orders] }); }
export function updateServerStore(id: string, status: NetworkStoreStatus) { const state = getServerNetwork(); return saveServerNetwork({ ...state, stores: state.stores.map((store) => store.id === id ? { ...store, status } : store) }); }
export function updateServerOrder(id: string, status: NetworkOrderStatus) { const state = getServerNetwork(); return saveServerNetwork({ ...state, orders: state.orders.map((order) => order.id === id ? { ...order, status } : order) }); }
