<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p class="product-price">
      {{ `${product.price.amount} ${product.price.base}` }}
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
            {{ `${relatedProduct.price.amount} ${relatedProduct.price.base}` }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["id"],
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
