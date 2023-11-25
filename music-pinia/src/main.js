import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import {createPinia} from 'pinia';
import WarningDiv from './components/WarningDiv.vue';

const pinia  = createPinia();

createApp(App).use(pinia).directive("showAnimation",{
    mounted(el) {
        el.style.opacity = 0;
        let timer = setInterval(() => {
            el.style.opacity = parseFloat(el.style.opacity) + 0.05;
            if (parseFloat(el.style.opacity) >= 1) {
                clearInterval(timer);
            }
        }, 50);
    },
}).component("WarningDiv",WarningDiv).mount('#app')
