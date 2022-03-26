import { createStore } from "vuex";

import products from "../fake-api/products.json";
import rates from "../fake-api/exchange_rates.json";

const store = createStore({
  state: {
    products: [],
    currency: "USD",
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setRates(state, rates) {
      state.rates = rates;
    },
    setActiveCurrency(state, currency) {
      state.currency = currency;
    },
  },
  actions: {
    fetchData({ commit }) {
      commit("setProducts", products);
      commit("setRates", rates);
    },
  },
  getters: {
    getProductById: (state) => (id) => {
      let product = state.products.find((product) => {
        return product.id == id;
      });

      return product;
    },
    getProductPrice: (state, getters) => (product) => {
      let price = product.price.amount;
      if (product.price.base !== state.currency) {
        price =
          product.price.amount /
          getters.getActiveCurrencyWithRates.rates[product.price.base];
      }

      return `${price.toFixed(2)} ${state.currency}`;
    },
    getActiveCurrencyWithRates(state) {
      return state.rates.find((rate) => rate.base == state.currency);
    },
  },
});

export default store;
