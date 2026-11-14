<template>
    <li class="flex items-center justify-between gap-3 border-2 border-black bg-paper p-3">
        <div>
            <p class="text-sm font-extrabold uppercase">{{ product.name }}</p>
            <p class="text-xs font-medium">${{ product.price }} × {{ product.quantity }}</p>
        </div>
        <div class="flex items-center gap-3">
            <p class="font-black">${{ total }}</p>
            <button @click="removeProduct(product.id)"
                class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white">Remove</button>
        </div>
    </li>
</template>
<script>
import { useCartStore } from '@/stores/cart';
import { mapActions } from 'pinia';
export default {
    props: {
        product: {
            type: Object,
            default: () => {
                return {
                    id: 0,
                    name: '',
                    price: 0,
                    quantity: 0,
                }

            }
        }
    },
    methods: {
        ...mapActions(useCartStore, ['removeProduct'])
    },
    computed: {
        total() {
            return this.product.quantity * this.product.price
        }
    }
}
</script>