/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router' 
import StudentLogin from '../components/Login/StudentLogin.vue'

const routes = [
    {
        name:'StudentLogin',
        path:'/login',
        component: StudentLogin,
    }
    ];
    
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

export default router