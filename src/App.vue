<template>
  <div class="top h100">
      <header-top :style=" {height : topHeight + 'px'}"></header-top>
  
    <router-view :style="{height : bodyHeight + 'px'}"/>
  </div>
</template>
<script>
import headerTop from "./components/header";
import {mapState,mapGetters } from 'vuex'
export default {
  components: { headerTop },

  data () {
    return {
  
    }
  },
    created () {
    let clientHeight = window.document.body.clientHeight ;
    this.$store.commit('setClientHeight',{clientHeight : clientHeight})

  },
  computed:{
    ...mapState({
      topHeight : state => state.topHeight,
    }),

    ...mapGetters({
      bodyHeight : 'bodyHeight'
    })
  }
};
</script>

<style scoped>

</style>
