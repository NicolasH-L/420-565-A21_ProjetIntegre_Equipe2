<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <br>
  <router-link to="/login">Vers login</router-link>
  <br>
  <router-link to="/">Retour</router-link>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
