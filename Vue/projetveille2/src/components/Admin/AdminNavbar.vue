<template>
  <div>
    <nav className="navbar navbar-expand-md bg-light shadow mb-5">
      <button className="navbar-brand text-secondary"
        ><h3>Stage Équipe 2</h3></button
      >
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
            <button className="nav-link btn btn-light" 
            @click="goToAdminOffer"
              >Déposer offre</button
            >
          </li>
          <li className="nav-item mx-2">
            <button
              className="nav-link btn btn-light"
              >Offres</button
            >
          </li>
          <li className="nav-item mx-2">
            <button
              className="nav-link btn btn-light"
              >Liste des étudiants</button
            >
          </li>
          <li className="nav-item mx-2">
            <button
              className="nav-link btn btn-light"
              >Offres acceptées</button
            >
          </li>
          <li className="nav-item mx-2">
            <button
              className="nav-link btn btn-light"
              >Ententes de stage</button
            >
          </li>
          <li className="nav-item mx-2">
            <button
              className="nav-link btn btn-light"
              >Assigner un superviseur</button
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import router from "../../router";

export default {
  name: "AdminNavbar",
  methods:{
      goToAdminOffer(){
        router.push({name: "AdminOffer", params:this.$route.params})
      }
    },
};
</script>

<style></style>
