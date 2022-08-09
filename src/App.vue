<template>
  <div v-if="isRouterAlive">
    <nav style="font-size: 18px;margin:20px 0;text-align:center;">
      <router-link to="/" :style="{'margin-right': '20px', 'border-bottom': route.fullPath === '/' ? '1px solid red' : ''}">首页</router-link>
      <router-link to="/about" :style="{'border-bottom': route.fullPath === '/about' ? '1px solid red' : ''}">关于我们</router-link>
    </nav>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" name="fade">
        <keep-alive>
          <component :is="Component" :key="route.name"/>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
import "@/styles/index.scss";
import { nextTick } from 'vue'
import { mapActions } from 'pinia'
import { userInfo } from '@/store/modules/userInfo'
import config from './config/defaultSettings'
import { useRoute } from 'vue-router'

export default {
  provide() {
    return {
      reload: this.reload
    };
  },

  data() {
    return {
      isRouterAlive: true,
      key: 0,
    };
  },

  setup() {
    const route = useRoute()
    return {
      route
    }
  },

  beforeMount() {
    window.addEventListener('message', this.message, false)
  },

  beforeUnMount() {
    window.removeEventListener('message', this.message)
  },

  methods: {
    ...mapActions(userInfo, ['GetInfo', 'SetToken']),
    async message(event) {
      const origin = event.origin
      // 只针对规定白名单域名做处理
      if (origin !== config.whiteOrigin) return
      const {
        token,
        userInfo: UserInfo,
        refresh,
        routeChange,
        path,
        query,
        params } = event.data
      if (token) {
        this.SetToken(token)
        this.GetInfo(UserInfo)
      } else if (refresh) {
        await this.reload()
      } else if (routeChange) {
        // 路由跳转
        let url = path
        // this.Remove_nocache_routes(url)
        if (params) {
          url = url.replace(/\?/g, '')
          // params 路由替换
          for (let key in params) {
            const d = eval(`/\:${key}/g`);
            if (params[key] == null || params[key] === 'undefined') {
              url = url.replace(d, '')
              url = url.replace(/\/$/, '')
            } else {
              url = url.replace(d, params[key]); // 多个动态 params 匹配
            }
          }
        }
        this.$router.replace({
          path: url,
          query
        })
      }
    },
    async reload() {
      return new Promise((res) => {
        this.isRouterAlive = false;
        nextTick(() => {
          this.isRouterAlive = true;
          res(true)
        })
      })
    }
  }
}
</script>

<style lang="scss">
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
