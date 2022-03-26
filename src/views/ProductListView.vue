<template>
  <h1>Welcome to XYZ Store!</h1>
  <ul>
    <li v-for="product in products" :key="product.id">
      <RouterLink :to="{ name: 'product', params: { id: product.id } }">
        <p class="product-title">{{ product.name }}</p>
      </RouterLink>
      <p class="product-price">
        {{ getProductPrice(product) }}
      </p>
    </li>
  </ul>
</template>

<script>
import getProductPrice from "../mixins/getProductPrice";

export default {
  mixins: [getProductPrice],
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.$store.dispatch("fetchData");
  },
  mounted() {
    this.products = this.$store.state.products;
  },
};
</script>
<style>
.product-title {
  font-size: 1.5rem;
}

.product-price {
  color: tomato;
  font-family: sans-serif;
}
</style>
