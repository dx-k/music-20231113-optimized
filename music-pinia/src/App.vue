<template>
  <Head @W_ShowWhich="w_ShowWhich" :selected="ShowWhich" :uname="userinfo" @showWarningDiv="_showWarningDiv"></Head>
  <component :is="ShowWhich" @showWarningDiv="_showWarningDiv" @W_ShowWhich="w_ShowWhich"></component>
  <WarningDiv :value="WarningDivInfo" ref="warn"></WarningDiv>
</template>

<script>
import Head from './components/Head.vue';
import PlayMusic from './components/PlayMusic.vue';
import Login from './components/Login.vue';
import Regin from './components/Regin.vue';

import {useAppStore} from './stores/App.js';
import {useHeadStore} from './stores/Head';


export default {
  name: 'App',
  data(){
    return{
      WarningDivInfo:"",
      ShowWhich:"PlayMusic",
      userinfo:""
    }
  },
  methods:{
    w_ShowWhich(){
      // 更新显示组件的名称
      this.ShowWhich = this.appStore.ShowComponents;
      // 更新显示的登录名称
      this.userinfo = this.headStore.UserName;
    },
    _showWarningDiv(v){
      this.WarningDivInfo = v;
      const warn = this.$refs.warn.$el;
      warn.style.opacity = 1;

      // 设置逐渐消失的效果
      setTimeout(()=>{
        let timer = setInterval(() => {
          warn.style.opacity -= 0.05;
          if(warn.style.opacity <= 0){
            clearInterval(timer);
            timer = null;
          }
        }, 150);
      },2000);
    }
  },
  components:{
    Head,
    PlayMusic,
    Login,
    Regin
  },
  setup(){
    const appStore = useAppStore();
    const headStore = useHeadStore();
    return{
      appStore,
      headStore
    }
  },
}
</script>
