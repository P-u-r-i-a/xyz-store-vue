export default {
  data() {
    return {
      currency: null,
    };
  },
  mounted() {
    this.currency = this.$store.state.currency;
  },
  watch: {
    currency(newValue) {
      this.$store.commit("setActiveCurrency", newValue);
    },
  },
};
