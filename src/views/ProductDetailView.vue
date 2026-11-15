<template>
    <section class="max-w-6xl mx-auto px-6 py-6">
        <router-link to="/"
            class="inline-block mb-6 bg-white border-4 border-black shadow-brutal-sm px-4 py-2 font-extrabold uppercase hover:bg-yellow-300">
            &larr; Back to shop
        </router-link>

        <!-- LOADING -->
        <p v-if="loading" class="bg-white border-4 border-black shadow-brutal p-6 text-center font-extrabold uppercase">
            Loading product...
        </p>

        <!-- ERROR / NOT FOUND -->
        <div v-else-if="error" class="bg-white border-4 border-black shadow-brutal p-6 text-center">
            <p class="font-extrabold uppercase">{{ error }}</p>
            <button type="button" @click="loadProduct"
                class="mt-4 border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                Try again
            </button>
        </div>

        <!-- PRODUCT -->
        <article v-else-if="product" class="grid gap-8 md:grid-cols-2">
            <div class="relative min-h-72 border-4 border-black shadow-brutal flex items-end p-6" :class="{
                'bg-black text-white': product.category === 'Apparel',
                'bg-brand text-white': product.category === 'Stickers',
                'bg-white text-black': product.category === 'Desk'
            }">
                <span class="text-9xl font-black leading-none">{{ product.id }}</span>
                <span v-if="product.oldPrice"
                    class="absolute top-4 right-4 bg-brand text-white border-2 border-white text-sm font-extrabold uppercase px-3 py-1">Sale</span>
            </div>

            <div class="bg-white border-4 border-black shadow-brutal p-6 flex flex-col gap-4">
                <span class="self-start border-2 border-black text-xs font-bold uppercase px-2 py-0.5">{{
                    product.category }}</span>
                <h1 class="text-3xl md:text-4xl font-black uppercase leading-tight">{{ product.name }}</h1>
                <p class="font-medium">{{ product.description }}</p>

                <p class="text-3xl font-black">
                    ${{ formatPrice(product.price) }}
                    <span v-if="product.oldPrice" class="text-lg font-bold line-through text-black/50">
                        ${{ formatPrice(product.oldPrice) }}
                    </span>
                </p>

                <button type="button" :disabled="product.soldOut" @click="handleAdd"
                    class="mt-auto border-4 border-black bg-brand text-white shadow-brutal-sm px-5 py-3 font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:bg-gray-300 disabled:text-black/50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0">
                    {{ product.soldOut ? 'Sold out' : added ? 'Added ✓' : 'Add to cart' }}
                </button>
                <button v-if="inCart" type="button" @click="removeProduct(product.id)"
                    class="border-4 border-black bg-white px-5 py-3 font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white">
                    Remove from cart ({{ inCart.quantity }})
                </button>
            </div>
        </article>
    </section>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { getProduct } from '@/services/api';
import { useCartStore } from '@/stores/cart';

export default {
    data() {
        return {
            product: null,
            loading: false,
            error: '',
            added: false,
            addedTimer: null
        }
    },
    computed: {
        ...mapState(useCartStore, ['carts']),
        inCart() {
            return this.product && this.carts.find((item) => item.id === this.product.id)
        }
    },
    watch: {
        // Reload when navigating between products (the component is reused)
        '$route.params.id': {
            immediate: true,
            handler() {
                this.loadProduct()
            }
        }
    },
    beforeUnmount() {
        clearTimeout(this.addedTimer)
    },
    methods: {
        ...mapActions(useCartStore, ['addToCart', 'removeProduct']),
        async loadProduct() {
            const id = this.$route.params.id
            this.loading = true
            this.error = ''
            this.product = null
            try {
                const product = await getProduct(id)
                // Ignore stale responses if the user navigated away mid-request
                if (id === this.$route.params.id) this.product = product
            } catch (err) {
                if (id === this.$route.params.id) this.error = err.message
            } finally {
                if (id === this.$route.params.id) this.loading = false
            }
        },
        handleAdd() {
            this.addToCart(this.product)
            this.added = true
            clearTimeout(this.addedTimer)
            this.addedTimer = setTimeout(() => (this.added = false), 1500)
        },
        formatPrice(value) {
            return Number(value).toFixed(2)
        }
    }
}
</script>
