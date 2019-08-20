<template>
  <div id="container"
  class="h100">
  </div>
</template>

<script>
import {_AddIcon,_Maker} from "../utils/map"
export default {
  data() {
    return {
      map: {}
    };
  },
  mounted() {      
      this.int();
  },
  methods: {
       int () {
          
        //   初始化地图
        this.newMap ();
      // 创建icon
      let icon = new _AddIcon({uri :require ('../assets/icon/icon_map01.png')}).createIcorn()
        //添加到maker 
        let marker = new _Maker ({lng :116.45,lat:39.93,icon:icon}).maker() ;
        let marker1 = new _Maker ({lng :116.48,lat:39.93,icon:icon}).maker() ;
         this.map.add([marker,marker1]);
        // console.log(this.map)
        
      },
    
    newMap() {
      this.map = new AMap.Map("container", {
        zoom: 13,
        center: [116.45, 39.93],
        resizeEnable: true
      });
    }
  }
};
</script>
<style  scoped>
</style>