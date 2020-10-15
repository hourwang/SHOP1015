<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_logo">
        <img src="./../assets/logo.png">
      </div>
                    <!-- 登录注册表单 -->
              <!-- 要想验证规则以及表单重置生效，必须对属性指定prop -->
        <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="username">
            <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="iconfont icon-3702mima " v-model="loginForm.password"></el-input>
          </el-form-item>
           <el-form-item class="buttons">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录注册表单
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 登录表单的验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录表单
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status !== 200) {
            this.$message.error('登录失败')
          } else {
            this.loginForm = res.data
            // 将登录的token保存到sessionStorage
            // window.sessionStorage.setItem('token', res.data.token)
            localStorage.setItem('token', res.data.token)
            this.$router.push('/home')
            this.$message.success('登录成功')
          }
        }
      })
    },
    // 重置登录表单
    reset () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style scoped>
.login_container{
  background: #2b4b6b;
  height: 100%;
}
.login_box{
  height: 300px;
  width: 450px;
  background-color: #ffffff;
  border-radius: 3px;
  /* 让盒子垂直水平居中 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
/* 为注册框的logo设计样式 */
.login_logo{
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #dddddd;

  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #ffffff;
}
img{
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background: #eeeeee;
}
.login_form{
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
}
.buttons{
  display: flex;
  justify-content: flex-end;
}

</style>
