<template>
  <div className="grad">
    <StudentNavbar></StudentNavbar>
    <h2 className="text-center">Offres de stage</h2>
    <div className="p-5 table-responsive">
      <table className="table table-hover bg-light shadow-lg">
        <thead>
          <tr>
            <th scope="col" className="text-center">Entreprise</th>
            <th scope="col" className="text-center">Poste</th>
            <th scope="col" className="text-center">Salaire</th>
            <th scope="col" className="text-center">Date d'affichage</th>
            <th scope="col" className="text-center">Date limite d'affichage</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="offer in offers" :key="offer.idOffer">
            <th className="text-center">{{ offer.companyName }}</th>
            <td className="text-center">{{ offer.jobTitle }}</td>
            <td className="text-center">{{ offer.salary }}$</td>
            <td className="text-center">{{ offer.displayDate }}</td>
            <td className="text-center">{{ offer.deadlineDate }}</td>
            <button className="btn btn-primary" @click="goToOfferView(offer)">
              Consulter
            </button>
            <div v-if="test(offer.idOffer, this.studentId)"></div>
            <div v-if="this.show === false && this.applyOfferButton.message === empty">
              <select
                defaultValue="DEFAULT"
                className="mx-5"
                @click="setOffer(offer)"
                v-on:input="checkDocumentChosen"
              >
                <option value="DEFAULT" selected disabled
                  >Choisissez un document</option
                >
                <option
                  v-for="document in documents"
                  :value="document.documentName"
                  :key="document.idDocument"
                  >{{ document.documentName }}</option
                >
              </select>
              <div>
                <button
                  className="btn btn-success mx-3"
                  id="applicationButton"
                  name="button"
                  @click="applyToOffer()"
                  :disabled="applyOfferButton.buttonDisable"
                >
                  Postuler <i className="fas fa-external-link-alt fa-sm"></i>
                </button>
              </div>
            </div>
            <div v-if="this.applyOfferButton.message !== empty">
              <strong className="text-success ml-5"
                >Votre demande a été envoyée
                <i className="fas fa-exclamation-circle text-success fa-sm"></i
              ></strong>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StudentService from "./StudentService";
import router from "../../router";
import OfferService from "../Offer/OfferService";
import StudentNavbar from "./StudentNavbar.vue";

export default {
  name: "StudentInternshipListOffers",
  components: {
    StudentNavbar,
  },
  data() {
    return {
      studentId: this.getStudentIdFromRoute(),
      empty: "",
      offers: this.getAllValidOffers(),
      documents: this.getDocuments(),
      applyOfferButton: {
        buttonDisable: true,
        message: "",
      },
      studentOfferApplication: {
        offer: "",
        document: "",
        student: this.getStudentFromRoute(),
      },
      displayMessageBoolean: "",
      appliedMessage: (
        <strong className="text-success ml-5">
          Votre demande a été envoyée{" "}
          <i className="fas fa-exclamation-circle text-success fa-sm"></i>
        </strong>
      ),
      show:"",
    };
  },
  methods: {
    getDocuments() {
      var studentId;
      if (this.$route.params.student !== undefined) {
        var student = JSON.parse(this.$route.params.student);
        studentId = student.id;
      } else {
        studentId = this.$route.params.id;
      }
      StudentService.getDocuments(studentId).then((response) => {
        this.documents = response;
      });
    },
    getAllValidOffers() {
      StudentService.getValidOffers().then((response) => {
        this.offers = response;
      });
    },
    getStudentFromRoute() {
      if (this.$route.params.student !== undefined) {
        var student = JSON.parse(this.$route.params.student);
        return student;
      } else {
        return this.$route.params;
      }
    },
    getStudentIdFromRoute() {
      if (this.$route.params.student !== undefined) {
        var student = JSON.parse(this.$route.params.student);
        return student.id;
      } else {
        return this.$route.params.id;
      }
    },
    goToOfferView(offer) {
      var student = this.$route.params;
      router.push({
        name: "OfferView",
        params: {
          offer: JSON.stringify({ ...offer }),
          student: JSON.stringify({ ...student }),
        },
      });
    },
    checkDocumentChosen(e) {
      if (e.target.value != "DEFAULT") {
        this.applyOfferButton.buttonDisable = false;
        for (let index = 0; index < this.documents.length; index++) {
          const element = this.documents[index];
          if (element.documentName === e.target.value) {
            this.studentOfferApplication.document = element;
            break;
          }
        }
      }
    },
    applyToOffer() {
      OfferService.addStudentOffer(this.studentOfferApplication);
      var studentId = this.studentOfferApplication.student.id;
      var offerId = this.studentOfferApplication.offer.idOffer;
      OfferService.verifyAppliedToOfferStatus(offerId, studentId).then((data) =>
        data !== undefined
          ? (this.applyOfferButton.message = this.appliedMessage)
          : ""
      );
      this.show = true
    },
    setOffer(offer) {
      this.studentOfferApplication.offer = offer;
    },
    test(offerId, studentId) {
      OfferService.verifyAppliedToOfferStatusOnLoad(offerId, studentId).then((data) =>{
        console.log(data)
        this.show = data
      })
    },
  },
};
</script>

<style></style>
