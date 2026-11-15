const BASE = import.meta.env.VITE_API_URL;

let token = "";
let unauthorizedHandler = null;

// The auth store tells this file which token to send
export function setToken(value) {
    token = value;
}

// Called when the server says 401 while we have a token (it expired or is wrong)
export function onUnauthorized(handler) {
    unauthorizedHandler = handler;
}

export async function request(path, options = {}) {
    let response;
    try {
        response = await fetch(BASE + path, {
            ...options,
            headers: { "Content-Type": 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
            body: options.body ? JSON.stringify(options.body) : undefined
        })
    } catch {
        throw new Error("Cannot reach API server")
    }
    const data = response.status === 204 ? null : await response.json().catch(() => null)
    if (!response.ok) {
        // Handle the expired/wrong token first, then still throw so the caller's catch shows the message
        if (response.status === 401 && token && unauthorizedHandler) {
            unauthorizedHandler();
        }
        throw new Error(data?.error ?? `Request failed (${response.status})`)
    }
    return data
}

export const getProduct = (id) => request(`/products/${id}`);
export const createOrder = (items) => request("/orders", { method: "POST", body: { items } });
export const login = (email, password) => request("/auth/login", { method: "POST", body: { email, password } });
export const getMyOrders = () => request("/orders");

// One page of products: { data: [...], meta: { page, limit, total, totalPages } }
export const getProducts = (page = 1, limit = 8) => request(`/products?category=All&page=${page}&limit=${limit}`);

// Admin: create, update and delete products (the server checks the admin role)
export const createProduct = (product) => request("/products", { method: "POST", body: product });
export const updateProduct = (id, product) => request(`/products/${id}`, { method: "PUT", body: product });
export const deleteProduct = (id) => request(`/products/${id}`, { method: "DELETE" });