<template>
  <div class="top h100">
    <header-top :style=" {height : topHeight + 'px'}"></header-top>

    <router-view :style="{height : bodyHeight + 'px'}" />
  </div>
</template>
<script>
import headerTop from "./components/header";
import { mapState, mapGetters } from "vuex";
export default {
  components: { headerTop },

  data() {
    return {};
  },
  beforeCreate() {
    // 加载插件
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
    document.body.appendChild(s);
  },
  created() {
    let clientHeight = window.document.body.clientHeight;
    this.$store.commit("setLoginInfo", {
      loginInfo: window.localStorage.getItem("loginInfo")
    });

    this.$store.commit("setClientHeight", { clientHeight: clientHeight });
  },
  computed: {
    ...mapState({
      topHeight: state => state.topHeight
    }),

    ...mapGetters({
      bodyHeight: "bodyHeight"
    })
  }
};
</script>

<style scoped>
</style>
