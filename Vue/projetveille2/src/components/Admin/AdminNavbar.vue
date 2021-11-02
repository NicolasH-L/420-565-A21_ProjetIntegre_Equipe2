<template>
  <div>
    <nav className="navbar navbar-expand-md bg-light shadow mb-5">
      <Link className="navbar-brand text-secondary" to="/Login"
        ><h3>Stage Équipe 2</h3></Link
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
            <router-link className="nav-link btn btn-light" to="/AdminOffer"
              >Déposer offre</router-link
            >
          </li>
          <li className="nav-item mx-2">
            <router-link
              className="nav-link btn btn-light"
              to="/AdminOffersList"
              >Offres</router-link
            >
          </li>
          <li className="nav-item mx-2">
            <router-link
              className="nav-link btn btn-light"
              to="/AdminStudentList"
              >Liste des étudiants</router-link
            >
          </li>
          <li className="nav-item mx-2">
            <router-link
              className="nav-link btn btn-light"
              to="/AdminStudentAcceptedOffers"
              >Offres acceptées</router-link
            >
          </li>
          <li className="nav-item mx-2">
            <router-link
              className="nav-link btn btn-light"
              to="/AdminInternshipList"
              >Ententes de stage</router-link
            >
          </li>
          <li className="nav-item mx-2">
            <router-link
              className="nav-link btn btn-light"
              to="/AdminAssignSupervisorToStudent"
              >Assigner un superviseur</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AdminNavbar",
};
</script>

<style></style>
