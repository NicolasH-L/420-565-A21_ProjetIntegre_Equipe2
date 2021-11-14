<template>
  <div className="grad">
            <AdminNavbar></AdminNavbar>
            <div>
                <h2 className="text-center">Étudiant: {{student.firstName + " " + student.lastName}}</h2>
            </div>
            <div className="p-5">
                <table className="table table-hover bg-light shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col">Nom: </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            <tr v-for="student in students" :key="student.id">
                                <th>{{document.documentName}}</th>
                                <td className="w-25">
                                    <button className="btn btn-primary mx-2">Consulter</button>
                                    {{!document.isValid && !document.isRefused ? displayButtons(document) : ""}}
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

export default {
    name:"AdminStudentCvList",
   components:{
       // eslint-disable-next-line vue/no-unused-components
       AdminService,
       AdminNavbar
   }

}
</script>

<style>

</style>