import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topHeight: 60, //头部高度默认值
    clientHeight: 600, //头部一下高度默认值
    community_id: "", //居委
    community_block_id: "", //小区
    isIndependence: true, //社区小区是否关联 及 是否允许全局搜索小区 默认 关联不允许搜索
    loginInfo: "", //
    clickTmpAddress: "",
    allPointer: {  //本地缓存所有点位数据
      all: [],//所有状态
      installAble: [],//可安装
      installAbleFuture: [],//可创造条件安装
      signIng: [],//已签约
      abuilding: [], //施工中
      pay :[],//以交付
    }
  },
  mutations: {

    setAllPointer(state,{ status ,dataArray }) {
      state.setAllPointer[status] = dataArray; 
    },
    setClickTmpAddress (state,{clickTmpAddress} ) {
      state.clickTmpAddress = clickTmpAddress
    },
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
    setLoginInfo(state, {
      loginInfo
    }) {
      state.loginInfo = JSON.parse(loginInfo);
    },

  },


  getters: {
    //计算头部一下的高度
    bodyHeight: state => {
      return state.clientHeight - state.topHeight
    }
  },
  actions: {

  }
})