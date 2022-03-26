<template>
  <RouterLink :to="{ name: 'productList' }">
    <p>Home Page</p>
  </RouterLink>
  <div v-if="product">
    <div>
      <label for="currency">Currency</label>
      <select name="currency" id="currency" v-model="currency">
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="CNY">CNY</option>
      </select>
    </div>
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p class="product-price">
      {{ getProductPrice(product) }}
    </p>
    <hr />
    <h2>Related Products</h2>
    <ul>
      <li v-for="relatedProduct in relatedProducts" :key="relatedProduct.id">
        <div>
          <RouterLink
            :to="{ name: 'product', params: { id: relatedProduct.id } }"
          >
            <p class="product-title">{{ relatedProduct.name }}</p>
          </RouterLink>
          <p class="product-price">
            {{ getProductPrice(relatedProduct) }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import getProductPrice from "../mixins/getProductPrice";
import currency from "../mixins/currency";

export default {
  props: ["id"],
  mixins: [getProductPrice, currency],
  data() {
    return {
      product: null,
      relatedProducts: [],
    };
  },
  created() {
    if (this.$store.state.products || this.$store.state.rates) {
      this.$store.dispatch("fetchData");
    }
  },
  mounted() {
    this.product = this.$store.getters["getProductById"](this.id);
    this.handleRelatedProducts();
  },
  methods: {
    handleRelatedProducts() {
      this.product.relatedProducts.forEach((relatedProductId) => {
        this.relatedProducts.push(
          this.$store.getters["getProductById"](relatedProductId)
        );
      });
    },
  },
  watch: {
    id() {
      this.product = this.$store.getters["getProductById"](this.id);
      this.relatedProducts = [];
      this.handleRelatedProducts();
    },
  },
};
</script>
