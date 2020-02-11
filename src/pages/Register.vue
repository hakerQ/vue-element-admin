<template>
  <div class="register">
    <div class="registerCont">
      <div class="title">
        <p>注册信息</p>
      </div>
      <el-form class="registerForm" :model="registerForm" :rules="rules" ref="registerForm">
        <el-form-item prop="username">
          <el-input type="text" placeholder='用户名' v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder='设置密码' v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="checkpass">
          <el-input type="password" placeholder='确认密码' v-model="registerForm.checkpass" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" @click="registerBtn(registerForm)" :plain="true">注册</el-button>
        </el-form-item>
      </el-form>
      <div>
        <p>若已有账号，请
          <router-link to="/login">登录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {register} from '../api/index.js'

export default {
  name:'register',
  data(){
    var checkUser = (rule, value, callback) => {
       var pregName = /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/;
        if(!value) {
          return callback(new Error('用户名不能为空'));
        }
        if(!pregName.test(value)){
          return callback(new Error('字母开头，长度为5-12，允许字母数字下划线'))
        }
      };
    var validatePass = (rule, value, callback) => {
        var pregPwd = /^[a-zA-Z]\w{5,17}$/;
        if(value === ''){
          callback(new Error('请输入密码'));
        }
        if (!pregPwd.test(value)) {
          callback(new Error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线'))
        } else {
          if (this.registerForm.checkpass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }       
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      
    return{
      registerForm:{
        username:'',
        password:'',
        checkpass:''
      },
      rules:{
        username:[
          { validator: checkUser, trigger: 'blur' }
        ],
        password:[
          { validator: validatePass, trigger: 'blur' }
        ],
        checkpass:[
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    registerBtn(registerForm){
      let user = {
        userName:this.registerForm.username,
        password:this.registerForm.password
      }
      if(registerForm.username == '' || registerForm.password == '' || registerForm.checkpass==''){
        this.$message({
          message:'请填写完整信息',
          type: 'error',
          center: true
        })
      }else if(registerForm.password == registerForm.checkpass){
        register(user).then((res)=>{
          if(res.data.status == 1){
            this.$message({
              message: res.data.message,
              center:true,
              type: 'success',
              duration: 800
            })
            this.$refs.registerForm.resetFields();
            setTimeout(()=>{
              this.$router.push({path:'/login'})
            },2000)
          }else if(res.data.status == 0){
            this.$message({
              message:res.data.message,
              center:true,
              type:'error'
            })
          }
        }).catch(err=>{throw err})
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.register{
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(112, 112, 206, 0.452);
  .registerCont{
    width: 380px;
    padding: 30px;
    position: absolute;
		top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: white;
    border-radius: 5px;
    .title{
      text-align: center;
      font-size: 25px;
      margin-bottom: 10px;
      position: relative;
    }
    .title:after{
      content: " ";
      position: absolute;
      height: 5px;
      left: -30px;
      bottom: -10px;
      right: -30px;
      background-color: #E9E9E9;
    }
    .registerForm{
      padding-top: 10px;
      .btn{
        width: 380px;
        color: white;
        background: orange;
      }
    }
  }
}
</style>