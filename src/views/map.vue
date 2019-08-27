<template>
  <div class="h100 flex-between">
    <!-- 地图 -->
    <div id="container"></div>
    <!-- 菜单按钮 -->
    <div class="btn-list">
      <btn-list @emitParent="btnTable"></btn-list>
    </div>

    <!-- 列表展示 -->
    <div
      class="list"
      :style="{height: bodyHeight + 'px'}"
    >
      <list
        ref="listTable"
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
  _ConvertFrom,
  _InfoWindow,
  _AddControl
} from "../utils/map";
import { getTableList } from "../api/api";
import { mapState, mapGetters } from "vuex";

import list from "../components/list";
import btnList from "../components/btnList";
import { Promise } from "q";
export default {
  components: {
    list,
    btnList
  },
  data() {
    return {
      map: {},
      tableData: [],
      tmpBtn: "", //上次查看便签分类
      InfoWindow: null,
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
      this.pam.search_key = value;
      this.$refs.listTable.$emit("clearValue");

      await this.getTableData(this.pam);
      this.pam.search_key = "";

      this.morePoint(this.tableData, this.map, _MapStyle);
    },

    //点击设置地图中心点二
    async setCenter(lnglat, address, flag) {
      // 注册关闭信息窗

      let lngLats = "";
      if (flag) {
        lngLats = await new _ConvertFrom().translate(lnglat);
      } else {
        lngLats = lnglat;
      }

      // 原型中带有方法
      new _InfoWindow({
        address: address,
        map: this.map,
        lnglat: lngLats
      }).open();

      // new _ConvertFrom({ position: "bottom-left", content: address });
      this.map.setZoomAndCenter(18, lngLats);
    },

    //列表按钮 地图跟随转换
    async btnTable(value) {
      // 清除海量点
      if (value === this.tmpBtn) return;
      this.tmpBtn = value;
      this.map.setZoom(12);
      if (value === "all") {
        this.pam.elevator_situation = "";
        await this.getTableData(this.pam);
        await this.getDataAll();

        this.morePointAll(this.dataAll, this.map, _MapStyle);
      } else {
        this.pam.elevator_situation = value;
        await this.getTableData(this.pam);
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

    //海量点局部加载
    async morePoint(tmpData, map, style) {
      try {
        let data = await this.dataInt(tmpData);

        new _MoreMass({ data, map, style }).create();
      } catch (err) {
        console.log(err);
      }
    },

    //加载全部海量点
    async morePointAll(tmpData, map, style) {
      try {
        let data = await this.dataInt(tmpData);

        await new _MoreMass({ data, map, style }).create();
      } catch (error) {
        console.log(error);
      }
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
      let arr = data.map(async (el, index, array) => {
        let lnglat = "",
          styleIndex = 0;

        if (el.building_east_longitude && el.building_north_latitude) {
          lnglat = await new _ConvertFrom().translate([
            el.building_east_longitude,
            el.building_north_latitude
          ]);
        } else {
          try {
            let res = await _ConvertFrom.geocoder(el.building_address);
            lnglat = [res[0].location.lng, res[0].location.lat];
          } catch (error) {
            console.log(error);
          }
          // let res = await _ConvertFrom.geocoder(el.building_address);
        }
        // console.time(el.building_address);

        // 状态 elevator_situation 映射 图片
        switch (el.elevator_situation) {
          case 1: {
            styleIndex = 1;
            break;
          }
          case 3: {
            styleIndex = 2;
            break;
          }
          case 4: {
            styleIndex = 3;
            break;
          }
          case 5: {
            styleIndex = 0;
            break;
          }
          case 7: {
            styleIndex = 4;
            break;
          }

          default: {
            styleIndex = 4;
            break;
          }
        }
        // console.timeEnd(el.building_address);

        return {
          lnglat: lnglat,
          name: el.building_address,
          id: index,
          style: styleIndex
        };
      });

      return Promise.all(arr);
    },
    newMap() {
      console.log("地图实例化");
      this.map = new AMap.Map("container", {
        zoom: 12,
        touchZoom: true,
        expandZoomRange: true,
        center: [121.398773, 31.030892],
        resizeEnable: true,
        mapStyle: "amap://styles/8804968b584dd7b545f9b6f945c9ee84"
      });
      this.map.on("complete", el => {
        new _AddControl(this.map).add();
      });
    },

    //根据头部筛选变换

    async tableTarget() {
      this.pam.community_id = this.community_id;
      this.pam.community_block_id = this.community_block_id;
      await this.getTableData(this.pam);

      await this.getDataAll();
      this.morePointAll(this.dataAll, this.map, _MapStyle);
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