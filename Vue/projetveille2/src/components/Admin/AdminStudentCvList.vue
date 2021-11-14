<template>
  <div className="grad">
    <AdminNavbar />
    <div>
      <h2 className="text-center">
        Étudiant: {{ student.firstName + " " + student.lastName }}
      </h2>
    </div>
    <div className="p-5">
      <table className="table table-hover bg-light shadow-lg">
        <thead>
          <tr>
            <th scope="col">Nom:</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="document in documents" :key="document.idDocument">
            <th>{{ document.documentName }}</th>
            <td className="w-25">
              <button className="btn btn-primary mx-2">Consulter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="test()">Test</button>
  </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue";
import AdminService from "./AdminService";

export default {
  name: "AdminStudentCvList",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AdminService,
    AdminNavbar,
  },
  data() {
    return {
      documents: JSON.parse(this.$route.params.documents),
      student: JSON.parse(this.$route.params.student),
      studentId: "",
    };
  },
  methods: {
    getDocuments() {
        AdminService.getAllDocumentsByStudentId()
    },
    test(){
        console.log(this.$route.params)
        console.log(this.student)
        
    }
  },
};
</script>

<style></style>
