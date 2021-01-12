import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import configs from './modules/configs';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations,
  actions,
  modules: {
    configs,
    user
  }
});
