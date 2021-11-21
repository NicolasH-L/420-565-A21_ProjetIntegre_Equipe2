<template>
  <div>
    <div className="grad">
      <AdminNavbar></AdminNavbar>
      <div className="d-flex justify-content-center">
        <div
          className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen"
        >
          <form
            className="container-fluid"
            @submit.prevent="assignSupervisorToStudent()"
          >
            <h1 className="text-center text-secondary">
              Assigner un superviseur à un étudiant
            </h1>
            <div className="form-group">
              <label htmlFor="AdminAssignSupervisor" className="text-secondary">
              </label>
              <select
                :defaultValue="defaultValue"
                @change="getSelectedSupervisor"
                className="form-control text-center"
                id="AdminAssignSupervisor"
                name="AdminAssignSupervisor"
                required
              >
                <option :value="this.defaultValue" selected
                  >Sélectionner un superviseur</option
                >
                <option
                  v-for="supervisor in supervisors"
                  :key="supervisor.id"
                  :value="JSON.stringify(supervisor)"
                >
                  {{ supervisor.firstName }} {{ supervisor.lastName }}</option
                >
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="AdminAssignStudent" className="text-secondary">
              </label>
              <select
                :defaultValue="defaultValue"
                @change="getSelectedStudentInternship"
                className="form-control text-center"
                id="AdminAssignStudent"
                name="AdminAssignStudent"
                required
              >
                <option :value="this.defaultValue">Sélectionner un étudiant</option>
                <option
                  v-for="internship in internships"
                  :key="internship.idInternship"
                  :value="JSON.stringify(internship)"
                >
                  {{internship.offer.companyName}} {{internship.offer.jobTitle}} -
                  {{internship.student.firstName}}
                  {{internship.student.lastName}}</option
                >
              </select>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-block btn-primary text-white">
                Assigner <i className="fas fa-link"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue";
import AdminService from "./AdminService";

export default {
  name: "AdminAssignSupervisorToStudent",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      internships: this.getInternships(),
      supervisors: this.getSupervisors(),
      admin: "",
      defaultValue: "default",
      selectedSupervisorJSON: this.defaultValue,
      selectedStudentIntershipJSON: this.defaultValue,
    };
  },
  computed:{
      interships(){
          return this.internships.filter(internship => this.filterInternships(internship))
      }
  },
  methods: {
    getInternships() {
      AdminService.getInternships().then((response) => {
        this.internships = response;
      });
    },
    getSupervisors() {
      AdminService.getSupervisors().then((response) => {
        this.supervisors = response;
      });
    },
    addSupervisorToInternship(internship) {
      AdminService.addSupervisorToIntership(internship).then((response) => {
        this.internships = this.internships.map((internship1) =>
          internship1.idInternship === internship.idInternship
            ? { ...internship1, supervisor: response.supervisor }
            : internship1
        );
      });
    },
    getSelectedSupervisor(e) {
        console.log(e.target.value)
      if (e.target.vue !== "default") {
        this.selectedSupervisorJSON = JSON.parse(e.target.value);
      }
    },
    getSelectedStudentInternship(e) {
        console.log(e.target.value)
      if (e.target.value !== "default") {
        this.selectedStudentIntershipJSON = JSON.parse(e.target.value);
      }
    },
    assignSupervisorToStudent() {
      if (
        this.selectedStudentIntershipJSON !== this.defaultValue &&
        this.selectedSupervisorJSON !== this.defaultValue
      ) {
        this.selectedStudentIntershipJSON.supervisor = this.selectedSupervisorJSON;
        AdminService.addSupervisorToIntership(this.selectedStudentIntershipJSON);
        alert("Superviser assigner avec succes")
      } else {
        alert("Veuillez selectionner un eleve et un superviseur");
      }
    },
    filterInternships(internship){
        return (internship.supervisor === null 
            && internship.status === "Completed")
    }
  },
};
</script>

<style></style>
