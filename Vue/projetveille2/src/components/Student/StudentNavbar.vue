<template>
  <div>
    <nav className="navbar navbar-expand-md bg-light shadow mb-5">
      <a className="navbar-brand text-secondary"><h3>Stage Équipe 2</h3></a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="fas fa-bars btn btn-outline-light"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item mx-2">
            <button className="nav-link btn btn-light" type="button">
              Mon profil
            </button>
          </li>
          <li className="nav-item mx-2">
            <button className="nav-link btn btn-light" @click="goToStudentUploadCV()" type="button">
              Déposer CV
            </button>
          </li>
          <li className="nav-item mx-2">
            <button className="nav-link btn btn-light" type="button">
              Offres de stages
            </button>
          </li>
          <li className="nav-item mx-2">
            <button className="nav-link btn btn-light" @click="goToStudentDocuments()" type="button">
              Mes Documents
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import router from "../../router";

export default {
  name: "StudentNavbar",
  data(){
    return {
      student:Object
    }
  },
  methods: {
    goToStudentUploadCV() {
      router.push({ name: "StudentUploadCV", params: this.$route.params });
    },
    goToStudentDocuments() {
      router.push({ name: "StudentDocuments", params: this.$route.params });
    },
  },
};
</script>

<style></style>
