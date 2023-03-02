import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Product from '../views/Product.vue'
import StockCentral from '../views/StockCentral.vue'
import Statistic from '../views/Statistic.vue'
import StockLabo1 from '../views/StockLabo1.vue'
import Cart from '../views/Cart.vue'
import cart from '../views/cart/cart.vue'
import Checkout from '../views/Checkout.vue'
import checkOrder from '../views/checkOrder.vue'
import Success from '../views/Success.vue'
import Orders from '../views/Orders.vue'
import commande from '../views/commande.vue'
import BonCommande from '../views/BonCommande.vue'
import Allproducts from '../views/Allproducts.vue'
import Boncart from '../views/Boncart.vue'
import checkbon from '../views/checkbon.vue'
// import Ventes from '../views/Ventes.vue'
// import StatsProduct from '../views/StatsProduct.vue'
// import StatsClients from '../views/StatsClients.vue'
// import StatsPertes from '../views/StatsPertes.vue'
// import Payments from '../views/Payments.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [
  { path : '/', name: '', component: Home },
  { path : '/home', name: 'home', component: Home },
  { path : '/domain/:id/category', name: 'category', component: Category },
  { path : '/category/:id/products', name: 'product', component: Product },
  { path : '/stock', name: 'stockcentral', component: StockCentral },
  { path : '/stock-labo', name: 'stock', component: StockLabo1 },
  { path : '/orders',name: 'Orders', component: Orders},
  { path : '/command',name: 'commande', component: commande},
  { path : '/bon-commande',name: 'BonCommande', component: BonCommande},
  { path : '/products',name: 'Allproducts', component: Allproducts},
  { path : '/cart/checkout', name: 'Checkout', component: Checkout},
  { path : '/cart/checkorder', name: 'checkorder', component: checkOrder, },
  { path : '/cart/bon', name: 'checkbon', component: checkbon, },
  { path : '/cart/success', name: 'Success', component: Success,  },
  { path : '/cart-order', name : 'CartOrder', component : cart},
  { path : '/cart', name: 'Cart', component: Cart },
  { path : '/bon', name: 'Boncart', component: Boncart },
  { path : '/users', name: 'users', component: Users },
  { path : '/statistic', name: 'statistic', component: Statistic },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
