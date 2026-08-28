"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { approveNetworkStore, createNetworkProduct, hydrateNetworkState, NETWORK_EVENT, readNetworkState, updateNetworkOrder, updateNetworkStore, type NetworkState } from "@/lib/network-store";
import { Check, ChevronLeft, CircleDollarSign, Clock3, Download, LayoutDashboard, LogOut, Package, Plus, RefreshCw, Search, ShieldCheck, ShoppingBag, Store, X } from "lucide-react";

const ADMIN_SESSION_KEY = "shibam-admin-session";
const money = new Intl.NumberFormat("ar-YE", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const orderStatusLabels = { new: "جديد", processing: "قيد التجهيز", shipped: "تم الشحن", completed: "مكتمل" } as const;
const storeStatusLabels = { pending: "بانتظار المراجعة", approved: "معتمد", suspended: "موقوف" } as const;

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [network, setNetwork] = useState<NetworkState>({ stores: [], products: [], orders: [] });
  const [activeTab, setActiveTab] = useState<"overview" | "stores" | "products" | "orders">("overview");
  const [storeSearch, setStoreSearch] = useState("");
  const [productForm, setProductForm] = useState({ name: "", storeId: "", category: "", price: "", stock: "" });
  const [productMessage, setProductMessage] = useState("");
  const [storeStatusFilter, setStoreStatusFilter] = useState<"all" | "pending" | "approved" | "suspended">("all");
  const [productSearch, setProductSearch] = useState("");
  const [productStatusFilter, setProductStatusFilter] = useState<"all" | "active" | "review" | "hidden">("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<"all" | keyof typeof orderStatusLabels>("all");
  const [adminNotice, setAdminNotice] = useState("");

  useEffect(() => {
    setAuthenticated(window.localStorage.getItem(ADMIN_SESSION_KEY) === "active");
    setNetwork(readNetworkState());
    void hydrateNetworkState().then(setNetwork);
    setReady(true);
    const sync = () => setNetwork(readNetworkState());
    window.addEventListener(NETWORK_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(NETWORK_EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);

  const stats = useMemo(() => ({
    stores: network.stores.length,
    products: network.products.length,
    orders: network.orders.length,
    revenue: network.orders.reduce((sum, order) => sum + order.total, 0),
    pendingStores: network.stores.filter((store) => store.status === "pending").length,
    pendingProducts: network.products.filter((product) => product.status === "review").length,
    attentionOrders: network.orders.filter((order) => order.status === "new" || order.status === "processing").length,
  }), [network]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }).catch(() => null);
    if (response?.ok) {
      const body = await response.json() as { token: string };
      window.localStorage.setItem(ADMIN_SESSION_KEY, "active");
      window.localStorage.setItem("shibam-admin-token", body.token);
      setAuthenticated(true);
      setLoginError("");
    } else if (!response) {
      setLoginError("تعذر الوصول إلى خادم الإدارة");
    } else setLoginError("كلمة المرور غير صحيحة");
  };

  const logout = () => { window.localStorage.removeItem(ADMIN_SESSION_KEY); window.localStorage.removeItem("shibam-admin-token"); setAuthenticated(false); setPassword(""); };
  const approveStore = (id: string) => { approveNetworkStore(id); setNetwork(readNetworkState()); };
  const suspendStore = (id: string) => { updateNetworkStore(id, "suspended"); setNetwork(readNetworkState()); };
  const changeOrder = (id: string, status: "new" | "processing" | "shipped" | "completed") => { updateNetworkOrder(id, status); setNetwork(readNetworkState()); };

  const addProduct = (event: FormEvent) => {
    event.preventDefault();
    if (!productForm.name || !productForm.storeId || !productForm.category || !productForm.price || !productForm.stock) { setProductMessage("أكمل بيانات المنتج أولًا"); return; }
    createNetworkProduct({ name: productForm.name, storeId: productForm.storeId, category: productForm.category, price: Number(productForm.price), stock: Number(productForm.stock) });
    setNetwork(readNetworkState());
    setProductForm({ name: "", storeId: "", category: "", price: "", stock: "" });
    setProductMessage("أضيف المنتج إلى قائمة المراجعة بنجاح");
  };

  if (!ready) return <div className="admin-loading">جاري تجهيز لوحة شبام...</div>;
  if (!authenticated) return <div className="admin-login-page"><div className="admin-login-card"><div className="admin-brand"><span>ش</span><div><strong>شبام</strong><small>مركز الإدارة</small></div></div><div className="admin-login-icon"><ShieldCheck className="h-7 w-7" /></div><h1>الدخول الآمن</h1><p>هذه المساحة مخصصة لإدارة المتاجر والمنتجات والطلبات.</p><form onSubmit={login}><label>كلمة مرور الأدمن<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="أدخل كلمة المرور" autoComplete="current-password" /></label>{loginError ? <span className="admin-error">{loginError}</span> : null}<button type="submit">دخول إلى لوحة التحكم <ChevronLeft className="h-4 w-4" /></button></form><Link href="/" className="admin-back-link">العودة إلى المتجر</Link></div></div>;

  const filteredStores = network.stores.filter((store) => {
    const matchesSearch = `${store.name} ${store.owner} ${store.city}`.toLocaleLowerCase("ar").includes(storeSearch.toLocaleLowerCase("ar"));
    return matchesSearch && (storeStatusFilter === "all" || store.status === storeStatusFilter);
  });
  const storeName = (id: string) => network.stores.find((store) => store.id === id)?.name || "متجر غير معروف";
  const filteredProducts = network.products.filter((product) => {
    const matchesSearch = `${product.name} ${product.category} ${storeName(product.storeId)}`.toLocaleLowerCase("ar").includes(productSearch.toLocaleLowerCase("ar"));
    return matchesSearch && (productStatusFilter === "all" || product.status === productStatusFilter);
  });
  const filteredOrders = network.orders.filter((order) => {
    const matchesSearch = `${order.id} ${order.buyer} ${storeName(order.storeId)}`.toLocaleLowerCase("ar").includes(orderSearch.toLocaleLowerCase("ar"));
    return matchesSearch && (orderStatusFilter === "all" || order.status === orderStatusFilter);
  });

  const exportNetwork = () => {
    const rows = [
      ["النوع", "المعرف", "الاسم أو المشتري", "المتجر", "القيمة", "الحالة", "التاريخ"],
      ...network.orders.map((order) => ["طلب", order.id, order.buyer, storeName(order.storeId), String(order.total), orderStatusLabels[order.status], order.createdAt]),
      ...network.products.map((product) => ["منتج", product.id, product.name, storeName(product.storeId), String(product.price), product.status, product.createdAt]),
      ...network.stores.map((store) => ["متجر", store.id, store.name, store.city, "", storeStatusLabels[store.status], store.createdAt]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\\n");
    const blob = new Blob([`\\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `shibam-network-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setAdminNotice("تم تجهيز ملف بيانات الشبكة للتنزيل");
  };

  return <div className="admin-page"><aside className="admin-sidebar"><div className="admin-brand"><span>ش</span><div><strong>شبام</strong><small>مركز الإدارة</small></div></div><nav><button className={activeTab === "overview" ? "is-active" : ""} onClick={() => setActiveTab("overview")}><LayoutDashboard className="h-4 w-4" /> نظرة عامة</button><button className={activeTab === "stores" ? "is-active" : ""} onClick={() => setActiveTab("stores")}><Store className="h-4 w-4" /> المتاجر <b>{network.stores.filter((store) => store.status === "pending").length || ""}</b></button><button className={activeTab === "products" ? "is-active" : ""} onClick={() => setActiveTab("products")}><Package className="h-4 w-4" /> المنتجات</button><button className={activeTab === "orders" ? "is-active" : ""} onClick={() => setActiveTab("orders")}><ShoppingBag className="h-4 w-4" /> الطلبات <b>{network.orders.filter((order) => order.status === "new").length || ""}</b></button></nav><div className="admin-sidebar__footer"><span><span className="admin-online" /> متصل الآن</span><button onClick={logout}><LogOut className="h-4 w-4" /> خروج</button></div></aside><main className="admin-main"><header className="admin-topbar"><div><span className="admin-kicker">شبكة شبام التجارية</span><h1>{activeTab === "overview" ? "لوحة القيادة" : activeTab === "stores" ? "إدارة المتاجر" : activeTab === "products" ? "إدارة المنتجات" : "مركز الطلبات"}</h1></div><div className="admin-topbar__actions"><button className="admin-toolbar-button" onClick={() => hydrateNetworkState().then((state) => { setNetwork(state); setAdminNotice("تم تحديث بيانات الشبكة"); })}><RefreshCw className="h-4 w-4" /> تحديث</button><button className="admin-toolbar-button admin-toolbar-button--accent" onClick={exportNetwork}><Download className="h-4 w-4" /> تصدير CSV</button><Link href="/" target="_blank">فتح المتجر <ChevronLeft className="h-4 w-4" /></Link><button onClick={logout} aria-label="تسجيل الخروج"><LogOut className="h-4 w-4" /></button></div></header>{adminNotice ? <div className="admin-notice" role="status">{adminNotice}</div> : null}

      {activeTab === "overview" ? <><section className="admin-stats"><div><span className="admin-stat-icon"><Store /></span><small>المتاجر المسجلة</small><strong>{stats.stores}</strong><em>{stats.pendingStores ? `${stats.pendingStores} بانتظار الاعتماد` : "لا توجد طلبات اعتماد"}</em></div><div><span className="admin-stat-icon"><Package /></span><small>المنتجات</small><strong>{stats.products}</strong><em>{stats.pendingProducts ? `${stats.pendingProducts} قيد المراجعة` : "الكتالوج محدث"}</em></div><div><span className="admin-stat-icon"><ShoppingBag /></span><small>إجمالي الطلبات</small><strong>{stats.orders}</strong><em>{stats.attentionOrders ? `${stats.attentionOrders} تحتاج متابعة` : "لا توجد طلبات معلقة"}</em></div><div><span className="admin-stat-icon"><CircleDollarSign /></span><small>قيمة الطلبات</small><strong>{money.format(stats.revenue)}</strong><em>من الطلبات المسجلة</em></div></section><div className="admin-overview-grid"><section className="admin-panel"><div className="admin-panel__head"><div><span>يحتاج انتباهك</span><h2>طلبات حديثة</h2></div><button onClick={() => setActiveTab("orders")}>عرض الكل <ChevronLeft className="h-4 w-4" /></button></div><div className="admin-table admin-table--compact"><div className="admin-table__row admin-table__head"><span>رقم الطلب</span><span>المشتري</span><span>القيمة</span><span>الحالة</span></div>{network.orders.slice(0, 4).map((order) => <div className="admin-table__row" key={order.id}><strong>{order.id}</strong><span>{order.buyer}</span><span>{money.format(order.total)}</span><span className={`status-badge status-${order.status}`}>{orderStatusLabels[order.status]}</span></div>)}</div></section><section className="admin-panel"><div className="admin-panel__head"><div><span>آخر النشاط</span><h2>المتاجر الجديدة</h2></div><button onClick={() => setActiveTab("stores")}>إدارة <ChevronLeft className="h-4 w-4" /></button></div><div className="admin-activity-list">{network.stores.slice(0, 4).map((store) => <div key={store.id}><span className="admin-activity-avatar">{store.name.slice(0, 1)}</span><div><strong>{store.name}</strong><small>{store.city} · {store.createdAt}</small></div><span className={`status-badge status-${store.status}`}>{storeStatusLabels[store.status]}</span></div>)}</div></section></div></> : null}

      {activeTab === "stores" ? <section className="admin-panel"><div className="admin-panel__head"><div><span>{filteredStores.length} من {network.stores.length} متجرًا</span><h2>كل المتاجر</h2></div><div className="admin-panel__tools"><label className="admin-inline-search"><Search className="h-4 w-4" /><input value={storeSearch} onChange={(event) => setStoreSearch(event.target.value)} placeholder="ابحث عن متجر أو مالك..." /></label><select className="admin-filter-select" value={storeStatusFilter} onChange={(event) => setStoreStatusFilter(event.target.value as typeof storeStatusFilter)} aria-label="تصفية المتاجر حسب الحالة"><option value="all">كل الحالات</option><option value="pending">بانتظار المراجعة</option><option value="approved">معتمد</option><option value="suspended">موقوف</option></select></div></div><div className="admin-table"><div className="admin-table__row admin-table__head"><span>المتجر</span><span>المالك والموقع</span><span>المنتجات</span><span>الحالة</span><span>إجراء</span></div>{filteredStores.map((store) => <div className="admin-table__row" key={store.id}><div className="admin-name-cell"><span className="admin-activity-avatar">{store.name.slice(0, 1)}</span><strong>{store.name}</strong></div><span>{store.owner}<small>{store.city}</small></span><span>{store.products}</span><span className={`status-badge status-${store.status}`}>{storeStatusLabels[store.status]}</span><div className="admin-row-actions">{store.status === "pending" ? <button onClick={() => approveStore(store.id)} title="اعتماد"><Check className="h-4 w-4" /></button> : null}{store.status !== "suspended" ? <button onClick={() => suspendStore(store.id)} title="إيقاف"><X className="h-4 w-4" /></button> : null}</div></div>)}</div></section> : null}

      {activeTab === "products" ? <div className="admin-content-grid"><section className="admin-panel"><div className="admin-panel__head"><div><span>{filteredProducts.length} من {network.products.length} منتجات</span><h2>كتالوج الشبكة</h2></div><div className="admin-panel__tools"><label className="admin-inline-search"><Search className="h-4 w-4" /><input value={productSearch} onChange={(event) => setProductSearch(event.target.value)} placeholder="ابحث عن منتج..." /></label><select className="admin-filter-select" value={productStatusFilter} onChange={(event) => setProductStatusFilter(event.target.value as typeof productStatusFilter)} aria-label="تصفية المنتجات حسب الحالة"><option value="all">كل الحالات</option><option value="active">نشط</option><option value="review">قيد المراجعة</option><option value="hidden">مخفي</option></select></div></div><div className="admin-table"><div className="admin-table__row admin-table__head"><span>المنتج</span><span>المتجر</span><span>السعر</span><span>المخزون</span><span>الحالة</span></div>{filteredProducts.map((product) => <div className="admin-table__row" key={product.id}><div><strong>{product.name}</strong><small>{product.category}</small></div><span>{storeName(product.storeId)}</span><span>{money.format(product.price)}</span><span>{product.stock}</span><span className={`status-badge status-${product.status === "active" ? "approved" : "pending"}`}>{product.status === "active" ? "نشط" : product.status === "review" ? "مراجعة" : "مخفي"}</span></div>)}</div></section><section className="admin-panel admin-add-panel"><div className="admin-panel__head"><div><span>كتالوج جديد</span><h2>إضافة منتج</h2></div><Plus className="h-5 w-5" /></div><form onSubmit={addProduct}><label>اسم المنتج<input value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} placeholder="مثال: شاحن سريع" /></label><label>المتجر<select value={productForm.storeId} onChange={(event) => setProductForm({ ...productForm, storeId: event.target.value })}><option value="">اختر المتجر</option>{network.stores.map((store) => <option key={store.id} value={store.id}>{store.name}</option>)}</select></label><label>القسم<input value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })} placeholder="الإلكترونيات" /></label><div className="admin-form-row"><label>السعر<input type="number" min="0" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} /></label><label>المخزون<input type="number" min="0" value={productForm.stock} onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })} /></label></div>{productMessage ? <p className="admin-form-message">{productMessage}</p> : null}<button type="submit"><Plus className="h-4 w-4" /> إضافة للمراجعة</button></form></section></div> : null}

      {activeTab === "orders" ? <section className="admin-panel"><div className="admin-panel__head"><div><span>{filteredOrders.length} من {network.orders.length} طلبات</span><h2>كل الطلبات</h2></div><div className="admin-panel__tools"><label className="admin-inline-search"><Search className="h-4 w-4" /><input value={orderSearch} onChange={(event) => setOrderSearch(event.target.value)} placeholder="ابحث برقم الطلب أو المشتري..." /></label><select className="admin-filter-select" value={orderStatusFilter} onChange={(event) => setOrderStatusFilter(event.target.value as typeof orderStatusFilter)} aria-label="تصفية الطلبات حسب الحالة"><option value="all">كل الحالات</option><option value="new">جديد</option><option value="processing">قيد التجهيز</option><option value="shipped">تم الشحن</option><option value="completed">مكتمل</option></select><div className="admin-orders-note"><Clock3 className="h-4 w-4" /> التحديثات تحفظ فورًا</div></div></div><div className="admin-table"><div className="admin-table__row admin-table__head"><span>الطلب</span><span>المشتري</span><span>المتجر</span><span>القيمة</span><span>تحديث الحالة</span></div>{filteredOrders.map((order) => <div className="admin-table__row" key={order.id}><div><strong>{order.id}</strong><small>{order.createdAt} · {order.items} صنف</small></div><span>{order.buyer}</span><span>{storeName(order.storeId)}</span><span>{money.format(order.total)}</span><select className={`admin-order-select status-${order.status}`} value={order.status} onChange={(event) => changeOrder(order.id, event.target.value as keyof typeof orderStatusLabels)}>{Object.entries(orderStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>)}</div></section> : null}
      <footer className="admin-footer"><span><ShieldCheck className="h-4 w-4" /> مساحة الإدارة محمية</span><span>شبكة شبام · اليمن</span></footer></main></div>;
}
