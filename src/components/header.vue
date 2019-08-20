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
            :remote-method="search"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select
            v-model="value1"
            filterable
            @change="change1"
            :loading="loading"
            placeholder="请选择小区"
            remote
            :remote-method="search"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "headertop",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      options1: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      value1: "",
      loading: false
    };
  },
  methods: {
    search() {},
    change1(value) {
      this.$store.commit("community", { community: value });
    },
    change(value) {
      this.$store.$commit("committee", { committee: value });
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
