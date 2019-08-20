<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      label="日期"
 
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"

    >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    props :[
        {
        tableData : {
            type :  Array,
            default :[]
        }
        }
    ],
  data() {
    return {

    };
  }
};
</script>