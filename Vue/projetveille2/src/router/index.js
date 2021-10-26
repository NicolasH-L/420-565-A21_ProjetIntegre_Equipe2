/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router' 
import Login from '../components/Login/Login.vue'
import Registration from '../components/Registration/Registration.vue'

const routes = [
    {
        name:'Login',
        path:'/Login',
        component: Login,
    }, 
    {
        name:'Registration',
        path:'/Registration',
        component: Registration,
    }
    ];
    
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

export default router