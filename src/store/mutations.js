const mutations = {
  updateLoadingStatus: (state, payload) =>
    (state.configs.showLoading = payload.showLoading),
  appUpdatingStatus: (state, payload) => {
    state.findNewVersion = true;
    state.downloadPercentage = payload.downloadPercentage;
  },
  appDownloadFailed: state => {
    state.findNewVersion = false;
    state.downloadPercentage = 0;
  }
};

export default mutations;
