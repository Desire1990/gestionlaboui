import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stock from '../views/Stock.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Success from '../views/Success.vue'
import Order from '../views/Order.vue'
import commande from '../views/commande.vue'
// import Dettes from '../views/Dettes.vue'
// import Achats from '../views/Achats.vue'
// import Ventes from '../views/Ventes.vue'
// import StatsProduct from '../views/StatsProduct.vue'
// import StatsClients from '../views/StatsClients.vue'
// import StatsPertes from '../views/StatsPertes.vue'
// import Payments from '../views/Payments.vue'
// import Pertes from '../views/Pertes.vue'
// import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: '', component: Home },
  {path: '/home', name: 'home', component: Home },
  {path: '/domain/:id/category/', name: 'category', component: () => import('../views/Category.vue'), props: true},
  {path: '/category/:id/products/', name: 'product', component: () => import('../views/Product.vue'), props: true},
  {path: '/stock1', name: 'stock', component: Stock },
  {path: '/orders',name: 'Order', component: Order},
  {path: '/command',name: 'commande', component: commande},
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/cart/success',
    name: 'Success',
    component: Success,

  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
//   { path: '/hist/dettes', name: 'dettes', component: Dettes },
//   { path: '/hist/achats', name: 'achats', component: Achats },
//   { path: '/hist/ventes', name: 'ventes', component: Ventes },
//   { path: '/hist/paiements', name: 'paiements', component: Payments },
//   { path: '/stats/product', name: 'statsproduct', component: StatsProduct },
//   { path: '/stats/clients', name: 'statsclients', component: StatsClients },
//   { path: '/stats/pertes', name: 'statspertes', component: StatsPertes },
//   { path: '/pertes', name: 'pertes', component: Pertes },
//   { path: '/users', name: 'users', component: Users },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
