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
    emits: ['removeProduct'],
    data() {
        return {
            count: 0
        }
    },
    beforeCreate() { console.log("Logger: beforeCreate. count =", this.count); },
    created() { console.log("Logger: created. count =", this.count); },
    beforeMount() { console.log("Logger: beforeMount"); },
    mounted() { console.log("Logger: mounted", this.$el); },
    beforeUpdate() { console.log("Logger: beforeUpdate"); },
    updated() { console.log("Logger: updated"); },
    beforeUnmount() { console.log("Logger: beforeUnmount"); },
    unmounted() { console.log("Logger: unmounted"); },
    props: {
        carts: {
            type: Object, required: true
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
            this.$emit('removeProduct', id)
        }
    }
}
</script>