<template>
    <div v-html="value" ref="warning" class="warning"></div>
</template>
<script>
export default {
    name:"WarningDiv",
    props:["value"],
    mounted(){
        // 获取组件的 DOM 元素
        const warningElement = this.$refs.warning;
        const w = document.querySelector(".warning").offsetWidth;

        // 修改组件的位置
        warningElement.style.position = "absolute";
        warningElement.style.left = `calc(50% - ${w}px / 2)`;
        warningElement.style.top = '10%';
    }
}
</script>
<style scoped>
    div{
        min-width: 150px;
        max-width: 150px;
        /* min-height: 40px; */
        display: inline-block;
        z-index: 999;
        /* opacity: 0; */
        text-align: center;
        color: white;
        padding: 10px 20px;
        background-color: rgba(49, 194, 124);
        box-shadow:  white 0px 0px 24px 2px; 
        opacity: 0;
    }
</style>