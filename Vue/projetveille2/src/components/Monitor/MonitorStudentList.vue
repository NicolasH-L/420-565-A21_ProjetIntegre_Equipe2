<template>
  <div className="grad">
    <MonitorNavbar></MonitorNavbar>
    <div className="justify-content-start d-flex mx-5">
      <button className="btn btn-light">
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
              <button className="btn btn-primary mx-2">Consulter CV</button>
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

export default {
  name: "MonitorOfferList",
  components: {
    MonitorNavbar,
  },
  data() {
    return {
      studentOffer: this.getStudentOffersByIdOffer(),
    };
  },
  methods: {
    getStudentOffersByIdOffer() {
        console.log(this.$route.params)
      MonitorService.getStudentOffersByIdOffer(this.$route.params.idOffer).then((response) => {
        this.studentOffer = response;
      });
    },
  },
};
</script>

<style></style>
