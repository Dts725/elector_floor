<template>
  <div class="h100  flex-between">

    <div id="container">

    </div>

    <div class="list">
      <list :tableData="tableData"></list>

    </div>
  </div>
</template>

<script>
import { _AddIcon, _Maker } from "../utils/map";
import { getTableList } from "../api/api";
import list from "../components/list";
export default {
  components: {
    list
  },
  data() {
    return {
      map: {},
      tableData: []
    };
  },
  created() {
    this.int();
  },
  mounted() {
    this.newMap();
  },
  methods: {
    int() {
      this.getTableData();
    },
    intMap() {
      //   初始化地图
      this.newMap();
      // 创建icon
      let icon = new _AddIcon({
        uri: require("../assets/icon/icon_map01.png")
      }).createIcorn();
      //添加到maker
      let marker = new _Maker({ lng: 116.45, lat: 39.93, icon: icon }).maker();
      let marker1 = new _Maker({ lng: 116.48, lat: 39.93, icon: icon }).maker();
      this.map.add([marker, marker1]);
      // console.log(this.map)
    },

    newMap() {
      console.log("地图实例化");
      this.map = new AMap.Map("container", {
        zoom: 13,
        center: [116.45, 39.93],
        resizeEnable: true
      });
    },

    //获取列表
    async getTableData() {
      let pam = {
        community_id: "",
        community_block_id: "",
        elevator_situation: "",
        search_key: "",
        paginate: ""
      };
      let res = await getTableList(pam);
      this.tableData = res.data.data;
    }
  }
};
</script>
<style  scoped>
#container {
  height: 100%;
  width: 80%;
}
.list {
  height: 100%;
  width: 20%;
}
</style>