<template>
  <div class="min-h-screen bg-paper text-black font-sans">
    <AnnouncementBar />
    <NavHeader :cart-count="cartCount" />
    <main id="top">
      <HeroSection />
      <FilterBar />
      <ProductSection :products="products" @add-to-cart="addToCart" />
      <CartSection @remove-product="removeProduct" :carts="carts" />
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
      products: [
        { "id": 1, "name": "Semicolon Sticker Pack", "category": "Stickers", "price": 4.0, "oldPrice": null, "soldOut": false, "description": "10 vinyl stickers for your laptop." },
        { "id": 2, "name": "Bug Hunter Hoodie", "category": "Apparel", "price": 45.0, "oldPrice": 60.0, "soldOut": false, "description": "Heavy cotton. Warm for late-night fixes." },
        { "id": 3, "name": "Git Push Mug", "category": "Desk", "price": 12.0, "oldPrice": null, "soldOut": false, "description": "Holds 350ml of coffee. Force push not included." },
        { "id": 4, "name": "Dark Mode Tee", "category": "Apparel", "price": 22.0, "oldPrice": null, "soldOut": false, "description": "100% black. Easy on the eyes." },
        { "id": 5, "name": "Ctrl+Z Mousepad", "category": "Desk", "price": 15.0, "oldPrice": null, "soldOut": false, "description": "Large size. Undo your mistakes in style." },
        { "id": 6, "name": "Component Pin", "category": "Stickers", "price": 3.5, "oldPrice": null, "soldOut": false, "description": "Metal pin. Small, reusable, and clean." },
        { "id": 7, "name": "404 Notebook", "category": "Desk", "price": 9.0, "oldPrice": null, "soldOut": true, "description": "Blank pages. Page not found." },
        { "id": 8, "name": "Rubber Duck Debugger", "category": "Desk", "price": 8.0, "oldPrice": 10.0, "soldOut": false, "description": "Explain your bug to the duck. It always helps." },
        { "id": 9, "name": "Localhost Cap", "category": "Apparel", "price": 18.0, "oldPrice": null, "soldOut": false, "description": "127.0.0.1 on the front. There is no place like home." },
        { "id": 10, "name": "Merge Conflict Poster", "category": "Desk", "price": 14.0, "oldPrice": null, "soldOut": false, "description": "A3 print. Resolve it or frame it." },
        { "id": 11, "name": "npm install Socks", "category": "Apparel", "price": 7.5, "oldPrice": 9.0, "soldOut": false, "description": "Many dependencies. One comfy pair." },
        { "id": 12, "name": "Hello World Sticker", "category": "Stickers", "price": 2.0, "oldPrice": null, "soldOut": false, "description": "Your very first program, now on your bottle." }
      ],
      carts: [
        { id: 1, name: 'Semicolon Sticker Pack', price: 5.6, quantity: 2 },
        { id: 2, name: 'Git Push Mug', price: 2, quantity: 1 },
        { id: 3, name: 'Dark Mode Tee', price: 8, quantity: 1 },
      ]
    }
  },
  computed: {
    cartCount() {
      return this.carts.reduce((sum, item) => {
        return sum + item.quantity
      }, 0)
    }
  },
  methods: {
    removeProduct(id) {
      this.carts = this.carts.filter((item) => item.id !== id)
      this.$emit('cartUpdated', this.cartCount)
    },
    addToCart(product) {
      const existingProduct = this.carts.find((item) => item.id === product.id)
      console.log(existingProduct)
      if (existingProduct) {
        existingProduct.quantity++
      } else {
        this.carts.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
      }
    }
  }
}
</script>