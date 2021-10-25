/* eslint-disable no-unused-vars */
import { createApp} from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css' 
import '../node_modules/bootstrap/dist/js/bootstrap' 
import '../node_modules/jquery/dist/jquery.js'
import router from './router'


createApp(App).use(router).mount('#app')
