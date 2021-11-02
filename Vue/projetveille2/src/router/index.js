/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router' 
import Login from '../components/Login/Login.vue'
import Registration from '../components/Registration/Registration.vue'
import Admin from '../components/Admin/Admin.vue';
import Student from '../components/Student/Student.vue';
import Monitor from '../components/Monitor/Monitor.vue';
import Supervisor from '../components/Supevisor/Supervisor.vue';

const routes = [
    {
        name:'',
        path:'/',
        component: Login,
    },
    {
        name:'Login',
        path:'/Login',
        component: Login,
    }, 
    {
        name:'Registration',
        path:'/Registration',
        component: Registration,
    },
    {
        name:'Admin',
        path:'/Admin',
        component: Admin,
    },
    {
        name:'Student',
        path:'/Student',
        component: Student,
    },
    {
        name:'Monitor',
        path:'/Monitor',
        component: Monitor,
    },
    {
        name:'Supervisor',
        path:'/Supervisor',
        component: Supervisor,
    },
    ];
    
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

export default router