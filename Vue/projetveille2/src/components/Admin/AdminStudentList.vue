<template>
   <div className="grad">
            <AdminNavbar></AdminNavbar>
            <h2 className="text-center">Liste des étudiants</h2>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Nom: </th>
                            <th scope="col">Matricule: </th>
                            <th scope="col">Validité: </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    
                            <tr v-for="student in students" :key="student.id" :class="`${student.isCvValid ? 'table-success' : 'table-warning'}`">
                                <th>{{student.firstName + " " + student.lastName}}</th>
                                <td>{{student.matricule}}</td>
                                <td>{{student.isCvValid ? "Valide" : "En attente"}}</td>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2" @click="viewStudentCvList(student)">Consulter documents</button>
                                    <button className="btn btn-success mx-2"  @click="validateStudent(student)">Valider étudiant</button>
                                </td>
                            </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue"
import AdminService from './AdminService'
import router from "../../router";

export default {
    name:"AdminStudentList",
     components:{
        AdminNavbar,
    },
    data(){
        return{
            students: this.getStudents(),
            admin: this.$route.params,
            adminId: this.$route.params.id
        }
    },
    methods:{
        getStudents() {
            AdminService.getAllStudents().then((response) => {
                this.students = response;
            })
        },
        viewStudentCvList(student){
            router.push({ name: "AdminStudentCvList",
                        params:{ document: JSON.stringify({...document}), 
                        student:JSON.stringify({...student}) }})
        },
        /*validateStudent(student){
            AdminService.validateStudent(student).then((response) =>{
                this.students = this.students.map(
                    (student1) => student1.matricule === student.matricule ? {...student1, isCvValid: response.isCvValid} : student1
                )
            })
        }*/
    }

}
</script>

<style>

</style>