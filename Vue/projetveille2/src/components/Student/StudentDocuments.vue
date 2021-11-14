<template>
  <div className="grad">
    <StudentNavbar :student="this.$route.params"></StudentNavbar>
    <h2 className="text-center">Portfolio</h2>
    <div className="p-5">
      <table className="table table-hover bg-light shadow-lg">
        <thead>
          <tr>
            <th scope="col">Nom du document</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="document in documents" :key="document.idDocument">
            <th>{{ document.documentName }}</th>
            <td className="w-25">
              <button className="btn btn-primary mx-2" @click="viewDocument(document)" >Consulter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StudentNavbar from "./StudentNavbar.vue";
// eslint-disable-next-line no-unused-vars
import StudentService from "./StudentService";
import router from "../../router";


export default {
  name: "StudentDocument",
  components: {
    StudentNavbar,
  },
  data() {
    return {
      documents: this.getDocuments(),
    };
  },
  methods: {
    getDocuments() {
      console.log(this.$route.params)
      StudentService.getDocuments(this.$route.params.id).then((response) => {
        this.documents = response;
      });
    },
    viewDocument(document){
      router.push({ name: "ViewDocument", params: {document: JSON.stringify({...document}), student: JSON.stringify({...this.$route.params})} })
    },  
  },
};
</script>

<style></style>
