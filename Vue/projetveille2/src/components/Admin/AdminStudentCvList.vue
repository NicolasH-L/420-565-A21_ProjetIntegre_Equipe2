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
          <tr
            v-for="document in documents"
            :key="document.idDocument"
            :class="`${!document.isValid && !document.isRefused ? 'table-warning' :
                                !document.isValid && document.isRefused ? 'table-danger' : 'table-success'}`"
          >
            <th>{{ document.documentName }}</th>
            <td className="w-25">
              <button className="btn btn-primary mx-2" @click="viewDocument(document)">Consulter</button>
              <div v-if="!document.isValid && !document.isRefused">
                <button className="btn btn-success mx-2" @click="updateCvStatus(document,true)">Valider</button>
                <button className="btn btn-danger mx-2" @click="updateCvStatus(document,false)">Refuser</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue";
import AdminService from "./AdminService";
import router from "../../router";

export default {
  name: "AdminStudentCvList",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AdminService,
    AdminNavbar,
  },
  data() {
    return {
      documents: this.getDocuments(),
      student: JSON.parse(this.$route.params.student),
      studentId: "",
      admin: JSON.parse(this.$route.params.admin)
    };
  },
  methods: {
    getDocuments() {
      var student = JSON.parse(this.$route.params.student);
      AdminService.getAllDocumentsByStudentId(student).then((response) => {
        this.documents = response;
      });
    },
    viewDocument(document){
      router.push({name: "ViewDocument", params:{document: JSON.stringify({...document}), 
                                                  admin: JSON.stringify({...this.admin}),
                                                   student: JSON.stringify({...this.student}) }})
    },
    updateCvStatus(document, isValid) {
      AdminService.updateCvStatus(document, isValid).then((response) => {
        this.documents = this.documents.map((document1) =>
          document1.idDocument === document.idDocument
            ? {
                ...document1,
                isValid: response.isValid,
                isRefused: response.isRefused,
              }
            : document1
        );
      });
    },
  },
};
</script>

<style></style>
