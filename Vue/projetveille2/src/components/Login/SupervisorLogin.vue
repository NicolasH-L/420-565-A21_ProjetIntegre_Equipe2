<template>
  <div>
    <form className="container-fluid" @submit.prevent="login()">
      <div className="form-group">
        <label htmlFor="matriculeSupervisor" className="text-secondary"
          ><i className="fas fa-id-badge"></i> Matricule:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="matriculeSupervisor"
          name="matricule"
          placeholder="Entrez votre matricule"
          v-model="supervisor.matricule"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordSupervisor" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="passwordSupervisor"
          name="password"
          placeholder="Entrez votre mot de passe"
          v-model="supervisor.password"
        />
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-block btn-primary grad text-white"
        >
          Connexion
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../../router";
import LoginService from "./LoginService";
import _ from "lodash";

export default {
  name: "SupervisorLogin",
  data() {
    return {
      supervisor: {
        matricule: "",
        password: "",
      },
      error: {
        error: "",
      },
    };
  },
  methods: {
    login() {
      if (
        !_.isEmpty(this.error.credentials) ||
        _.isEmpty(this.supervisor.password) ||
        _.isEmpty(this.supervisor.matricule)
      ) {
        alert("Matricule ou mot de passe incorrect");
        this.error.error = "Matricule ou mot de passe incorrect";
        return;
      } else {
        LoginService.loginSupervisor(
          this.supervisor.matricule,
          this.supervisor.password
        ).then((response) => {
          response.matricule != null
            ? router.push("/Supervisor", response)
            : alert("Erreur de matricule ou mot de passe");
        });
      }
    },
  },
};
</script>

<style></style>
