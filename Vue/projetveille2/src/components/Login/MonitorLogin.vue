<template>
  <div>
    <form className="container-fluid" @submit.prevent="login()">
      <div className="form-group">
        <label htmlFor="emailMonitor" className="text-secondary"
          ><i className="fas fa-at"></i> Courriel:
        </label>
        <input
          type="email"
          className="form-control text-center"
          id="emailMonitor"
          name="email"
          placeholder="Entrez votre adresse courriel"
          v-model="monitor.email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordMonitor" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="passwordMonitor"
          name="password"
          placeholder="Entrez votre mot de passe"
          v-model="monitor.password"
        />
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-block btn-primary grad text-white">
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
  name: "MonitorLogin",
  data() {
    return {
      monitor: {
        email: "",
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
        _.isEmpty(this.monitor.password) ||
        _.isEmpty(this.monitor.email)
      ) {
        alert("Matricule ou mot de passe incorrect")
        this.error.error = "Matricule ou mot de passe incorrect";
        return;
      } else {
        LoginService.loginMonitor(
          this.monitor.email,
          this.monitor.password
        ).then((response) => { 
          response.email != null ? router.push("/Monitor", response): alert("Erreur de matricule ou mot de passe")
        });
      }
    },
  },
};
</script>

<style></style>
