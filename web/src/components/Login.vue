<template>
<div>
  <el-button>启动登录</el-button>
  <br/>
  <div class="demo-input-suffix">用户名:<el-input v-model="form.userName" style="width:150px;"></el-input>
  </div>
  <div class="demo-input-suffix">密&nbsp;&nbsp;&nbsp;码:<el-input v-model="form.password" style="width:150px;"></el-input>
  </div>
  <br/>
  <el-button @click="login" type="primary"> 登录 </el-button>
</div>
</template>
<script>
import Api from "../api/axiosFactory";
import { error } from "util";
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      console.log("输出：", this.form);
      Api.postForm(
        "",
        this.form,
        res => {
          console.log("登录成功");
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>
