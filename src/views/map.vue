<template>
  <div class="h100  flex-between">

    <div id="container">

    </div>

    <div class="list" :style="{height: bodyHeight + 'px'}">
      <list
        :tableData="tableData"
        :total="total"
        :height="bodyHeight"
        @page="pageFn"
      ></list>

    </div>
  </div>
</template>

<script>
import { _AddIcon, _Maker,_MoreMass,_MapStyle } from "../utils/map";
import { getTableList } from "../api/api";
import { mapState,mapGetters } from "vuex";

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
      height : 500, //列表高度
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
  watch: {
    community_id: "tableTarget",
    community_block_id: "tableTarget"
  },
  computed: {
    ...mapState({
      community_id: state => state.community_id,
      community_block_id: state => state.community_block_id,
      isIndependence: state => state.isIndependence
    }),
    ...mapGetters({
      bodyHeight :'bodyHeight'
    })
  },
  created() {
    this.int();

  },
  mounted() {
    this.newMap();
  },
  methods: {
//设置页面高度

   

   async int() {
    await  this.getTableData();
    this.morePoint(this.tableData,this.map,_MapStyle);
    },

    //单个带你加载
    intMap() {
      //   初始化地图
      this.newMap();
      // 创建icon
      let icon = new _AddIcon({
        uri: require("../static/icon/icon_map01.png")
      }).createIcorn();
      //添加到maker
      let marker = new _Maker({ lng: 116.45, lat: 39.93, icon: icon }).maker();
      let marker1 = new _Maker({ lng: 116.48, lat: 39.93, icon: icon }).maker();
      this.map.add([marker, marker1]);
      // console.log(this.map)
    },

    //海量带你加载
  async  morePoint(tmpData,map,style) {
      let data = this.dataInt(tmpData)

      new _MoreMass({data,map,style}).create();
    },
dataInt(data) {
  return  data.map((el,index) => {
      return {
        lnglat :[el.east_longitude,el.north_latitude],
        name :el.community_block_name,
        id :index,
        style :el.elevator_situation-1

      }
    })
},
    newMap() {
      console.log("地图实例化");
      this.map = new AMap.Map("container", {
        zoom: 13,
        center: [121.398773,31.030892],
        resizeEnable: true,
        mapStyle :'amap://styles/8804968b584dd7b545f9b6f945c9ee84' 
      });
    },

    //根据头部筛选变换

// 开发隐藏需求 有需要改变配置即可
    tableTarget() {

      if (this.isIndependence) {
        if (this.community_id && this.community_block_id) {
          this.pam.community_id = this.community_id;
          this.pam.community_block_id = this.community_block_id;
          this.getTableData();
        }
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

  width: 40%;
  overflow: auto;
}
</style>