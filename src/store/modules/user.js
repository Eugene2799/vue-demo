/**

 * vuex user 模块

 * @module user.js

 */

export default {
  state: {
    userInfo: {}
  },
  getters: {
    userInfo: state => state.userInfo
  }
};
