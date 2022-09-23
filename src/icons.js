import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas)
// dom.watch();
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import { faBars, faSearch, faBell, faPowerOff, faUser, faCogs, faTh, faShareAlt, faStar, faComment } from '@fortawesome/free-solid-svg-icons'

// library.add(faBars, faSearch, faBell, faPowerOff, faUser, faCogs, faTh, faShareAlt, faStar, faComment)

Vue.component('fas-icon', FontAwesomeIcon)