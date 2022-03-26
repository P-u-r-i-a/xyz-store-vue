<template>
  <h1>Welcome to XYZ Store!</h1>
  <div>
    <label for="currency">Currency</label>
    <select name="currency" id="currency" v-model="currency">
      <option value="USD">USD</option>
      <option value="AUD">AUD</option>
      <option value="CNY">CNY</option>
    </select>
  </div>
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
import currency from "../mixins/currency";

export default {
  mixins: [getProductPrice, currency],
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
