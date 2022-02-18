<template>
  <el-container>
    <el-header>
      <div class="header_logo_div">后台管理</div>
      <div class="header_msg_div">
        <div class="header_msg_left_div"><el-button class="header_text" type="text" icon="el-icon-s-unfold" @click='togleCollapse'>隐藏菜单</el-button></div>
        <div class="header_msg_right_div">
          <div class="header_msg_right_son_div"><el-button class="header_text" type="text" icon="el-icon-message-solid"></el-button></div>
          <div class="header_msg_right_son_div block"><el-avatar :size="32" :src="circleUrl"></el-avatar></div>
          <div class="header_msg_right_son_div header_text">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{loginUser.name}}
              </span>
              <el-dropdown-menu split-button="true" slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '240px'" :style="isCollapse ? 'padding:30px 0 0  0' : 'padding: 30px'">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
            background-color="#ffffff"
            text-color="#74798C"
            active-text-color="#0054FE">
          <el-submenu v-for="(menu,indexs) in menus" :key="indexs" :index="indexs+''">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
            </template>
            <el-menu-item v-for="(submenu,index) in menu.submenu" :key="index" :index="index+'-'+index" >
              <div class="menu_item_icon"></div>
              <div class="menu_item_title" @click="goRouter(submenu)">{{ submenu.title }}</div>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import common from "@/resource/common";
import router from "@/router/login";
export default {
  name: "index",
  data () {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isCollapse: false,
      asideWidth:"240px",
      menus:[],
      loginUser:{}
    }
  },
  created(){//加载菜单
    let that = this;
    that.axios.get('/index/getMenus').then((response) => {
      if(that.sessionStore.state.menuTree.menuTree.length<1){
        common.addRoutes(router,response.data)
        that.sessionStore.commit('setMenuTree',response.data)
      }
      that.menus = response.data;
      that.loginUser = that.sessionStore.state.loginUser.loginUser;
    })
  },
  methods:{
    goRouter(submenu){
      this.$router.push({path:'/index/'+submenu.filename})
    },
    togleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleCommand(command){
      let that = this;
      switch (command) {
        case 'logout':
          this.$confirm('确认退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.sessionStore.commit('setMenuTree', [])
            that.sessionStore.commit('setLoginUser', {})
            router.push('/login')
          }).catch(() => {});
          return;
      }


    }
  }
}
</script>
<style>
.header_logo_div{
  width: 240px;
  line-height: 60px;
  text-align: center;
  color: #1E2F4B;
  font-size: 18px;
  font-weight: 600;
  float: left;
}
.header_msg_div{
  width: calc(100% - 240px);
  float:right;
  height: 100%;
}
.header_msg_left_div{
  float: left;
  height: 100%;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_text{
  font-size: 14px;
  font-weight: 400;
  color: #74798C;
}
.header_msg_right_div{
  float: right;
  height: 100%;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-header{
  padding:0;
  background-color: #ffffff;
}
.header_msg_right_son_div{
  padding-left: 15px;
}
.el-aside{
  background-color: #ffffff;
  box-shadow: 0px 1px 0px 0px rgba(43, 45, 55, 0.05) inset;
}
.el-main{
  padding: 30px;
  height: calc(100vh - 60px);
}
/*------自定义导航菜单样式-----*/
.el-submenu .el-menu-item{
  min-width:0px;
}
.el-submenu__title{
  padding: 0px 30px;
}
.el-submenu [class^=el-icon-]
{
  float: left;
  margin-right: 20px;
}
.el-submenu__title{
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.el-menu-vertical-demo{
  border-right:  0px;
}
.is-opened>.el-submenu__title{
  background-color: #0054FE !important;
  color: #ffffff !important;
}
.is-opened>.el-submenu__title>i{
  color: #ffffff !important;
}
.el-submenu .el-submenu__title:hover{
  background-color: #0054FE !important;
  color: #ffffff !important;
}
.el-submenu .el-submenu__title:hover>i{
  color: #ffffff !important;
}
.el-menu-item:hover{
  background-color: #ffffff !important;
}
.el-submenu__icon-arrow{
  right: 13px;
}
.el-submenu>.el-submenu__title .el-submenu__icon-arrow{
  -webkit-transform: rotateZ(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotateZ(-90deg);
}
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
  -webkit-transform: rotateZ(0deg);
  -ms-transform: rotate(0deg);
  transform: rotateZ(0deg);
}
.el-menu-item>.menu_item_icon{
  position: absolute;
  top:50%;
  left: 30px;
  transform:translateY(-50%);
  width: 4px;
  height: 4px;
  border: 2px solid #666666;
  border-radius: 50%;
}
.el-menu-item>.menu_item_title{
  position: absolute;
  top:50%;
  left: 63px;
  transform:translateY(-50%);
}
.is-active>.menu_item_icon{
  width: 6px;
  height: 6px;
  background: #0054FE;
  border-radius: 50%;
  border: 0;
}
</style>