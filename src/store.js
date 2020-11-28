import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSet: {},
    cart: []
   },
   mutations: {
    mutateDataSet(state, payload) {
     state.dataSet = payload;
    },
    addCart(state, product){
      state.cart.push(product)
    },
    removeCart(state, targetIndex){
      state.cart.splice(targetIndex,1)
    },
   },
   actions: {
    commitDataSet(store) {
     return axios.get('/data_min.json')
      .then(response => {
       store.commit('mutateDataSet', response.data)
      })
      .catch((reason) => {
       console.log(reason.message)
      })
    },
    addCart(store, product){
      store.commit('addCart', product)
    },
    removeCart(store, targetIndex){
      store.commit('removeCart', targetIndex)
    },
   },
   getters: {
    getStateDataSet: (state) => state.dataSet,
    getCartData: (state) => state.cart,
    getCartTotal(state) {
      let total = 0
      for (const item in state.cart) {
        total += state.cart[item].price
        }
      return total
    },
    getCategories(state) {
      let categories = []
      for (const item in state.dataSet.articles) {
        const category = state.dataSet.articles[item].category
        if (categories.indexOf(category) == -1){
          categories.push(category)
        }   
      }
      return categories
    },
    getArticles(state) {
      return category => {
        let articleList = []
        for (const item in state.dataSet.articles) {
          const article = state.dataSet.articles[item]
          if (article.category === category) {
            articleList.push(article)
          }
        }
        return articleList
      }
    },
    getRelated(state) {
      return product => {
        let relatedList = []
        for (const i in state.dataSet.products) {
          const item = state.dataSet.products[i]
          if (item.series === product.series) {
            if (item.pid != product.pid) {
              relatedList.push(item)
            }
          }
        }
        return relatedList
      }
    }
  }
})