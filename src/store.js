import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    community_id: "", //居委
    community_block_id: "", //小区
    isIndependence: true //社区小区是否关联 及 是否允许全局搜索小区 默认 关联不允许搜索
  },
  mutations: {
    setCommitte(state, {
      community_id
    }) {
      state.community_id = community_id;
    },
    setCommunity(state, {
      community_block_id
    }) {
      state.community_block_id = community_block_id;
    },
  },
  actions: {

  }
})