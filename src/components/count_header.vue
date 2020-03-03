<template>
  <div class="flex-between body">
    <div class="body-right flex-between w50">
      <img style="width : 2rem" src="../static/icon/top_icon01.png" alt />
      <span>全部</span>
      <img style="width : 2rem" src="../static/icon/icon02.png" alt />
      <span>可安装</span>
      <img style="width : 2rem" src="../static/icon/icon03.png" alt />
      <span>已签约</span>
      <img style="width : 2rem" src="../static/icon/icon04.png" alt />
      <span>施工中</span>
      <img style="width : 2rem" src="../static/icon/icon01.png" alt />
      <span>已交付</span>
      <img style="width : 2rem" src="../static/icon/icon05.png" alt />
      <span>可创造条件安装</span>
    </div>
    <div class="flex-center-warp w50" style="padding : 0 10px; ">
      <div
        v-for="(item,index) in data"
        :key="index"
        :style="{'width' : ((item/(total || 1)*100).toFixed(2) >1 ? (item/(total || 1)*100).toFixed(2) : 1) + '%'}"
      >
        <a :style="{'background-color' : colors[index],display : 'block'}" :title="constructor[index]">{{item}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getCount } from "../api/api";
export default {
  name: "count",
  filters: {
    adInt: function(value) {
      if (!value) return "";

      return parseInt(value);
    }
  },
  data() {
    return {
      pam: { community_block_id: "", community_id: "" },
      data: [],
      constructor :[],
       btnList: [
        {
          title: "全部",
          value: "all",
          color: "#A79FBF"
        },
        {
          title: "可安装",
          value: "1",
          color: "#FFA102"
        },
        {
          title: "可创造条件安装",
          value: "7",
          color: "#F43EF2"
        },

        {
          title: "已签约",
          value: "3",
          color: "#0388FF"
        },
        {
          title: "施工中",
          value: "4"
        },
        {
          title: "已交付",
          value: "5",
          color: "#37C978"
        }
      ],
      colors: ["#A79FBF", "#FFA102", "#0388FF", "red", "#37C978", "#F43EF2"],
      total: 0,
      building_info: {
        area: 0, //总面积
        count: 0, //总套数
        imp: 0 //非成交套数
      }
    };
  },
  mounted() {
    this.int();
    this.$nextTick(() => {
      this.$on("getCount", this._getCount);
    });
  },
  methods: {
    //根据小区切换数据更新
    _getCount(pam) {
      this.pam = {
        community_block_id: pam.community_block_id,
        community_id: pam.community_id
      };
      this.int(this.pam);
      console.log("调用子组件", pam);
    },

    async int(pam) {

      let res = await getCount(pam);
    this.data = [];
    this.total  = 0;
    this.constructor = [];
      console.log(res.data);
      // 此处暂不保证 顺序遍历
      Object.keys(res.data).forEach(el => {
        this.data.push(res.data[el][0]);
        this.total = this.total + res.data[el][0];
      });
      Object.keys(res.data).forEach(el => {
        let str = el + ':占比' +(res.data[el][0]/(this.total || 1)*100 ).toFixed(2) + '%';
        this.constructor.push(str);
       
      });
      // this.totla =this.data.reduce(function(total, currentValue, currentIndex, arr) {
      //     return  total + currentValue
      // }, 0);
      console.log("统计总数", this.total);

      // this.$emit('getCount')
      // this.$on('getCount')
    }
  }
};
</script>
<style scoped>
.body {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}

.green {
  border-radius: 2px;
  border: 0.2px solid #f2f2f2;
  background-color: #bf4f81;
  height: 1.2rem;
}
.red {
  border-radius: 2px;
  border: 0.2px solid #f2f2f2;
  height: 1.2rem;
  background-color: #3499df;
}
.blue {
  border: 0.2px solid #f2f2f2;
  border-radius: 2px;
  height: 1.2rem;
  background-color: #e6c633;
}
.body-right {
  padding-right: 20px;
  border-right: 2px solid #ccc;
}
.count-num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.flex-center-warp {
  display: flex;
  justify-content: center;
}
</style>