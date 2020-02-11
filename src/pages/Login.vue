<template>
  <div class="login">
    <div class="loginCont">
      <div class="loginTitle">
        <img class="logo" :src="logo" alt="Admin">
        <span class="title">后台管理系统</span>
      </div>
      <el-form class="loginForm" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="userName">
          <span class="icon">
             <i class="userIcon"></i>
          </span>
          <el-input type="text" class="user"  placeholder='请输入账号' v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="icon">
             <i class="passwordIcon"></i>
          </span>
          <el-input type="password" placeholder='请输入密码' v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" @click="loginBtn('loginForm')">登录</el-button>
        </el-form-item>
        <div class="formTips">
          <p>若未拥有账号，请点击
            <router-link to="/register">注册</router-link>
          </p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import logoImg from '@/assets/imgs/logo.png'
import {login} from '../api/index.js'
export default {
  name:'login',
  data(){
    return{
      logo:logoImg,
      loginForm:{
        userName:'',
        password:''
      },
      rules:{
        userName:[
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 18个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    loginBtn(loginForm){
       this.$refs[loginForm].validate((valid) => {
          if (valid) {
            let userInfo = {
              userName: this.loginForm.userName,
              password: this.loginForm.password
            };
            login(userInfo).then((res)=>{
              let resp = res.data;
              if(resp.status == -1){
                this.$message({
                  message: resp.message,
                  center: true,
                  type: 'error',
                  duration: 800
                })
              }else if(resp.status == 3){
                this.$message({
                  message: resp.message,
                  center: true,
                  type: 'error',
                  duration: 800
                })
              }else if(resp.status == 2){
                const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                  loading.close();
                  this.$router.push({path:'/home'})
                }, 1000);  
              }
            }).catch((err)=>{})
          } else {
            // this.$message({
            //       message: '请输入账号和密码',
            //       center: true,
            //       type: 'error',
            //       duration: 800
            //     })
            return false;
          }
        });
    }
  }
}
</script>

<style lang='scss' scoped>
.login{
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(112, 112, 206, 0.452);
  .loginCont{
    width: 380px;
    padding: 30px;
    position: absolute;
		top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: white;
    border-radius: 5px;
    .loginTitle{
      text-align: center;
      .logo{
        width: 50px;
        height: 50px;
        background: red ;
        border-radius: 5px;
      }
      .title{
        font-size: 22px;
      }
    }
    .loginForm{
      margin-top:17px;
      .icon{
        position: relative;
        left: 5px;
        z-index: 5;
        top:4px;
        .userIcon{ 
          position: absolute;
          background-image: url('../assets/imgs/user.png');
          background-repeat: no-repeat;
          width: 32px;
          height: 32px; 
        }
        .passwordIcon{ 
          position: absolute;
          background-image: url('../assets/imgs/lock.png');
          background-repeat: no-repeat;
          width: 32px;
          height: 32px;  
        }
      }  
      .btn{
        width: 380px;
        background-color: orange;
        color:white;
      }
    }
    .formTips{
      color: rgb(42, 231, 24);
    }
  }
}
</style>