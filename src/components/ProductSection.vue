<template>
    <section class="max-w-6xl mx-auto px-6 py-6">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard v-for="(item, index) in products" :key="index" :product="item" @add-to-cart="addToCart" />
        </div>
        <!-- 5b. EMPTY STATE (hidden now — show it when a search finds nothing) -->
        <p class="hidden mt-6 bg-white border-4 border-black shadow-brutal p-6 text-center font-extrabold uppercase">
            No products match your search.
        </p>
    </section>
</template>
<script>
import ProductCard from '@/components/products/ProductCard.vue'
export default {
    components: { ProductCard },
    // props: {
    //     products: {
    //         type: Object
    //     }
    // },
    data() {
        return {
            products: [],
            meta: {},
            loading: false,
            error: {}
        }
    },
    created() {
        this.fetchProducts()
    },
    emits: ['addToCart'],
    methods: {
        addToCart(product) {
            this.$emit('addToCart', product)
        },
        async fetchProducts() {
            const products = await fetch("https://brutal-api-sample.onrender.com/api/products?category=All&page=1&limit=10")
            const data = await products.json()
            console.log("Hello")
            console.log(data)
        }
    }
}
</script>