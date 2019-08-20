import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    committee: "", //居委
    community: "", //小区
  },
  mutations: {
    setCommittee(state, {
      committee
    }) {
      state.committee = committee;
    },
    SetCommunity(state, {
      community
    }) {
      state.committee = community;
    },
  },
  actions: {

  }
})