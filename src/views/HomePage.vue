<template>
    <HeroSection />
    <FilterBar />
    <ProductSection />
    <CartSection />
    <FAQSection />
    <NewsSletter />
</template>
<script>
import HeroSection from '@/components/HeroSection.vue';
import FilterBar from '@/components/FilterBar.vue';
import ProductSection from '@/components/ProductSection.vue';
import CartSection from '@/components/CartSection.vue';
import FAQSection from '@/components/FAQSection.vue';
import NewsSletter from '@/components/NewsSletter.vue';
export default {
    components: {
        HeroSection,
        FilterBar,
        ProductSection,
        CartSection,
        FAQSection,
        NewsSletter
    },
}
</script>