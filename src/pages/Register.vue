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
          <el-button class="btn" @click="registerBtn">注册</el-button>
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

export default {
  name:'register',
  data(){
    var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else if(value.length > 3 && value.length < 6){
          return callback(new Error('用户名长度为3-6'))
        }
      };
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
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
    registerBtn(){
      console.log('----------')
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