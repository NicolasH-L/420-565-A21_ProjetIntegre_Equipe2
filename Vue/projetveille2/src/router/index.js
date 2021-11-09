/* eslint-disable no-unused-vars */
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login/Login.vue'
import Registration from '../components/Registration/Registration.vue'
import Admin from '../components/Admin/Admin.vue';
import Student from '../components/Student/Student.vue';
import Monitor from '../components/Monitor/Monitor.vue';
import Supervisor from '../components/Supevisor/Supervisor.vue';
import MonitorIntershipOffer from '../components/Monitor/MonitorIntershipOffer.vue';
import AdminInternshipOffer from '../components/Admin/AdminInternshipOffer.vue';
import StudentUploadCV from '../components/Student/StudentUploadCV.vue';
import StudentDocuments from '../components/Student/StudentDocuments.vue';
import ViewDocument from '../components/ViewDocument.vue';

const routes = [
    {
        name: '',
        path: '/',
        component: Login,
    },
    {
        name: 'Login',
        path: '/Login',
        component: Login,
    },
    {
        name: 'Registration',
        path: '/Registration',
        component: Registration,
    },
    {
        name: 'Admin',
        path: '/Admin',
        component: Admin,
    },
    {
        name: 'Student',
        path: '/Student',
        component: Student,
    },
    {
        name: 'Monitor',
        path: '/Monitor',
        component: Monitor,
    },
    {
        name: 'Supervisor',
        path: '/Supervisor',
        component: Supervisor,
    },
    {
        name: 'MonitorOffer',
        path: '/MonitorOffer',
        component: MonitorIntershipOffer,
    },
    {
        name: 'AdminOffer',
        path: '/AdminOffer',
        component: AdminInternshipOffer
    },
    {
        name: 'StudentUploadCV',
        path: '/StudentUploadCV',
        component: StudentUploadCV
    },
    {
        name: 'StudentDocuments',
        path: '/StudentDocuments',
        component: StudentDocuments
    },
    {
        name: 'ViewDocument',
        path: '/ViewDocument',
        component: ViewDocument
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})



export default router