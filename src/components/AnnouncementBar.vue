<template>
    <div class="bg-black text-white text-center text-xs font-bold uppercase tracking-widest py-2 px-4">
        {{ isLoggedIn ? `Welcome! ${user.email}` : "Freeshipping!" }}
    </div>
</template>
<script>
import { useAuthStore } from '@/stores/auth';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useAuthStore, ['isLoggedIn', 'user'])
    }
}
</script>