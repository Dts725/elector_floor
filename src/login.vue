<template>
  <div class="login">
    <p class="htop">电梯地图管理登录</p>

    <div class="tip">

      <el-select
        v-model="value"
        placeholder="请选择"
        class="w100"
      >
        <el-option
          class="w100"
          v-for="item in options"
          :key="item.type"
          :label="item.name"
          :value="item.type"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="name"
        class="w100"
        placeholder="请输入用户名"
      ></el-input>
      <el-input
        class="w100"
        v-model="pwd"
        placeholder="请输入密码"
        show-password
      ></el-input>

      <el-button
        type="primary"
        class="w100"
        @click="login"
      >主要按钮</el-button>
    </div>
  </div>
</template>
<script>
import { loginFn } from "./api/api";
export default {
  data() {
    return {
      options: [],
      value: "",
      name: "",
      pwd: ""
    };
  },
  created() {
    this.getSelector();
  },
  methods: {
    async getSelector() {
      let res = await loginFn();
      this.options = res.data;
      console.log(res.data);
    },

    async login() {
      let pam = {
        name: this.name,
        password: this.pwd,
        type: this.value
      };
      let res = await loginFn(pam, "post");
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "登录成功"
        });
        this.$store.commit("setLoginInfo", res.data);
        window.localStorage.setItem("loginInfo", JSON.stringify(res.data));
        this.$router.push("/");
      } else {
        this.$message({
          type: "error",
          message: res.status
        });
      }
    }
  }
};
</script>
<style scoped>
.tip {
  width: 420px;
  height: 320px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  padding: 20px 30px;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-content: center;
  align-items: center;
}
.login {
  background-color: #324057;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.htop {
  font-size: 3rem;
  color: #fff;
}
.w100 {
  width: 100%;
}
</style>