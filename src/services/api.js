const BASE = import.meta.env.VITE_API_URL;

export async function request(path, options = {}) {
    let response;
    try {
        response = await fetch(BASE + path, {
            ...options,
            headers: { "Content-Type": 'application/json', ...options.headers },
            body: options.body ? JSON.stringify(options.body) : undefined
        })
    } catch {
        throw new Error("Cannot reach API server")
    }
    const data = response.status === 204 ? null : await response.json().catch(() => null)
    if (!response.ok) {
        throw new Error(data?.error ?? `Request failed (${response.status})`)
    }
    return data
}

export const getProduct = (id) => request(`/products/${id}`);
export const createOrder = (items) => request("/orders", { method: "POST", body: { items } });