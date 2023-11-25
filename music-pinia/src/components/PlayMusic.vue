<template>
    <div class="outermost" v-showAnimation>
        <div class="core" ref="core">
            <div class="img"></div>
            <div class="center">
                <div>{{ MusicInfo.musicname }}</div>
                <div>{{ MusicInfo.melody }}</div>
                <div>{{ MusicInfo.text }}</div>
            </div>
            <audio controls :src="MusicInfo.musicurl"></audio>
        </div>
    </div>
</template>
<script>
import { storeToRefs } from 'pinia';
import {useAppStore} from '../stores/App.js';
export default {
    name:"PlayMusic",
    methods:{
        setPosition(){
            const ow = getComputedStyle(document.querySelector(".outermost")).width.slice(0,-2) / 2;
            const oh = getComputedStyle(document.querySelector(".outermost")).height.slice(0,-2) / 2;

            const w = getComputedStyle(document.querySelector(".core")).width.slice(0,-2) / 2;
            const h = ((parseInt(getComputedStyle(document.querySelector(".outermost")).height.slice(0,-2))+50) *0.7) / 2;
            
            // console.log(oh,h);
            document.querySelector(".core").style.position = "relative";
            document.querySelector(".core").style.top = oh-h+"px";
            document.querySelector(".core").style.left = ow-w+"px";
        },
    },
    mounted(){
        this.setPosition();
        if(this.appStore.ShowComponents === "PlayMusic"){
            window.onresize = ()=>{
                this.$options.methods.setPosition();
            }
        }
        // 监控audio播放按钮是否被点击
        const audioBtn = document.querySelector("audio");
        console.log(audioBtn);
        audioBtn.addEventListener("play",()=>{
            // 让图片旋转
            // document.querySelector(".img").style.animationPlayState = "running";
        })
        audioBtn.addEventListener("pause",()=>{
            // 让图片停止旋转
            // document.querySelector(".img").style.animationPlayState = "paused";
        })
    },
    setup(){
        const appStore = useAppStore();
        const {MusicInfo} = storeToRefs(appStore);
        return{
            appStore,
            MusicInfo
        }
    }
}
</script>
<style scoped>
.core{
    height: 77%;
}
.center{
    width: 100%;
    text-align: center;
    position: absolute;
    top: 60%;
}
.img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-image: url('../assets/111.jpg');
    background-position: -5px -5px;
    background-size: 105%;
    background-repeat: no-repeat;
    position: absolute;
    top: 5%;
    left: calc(50% - 100px);
    animation: rotate 2.5s linear infinite;
    animation-fill-mode: forwards;
    animation-play-state: paused;
}
/* .img:hover {
    animation-play-state: running;
} */
audio{
    width: 100%;
    position: absolute;
    bottom: 0;
}
audio:active{
    border: none;
    outline: none;
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    25% {
        transform: rotate(90deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(270deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>