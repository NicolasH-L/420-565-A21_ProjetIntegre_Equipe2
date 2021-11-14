<template>
  <div className="grad">
    <AdminNavbar></AdminNavbar>
    <h2 className="text-center">Offres de stage</h2>
    <div className="p-5">
      <table className="table table-hover bg-light shadow-lg">
        <thead>
          <tr>
            <th scope="col">Entreprise</th>
            <th scope="col">Poste</th>
            <th scope="col">Salaire</th>
            <th scope="col">Date d'affichage</th>
            <th scope="col">Validité</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="offer in offers"  :key="offer.idOffer" :class="`${offer.valid ? 'table-success' : offer.state == null ? 'table-warning' : 'table-danger'}`">
            <th>{{ offer.companyName }}</th>
            <td>{{ offer.jobTitle }}</td>
            <td>{{ offer.salary }}$</td>
            <td>{{ offer.displayDate }}</td>
            <td>{{ offer.state == null ? "En attente" : offer.state }}</td>
            <td className="w-25">
              <button className="btn btn-primary mx-2" @click="viewOffer(offer)">Consulter</button>
              <button className="btn btn-success mx-2" @click="acceptOffer(offer)">Publier</button>
              <button className="btn btn-danger mx-2" @click="declineOffer(offer)">Refuser</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue";
import AdminService from "./AdminService";

export default {
  name: "AdminInternshipOfferList",
  components: {
    AdminNavbar,
  },
  data() {
    return {
      offers: this.getOffers(),
    };
  },
  methods: {
    getOffers() {
      AdminService.getAllOffers().then((response) => {
        this.offers = response;
      });
    },
    viewOffer(offer) {
      history.push("/OfferView", offer)
    },
    acceptOffer(offer){
        AdminService.acceptOffer(offer).then((response) =>{
            this.offers = this.offers.map(
                (offer1) => offer1.idOffer === offer.idOffer ? {...offer1, valid: response.valid, state: response.state} : offer1
            )
        })
    },
    declineOffer(offer){
        AdminService.declineOffer(offer).then((response) =>{
            this.offers = this.offers.map(
                (offer1) => offer1.idOffer === offer.idOffer ? {...offer1, valid: response.valid, state: response.state} : offer1
            )
        })
    }
  },
};
</script>

<style></style>
