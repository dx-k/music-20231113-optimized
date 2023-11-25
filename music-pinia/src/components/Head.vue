<template>
    <div class="overall">
        <div class="f">
            <input v-model="MusicName" type="text" @keyup.enter="getMusicInfo" placeholder="请搜索音乐名">
            <div class="btn">
                <span @click="playmusic">首页</span>
                <span @click="login">{{UserName}}</span>
                <span @click="regin">注册</span>
            </div>
        </div> 
    </div>
</template>
<script>
import axios from 'axios';
import {useAppStore} from '../stores/App.js';

export default {
    name:"Head",
    data(){
        return{
            MusicName:"",
            UserName:"登录",
        }
    },
    props:['selected','uname'],
    watch:{
        MusicName(newV){
            this.appStore.MusicName = newV;
        },
        selected(newV){
            switch(newV){
                case "PlayMusic":
                    // 去除三个span元素的类
                    this.remove();
                    document.querySelectorAll("span")[0].setAttribute("class","activation");
                    break;
                case "Login":
                    // 去除三个span元素的类
                    this.remove();
                    document.querySelectorAll("span")[1].setAttribute("class","activation");
                    break;
                case "Regin":
                    // 去除三个span元素的类
                    this.remove();
                    document.querySelectorAll("span")[2].setAttribute("class","activation");
                    break;
            }
        },
        uname(newV){
            this.UserName = newV;
        }
    },
    methods:{
        getMusicInfo(){
            // 判断当前状态，如果不是播放音乐页面则不允许搜索
            if(this.appStore.ShowComponents !== "PlayMusic"){
                this.$emit("showWarningDiv","请到音乐播放页面搜索");
            }else{
                // 发送请求获取音乐数据
                axios.post("http://127.0.0.1:8080",{
                    musicname:this.MusicName,
                    BusinessEvents:"getmusic"
                })
                .then(res=>{
                    if(res.data.status){
                        // 如果音乐存在则存储返回的音乐信息
                        this.appStore.MusicInfo = res.data.r;
                        // 清空输入框内容
                        this.MusicName = "";
                    }else{
                        // 如果音乐不存在则警告
                        this.$emit("showWarningDiv",res.data.info);
                    }
                })
            } 
        },
        playmusic(){
            // 点击登录时需要将当前页面的状态更换成playmusic(默认)
            this.appStore.ShowComponents = "PlayMusic";
            this.$emit("W_ShowWhich");
        },
        login(){
            // 点击登录时需要将当前页面的状态更换成login
            this.appStore.ShowComponents = "Login";
            this.$emit("W_ShowWhich");
        },
        regin(){
            // 点击注册时需要将当前页面的状态更换成regin
            this.appStore.ShowComponents = "Regin";
            this.$emit("W_ShowWhich");
        },
        // 去除三个span元素的 activation 类 
        remove(){
            const btns = document.querySelectorAll("span");
            btns.forEach(e=>{
                e.removeAttribute("class");
            })
        }
    },
    mounted(){
        const btns = document.querySelectorAll("span");
        btns[0].setAttribute("class","activation");
    },
    setup(){
        const appStore = useAppStore();
        return{
            appStore
        }
    },
}
</script>
<style scoped>
.overall{
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: center;
    background-color: white;
}
.f{
    width: 60%;
    display: flex;
    justify-content: space-between;
}
.btn{
    width: 170px;
    display: flex;
    justify-content: space-between;
    height: 100%;
}
input{
    width: 50%;
    border: 1px solid black;
    font-size: 20px;
    border-radius: 30px;
    padding-left: 20px;
    outline: none;
}
span{
    width: 50px;
    color: white;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    background-color: var(--bCol);
}
span:active{
    background-color: rgb(49, 164, 90);
}
.activation{
    background-color: rgb(24, 246, 102);
}
</style>