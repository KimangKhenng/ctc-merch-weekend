<template>
    <section class="max-w-3xl mx-auto px-6 py-10">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-4 h-4 bg-brand border-2 border-black"></div>
            <h1 class="text-2xl font-black uppercase">Checkout</h1>
        </div>

        <!-- ORDER PLACED -->
        <div v-if="order" class="bg-white border-4 border-black shadow-brutal p-6 text-center">
            <p class="text-3xl font-black uppercase">Order placed!</p>
            <p v-if="orderId" class="mt-2 font-bold">Order #{{ orderId }}</p>
            <p class="mt-2 font-medium">Thanks for your purchase.</p>
            <router-link to="/shops"
                class="inline-block mt-5 border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                Keep shopping
            </router-link>
        </div>

        <!-- EMPTY CART -->
        <div v-else-if="!carts.length" class="bg-white border-4 border-black shadow-brutal p-6 text-center">
            <p class="font-extrabold uppercase">Your cart is empty.</p>
            <router-link to="/shops"
                class="inline-block mt-4 border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase hover:bg-yellow-300">
                &larr; Back to shop
            </router-link>
        </div>

        <!-- SUMMARY -->
        <div v-else class="bg-white border-4 border-black shadow-brutal p-5">
            <ul class="space-y-3">
                <li v-for="item in carts" :key="item.id"
                    class="flex items-center justify-between gap-3 border-2 border-black bg-paper p-3">
                    <div>
                        <p class="text-sm font-extrabold uppercase">{{ item.name }}</p>
                        <p class="text-xs font-medium">${{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <p class="font-black">${{ formatPrice(item.price * item.quantity) }}</p>
                        <button type="button" :disabled="submitting" @click="removeProduct(item.id)"
                            class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                            Remove
                        </button>
                    </div>
                </li>
            </ul>

            <p v-if="error" role="alert"
                class="mt-5 border-2 border-black bg-brand text-white p-3 font-extrabold uppercase">
                {{ error }}
            </p>

            <div class="mt-5 pt-5 border-t-4 border-black flex flex-wrap items-center justify-between gap-4">
                <p class="text-2xl font-black uppercase">Total: ${{ formatPrice(total) }}</p>
                <div class="flex gap-3">
                    <router-link to="/shops"
                        class="border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase hover:bg-yellow-300">
                        Keep shopping
                    </router-link>
                    <button type="button" :disabled="submitting" @click="placeOrder"
                        class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:bg-gray-300 disabled:text-black/50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0">
                        {{ submitting ? 'Placing order...' : 'Place order' }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useCartStore } from '@/stores/cart';

export default {
    computed: {
        ...mapState(useCartStore, ['carts', 'total', 'submitting', 'error', 'order']),
        orderId() {
            return this.order?.id ?? this.order?.orderId ?? null
        }
    },
    created() {
        // Don't show a previous visit's "Order placed!" or error
        this.resetCheckout()
    },
    methods: {
        ...mapActions(useCartStore, ['removeProduct', 'placeOrder', 'resetCheckout']),
        formatPrice(value) {
            return Number(value).toFixed(2)
        }
    }
}
</script>
