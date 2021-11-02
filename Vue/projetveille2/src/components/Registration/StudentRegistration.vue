<template>
  <div>
    <form @submit.prevent="login()" className="container-fluid">
      <div className="form-group">
        <label htmlFor="lastNameStudent" className="text-secondary"
          ><i className="fas fa-user"></i> Nom:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="lastNameStudent"
          name="lastName"
          placeholder="Entrez votre nom"
          v-model="student.lastName"
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstNameStudent" className="text-secondary"
          ><i className="fas fa-user"></i> Prénom:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="firstNameStudent"
          name="firstName"
          placeholder="Entrez votre prénom"
          v-model="student.firstName"
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="matriculeStudent" className="text-secondary"
          ><i className="fas fa-id-badge"></i> Matricule:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="matriculeStudent"
          name="matricule"
          placeholder="Entrez votre matricule"
          v-model="student.matricule"
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordStudent" className="text-secondary"
          ><i className="fas fa-lock"></i> Mot de passe:
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="passwordStudent"
          name="password"
          placeholder="Entrez votre mot de passe"
          v-model="student.password"
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button type="submit" className="btn btn-block btn-primary grad text-white">
          Soumettre
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "../../router";
import RegistrationService from "./RegistrationService";
import _ from "lodash";
import { RegexPattern } from "../RegexPattern";

export default {
  name: "StudentRegistration",
  data() {
    return {
      student: {
        matricule: "",
        password: "",
        lastName: "",
        firstName: "",
      },
      error: {
        matricule: "",
        password: "",
        lastName: "",
        firstName: "",
      },
    };
  },
  methods: {
    validateInput(e) {
      let pattern;
      let inputError;
      let patternName = RegexPattern.getPatternName();
      let patternMatricule = RegexPattern.getPatternMatricule();
      let patternPassword = RegexPattern.getPatternPassword();

      if (e.target.name === "lastName" || e.target.name === "firstName")
        pattern = new RegExp(patternName);
      else if (e.target.name === "password")
        pattern = new RegExp(patternPassword);
      else if (e.target.name === "matricule")
        pattern = new RegExp(patternMatricule);

      if (pattern === undefined) return;

      if (!pattern.test(e.target.value) || e.target.value === "") {
        e.target.style.borderColor = "red";
        e.target.style.boxShadow = "0 1px 1px red inset, 0 0 8px red";
        inputError = (
          <strong className="text-danger">
            {" "}
            Erreur{" "}
            <i className="fas fa-exclamation-circle text-danger fa-sm"></i>
          </strong>
        );
      } else {
        e.target.style.borderColor = "#ced4da";
        e.target.style.boxShadow = "none";
        inputError = "";
        this.setValueStudent(e.target.name,e.target.value)
      }
      this.setErrorValue(e.target.name,inputError)
    },

    setErrorValue(target,value){
      if ("matricule" == target){
        this.error.matricule = value
      }
      if ("lastName" == target){
        this.error.lastName = value
      }
      if ("firstName" == target){
        this.error.firstName = value
      }
      if ("password" == target){
        this.error.password = value
      }
    },

    setValueStudent(target,value){
      if ("matricule" == target){
        this.student.matricule = value
      }
      if ("lastName" == target){
        this.student.lastName = value
      }
      if ("firstName" == target){
        this.student.firstName = value
      }
      if ("password" == target){
        this.student.password = value
      }
    },

    login() {
      if (
        !_.isEmpty(this.error.lastName) ||
        !_.isEmpty(this.error.firstName) ||
        !_.isEmpty(this.error.password) ||
        !_.isEmpty(this.error.matricule) ||
        _.isEmpty(this.student.lastName) ||
        _.isEmpty(this.student.firstName) ||
        _.isEmpty(this.student.password) ||
        _.isEmpty(this.student.matricule)
      ) {
        alert("Veuillez remplir tous les champs correctement!")
        return
      } else {
        RegistrationService.addStudent(this.student).then((response) => {
          response.matricule != null
            ? router.push("/login")
            : alert("Erreur matricule existant").catch(() =>
                alert("Erreur matricule existant")
              );
        });
      }
    },
  },
};
</script>

<style></style>
