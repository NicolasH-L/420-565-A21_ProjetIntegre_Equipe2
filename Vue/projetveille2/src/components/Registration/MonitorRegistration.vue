<template>
  <div>
    <form className="container-fluid" @submit.prevent="login()">
      <div className="form-group">
        <label htmlFor="lastNameMonitor" className="text-secondary"
          ><i className="fas fa-user"></i> Nom:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="lastNameMonitor"
          name="lastName"
          placeholder="Entrez votre nom"
          v-model="monitor.lastName"
          v-on:input="validateInput"
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstNameMonitor" className="text-secondary"
          ><i className="fas fa-user"></i> Prénom:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="firstNameMonitor"
          name="firstName"
          placeholder="Entrez votre prénom"
          v-model="monitor.firstName"
          v-on:input="validateInput"
          required
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
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="companyName" className="text-secondary"
          ><i className="fas fa-building"></i> Nom de l'entreprise:
        </label>
        <input
          type="text"
          className="form-control text-center"
          id="companyName"
          name="companyName"
          placeholder="Entrez le nom de l'entreprise"
          v-model="monitor.companyName"
          v-on:input="validateInput"
          required
        />
      </div>
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
          v-on:input="validateInput"
          required
        />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          type="submit"
          className="btn btn-block btn-primary grad text-white"
        >
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
  name: "MonitorRegistration",
  data() {
    return {
      monitor: {
        lastName: "",
        firstName: "",
        password: "",
        companyName: "",
        email: "",
      },
      error: {
        lastName: "",
        firstName: "",
        password: "",
        companyName: "",
        email: "",
      },
    };
  },
  methods: {
    validateInput(e) {
      let pattern;
      let inputError;
      let patternEmail = RegexPattern.getPatternEmail();
      let patternName = RegexPattern.getPatternName();
      let patternCompany = RegexPattern.getPatternCompany();
      let patternPassword = RegexPattern.getPatternPassword();

      if (e.target.name === "email") pattern = new RegExp(patternEmail);
      else if (e.target.name === "lastName" || e.target.name === "firstName")
        pattern = new RegExp(patternName);
      else if (e.target.name === "companyName")
        pattern = new RegExp(patternCompany);
      else if (e.target.name === "password")
        pattern = new RegExp(patternPassword);

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
        this.setValueMonitor(e.target.name, e.target.value);
      }
      this.setErrorValue(e.target.name, inputError);
    },

    setErrorValue(target, value) {
      if ("matricule" == target) {
        this.error.matricule = value;
      }
      if ("lastName" == target) {
        this.error.lastName = value;
      }
      if ("firstName" == target) {
        this.error.firstName = value;
      }
      if ("password" == target) {
        this.error.password = value;
      }
      if ("email" == target) {
        this.monitor.email;
      }
      if ("companyName" == target) {
        this.monitor.companyName;
      }
    },

    setValueMonitor(target, value) {
      if ("matricule" == target) {
        this.monitor.matricule = value;
      }
      if ("lastName" == target) {
        this.monitor.lastName = value;
      }
      if ("firstName" == target) {
        this.monitor.firstName = value;
      }
      if ("password" == target) {
        this.monitor.password = value;
      }
      if ("email" == target) {
        this.monitor.email;
      }
      if ("companyName" == target) {
        this.monitor.companyName;
      }
    },

    login() {
      if (
        !_.isEmpty(this.error.lastName) ||
        !_.isEmpty(this.error.firstName) ||
        !_.isEmpty(this.error.password) ||
        !_.isEmpty(this.error.companyName) ||
        !_.isEmpty(this.error.email) ||
        _.isEmpty(this.monitor.firstName) ||
        _.isEmpty(this.monitor.lastName) ||
        _.isEmpty(this.monitor.password) ||
        _.isEmpty(this.monitor.companyName) ||
        _.isEmpty(this.monitor.email)
      ) {
        alert("Veuillez remplir tous les champs correctement!");
        return;
      } else {
        RegistrationService.addMonitor(this.monitor).then((response) => {
          response.email != undefined
            ? router.push("/login")
            : alert("Erreur! Email existant").catch(() =>
                alert("Erreur! Email existant")
              );
        });
      }
    },
  },
};
</script>

<style></style>
