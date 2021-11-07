<template>
  <StudentNavbar></StudentNavbar>
  
  <form @submit.prevent="getStudent()">
    <button >Test</button>
  </form>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import router from "../../router";
import StudentNavbar from "./StudentNavbar.vue";

export default {
  name: "Supervisor",
  components: {
    StudentNavbar,
  },
  data(){
    return{
      student: this.$route.params
    }
  },
  methods:{
  
  }
};
</script>

<style></style>
