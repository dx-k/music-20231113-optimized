import {defineStore} from 'pinia';
export const useAppStore = defineStore("app",{
    // state的书写形式需要注意
    state:()=>({
        MusicName:"",
        ShowComponents:"PlayMusic",
        MusicInfo:"",
    }),
    getters:{
        getMusicInfo(){
            return this.MusicInfo
        }
    }
}) 