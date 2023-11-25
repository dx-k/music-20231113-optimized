<template>
    <div class="outermost" v-showAnimation>
        <div class="core L_core" >
            <div class="form">
                <div class="h">
                    <label>账号：</label>
                    <input @input="name" @blur="_name" v-model="L_UserName" type="text" placeholder="请输入账号"><br>
                </div>
                <div class="h">
                    <label>密码：</label>
                    <input @input="password" @blur="_password" v-model="L_PassWord" type="text" placeholder="请输入密码"><br>
                </div>
                <div class="h">
                    <label>邮箱：</label>
                    <input @input="email" @blur="_email" v-model="L_Email" type="text" placeholder="请输入邮箱">
                </div>
            </div>
            <button @click="login">登录</button>
        </div>
    </div>
</template>
<script>
import { useAppStore } from '../stores/App';
import { useHeadStore } from '../stores/Head';
import axios from 'axios';
export default {
    name:"Login",
    data(){
        return{
            L_UserName:"",
            L_UserNameIsOk:false,
            L_PassWord:"",
            L_PassWordIsOk:false,
            L_Email:"",
            L_EmailIsOk:false
        }
    },
    methods:{
        login(e){
            if(this.L_UserNameIsOk && this.L_PassWordIsOk && this.L_EmailIsOk){
                // 点击登录后，如果用户名
                axios.post("http://127.0.0.1:8080",{
                    username:this.L_UserName,
                    password:this.L_PassWord,
                    email:this.L_Email,
                    // BusinessEvents(业务事件)，传递该信息用于表明需要进行哪个业务处理
                    BusinessEvents:"login"
                })
                .then(res=>{
                    if(!res.data.status){
                        // 如果登录失败则将返回信息作为警告信息抛出
                        this.$emit("showWarningDiv",res.data.info);
                    }else{
                        this.$emit("showWarningDiv","登录成功，正在跳转播放页面");
                        // 三秒后跳转
                        setTimeout(() => {
                            // 如果登录成功，则跳转音乐页面
                            this.appStore.ShowComponents = "PlayMusic";
                            this.headStore.UserName = this.L_UserName;
                            this.$emit("W_ShowWhich");
                        }, 3000);
                    }
                })
            }else{
                if(!this.L_UserNameIsOk){
                    this.$emit("showWarningDiv","账号不合法<br>要求：3~10位组成<br>只能由数字字母组成");
                    return;
                }
                if(!this.L_PassWordIsOk){
                    this.$emit("showWarningDiv","密码不合法<br>要求：5~15位<br>只能由字母数字特殊符号组成");
                    return;
                }
                if(!this.L_EmailIsOk){
                    this.$emit("showWarningDiv","邮箱不合法<br>要求：以qq.com结<br>尾只能由数字字母组合，长度5~15位");
                    return;
                }
            }
        },
        // 实时监控用户名是否合法
        name(e){
            const r = /^[a-zA-Z0-9_]{3,10}$/;
            if(r.test(this.L_UserName) === false){
                // 如果不合法则显示背景阴影
                this.showBoxShadow(e);
                this.L_UserNameIsOk = false;
            }else{
                // 如果合法则不显示背景阴影
                this.closeBoxShadow(e);
                this.L_UserNameIsOk = true;
                this.headStore.UserName = this.L_UserName;
            }
        },
        // 在失去焦点时触发
        _name(e){
            // 3~10位组成，只能由数字字母组成
            const r = /^[a-zA-Z0-9_]{3,10}$/;
            if(r.test(this.L_UserName) === false && this.L_UserName !== ""){
                this.L_UserNameIsOk = false;
                // 如果不合法则显示警告框
                this.$emit("showWarningDiv","账号不合法<br>要求：3~10位组成<br>只能由数字字母组成");
            }else{
                // 合法则修改 L_UserNameIsOk 状态
                this.L_UserNameIsOk = true;
            }
        },
        // 实时监控密码是否合法
        password(e){
            // 5~15位，只能由字母数字特殊符号组成
            const r = /^[a-zA-Z0-9!@#$%^&*]{5,15}$/;
            if(r.test(this.L_PassWord) === false){
                this.L_PassWordIsOk = false;
                // 如果不合法则显示阴影
                this.showBoxShadow(e);
            }else{
                this.L_PassWordIsOk = true;
                // 如果合法则去除阴影
                this.closeBoxShadow(e);
            }
        },
        _password(e){
            // 5~15位，只能由字母数字特殊符号组成
            const r = /^[a-zA-Z0-9!@#$%^&*]{5,15}$/;
            if(r.test(this.L_PassWord) === false && this.L_PassWord !== ""){
                this.L_PassWordIsOk = false;
                // 如果不合法则发送数据给父元素，显示警告框
                this.$emit("showWarningDiv","密码不合法<br>要求：5~15位<br>只能由字母数字特殊符号组成");
            }else{
                this.L_PassWordIsOk = true;
            }
        },
        email(e){
            // 以qq.com结尾，只能由数字字母组合，长度5~15位
            const r = /^[a-zA-Z0-9]{5,15}@qq\.com$/;
            if(r.test(this.L_Email) === false){
                this.L_EmailIsOk = false;
                // 如果不合法则显示阴影
                this.showBoxShadow(e);
            }else{
                this.L_EmailIsOk = true;
                // 如果合法则不显示阴影
                this.closeBoxShadow(e);
            }
        },
        _email(){
            // 以qq.com结尾，只能由数字字母组合，长度5~15位
            const r = /^[a-zA-Z0-9]{5,15}@qq\.com$/;
            if(r.test(this.L_Email) === false && this.L_Email !== ""){
                this.L_EmailIsOk = false;
                // 如果不合法则发送数据给父元素，显示警告框
                this.$emit("showWarningDiv","邮箱不合法<br>要求：以qq.com结<br>尾只能由数字字母组合，长度5~15位");
            }else{
                this.L_EmailIsOk = true;
            }
        },
        // 输入不合法时显示阴影
        showBoxShadow(e){
            e.srcElement.style.boxShadow = "red 0px 0px 10px 2px";
        },
        // 输入合法时去除阴影
        closeBoxShadow(e){
            e.srcElement.style.boxShadow = "none";
        },
        setPosition(){
            const ow = getComputedStyle(document.querySelector(".outermost")).width.slice(0,-2) / 2;
            const oh = getComputedStyle(document.querySelector(".outermost")).height.slice(0,-2) / 2;

            const w = getComputedStyle(document.querySelector(".L_core")).width.slice(0,-2) / 2;
            const h = ((parseInt(getComputedStyle(document.querySelector(".outermost")).height.slice(0,-2))+50) *0.7) / 2;
            
            // console.log(ow,w);
            document.querySelector(".L_core").style.position = "absolute";
            document.querySelector(".L_core").style.top = oh+50-h+"px";
            document.querySelector(".L_core").style.left = ow-w+"px";
        }
    },
    mounted(){
        this.setPosition();
        if(this.appStore.ShowComponents === "Login"){
            window.onresize = ()=>{
                this.$options.methods.setPosition();
            }
        }
    },
    setup(){
        const appStore = useAppStore();
        const headStore = useHeadStore();
        return{
            appStore,
            headStore,
        }
    }
}
</script>
<style scoped>
.L_core{
    background-image: url("../assets/login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
.form{
    display: inline-block;
    height: 50%;
    color: white;
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