import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
state: {
    user: null,
    // url:'/api',
    // url: 'http://localhost:8000/api',
    url: 'https://memoire.amidev.bi/api',
    users:[],
    domains:[],
    categories:[],
    laboratoires:[],
    products:[],
    orders:[],
    orderitems:[],
    bonLivraisonItems:[],
    bonLivraisons:[],
    cart: {
      items: []
    },
    carts: {
      items: []
    }
  },
  mutations: {

    initiallizeStore(state) {
      // cart
      if(localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      // login
      if(localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }

    },
    addToCart(state, item) {
      const exists = state.cart.items.filter( i => i.product.id === item.product.id)
      if(exists.length) {
        exists[0].quantity = parseFloat(exists[0].quantity) + parseFloat(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },    
    AddToCart(state, item) {
      const exists = state.carts.items.filter( i => i.product.id === item.product.id)
      if(exists.length) {
        exists[0].quantity = parseFloat(exists[0].quantity) + parseFloat(item.quantity)
      } else {
        state.carts.items.push(item)
      }

      localStorage.setItem('carts', JSON.stringify(state.carts))
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    clearCart(state) {
      state.cart = { items: []}
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clear(state) {
      state.carts = { items: []}
      localStorage.setItem('carts', JSON.stringify(state.carts))
    },
  },

})