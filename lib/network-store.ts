"use client";

export type NetworkStoreStatus = "pending" | "approved" | "suspended";
export type NetworkOrderStatus = "new" | "processing" | "shipped" | "completed";

export interface NetworkStore {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  city: string;
  category: string;
  status: NetworkStoreStatus;
  products: number;
  sales: number;
  createdAt: string;
}

export interface NetworkProduct {
  id: string;
  name: string;
  storeId: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "review" | "hidden";
  createdAt: string;
}

export interface NetworkOrder {
  id: string;
  buyer: string;
  storeId: string;
  items: number;
  total: number;
  status: NetworkOrderStatus;
  createdAt: string;
}

export interface NetworkState {
  stores: NetworkStore[];
  products: NetworkProduct[];
  orders: NetworkOrder[];
}

export const NETWORK_STORAGE_KEY = "shibam-network-v1";
export const NETWORK_EVENT = "shibam-network-updated";

const initialState: NetworkState = {
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

function cloneInitialState(): NetworkState {
  return JSON.parse(JSON.stringify(initialState)) as NetworkState;
}

export function readNetworkState(): NetworkState {
  if (typeof window === "undefined") return cloneInitialState();
  try {
    const stored = window.localStorage.getItem(NETWORK_STORAGE_KEY);
    return stored ? { ...cloneInitialState(), ...JSON.parse(stored) } : cloneInitialState();
  } catch {
    return cloneInitialState();
  }
}

export function writeNetworkState(state: NetworkState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NETWORK_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(NETWORK_EVENT));
}

export async function hydrateNetworkState(): Promise<NetworkState> {
  if (typeof window === "undefined") return cloneInitialState();
  try {
    const response = await fetch("/api/network", { cache: "no-store" });
    if (!response.ok) return readNetworkState();
    const state = (await response.json()) as NetworkState;
    window.localStorage.setItem(NETWORK_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(NETWORK_EVENT));
    return state;
  } catch {
    return readNetworkState();
  }
}

function apiHeaders() {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("shibam-admin-token") : null;
  return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

function syncApi(path: string, method: string, payload: unknown) {
  if (typeof window === "undefined") return;
  void fetch(path, { method, headers: apiHeaders(), body: JSON.stringify(payload) }).catch(() => undefined);
}

export function createNetworkStore(input: Omit<NetworkStore, "id" | "products" | "sales" | "createdAt" | "status">) {
  const state = readNetworkState();
  const store: NetworkStore = { ...input, id: `store-${Date.now()}`, products: 0, sales: 0, status: "pending", createdAt: new Date().toISOString().slice(0, 10) };
  writeNetworkState({ ...state, stores: [store, ...state.stores] });
  syncApi("/api/stores", "POST", store);
  return store;
}

export function createNetworkProduct(input: Omit<NetworkProduct, "id" | "createdAt" | "status">) {
  const state = readNetworkState();
  const product: NetworkProduct = { ...input, id: `net-prod-${Date.now()}`, status: "review", createdAt: new Date().toISOString().slice(0, 10) };
  writeNetworkState({ ...state, products: [product, ...state.products] });
  syncApi("/api/products", "POST", product);
  return product;
}

export function createNetworkOrder(input: Omit<NetworkOrder, "id" | "createdAt" | "status">) {
  const state = readNetworkState();
  const order: NetworkOrder = { ...input, id: `SHP-${new Date().getFullYear()}-${String(state.orders.length + 1).padStart(3, "0")}`, status: "new", createdAt: new Date().toISOString().slice(0, 10) };
  writeNetworkState({ ...state, orders: [order, ...state.orders] });
  syncApi("/api/orders", "POST", order);
  return order;
}

export function updateNetworkOrder(id: string, status: NetworkOrderStatus) {
  const state = readNetworkState();
  writeNetworkState({ ...state, orders: state.orders.map((order) => order.id === id ? { ...order, status } : order) });
  syncApi(`/api/orders/${encodeURIComponent(id)}`, "PATCH", { status });
}

export function updateNetworkStore(id: string, status: NetworkStoreStatus) {
  const state = readNetworkState();
  writeNetworkState({ ...state, stores: state.stores.map((store) => store.id === id ? { ...store, status } : store) });
  syncApi(`/api/stores/${encodeURIComponent(id)}`, "PATCH", { status });
}

export function approveNetworkStore(id: string) {
  updateNetworkStore(id, "approved");
}
