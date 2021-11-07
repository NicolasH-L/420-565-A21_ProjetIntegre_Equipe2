<template>
  <div>
    <form @submit.prevent="login()" class="container-fluid">
      <div class="form-group">
        <label for="matriculeStudent" class="text-secondary">
          <i class="fas fa-id-badge"></i> Matricule:
        </label>
        <input
          type="text"
          class="form-control text-center"
          id="matriculeStudent"
          name="matricule"
          placeholder="Entrez votre matricule"
          v-model="student.matricule"
          required
        />
      </div>
      <div class="form-group">
        <label for="passwordStudent" class="text-secondary">
          <i class="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          class="form-control text-center"
          id="passwordStudent"
          name="password"
          placeholder="Entrez votre mot de passe"
          v-model="student.password"
          required
        />
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-block btn-primary grad text-white">Connexion</button>
      </div>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import router from "../../router";
import LoginService from "./LoginService";
import _ from "lodash";

export default {
  name: "StudentLogin",
  data() {
    return {
      student: {
        matricule: "1234567",
        password: "MotDePasse01*",
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
        _.isEmpty(this.student.password) ||
        _.isEmpty(this.student.matricule)
      ) {
        alert("Matricule ou mot de passe incorrect")
        this.error.error = "Matricule ou mot de passe incorrect";
        return;
      } else {
        LoginService.loginStudent(
          this.student.matricule,
          this.student.password
        ).then((response) => { 
          response.matricule != null ? this.$router.push({name: "Student", params:response}): alert("Erreur de matricule ou mot de passe")
        });
      }
    },
  },
};
</script>

<style>
</style>
