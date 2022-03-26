<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p class="product-price">
      {{ `${product.price.amount} ${product.price.base}` }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      product: null,
    };
  },
  created() {
    if (this.$store.state.products || this.$store.state.rates) {
      this.$store.dispatch("fetchData");
    }
  },
  mounted() {
    this.product = this.$store.getters["getProductById"](this.id);
  },
};
</script>
