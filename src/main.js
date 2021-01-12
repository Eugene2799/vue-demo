import Vue from "vue";
import "./registerServiceWorker";
import FastClick from "fastclick";

import App from "./App.vue";
import "./utils/constants.js";
import router from "./router";
import store from "./store";
import { Icon, Toast } from "vant";

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import "lib-flexible/flexible";
import "@/styles/index.scss";
import "vant/lib/icon/local.css";
import "vant/lib/button/style";
import "vant/lib/nav-bar/style";
import "vant/lib/field/style";
import "vant/lib/icon/style";
import "vant/lib/grid/style";
import "vant/lib/toast/style";
import "vant/lib/grid-item/style";
import "vant/lib/cell/style";
import "vant/lib/cell-group/style";

FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(Icon);
Vue.use(Toast);
Vue.use(VuePlyr, {
  plyr: {}
})

router.beforeEach(function(to, from, next) {
  store.commit("updateLoadingStatus", { showLoading: true });
  if (to.matched.some((r) => r.meta.requireAuth)) {
    next();
  } else {
    next();
  }
});

router.afterEach((toRoute, fromRoute) => {
  store.commit("updateLoadingStatus", { showLoading: false });
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
