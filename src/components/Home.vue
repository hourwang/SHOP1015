<template>
<el-container>
  <el-header>
    <div>
      <img src="./../assets/heima.png">
      <span>电商后台管理系统</span>
    </div>
    <!-- 退出功能 -->
    <el-button type="info">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="this.isCollapse ? '64px' : '200px'">
      <div class="toggle-button" @click="controlCollapse">|||</div>
      <!-- 侧边菜单栏 -->
      <el-menu :router="true" :unique-opened="true" :default-active="activePath" :collapse="isCollapse"
       background-color="#333744" text-color="#fff" active-text-color="#409EFF">
        <!-- 一级菜单 -->
      <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
        <!-- 一级菜单的模版区域 -->
        <template slot="title">
          <i :class="iconObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item @click="saveActivePath('/'+subItem.path)" :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
          <i class="el-icon-menu"></i>
          <span>{{subItem.authName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单栏
      menuList: {},
      // 存放一级菜单对应的图标
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      activePath: '',
      isCollapse: false
    }
  },
  created () {
    // 获取所有的左侧菜单
    this.getMunuList()
    // 一创建，就要保存链接的激活状态,然后，将保存的激活状态赋值给本地绑定的地址
    this.activePath = localStorage.getItem('activePath')
  },
  methods: {
    // 退出功能
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的左侧菜单
    async getMunuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error('获取菜单失败')
      } else {
        this.menuList = res.data
        console.log(this.menuList)
      }
    },
    // 保存本地激活的路由路径
    saveActivePath (activePath) {
      localStorage.setItem('activePath', activePath)
      // console.log(this.activePath)
      // 当点击事件切换激活的路径，本地的激活路径也要发生改变
      this.activePath = activePath
      // console.log(this.activePath)
    },
    controlCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style scoped>
.el-container{
  height: 100%;
}
.el-header{
  background: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span{
  margin-left: 15px;
}
.el-aside{
  background: #333744;
}
.el-menu{
  border-right: none
}
.el-main{
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px
}
.toggle-button{
  background: #4A5064;
  font-size: 10px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  line-height: 24px;
  /* 这个是控制这三个竖线之间的间距的，注意，这里不是用margin和padding */
  letter-spacing: 0.2em;
}
</style>
