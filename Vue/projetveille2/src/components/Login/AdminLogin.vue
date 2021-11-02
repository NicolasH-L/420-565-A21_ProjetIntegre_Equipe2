<template>
  <div>
    <form className="container-fluid" @submit.prevent="login()">
      <div className="form-group">
        <label htmlFor="usernameAdmin" className="text-secondary"
          ><i className="fas fa-user"></i> Nom d'utilisateur:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="usernameAdmin"
          name="username"
          placeholder="Entrez votre nom d'utilisateur"
          v-model="admin.username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordAdmin" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="passwordAdmin"
          name="password"
          placeholder="Entrez votre mot de passe"
          v-model="admin.password"
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
  name: "AdminLogin",
  data() {
    return {
      admin: {
        username: "",
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
        _.isEmpty(this.admin.password) ||
        _.isEmpty(this.admin.username)
      ) {
        alert("Matricule ou mot de passe incorrect")
        this.error.error = "Matricule ou mot de passe incorrect";
        return;
      } else {
        LoginService.loginAdmin(
          this.admin.username,
          this.admin.password
        ).then((response) => { 
          response.username != null ? router.push("/Admin", response): alert("Erreur de matricule ou mot de passe")
        });
      }
    },
  },
};
</script>

<style></style>
