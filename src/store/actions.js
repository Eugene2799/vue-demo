const actions = {
  updateLoadingStatus: ({ commit }, showLoading) =>
    commit({ type: 'updateLoadingStatus', showLoading: showLoading }),
  appUpdatingStatus: ({ commit }, downloadPercentage) =>
    commit({
      type: 'appUpdatingStatus',
      downloadPercentage: downloadPercentage
    }),
  appDownloadFailed: ({ commit }) => commit({ type: 'appDownloadFailed' })
};

export default actions;
