<template>
    <section class="max-w-6xl mx-auto px-6 py-6">
        <!-- PER PAGE SELECT (UI only) -->
        <div class="mb-6 flex justify-end">
            <label class="flex items-center gap-2 font-extrabold uppercase">
                Per page
                <select v-model="meta.limit"
                    class="bg-white border-4 border-black shadow-brutal px-3 py-2 font-extrabold uppercase cursor-pointer hover:bg-yellow-300 focus:outline-none focus:bg-yellow-300">
                    <option v-for="(item, index) in perPages" :value="item" :key="index"> {{ item }}</option>
                </select>
            </label>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard v-for="(item, index) in products" :key="index" :product="item" @add-to-cart="addToCart" />
        </div>
        <!-- 5b. EMPTY STATE (hidden now — show it when a search finds nothing) -->
        <p class="hidden mt-6 bg-white border-4 border-black shadow-brutal p-6 text-center font-extrabold uppercase">
            No products match your search.
        </p>
        <!-- PAGINATION (UI only) -->
        <nav class="mt-8 flex items-center justify-center gap-4" aria-label="Pagination">
            <button @click="prevPage" type="button"
                class="bg-white border-4 border-black shadow-brutal px-5 py-2 font-extrabold uppercase hover:bg-yellow-300 active:translate-x-1 active:translate-y-1 active:shadow-none">
                &larr; Previous
            </button>
            <span class="border-4 border-black bg-yellow-300 px-4 py-2 font-extrabold uppercase">
                Page {{ meta.page }}
            </span>
            <button @click="nextPage" type="button"
                class="bg-white border-4 border-black shadow-brutal px-5 py-2 font-extrabold uppercase hover:bg-yellow-300 active:translate-x-1 active:translate-y-1 active:shadow-none">
                Next &rarr;
            </button>
        </nav>
    </section>
</template>
<script>
import ProductCard from '@/components/products/ProductCard.vue'
import { useProductStore } from '@/stores/product';
import { mapActions, mapState } from 'pinia';
export default {
    components: { ProductCard },
    data() {
        return {
            perPages: [8, 16, 24, 32],
        }
    },
    computed: {
        ...mapState(useProductStore, ['products', 'meta', 'loading', 'error'])
    },
    methods: {
        ...mapActions(useProductStore, ['fetchProducts', 'nextPage', 'prevPage'])
    },
    created() {
        this.fetchProducts()
    },
    watch: {
        meta: {
            async handler(newVal, oldVal) {
                await this.fetchProducts()
            }, deep: true
        }
    },
}
</script>