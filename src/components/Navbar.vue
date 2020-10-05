<template>
  <div class="home">
    <div class="topnav">
      <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png" height="150" width="150">
      <router-link to="/">Accueil</router-link>
      <router-link to="/signup">Inscription</router-link>
      <router-link to="/login">Connexion</router-link>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  }
}
</script>

<style>
.topnav {
  background-color: #f0f0f0;
  overflow: hidden;
}

.topnav a {
  float: left;
  font-weight: bold;
  color: #2c3e50;
  font-size: 22px;
  text-decoration: none;
  vertical-align: middle;
  margin: 0px 10px;
  padding: 62px 20px;
}

.topnav a:hover {
  opacity: 0.9;
}

.topnav a.router-link-exact-active{
  color: #42b983;
}

.topnav img{
  margin: 0px 10px;
  float: left;
}
</style>
