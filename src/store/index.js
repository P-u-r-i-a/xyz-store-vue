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
  },
  actions: {
    fetchData({ commit }) {
      commit("setProducts", products);
      commit("setRates", rates);
    },
  },
  getters: {},
});

export default store;
