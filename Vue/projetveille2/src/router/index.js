/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router' 
import Login from '../components/Login/Login.vue'

const routes = [
    {
        name:'StudentLogin',
        path:'/Login',
        component: Login,
    }
    ];
    
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

export default router