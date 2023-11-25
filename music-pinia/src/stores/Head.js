import {defineStore} from 'pinia';
export const useHeadStore = defineStore("head",{
    state:()=>({
        MusicName:"",
        Status:"",
        UserName:""
    })
}) 