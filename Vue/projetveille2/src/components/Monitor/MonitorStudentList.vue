<template>
  <div className="grad">
    <MonitorNavbar></MonitorNavbar>
    <div className="justify-content-start d-flex mx-5">
      <button className="btn btn-light" @Click="goBack()">
        <i className="fas fa-angle-double-left"></i> Retour
      </button>
    </div>
    <h2 className="text-center">Candidatures</h2>
    <div className="p-5">
      <table className="table table-hover bg-light shadow-lg">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Matricule</th>
            <th scope="col">CV</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="studentOffer in studentOffers"
            :key="studentOffer.idStudentOffer"
          >
            <th>
              {{
                studentOffer.student.firstName +
                  " " +
                  studentOffer.student.lastName
              }}
            </th>
            <td>{{ studentOffer.student.matricule }}</td>
            <td>{{ studentOffer.document.documentName }}</td>
            <td className="w-25">
              <button className="btn btn-primary mx-2" @click="goToViewDocument(studentOffer.document)" >Consulter CV</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import MonitorNavbar from "./MonitorNavbar.vue";
import MonitorService from "./MonitorService";
import router from "../../router";

export default {
  name: "MonitorOfferList",
  components: {
    MonitorNavbar,
  },
  data() {
    return {
      studentOffers: this.getStudentOffersByIdOffer(),
      monitor: this.$route.params.monitor
    };
  },
  methods: {
    getStudentOffersByIdOffer() {
      MonitorService.getStudentOffersByIdOffer(this.$route.params.idOffer).then((response) => {
        this.studentOffers = response;
      });
    },
    goToViewDocument(document){
        router.push({name:"ViewDocument", params:{
          monitor: this.monitor,
          document: JSON.stringify({ ...document },),
          idOffer: this.$route.params.idOffer
        }})
    },
    goBack(){
      router.push({name:"MonitorOfferList", params:{
        monitor: this.monitor
      }})
    },
  },
};
</script>

<style></style>
