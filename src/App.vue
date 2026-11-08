<template>
  <div class="min-h-screen bg-paper text-black font-sans">
    <AnnouncementBar />
    <NavHeader :cart-count="cartCount" />
    <main id="top">
      <RouterView />
      <!-- <HeroSection />
      <FilterBar />
      <ProductSection :products="products" @add-to-cart="addToCart" />
      <CartSection @remove-product="removeProduct" :carts="carts" />
      <PerkSection />
      <FAQSection />
      <NewsSletter /> -->
    </main>
    <FooterSection />
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader.vue';
import FooterSection from '@/components/FooterSection.vue';
import AnnouncementBar from '@/components/AnnouncementBar.vue';
export default {
  components: {
    NavHeader,
    FooterSection,
    AnnouncementBar
  }
}
</script>