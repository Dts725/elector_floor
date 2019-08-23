<template>
  <div class="h100  flex-between">
    <!-- 地图 -->
    <div id="container">

    </div>
    <!-- 菜单按钮 -->
    <div class="btn-list">
      <btn-list @emitParent="btnTable">

      </btn-list>
    </div>

    <!-- 列表展示 -->
    <div
      class="list"
      :style="{height: bodyHeight + 'px'}"
    >

      <list
        ref='listTable'
        :tableData="tableData"
        :total="total"
        :height="bodyHeight"
        @page="pageFn"
        @setCenter="setCenter"
        @searchFn="searchFn"
      ></list>

    </div>
  </div>
</template>

<script>
import {
  _AddIcon,
  _Maker,
  _MoreMass,
  _MapStyle,
  _ConvertFrom
} from "../utils/map";
import { getTableList } from "../api/api";
import { mapState, mapGetters } from "vuex";

import list from "../components/list";
import btnList from "../components/btnList";
export default {
  components: {
    list,
    btnList
  },
  data() {
    return {
      map: {},
      moreMassStatic: "",
      tableData: [],

      data: "",
      height: 500, //列表高度
      total: 0,
      dataAll: "", //所有地图数据列表
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
      bodyHeight: "bodyHeight"
    })
  },
  created() {
    this.int();
  },
  mounted() {
    this.newMap();
  },
  methods: {
    //远程搜索  默认全局搜索
    async searchFn(value) {
      let pam = {
        search_key: value
      };
      this.moreMassStatic.clear();
      await this.getTableData(pam);
      this.$refs.listTable.$emit("clearValue");
      this.morePoint(this.tableData, this.map, _MapStyle);
    },

    //点击设置地图中心点二
    async setCenter(lnglat) {
      if (!lnglat[0] || !lnglat[1]) {
        this.$message({
          type: "warning",
          message: "地址缺少经纬度信息 请检查 ！"
        });
        return;
      }
      let lngLats = await new _ConvertFrom().translate(lnglat);
      this.map.setZoomAndCenter(18, lngLats);
    },

    //列表按钮 地图跟随转换
    async btnTable(value) {
      this.moreMassStatic.clear();
      if (value === "all") {
        await this.getTableData(this.pam);
        //此处根据需求 是否需要全部地图点做修改 放开注释既可以

        // this.morePoint(this.tableData, this.map, _MapStyle);
        await this.getDataAll();
        this.morePointAll(this.dataAll, this.map, _MapStyle);
      } else {
        this.pam.elevator_situation = value;
        await this.getTableData(this.pam);
        //此处根据需求做修改 放开注释既可以
        // this.morePoint(this.tableData, this.map, _MapStyle);

        await this.getDataAll();
        this.morePointAll(this.dataAll, this.map, _MapStyle);
      }
    },

    //设置页面高度

    async int() {
      await this.getTableData(this.pam);
      await this.getDataAll();
      // this.morePoint(this.tableData, this.map, _MapStyle);
      this.morePointAll(this.dataAll, this.map, _MapStyle);
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

    //海量点局部加载
    async morePoint(tmpData, map, style) {
      let data = this.dataInt(tmpData);

      this.moreMassStatic = new _MoreMass({ data, map, style }).create();
    },

    //加载全部海量点
    async morePointAll(tmpData, map, style) {
      let data = await this.dataInt(tmpData);
      console.log(data, "处理后的数据");

      this.moreMassStatic = new _MoreMass({ data, map, style }).create();
    },
    //获取所有数据
    async getDataAll() {
      this.pam.paginate = "all";
      let res = await getTableList(this.pam);
      this.dataAll = res.data;
      //避免对后面造成影响
    },

    //参数初始化
    pamInt() {
      this.pam = {
        community_id: "",
        community_block_id: "",
        elevator_situation: "",
        search_key: "",
        paginate: "",
        page: 1
      };
    },

    //数据格式处理
    async dataInt(data) {
      let list = data.map(async (el, index, array) => {
        if (el.building_east_longitude && el.building_north_latitude) {
          let lnglat = await new _ConvertFrom().translate([
            el.building_east_longitude,
            el.building_north_latitude
          ]);
          // 坐标转换

          return {
            lnglat: lnglat,
            name: el.building_address,
            id: index,
            style: el.elevator_situation - 1
          };
        }
      });

      list = Promise.all(
        list.filter(d => {
          if (d && d !== "null") {
            return d;
          }
        })
      );

      return list;
    },
    newMap() {
      console.log("地图实例化");
      this.map = new AMap.Map("container", {
        zoom: 13,
        center: [121.398773, 31.030892],
        resizeEnable: true,
        mapStyle: "amap://styles/8804968b584dd7b545f9b6f945c9ee84"
      });
    },

    //根据头部筛选变换

    // 开发隐藏需求 有需要改变配置即可
    async tableTarget() {
      if (this.isIndependence) {
        if (this.community_id && this.community_block_id) {
          this.pam.community_id = this.community_id;
          this.pam.community_block_id = this.community_block_id;
          await this.getTableData(this.pam);
          this.moreMassStatic.clear();
          await this.getDataAll();
          this.morePointAll(this.dataAll, this.map, _MapStyle);
        } else {
          this.pam.community_id = this.community_id;
          this.pam.community_block_id = this.community_block_id;
          await this.getTableData(this.pam);
          this.moreMassStatic.clear();

          await this.getDataAll();
          this.morePointAll(this.dataAll, this.map, _MapStyle);
        }
      } else {
        this.pam.community_id = this.community_id;
        this.pam.community_block_id = this.community_block_id;
        this.getTableData(this.pam);
        await this.moreMassStatic.clear();
        await this.getDataAll();
        this.morePointAll(this.dataAll, this.map, _MapStyle);
      }
    },

    //获取列表 |核心请求
    async getTableData(pam) {
      this.pam.paginate = "";
      let res = await getTableList(pam);

      this.data = res.data.data;
      this.tableData = res.data.data;

      let tmp = this.total;

      if (tmp == res.data.total) {
        return res;
      }
      this.total = res.data.total;
      return res;
    },

    // 翻页
    pageFn(e, page) {
      switch (e) {
        case "prev": {
          this.pam.page = this.data.from = 1 ? 1 : this.data.from - 1;
          this.getTableData(this.pam);
          break;
        }
        case "next": {
          this.pam.page =
            this.data.from == this.data.last_page
              ? this.data.last_page
              : this.data.from + 1;
          this.getTableData(this.pam);
          break;
        }
        case "current": {
          this.pam.page = page;
          this.getTableData(this.pam);
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
  width: 20%;
  overflow: auto;
}
.btn-list {
  position: absolute;
  right: 20%;
}
</style>