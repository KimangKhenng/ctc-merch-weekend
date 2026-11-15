<template>
    <section class="max-w-6xl mx-auto px-6 py-10">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-4 h-4 bg-brand border-2 border-black"></div>
            <h1 class="text-2xl font-black uppercase">Admin</h1>
        </div>

        <!-- MESSAGES -->
        <p v-if="message" role="status" class="mb-5 border-2 border-black bg-yellow-300 p-3 font-extrabold uppercase">{{
            message }}</p>
        <p v-if="error" role="alert"
            class="mb-5 border-2 border-black bg-brand text-white p-3 font-extrabold uppercase">{{ error }}</p>

        <div class="grid gap-8 lg:grid-cols-2">
            <!-- FORM: used for both create and edit -->
            <div class="bg-white border-4 border-black shadow-brutal p-5 h-fit">
                <h2 class="text-lg font-black uppercase mb-4">
                    {{ form.id ? `Edit #${form.id}` : 'New product' }}
                </h2>

                <form class="space-y-4" @submit.prevent="save">
                    <div>
                        <label for="admin-name" class="block mb-2 text-xs font-extrabold uppercase">Name</label>
                        <input id="admin-name" v-model="form.name" type="text" name="name"
                            class="w-full border-2 border-black bg-paper px-3 py-2 text-sm font-medium focus:outline-none focus:bg-yellow-300" />
                    </div>

                    <div>
                        <label for="admin-category" class="block mb-2 text-xs font-extrabold uppercase">Category</label>
                        <select id="admin-category" v-model="form.category"
                            class="w-full border-2 border-black bg-paper px-3 py-2 text-sm font-bold uppercase focus:outline-none focus:bg-yellow-300">
                            <option v-for="category in categories" :key="category" :value="category">{{ category }}
                            </option>
                        </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="admin-price" class="block mb-2 text-xs font-extrabold uppercase">Price</label>
                            <input id="admin-price" v-model.number="form.price" type="number" step="0.01" min="0"
                                name="price"
                                class="w-full border-2 border-black bg-paper px-3 py-2 text-sm font-medium focus:outline-none focus:bg-yellow-300" />
                        </div>
                        <div>
                            <label for="admin-old-price" class="block mb-2 text-xs font-extrabold uppercase">Old
                                price</label>
                            <input id="admin-old-price" v-model="form.oldPrice" type="number" step="0.01" min="0"
                                name="oldPrice" placeholder="none"
                                class="w-full border-2 border-black bg-paper px-3 py-2 text-sm font-medium placeholder:text-black/40 focus:outline-none focus:bg-yellow-300" />
                        </div>
                    </div>

                    <div>
                        <label for="admin-description"
                            class="block mb-2 text-xs font-extrabold uppercase">Description</label>
                        <textarea id="admin-description" v-model="form.description" name="description" rows="3"
                            class="w-full border-2 border-black bg-paper px-3 py-2 text-sm font-medium focus:outline-none focus:bg-yellow-300"></textarea>
                    </div>

                    <label class="flex items-center gap-2 text-sm font-bold cursor-pointer select-none">
                        <input v-model="form.soldOut" type="checkbox" name="soldOut"
                            class="w-4 h-4 border-2 border-black accent-brand" />
                        Sold out
                    </label>

                    <div class="flex gap-3 pt-2">
                        <button type="submit"
                            class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                            {{ form.id ? 'Save changes' : 'Create' }}
                        </button>
                        <button type="button" @click="resetForm"
                            class="border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:bg-yellow-300">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <!-- PRODUCT LIST -->
            <div class="bg-white border-4 border-black shadow-brutal p-5">
                <h2 class="text-lg font-black uppercase mb-4">Products ({{ meta.total }})</h2>

                <p v-if="listError" role="alert"
                    class="mb-4 border-2 border-black bg-brand text-white p-3 font-extrabold uppercase">{{ listError }}
                </p>

                <ul class="space-y-3">
                    <li v-for="product in products" :key="product.id"
                        class="flex flex-wrap items-center justify-between gap-3 border-2 border-black bg-paper p-3">
                        <div>
                            <p class="text-sm font-extrabold uppercase">{{ product.name }}</p>
                            <p class="text-xs font-medium">
                                {{ product.category }} · ${{ product.price }}
                                <span v-if="product.oldPrice">(was ${{ product.oldPrice }})</span>
                                <span v-if="product.soldOut">· sold out</span>
                            </p>
                        </div>
                        <div class="flex gap-2">
                            <button type="button" @click="edit(product)"
                                class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-yellow-300">Edit</button>
                            <button type="button" @click="remove(product)"
                                class="border-2 border-black bg-white px-2 py-1 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white">Delete</button>
                        </div>
                    </li>
                </ul>
                <p v-if="!products.length && !loading" class="mt-4 font-extrabold uppercase text-center">No products on
                    this page.</p>

                <!-- PAGINATION -->
                <nav class="mt-6 flex items-center justify-center gap-3" aria-label="Admin pagination">
                    <button type="button" @click="prevPage" :disabled="meta.page <= 1 || loading"
                        class="border-2 border-black bg-white px-3 py-2 text-xs font-extrabold uppercase cursor-pointer hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        &larr; Previous
                    </button>
                    <span class="border-2 border-black bg-yellow-300 px-3 py-2 text-xs font-extrabold uppercase">
                        Page {{ meta.page }} of {{ meta.totalPages }}
                    </span>
                    <button type="button" @click="nextPage" :disabled="meta.page >= meta.totalPages || loading"
                        class="border-2 border-black bg-white px-3 py-2 text-xs font-extrabold uppercase cursor-pointer hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next &rarr;
                    </button>
                </nav>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useAdminProductStore } from '@/stores/adminProduct';

const emptyForm = () => ({ id: null, name: "", category: "Stickers", price: 0, oldPrice: "", soldOut: false, description: "" });

export default {
    data() {
        return {
            categories: ["Stickers", "Apparel", "Desk"],
            form: emptyForm(),
            message: "",
            error: ""
        };
    },
    computed: {
        ...mapState(useAdminProductStore, ['products', 'meta', 'loading']),
        // The list's own error, kept apart from the form's error
        ...mapState(useAdminProductStore, { listError: 'error' })
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        ...mapActions(useAdminProductStore, ['fetchProducts', 'nextPage', 'prevPage', 'saveProduct', 'removeProduct']),
        edit(product) {
            // Copy, so typing in the form does not change the store's data before Save
            this.form = { ...product, oldPrice: product.oldPrice ?? "" };
        },
        resetForm() {
            this.form = emptyForm();
        },
        async save() {
            this.message = "";
            this.error = "";
            // Send the fields only; the id belongs in the URL for updates and is assigned by the server for creates
            const { id, ...fields } = this.form;
            // an empty "old price" box means: no old price
            const body = { ...fields, oldPrice: this.form.oldPrice === "" ? null : Number(this.form.oldPrice) };
            try {
                await this.saveProduct(id, body);
                this.message = id ? `Saved "${body.name}".` : `Created "${body.name}".`;
                this.resetForm();
            } catch (err) {
                this.error = err.message;
            }
        },
        async remove(product) {
            this.message = "";
            this.error = "";
            try {
                await this.removeProduct(product.id);
                this.message = `Deleted "${product.name}".`;
            } catch (err) {
                this.error = err.message;
            }
        }
    }
}
</script>
