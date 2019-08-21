<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="community_name"
        label="居委"
      >
      </el-table-column>
      <el-table-column
        prop="community_block_name"
        label="小区"
      >
      </el-table-column>
      <el-table-column
        prop="building_address"
        label="地址"
      >
      </el-table-column>

    </el-table>

    <div class="page-int">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        hide-on-single-page
        @prev-click="prevFn"
        @next-click="nextFn"
        @current-change="current"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {};
  },
  methods: {
    // 上一页
    prevFn() {
      this.$emit("page", "prev");
    },

    // 下一页
    nextFn() {
      this.$emit("page", "next");
    },

    // 当前页
    current(e) {
      this.$emit("page", "current", e);
    }
  }
};
</script>
<style scoped>
.page-int {
  margin-top: 1em;
}
</style>