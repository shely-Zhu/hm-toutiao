<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <!-- logo -->
      <div class="logo"
           :class="{miniLogo:isCollapse}"></div>
      <!-- default-active默认激活的菜单项 指定的其实就是菜单项的index属性的值 -->
      <!--  background-color 、 text-color 背景颜色/文本颜色-->
      <!-- active-text-color 激活时文本的颜色 -->
      <el-menu :collapse="isCollapse"
               :collapse-transition="false"
               :default-active="$route.path"
               class="el-menu-vertical-demo"
               background-color="#002033"
               text-color="#fff"
               active-text-color="#ffd04b"
               router>
        <!-- el-submenu 菜单项包含子集菜单 -->
        <!-- el-menu-item 菜单项不包含子集菜单 -->
        <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template> -->
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
        <!-- </el-submenu> -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/articles">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/assets">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comments">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
      <!-- nav -->
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold"
              @click="toggleMenu"></span>
        <span class="text">江苏传智博客科技有限公司</span>
        <el-dropdown class="my--dropdown"
                     @command="clickMenu">
          <span class="el-dropdown-link">
            <img :src="photo"
                 alt="">
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting"
                              command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock"
                              command="logOut">退出登录</el-dropdown-item>
            <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item> -->
            <!-- <el-dropdown-item icon="el-icon-unlock" @click.native="logOut()">退出登录</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由出口 组件显示的位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/components/eventBus'
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: '',
      ass: store.getUser().name
    }
  },
  created () {
    // 绑定事件
    eventBus.$on('Updatename', (data) => {
      this.name = data
    })
    eventBus.$on('updatePhoto', (data) => {
      this.photo = data
    })
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleMenu () {
      // 切换菜单栏的展开与收起
      this.isCollapse = !this.isCollapse
    },
    setting () {
      // click 是绑定在原生dom上的事件， 绑定在组件上认为是自定义事件 如果组件内部没有触发 就是无效事件
      // 想办法绑定在解析后的dom上
      // 使用修饰符  prevent
      // console.log('ok')
      this.$router.push('/setting')
    },
    logOut () {
      // 清除用户信息
      store.clearUser()
      // 跳转到登录
      this.$router.push({ name: 'login' })
    },
    //  不加括号： 有默认传参 想接受参数 就不加括号
    // 加括号： 有实参
    clickMenu (menuType) {
      // menuType === 'setting' && this.$router.push({ name: 'setting' })
      // if (menuType === 'logout') {
      //   store.clearUser()
      //   this.$router.push('/login')
      // }
      this[menuType]()
    }
  }
}
</script>

<style lang="less" scoped>
// 组件的名称 其实就是解析后组件的容器的类名
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .el-aside {
    background: #002033;
  }

  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;

    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }

    .text {
      vertical-align: middle;
      margin-left: 10px;
    }

    .my--dropdown {
      cursor: pointer;
      float: right;

      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }

      .el-dropdown-link {
        font-weight: 700;
      }
    }
  }
}

.logo {
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
    140px auto;
}

.miniLogo {
  background: #002244 url(../../assets/images/logo_admin_01.png) no-repeat
    center / 36px auto;
}

.el-menu {
  border-right: none;
}
</style>
