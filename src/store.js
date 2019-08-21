import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topHeight : 60,//头部高度默认值
    clientHeight : 600,//头部一下高度默认值
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
 
    setClientHeight(state, {
      clientHeight
    }) {
      state.clientHeight = clientHeight;
    },
 
  },

  
  getters : {
    //计算头部一下的高度
    bodyHeight : state => {
      return state.clientHeight - state.topHeight
    }
  },
  actions: {

  }
})