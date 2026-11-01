<template>
    <section id="cart" class="max-w-3xl mx-auto px-6 py-14">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-4 h-4 bg-brand border-2 border-black"></div>
            <h2 class="text-2xl font-black uppercase">Your cart ({{ cartCount }} items)</h2>
        </div>

        <div class="bg-white border-4 border-black shadow-brutal p-5">
            <ul class="space-y-3">
                <!-- 6a. CART ROWS (3 copies) -->
                <CartCard v-for="(item, index) in carts" :key="index" :product="item" @remove="removeProduct" />
            </ul>

            <!-- 6b. EMPTY CART (hidden now — show it when the cart has no rows) -->
            <p class="hidden border-2 border-black bg-paper p-4 text-center font-extrabold uppercase">Your cart is
                empty.
            </p>

            <div class="mt-5 pt-5 border-t-4 border-black flex flex-wrap items-center justify-between gap-4">
                <p class="text-2xl font-black uppercase">Total: $42.00</p>
                <div class="flex gap-3">
                    <button
                        class="border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase cursor-pointer">Clear</button>
                    <button
                        class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">Checkout</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import CartCard from '@/components/carts/CartCard.vue';
export default {
    components: { CartCard },
    emits: ['cartUpdated'],
    data() {
        return {
            carts: [
                { id: '01', name: 'Semicolon Sticker Pack', price: 5.6, quantity: 2 },
                { id: '02', name: 'Git Push Mug', price: 2, quantity: 1 },
                { id: '03', name: 'Dark Mode Tee', price: 8, quantity: 1 },
            ]
        }
    },
    computed: {
        cartCount() {
            return this.carts.reduce((sum, item) => {
                return sum + item.quantity
            }, 0)
        }
    },
    methods: {
        removeProduct(id) {
            this.carts = this.carts.filter((item) => item.id !== id)
            this.$emit('cartUpdated', this.cartCount)
        }
    }
}
</script>