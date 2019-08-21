<template>
  <div
    class="list"
    style="width: 100%"
  >
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
      >
      </el-table-column>
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

      <el-table-column label="状态">
        <template v-slot="scope">
          <img
            :src="elevctorImg( scope.row.elevator_numbers)"
            alt=""
          >
        </template>
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
import { elevatorList } from "../utils/config";
import { promises } from "dns";
import { Promise } from "q";
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
    },

    elevctorImg(index) {
      // let status = index || 1;
      // return new Promise((resolve, rej) => {
      //   elevatorList.forEach(el => {
      //     if (el.type == status) {
      //       resolve(`require(${el.src})`);
      //     }
      //   });
      // });
    }
  }
};
</script>
<style scoped>
.page-int {
  margin-top: 1em;
}
</style>