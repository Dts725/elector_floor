<template>
  <div class="h100  flex-between">

    <div id="container">

    </div>

    <div class="list">
      <list
        :tableData="tableData"
        :total="total"
        @page="pageFn"
      ></list>

    </div>
  </div>
</template>

<script>
import { _AddIcon, _Maker } from "../utils/map";
import { getTableList } from "../api/api";
import { mapState } from "vuex";

import list from "../components/list";
export default {
  components: {
    list
  },
  data() {
    return {
      map: {},
      tableData: [],
      data: "",
      total: 0,
      pam: {
        community_id: "",
        community_block_id: "",
        elevator_situation: "",
        search_key: "",
        paginate: "",
        page: 1
      }
    };
  },
  // watch: {
  //   community_id: this.tableTarget,
  //   community_block_id: this.tableTarget
  // },
  computed: {
    ...mapState({
      community_id: state => state.community_id,
      community_block_id: state => state.community_block_id,
      isIndependence: state => state.isIndependence
    })
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

    //根据头部筛选变换

    tableTarget() {
      if (this.isIndependence && this.community_id && this.community_block_id) {
        this.pam.community_id = this.community_id;
        this.pam.community_block_id = this.community_block_id;
        this.getTableData();
      } else {
        this.pam.community_id = this.community_id;
        this.pam.community_block_id = this.community_block_id;
        this.getTableData();
      }
    },

    //获取列表 |核心请求
    async getTableData() {
      let res = await getTableList(this.pam);
      this.tableData = res.data.data;
      this.data = res.data.data;
      let tmp = this.total;
      if (tmp == res.data.total) return;
      this.total = res.data.total;
    },

    // 翻页
    pageFn(e, page) {
      switch (e) {
        case "prev": {
          this.pam.page = this.data.from = 1 ? 1 : this.data.from - 1;
          this.getTableData();
          break;
        }
        case "next": {
          this.pam.page =
            this.data.from == this.data.last_page
              ? this.data.last_page
              : this.data.from + 1;
          this.getTableData();
          break;
        }
        case "current": {
          this.pam.page = page;
          this.getTableData();
          break;
        }

        default: {
          break;
        }
      }
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