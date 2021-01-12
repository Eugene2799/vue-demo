<template>
  <div id="app">
    <van-loading :class="[showLoading?'':'hide-loading', 'loading']" type="spinner" color="#1989fa" vertical>加载中...
    </van-loading>
    <router-view :key="$route.path + $route.params.id"></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { Loading } from 'vant';

  export default {
    name: 'App',
    components: {
      [Loading.name]: Loading
    },
    computed: {
      ...mapGetters({
        showLoading: 'showLoading'
      })
    }
  }
</script>
