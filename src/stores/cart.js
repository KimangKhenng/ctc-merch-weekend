import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { createOrder } from "@/services/api";

export const useCartStore = defineStore("cart", () => {
    const carts = ref([
        { id: 1, name: 'Semicolon Sticker Pack', price: 5.6, quantity: 2 },
        { id: 2, name: 'Git Push Mug', price: 2, quantity: 1 },
        { id: 3, name: 'Dark Mode Tee', price: 8, quantity: 1 },
    ]);
    const submitting = ref(false);
    const error = ref('');
    const order = ref(null);

    const count = computed(() => carts.value.reduce((sum, c) => sum + c.quantity, 0));
    const total = computed(() => carts.value.reduce((sum, c) => sum + c.quantity * c.price, 0));

    function addToCart(product) {
        const existingProduct = carts.value.find((item) => item.id === product.id);
        console.log(existingProduct);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            carts.value.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }
    }

    function removeProduct(id) {
        carts.value = carts.value.filter((item) => item.id !== id);
    }

    function clearCart() {
        carts.value = [];
    }

    async function placeOrder() {
        if (submitting.value || !carts.value.length) return;
        submitting.value = true;
        error.value = '';
        try {
            const items = carts.value.map((item) => ({ productId: item.id, quantity: item.quantity }));
            // `|| {}` keeps the success state visible if the API replies with an empty body
            order.value = (await createOrder(items)) || {};
            clearCart();
        } catch (err) {
            error.value = err.message;
        } finally {
            submitting.value = false;
        }
    }

    function resetCheckout() {
        error.value = '';
        order.value = null;
    }

    return {
        carts,
        submitting,
        error,
        order,
        count,
        total,
        addToCart,
        removeProduct,
        clearCart,
        placeOrder,
        resetCheckout
    };
});
