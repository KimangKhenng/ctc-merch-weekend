import { defineStore } from 'pinia';
import { request } from '@/services/api';
export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        meta: {
            page: 1,
            limit: 8
        },
        loading: false,
        error: {}
    }),
    actions: {
        async fetchProducts() {
            this.loading = true
            this.error = ""
            try {
                const reponse = await request(`/products?category=All&page=${this.meta.page}&limit=${this.meta.limit}`)
                this.products = reponse.data
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
        async nextPage() {
            this.meta.page++
            await this.fetchProducts()
        },
        async prevPage() {
            if (this.meta.page > 1) {
                this.meta.page--
                await this.fetchProducts()
            }
        }
    }
})