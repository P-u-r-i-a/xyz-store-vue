export default {
  methods: {
    getProductPrice(product) {
      return this.$store.getters["getProductPrice"](product);
    },
  },
};
