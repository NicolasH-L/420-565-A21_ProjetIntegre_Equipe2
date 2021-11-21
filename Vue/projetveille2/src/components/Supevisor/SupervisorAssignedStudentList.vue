<template>
  <div>
    <div className="grad">
      <SupervisorNavbar></SupervisorNavbar>
      <h2 className="text-center">Liste de mes étudiants</h2>
      <div className="p-5">
        <table className="table table-hover bg-light shadow-lg">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Entreprise</th>
              <th scope="col">Nom du poste</th>
              <th scope="col">Numéro de teléphone de l'étudiant</th>
              <th scope="col">Offre</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="internship in internships"
              :key="internship.idInternship"
            >
              <th>{{ internship.student.lastName }}</th>
              <th>{{ internship.student.firstName }}</th>
              <th>{{ internship.offer.companyName }}</th>
              <th>{{ internship.offer.jobTitle }}</th>
              <th>{{ internship.student.telephoneNumber }}</th>
              <td className="w-25">
                <button
                  className="btn btn-primary mx-2"
                  @click="goToViewOffer(internship.offer)"
                >
                  Consulter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SupervisorNavbar from "./SupervisorNavbar.vue";
import SupervisorService from "./SupervisorService";
import router from "../../router";

export default {
  name: "SupervisorAssignedStudent",
  components: {
    SupervisorNavbar,
  },
  data() {
    return {
      internships: this.getInternships(),
      supervisor: this.$route.params,
    };
  },
  methods: {
    getInternships() {
      var id = this.getSupervisorId();
      SupervisorService.getInternships(id).then((response) => {
        this.internships = response;
      });
    },
    getSupervisorId() {
      if (this.$route.params.supervisor !== undefined) {
        var supervisor = JSON.parse(this.$route.params.supervisor);
        return supervisor.id;
      } else {
        return this.$route.params.id;
      }
    },
    goToViewOffer(offer) {
      router.push({
        name: "OfferView",
        params: {
          offer: JSON.stringify({ ...offer }),
          supervisor: JSON.stringify({ ...this.supervisor }),
        },
      });
    },
  },
};
</script>

<style></style>
