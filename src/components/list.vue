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
        :total="50"
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
    }
  },

  data() {
    return {};
  }
};
</script>
<style scoped>
.page-int {
  margin-top: 1em;
}
</style>