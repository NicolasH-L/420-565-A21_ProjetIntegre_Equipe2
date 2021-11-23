<template>
  <div className="grad">
    <MonitorNavbar></MonitorNavbar>
    <h2 className="text-center">Mes Offres</h2>
    <div className="p-5">
      <table className="table table-hover bg-light shadow-lg">
        <thead>
          <tr>
            <th scope="col">Entreprise</th>
            <th scope="col">Poste</th>
            <th scope="col">Salaire</th>
            <th scope="col">Date d'affichage</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="offer in offers" :key="offer.idOffer">
            <th>{{ offer.companyName }}</th>
            <td>{{ offer.jobTitle }}</td>
            <td>{{ offer.salary }}$</td>
            <td>{{ offer.displayDate }}</td>
            <td className="w-25">
              <button className="btn btn-primary mx-2" @click="goToMonitorStudentList(offer.idOffer)">Voir étudiants</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import MonitorNavbar from "./MonitorNavbar.vue";
import MonitorService from "./MonitorService";
import router from "../../router";

export default {
  name: "MonitorOfferList",
  components: {
    MonitorNavbar,
  },
  data() {
    return {
      offers: this.getOffersByMonitor(),
      
    };
  },
  methods: {
    getOffersByMonitor() {
      var monitorId = this.getMonitorId()
      MonitorService.getOffersByMonitor(monitorId).then((response) => {
        this.offers = response;
      });
    },
    getMonitorId() {
      if (this.$route.params.monitor !== undefined) {
        var monitor = JSON.parse(this.$route.params.monitor);
        return monitor.id;
      } else {
        return this.$route.params.id;
      }
    },
    getMonitor() {
      if (this.$route.params.monitor !== undefined) {
        var monitor = JSON.parse(this.$route.params.monitor);
        return monitor;
      } else {
        return this.$route.params;
      }
    },
    goToMonitorStudentList(idOffer){
        var monitor = this.getMonitor()
        router.push({name:"MonitorStudentList", params: {idOffer: idOffer, monitor: JSON.stringify({ ...monitor }) } })
    },
  },
};
</script>

<style></style>
