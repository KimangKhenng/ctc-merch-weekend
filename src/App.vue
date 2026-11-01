<template>
  <div class="min-h-screen bg-paper text-black font-sans">
    <AnnouncementBar />
    <NavHeader :cart-count="cartCount" />
    <main id="top">
      <HeroSection />
      <FilterBar />
      <ProductSection />
      <CartSection @cart-updated="updateCart" />
      <PerkSection />
      <FAQSection />
      <NewsSletter />
    </main>
    <FooterSection />
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader.vue';
import HeroSection from '@/components/HeroSection.vue';
import FilterBar from '@/components/FilterBar.vue';
import ProductSection from '@/components/ProductSection.vue';
import CartSection from '@/components/CartSection.vue';
import PerkSection from '@/components/PerkSection.vue';
import FAQSection from '@/components/FAQSection.vue';
import NewsSletter from '@/components/NewsSletter.vue';
import FooterSection from '@/components/FooterSection.vue';
import AnnouncementBar from '@/components/AnnouncementBar.vue';
export default {
  components: {
    NavHeader,
    HeroSection,
    FilterBar,
    ProductSection,
    CartSection,
    PerkSection,
    FAQSection,
    NewsSletter,
    FooterSection,
    AnnouncementBar
  },
  data() {
    return {
      cartCount: 3
    }
  },
  methods: {
    updateCart(num) {
      this.cartCount = num
    }
  }
}
</script>