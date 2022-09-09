import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import './icons'

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
Vue.component('fa', FontAwesomeIcon)
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
