<template>

  <div class="box">

    <el-row
      justify="space-between"
      align="middle"
      type="flex"
      class="h100"
    >
      <el-col
        :span="3"
        class="left fz-15rem"
      >
        <span> icon</span>
        <span> admin</span>
        <span class="ml-5em"> 退出</span>
      </el-col>
      <el-col
        :span="12"
        class="fz-20rem co-f9c"
      >江川路街道加装电梯点位分布图</el-col>
      <el-col
        :span="4"
        :pull="1"
      >
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
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select
            v-model="value1"
            :filterable="!isIndependence"
            @change="change1"
            :loading="loading"
            placeholder="请选择小区"
            :remote="!isIndependence"
            :remote-method="community"
          >
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.community_block_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
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
      options: [],
      options1: [],
      value: "",
      value1: "",
      loading: false
    };
  },
  computed: {
    ...mapState({
      isIndependence: state => state.isIndependence
    })
  },
  methods: {
    // 关联 社区
    async city(query) {
      this.loading = true;
      let res = await headerCity({ search_key: query });
      this.options = res.data;

      this.loading = false;
    },
    //关联 小区
    async community(query) {
      this.loading = true;

      if (this.isIndependence) return;
      let res = await headerCityNoe({ search_key: query });
      this.options1 = res.data.data;
      this.loading = false;

      console.log(res.data.data);
    },

    change1(value) {
      this.$store.commit("SetCommunity", { community_id: value });
    },
    change(value) {
      this.value1 = "";
      this.$store.commit("setCommitte", { community_block_id: value });
      if (this.isIndependence) {
        this.options.forEach(el => {
          if (value == el.community_id) {
            this.options1 = el.community_blocks;
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.box {
  background-color: #d7221a;
}
.left {
  color: #fff;
}
</style>
