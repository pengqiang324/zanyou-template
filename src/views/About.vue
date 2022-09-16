<template>
  <div class="home">
    关于我们
    <span style="color: red;">{{ msg }}</span>
    <img :src="img" />
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script setup>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { ref } from 'vue'
import img from '/src/assets/43.png'

const msg = ref('hello baby test')
</script>

<style lang="scss">
  .home {
    img {
      width: 100%;
    }
  }
</style>
