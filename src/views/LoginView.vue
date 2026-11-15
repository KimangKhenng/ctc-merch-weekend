<template>
    <section class="max-w-md mx-auto px-6 py-10">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-4 h-4 bg-brand border-2 border-black"></div>
            <h1 class="text-2xl font-black uppercase">Log in</h1>
        </div>

        <div class="bg-white border-4 border-black shadow-brutal p-6">
            <p class="text-sm font-medium mb-6">Welcome back. Enter your details to continue.</p>

            <form class="space-y-5" @submit.prevent="submit">
                <!-- EMAIL -->
                <div>
                    <label for="login-email" class="block mb-2 text-xs font-extrabold uppercase">Email</label>
                    <input v-model="email" id="login-email" type="email" name="email" autocomplete="email" required
                        placeholder="you@example.com"
                        class="w-full border-2 border-black bg-paper px-3 py-2 text-sm font-medium placeholder:text-black/40 focus:outline-none focus:bg-yellow-300" />
                </div>

                <!-- PASSWORD -->
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label for="login-password" class="text-xs font-extrabold uppercase">Password</label>
                        <a href="#" class="text-xs font-bold underline underline-offset-2 hover:text-brand">
                            Forgot?
                        </a>
                    </div>
                    <input v-model="password" id="login-password" type="password" name="password"
                        autocomplete="current-password" required placeholder="••••••••"
                        class="w-full border-2 border-black bg-paper px-3 py-2 text-sm font-medium placeholder:text-black/40 focus:outline-none focus:bg-yellow-300" />
                </div>

                <!-- REMEMBER ME -->
                <label class="flex items-center gap-2 text-sm font-bold cursor-pointer select-none">
                    <input type="checkbox" name="remember" class="w-4 h-4 border-2 border-black accent-brand" />
                    Remember me
                </label>

                <!-- SUBMIT -->
                <button type="submit"
                    class="w-full border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-3 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                    Log in
                </button>
            </form>

            <div class="mt-6 pt-5 border-t-4 border-black text-center">
                <p class="text-sm font-medium">Just browsing?</p>
                <router-link to="/shops"
                    class="inline-block mt-3 border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase hover:bg-yellow-300">
                    Continue to shop
                </router-link>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth';
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useAuthStore, ["login"]),
        async submit() {
            this.busy = true;
            this.error = "";
            try {
                await this.login(this.email, this.password);
                // go back to the page the guard stopped, or to the shop
                this.$router.push(this.$route.query.redirect || "/");
            } catch (err) {
                this.error = err.message;
            } finally {
                this.busy = false;
            }
        },
    },
}
</script>
