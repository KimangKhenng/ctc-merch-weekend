<template>
    <section class="max-w-3xl mx-auto px-6 py-10">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-4 h-4 bg-brand border-2 border-black"></div>
            <h1 class="text-2xl font-black uppercase">My orders</h1>
        </div>

        <!-- LOADING -->
        <p v-if="loading" class="bg-white border-4 border-black shadow-brutal p-6 text-center font-extrabold uppercase">
            Loading orders...
        </p>

        <!-- ERROR -->
        <p v-else-if="error" role="alert"
            class="bg-brand text-white border-4 border-black shadow-brutal p-6 text-center font-extrabold uppercase">
            {{ error }}
        </p>

        <!-- NO ORDERS -->
        <div v-else-if="!orders.length" class="bg-white border-4 border-black shadow-brutal p-6 text-center">
            <p class="font-extrabold uppercase">You have no orders yet.</p>
            <router-link to="/shops"
                class="inline-block mt-4 border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase hover:bg-yellow-300">
                &larr; Back to shop
            </router-link>
        </div>

        <!-- ORDER LIST -->
        <ul v-else class="space-y-5">
            <li v-for="order in orders" :key="order.id" class="bg-white border-4 border-black shadow-brutal p-5">
                <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-4 border-black">
                    <p class="font-black uppercase">Order #{{ order.id }}</p>
                    <p class="text-xl font-black">${{ formatPrice(order.total) }}</p>
                </div>

                <ul class="mt-3 space-y-2">
                    <li v-for="(line, index) in linesOf(order)" :key="index"
                        class="flex items-center justify-between gap-3 border-2 border-black bg-paper p-2 text-sm font-bold">
                        <span>{{ line.quantity }} &times; {{ line.name }}</span>
                        <span v-if="line.price != null">${{ formatPrice(line.price * line.quantity) }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>
<script>
import { getMyOrders } from '@/services/api';

export default {
    data() {
        return {
            orders: [],
            loading: true,
            error: ""
        };
    },
    async created() {
        try {
            const result = await getMyOrders();
            // The API may wrap the list ({ data: [...] }) or return it directly
            this.orders = Array.isArray(result) ? result : (result?.data ?? []);
        } catch (err) {
            this.error = err.message;
        } finally {
            this.loading = false;
        }
    },
    methods: {
        // The API's order lines may be called items or lines, and the product name may be under name or productName
        linesOf(order) {
            const lines = order.items ?? order.lines ?? [];
            return lines.map((line) => ({
                name: line.name ?? line.productName ?? `Product #${line.productId ?? line.id}`,
                quantity: line.quantity,
                price: line.price ?? null
            }));
        },
        formatPrice(value) {
            return Number(value ?? 0).toFixed(2);
        }
    }
}
</script>
