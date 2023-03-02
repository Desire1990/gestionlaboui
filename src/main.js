import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import './icons'


import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


import {
  faShoppingCart, faBoxOpen, faUsers, faChartBar, faPen,
  faTrashAlt, faCheck, faHandHoldingUsd, faPowerOff,
  faDownload, faUpload
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faShoppingCart, faBoxOpen, faUsers, faChartBar, faPen,
  faTrashAlt, faCheck, faHandHoldingUsd, faPowerOff,
  faDownload, faUpload
)
Vue.component('fas', FontAwesomeIcon)
Vue.mixin({
  computed:{
        header(){
            return {
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.access}`,
                },
            };
        }

    },
  methods: {
    money(x) {
      if(x == undefined || x == null) return "-";
      // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    datetime(x) {
      if(!x) return "-"
      let date = new Date(x);
      return new Intl.DateTimeFormat(
        'en-GB',
        { dateStyle: 'short', timeStyle: 'short' }
      ).format(date)
    },
    userIs(group){
      return this.user.groups.includes(group);
    },
  },
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
