import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        carts: [
            { id: 1, name: 'Semicolon Sticker Pack', price: 5.6, quantity: 2 },
            { id: 2, name: 'Git Push Mug', price: 2, quantity: 1 },
            { id: 3, name: 'Dark Mode Tee', price: 8, quantity: 1 },
        ]
    }),
    getters: {
        count: (state) => state.carts.reduce((sum, c) => sum + c.quantity, 0),
        total: (state) => state.carts.reduce((sum, c) => sum + c.quantity * c.price, 0)
    },
    actions: {
        addToCart(product) {
            const existingProduct = this.carts.find((item) => item.id === product.id)
            console.log(existingProduct)
            if (existingProduct) {
                existingProduct.quantity++
            } else {
                this.carts.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
            }
        },
        removeProduct(id) {
            this.carts = this.carts.filter((item) => item.id !== id)
            this.$emit('cartUpdated', this.cartCount)
        },
        clearCart() {
            this.carts = []
        }
    }
})