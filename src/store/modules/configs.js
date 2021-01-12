/**

 * vuex config 模块

 * @module configs.js

 */

export default {
  state: {
    showLoading: false,
    downloadPercentage: 0,
    findNewVersion: false,
    apiUrls: []
  },
  getters: {
    showLoading: state => state.showLoading,
    findNewVersion: state => state.findNewVersion,
    downloadPercentage: state => state.downloadPercentage,
    apiUrls: state => state.apiUrls
  }
};
