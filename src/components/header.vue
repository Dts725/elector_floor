<template>
  <div class="box">
    <el-row justify="space-between" align="middle" type="flex" class="h100">
      <el-col :span="3" class="left fz-15rem">
        <span>&#xe61d;</span>
        <span>{{loginInfo.name}}</span>
        <span class="ml-5em cur" @click="loginOut">退出</span>
      </el-col>
      <el-col :span="12" class="fz-20rem co-f9c">江川路街道加装电梯点位分布图</el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row class="header-selector">
      <el-col :span="12">
        <el-select
          v-model="value"
          filterable
          :loading="loading"
          placeholder="请选择社区"
          remote
          @change="change"
          :remote-method="city"
        >
          <el-option
            v-for="item in options"
            :key="item.community_id"
            :label="item.community_name"
            :value="item.community_id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select
          v-model="value1"
          filterable
          @change="change1"
          :loading="loadingCity"
          placeholder="请选择小区"
          remote
          :remote-method="community"
        >
          <el-option
            v-for="item in options1"
            :key="item.community_block_id"
            :label="item.community_block_name"
            :value="item.community_block_id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { headerCity, headerCityNoe } from "../api/api";
import { mapState } from "vuex";
export default {
  name: "headertop",
  data() {
    return {
      community_blocks: [], //各个小区
      community_local: [], //全部居委
      options: [],
      options1: [],
      value: "",
      value1: "",
      loading: false,
      loadingCity: false
    };
  },
  computed: {
    ...mapState({
      isIndependence: state => state.isIndependence,
      loginInfo: state => state.loginInfo
    })
  },
  created() {
    this.city();
  },
  methods: {
    //登出
    loginOut() {
      window.localStorage.removeItem("loginInfo");
      this.$router.push("/");
    },

    //数组展开
    flatten(arr) {
      return arr.reduce((a, b) => {
        // return Array.isArray(b) ? a.concat(flatten(b)) : a.concat(b);
        return a.concat(Array.isArray(b) ? this.flatten(b) : b);
      }, []);
    },

    // 设置全局小区搜索
    selectCommunity(data) {
      //选择所有数据
      this.options1 = data.map(el => {
        let tmp = el.community_blocks.map(nl => {
          return {
            community_block_name: nl.community_block_name,
            community_block_id: nl.community_block_id
          };
        });

        return [...tmp];
      });

      this.options1.unshift({
        community_block_name: "全部",
        community_block_id: ""
      });
      this.options1 = this.flatten(this.options1);
      if (!this.community_blocks.length) {
        this.community_blocks = this.options1;
      }
    },
    // 关联 社区
    async city(query) {
      this.loading = true;
      let res = await headerCity({ search_key: query });
      this.options = res.data;
      if (!this.community_local.length) {
        this.community_local = res.data;
      }
      this.selectCommunity(res.data);
      this.options.unshift({
        community_name: "全部",
        community_id: ""
      });
      this.loading = false;
    },
    //关联 小区 远程搜索
    async community(query) {
      this.loadingCity = true;

      // console.log(this.community_blocks)
      let data = this.community_blocks
        .map(el => {
          if (el.community_block_name.search(query) === 0) {
            return el;
          } else {
            return false;
          }
        })
        .filter(d => d);
      this.options1 = data;
      console.log(this.options1);

      this.options1.unshift({
        community_block_name: "全部",
        community_block_id: ""
      });

      // // 推测关联社区

      this.value = "";

      this.$store.commit("setCommitte", { community_id: "" });

      this.loadingCity = false;
    },

    change1(value) {
      this.$store.commit("setCommunity", { community_block_id: value });
      // // 推测关联社区
      // console.log(value);
      // console.log(this.community_local);
      // this.community_local.forEach(el => {

      //   if(el.community_name === '全部') return
      //   let tmp = el.community_blocks
      //     .map(el => {
      //       if (el.community_block_id == value) {
      //         return true;
      //       } else {
      //         return false;
      //       }
      //     })
      //     .filter(d => d);

      //   if (tmp.length) {
      //     this.value = el.community_id;

      //     this.$store.commit("setCommitte", { community_id: el.community_id });
      //   }
      // });

    },
    change(value) {
      this.value1 = "";
      this.$store.commit("setCommunity", { community_block_id: "" });
      this.$store.commit("setCommitte", { community_id: value });
      this.options1 = [];

      //搜索社区
      if (!value) {
        this.options1 = this.community_blocks;
      }

      this.options.forEach(el => {
        if (value == el.community_id) {
          if (el.community_blocks) {
            let tmp = {
              community_block_name: "全部",
              community_block_id: ""
            };
            let data = [tmp, ...el.community_blocks];
            this.options1 = data;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.box {
  background-color: #d7221a;
  position: relative;
  top: 0;
  left: 0;
}
.left {
  color: #fff;
}
.header-selector {
  position: absolute;
  top: 50%;
  right: 0;
  width: 20%;
  transform: translateY(-50%);
}
</style>
