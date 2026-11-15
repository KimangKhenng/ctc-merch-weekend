import { defineStore } from 'pinia';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/api';

// The product list for the admin page only. It has its own paging, so changing the page here
// does not change the shop's page in the product store.
export const useAdminProductStore = defineStore('adminProduct', {
    state: () => ({
        products: [],
        meta: {
            page: 1,
            limit: 8,
            total: 0,
            totalPages: 1
        },
        loading: false,
        error: ""
    }),
    actions: {
        async fetchProducts() {
            this.loading = true;
            this.error = "";
            try {
                const result = await getProducts(this.meta.page, this.meta.limit);
                this.products = result.data ?? [];
                this.meta.total = result.meta?.total ?? this.products.length;
                this.meta.totalPages = Math.max(result.meta?.totalPages ?? 1, 1);
                // The last item on the last page was deleted: step back to the new last page
                if (this.meta.page > this.meta.totalPages) {
                    this.meta.page = this.meta.totalPages;
                    await this.fetchProducts();
                }
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        async nextPage() {
            if (this.meta.page < this.meta.totalPages) {
                this.meta.page++;
                await this.fetchProducts();
            }
        },
        async prevPage() {
            if (this.meta.page > 1) {
                this.meta.page--;
                await this.fetchProducts();
            }
        },
        // id is null for a new product (create) and a number for an existing one (update).
        // Throws if the server refuses the save; the caller shows the message.
        async saveProduct(id, fields) {
            if (id) {
                await updateProduct(id, fields);
            } else {
                await createProduct(fields);
            }
            await this.fetchProducts();    // reload the current page of the list
        },
        // Throws if the server refuses the delete; the caller shows the message.
        async removeProduct(id) {
            await deleteProduct(id);
            await this.fetchProducts();
        }
    }
});
