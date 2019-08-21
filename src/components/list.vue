<template>
  <div class="list-table" style="width: 100%;">
    <el-table :data="tableData" stripe :height="height-50" style="width: 100%">
      <el-table-column type="index" label="序号"  :index="indexMethod" width="50"></el-table-column>
      <el-table-column v-for="(el ,index) in  tableTitle" :key='index' :prop="el[0]" :label="el[1]" ></el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <!-- <img src="../assets/icon/icon01.png" alt=""> -->
          <img width="25" height="25" :src="elevctorImg(scope.row.elevator_situation)" alt="电梯状态" />
   
        </template>
      </el-table-column>
    </el-table>

    <div class="page-int">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        hide-on-single-page
        @prev-click="prevFn"
        @next-click="nextFn"
        @current-change="current"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { elevatorList } from "../utils/config";

export default {
  props: {
    tableData: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      pageSize : 20,
      currentPage : 1,
      tableTitle :[
        ['community_name','居委'],
        ['community_block_name','小区'],
        ['building_address','地址'],
      ]
    };
  },
  methods: {

indexMethod (index) {
  return index + (this.currentPage-1)*this.pageSize +1
},

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
      this.currentPage = e
    },


    elevctorImg(index) {
      let src = "";
      let tmpIndex = index || 1;
      
      // return '../assets/icon/icon01.png'
    

        switch (tmpIndex) {
          case 1 : {
            return require('../static/icon/icon01.png')
            break;
          }
          case 2 : {
            return require('../static/icon/icon02.png')
            break;
          }
          case 3 : {
            return require('../static/icon/icon03.png')
            break;
          }
          case 4 : {
            return require('../static/icon/icon04.png')
            break;
          }
          case 5 : {
            return require('../static/icon/icon05.png')
            break;
          }
          default  : {
            return '../static/icon/icon01.png'
          break;

          }
        }

      }
    
   
  
  }
};
</script>
<style scoped>
.page-int {
  margin-top: 10px;
}
</style>