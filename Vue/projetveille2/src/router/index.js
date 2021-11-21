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
import AdminIntershipOfferList from '../components/Admin/AdminIntershipOfferList.vue';
import AdminStudentCvList from '../components/Admin/AdminStudentCvList.vue';
import AdminStudentList from '../components/Admin/AdminStudentList.vue';
import StudentInternshipListOffers from '../components/Student/StudentInternshipListOffers.vue';
import OfferView from '../components/Offer/OfferView.vue';
import AdminAssignSupervisorToStudent from '../components/Admin/AdminAssignSupervisorToStudent.vue';
import SupervisorAssignedStudentList from '../components/Supevisor/SupervisorAssignedStudentList.vue';
import MonitorOfferList from '../components/Monitor/MonitorOfferList.vue';
import MonitorStudentList from '../components/Monitor/MonitorStudentList.vue';

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
    },
    {
        name: 'AdminInternshipOfferList',
        path: '/AdminInternshipOfferList',
        component: AdminIntershipOfferList
    },
    {
        name: 'AdminStudentCvList',
        path: '/AdminStudentCvList',
        component: AdminStudentCvList
    },
    {
        name: 'AdminStudentList',
        path: '/AdminStudentList',
        component: AdminStudentList
    },
    {
        name: 'StudentInternshipListOffers',
        path: '/StudentInternshipListOffers',
        component: StudentInternshipListOffers
    },
    {
        name: 'OfferView',
        path: '/OfferView',
        component: OfferView
    },
    {
        name:'AdminAssinSupervisorToStudent',
        path:'/AdminAssinSupervisorToStudent',
        component:AdminAssignSupervisorToStudent
    },
    {
        name:'SupervisorAssignedStudent',
        path:'/SupervisorAssignedStudent',
        component:SupervisorAssignedStudentList
    },
    {
        name:'MonitorOfferList',
        path:'/MonitorOfferList',
        component:MonitorOfferList
    },
    {
        name:'MonitorStudentList',
        path:'/MonitorStudentList',
        component:MonitorStudentList
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})



export default router