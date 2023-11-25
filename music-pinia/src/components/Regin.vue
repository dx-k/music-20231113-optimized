<template>
    <div class="outermost" v-showAnimation>
        <div class="core R_core" >
            <div class="form">
                <div class="h">
                    <label>账号：</label>
                    <input @input="name" @blur="_name" v-model="R_UserName" type="text" placeholder="请输入账号"><br>
                </div>
                <div class="h">
                    <label>密码：</label>
                    <input @input="password" @blur="_password" v-model="R_PassWord" type="text" placeholder="请输入密码"><br>
                </div>
                <div class="h">
                    <label>邮箱：</label>
                    <input @input="email" @blur="_email" v-model="R_Email" type="text" placeholder="请输入邮箱">
                </div>
            </div>
            <button @click="registered">注册</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {useAppStore} from '../stores/App.js';
import {useHeadStore} from '../stores/Head';
export default {
    name:"Regin",
    data(){
        return{
            R_UserName:"",
            R_UserNameIsOk:false,
            R_PassWord:"",
            R_PassWordIsOk:false,
            R_Email:"",
            R_EmailIsOk:false
        }
    },
    methods:{
        registered(){
            if(this.R_UserNameIsOk && this.R_PassWordIsOk && this.R_EmailIsOk){
                // 如果全都合法则可以向后端发送信息
                axios.post("http://127.0.0.1:8080",{
                    username:this.R_UserName,
                    password:this.R_PassWord,
                    email:this.R_Email,
                    // 表示当前发送的数据需要进行regin业务
                    BusinessEvents:"regin"
                })
                .then(res=>{
                    console.log(res.data.info);
                    if(res.data.status){
                        // 如果创建成功，则跳转音乐播放页面
                        this.$emit("showWarningDiv",res.data.info+"<br>三秒后跳转页面");
                        setTimeout(() => {
                            this.appStore.ShowComponents = "PlayMusic";
                            this.headStore.UserName = this.R_UserName;
                            this.$emit("W_ShowWhich");
                        }, 3000);
                    }else{
                        // 如果创建不成功，则提示警告信息
                        this.$emit("showWarningDiv",res.data.info);
                    }
                })
            }
        },
        // 实时监控用户名是否合法
        name(e){
            const r = /^[a-zA-Z0-9_]{3,10}$/;
            if(r.test(this.R_UserName) === false){
                // 如果不合法则显示背景阴影
                this.showBoxShadow(e);
                this.R_UserNameIsOk = false;
            }else{
                // 如果合法则不显示背景阴影
                this.closeBoxShadow(e);
                this.R_UserNameIsOk = true;
            }
        },
        // 在失去焦点时触发
        _name(){
            // 3~10位组成，只能由数字字母组成
            const r = /^[a-zA-Z0-9_]{3,10}$/;
            if(r.test(this.R_UserName) === false && this.R_UserName !== ""){
                this.R_UserNameIsOk = false;
                // 如果不合法则发送数据给父元素，显示警告框
                this.$emit("showWarningDiv","账号不合法<br>要求：3~10位组成<br>只能由数字字母组成");
            }else{
                this.R_UserNameIsOk = true;
                // 如果合法则向后端发送请求，查看用户名是否存在
            }
        },
        // 实时监控密码是否合法
        password(e){
            // 5~15位，只能由字母数字特殊符号组成
            const r = /^[a-zA-Z0-9!@#$%^&*]{5,15}$/;
            if(r.test(this.R_PassWord) === false){
                // 如果不合法则显示阴影
                this.showBoxShadow(e);
                this.R_PassWordIsOk = false;
            }else{
                // 如果合法则去除阴影
                this.closeBoxShadow(e);
                this.R_PassWordIsOk = true;
            }
        },
        _password(e){
            // 5~15位，只能由字母数字特殊符号组成
            const r = /^[a-zA-Z0-9!@#$%^&*]{5,15}$/;
            if(r.test(this.R_PassWord) === false && this.R_PassWord !== ""){
                // 如果不合法则发送数据给父元素，显示警告框
                this.$emit("showWarningDiv","密码不合法<br>要求：5~15位<br>只能由字母数字特殊符号组成");
                this.R_UserNameIsOk = false;
            }else{
                // 如果合法则向后端发送请求，查看用户名是否存在
                this.R_UserNameIsOk = true;
            }
        },
        email(e){
            // 以qq.com结尾，只能由数字字母组合，长度5~15位
            const r = /^[a-zA-Z0-9]{5,15}@qq\.com$/;
            if(r.test(this.R_Email) === false){
                // 如果不合法则显示阴影
                this.showBoxShadow(e);
                this.R_EmailIsOk = false;
            }else{
                // 如果合法则不显示阴影
                this.closeBoxShadow(e);
                this.R_EmailIsOk = true;
            }
        },
        _email(){
            // 以qq.com结尾，只能由数字字母组合，长度5~15位
            const r = /^[a-zA-Z0-9]{5,15}@qq\.com$/;
            if(r.test(this.R_Email) === false && this.R_Email !== ""){
                this.R_EmailIsOk = false;
                // 如果不合法则发送数据给父元素，显示警告框
                this.$emit("showWarningDiv","邮箱不合法<br>要求：以qq.com结<br>尾只能由数字字母组合，长度5~15位");
            }else{
                this.R_EmailIsOk = true;
                // 如果合法则向后端发送请求，查看用户名是否存在
            }
        },
        // 初始化设置位置
        initSet(){
            const ow = getComputedStyle(document.querySelector(".outermost")).width.slice(0,-2) / 2;
            const oh = getComputedStyle(document.querySelector(".outermost")).height.slice(0,-2) / 2;

            const w = getComputedStyle(document.querySelector(".R_core")).width.slice(0,-2) / 2;
            const h = ((parseInt(getComputedStyle(document.querySelector(".outermost")).height.slice(0,-2))+50) *0.7) / 2;
            
            document.querySelector(".R_core").style.position = "absolute";
            document.querySelector(".R_core").style.top = oh+50-h+"px";
            document.querySelector(".R_core").style.left = ow-w+"px";
        },
        // 输入不合法时显示阴影
        showBoxShadow(e){
            e.srcElement.style.boxShadow = "red 0px 0px 10px 2px";
        },
        // 输入合法时去除阴影
        closeBoxShadow(e){
            e.srcElement.style.boxShadow = "none";
        },
    },
    mounted(){
        this.initSet();
        if(this.appStore.ShowComponents === "Regin"){
            window.onresize = ()=>{
                this.$options.methods.initSet();
            }
        }
    },
    setup(){
        const appStore = useAppStore();
        const headStore = useHeadStore();
        return{
            appStore,
            headStore
        }
    }
}
</script>
<style scoped>
.R_core{
    background-image: url("../assets/regin.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
.form{
    display: inline-block;
    height: 50%;
    color:white;
    font-size: 20px;
    position: relative;
    top: 15%;
    left: calc(50% - 116px);
    text-align: center;
}
.h{
    height: 33.33%;
    display: flex;
    align-items: center;
}
input{
    outline: none;
    border: none;
    height: 30px;
    padding-left: 10px;
    border-radius: 30px;
}
button{
    width: 50%;
    height: 50px;
    cursor: pointer;
    background-color:var(--bCol);
    outline: none;
    border: none;
    border-radius: 30px;
    color: white;
    font-size: 20px;
    position: absolute;
    bottom: 60px;
    left: 25%;
}
</style>