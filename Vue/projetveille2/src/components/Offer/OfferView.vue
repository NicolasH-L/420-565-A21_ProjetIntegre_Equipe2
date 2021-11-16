<template>
  <div>
    <div>
      <div className="justify-content-start d-flex mx-5">
        <button className="btn btn-light" @click="goBack()">
          <i className="fas fa-angle-double-left"></i> Retour
        </button>
      </div>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h2
              className="modal-title text-secondary w-100 ml-4"
              id="offreDeStage"
            >
              Offre de stage
            </h2>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form role="form" className="container-fluid">
              <div className="form-group">
                <label htmlFor="companyName" className="text-secondary"
                  ><i className="fas fa-building"></i> Nom de l'entreprise:
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="companyName"
                  name="companyName"
                  :value="offer.companyName"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="jobTitle" className="text-secondary"
                  ><i className="fas fa-briefcase"></i> Poste:
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="jobTitle"
                  name="jobTitle"
                  :value="offer.jobTitle"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="monitorEmail" className="text-secondary"
                  ><i className="fas fa-at"></i> Courriel du représentant de
                  l'entreprise:
                </label>
                <input
                  type="email"
                  className="form-control text-center"
                  id="monitorEmail"
                  name="monitorEmail"
                  :value="offer.monitorEmail"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="text-secondary"
                  ><i className="fas fa-map-marker-alt"></i> Adresse:
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="address"
                  name="address"
                  :value="offer.address"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="jobSchedules" className="text-secondary"
                  ><i className="fas fa-calendar-alt"></i> Horaire de travail:
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="jobSchedules"
                  name="jobSchedules"
                  :value="offer.jobSchedules"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="workingHours" className="text-secondary"
                  ><i className="fas fa-business-time"></i> Heures de travail:
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="workingHours"
                  name="workingHours"
                  :value="offer.workingHours + 'h'"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary" className="text-secondary"
                  ><i className="fas fa-money-bill-wave"></i> Salaire:
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="salary"
                  name="salary"
                  :value="offer.salary + '$'"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="skills" className="text-secondary"
                  ><i className="fas fa-book"></i> Compétences:
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="skills"
                  name="skills"
                  rows="3"
                  :value="offer.skills"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="text-secondary"
                  ><i className="fas fa-clipboard"></i> Description:
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  :value="offer.description"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="displayDate" className="text-secondary"
                  ><i className="fas fa-calendar"></i> Date d'affichage:</label
                >
                <input
                  type="text"
                  id="displayDate"
                  name="displayDate"
                  className="form-control text-center"
                  :value="offer.displayDate"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="deadlineDate" className="text-secondary"
                  ><i className="fas fa-calendar"></i> Date limite:</label
                >
                <input
                  type="text"
                  id="deadlineDate"
                  name="deadlineDate"
                  className="form-control text-center"
                  :value="offer.deadlineDate"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="startInternshipDate" className="text-secondary"
                  ><i className="fas fa-calendar"></i> Début stage</label
                >
                <input
                  type="text"
                  id="startInternshipDate"
                  name="startInternshipDate"
                  className="form-control text-center"
                  :value="offer.startInternshipDate"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="endInternshipDate" className="text-secondary"
                  ><i className="fas fa-calendar"></i> Fin stage</label
                >
                <input
                  type="text"
                  id="endInternshipDate"
                  name="endInternshipDate"
                  className="form-control text-center"
                  :value="offer.endInternshipDate"
                  readOnly
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router";

export default {
  name: "OfferView",
  components: {},
  data() {
    return {
      offer: JSON.parse(this.$route.params.offer),
      student: JSON.parse(this.$route.params.student),
    };
  },
  methods: {
    goBack() {
      var student = JSON.parse(this.$route.params.student);
      router.push({ name: "StudentInternshipListOffers", params: { student: JSON.stringify({...student}) } });
    },
  },
};
</script>

<style></style>
