<template>
  <div class="home">
    <div class="topnav">
      <img alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png" height="150" width="150" @click="goHome">
<div>
  
</div>
      <router-link to="/">Accueil</router-link>

      <router-link to="/signup">
        <div v-show="!this.$session.exists()">
          Inscription
        </div>
      </router-link>

      <router-link to="/login">
        <div v-show="!this.$session.exists()">
          Connexion
        </div>
      </router-link>

      <router-link to="/articles">
        <div v-show="this.$session.exists()">
          Voir les articles
        </div>
      </router-link>

      <router-link to="/article/new">
        <div v-show="this.$session.exists()">
          Créer un article
        </div>
      </router-link>

      <div class="floatnav">
        <router-link to="/account">
          <div v-show="this.$session.exists()" class="account">
            Mon compte
          </div>
        </router-link>

        <router-link to="/">
          <div v-show="this.$session.exists()" class="logout" @click="logout">
            Déconnexion
          </div>
        </router-link>
      </div>
    </div>         
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      sessionStorage.clear();
      window.open("http://localhost:8080/", "_parent");
    },
    goHome: function () {
      window.open("http://localhost:8080/", "_parent");
    }
  }
}
</script>

<style>
.topnav {
  background-color: #f0f0f0;
  overflow: hidden;
  display: flex; 
}

.topnav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 22px;
  text-decoration: none;
  vertical-align: middle;
  padding: 60px 5px;
}

.topnav a:hover {
  opacity: 0.9;
}

.topnav a.router-link-exact-active{
  color: #42b983;
}

.topnav img{
  margin: 0px 10px;
}

.floatnav{
  display: flex;
  flex-direction: row;
  margin: auto;
  margin-right: 10px;
}

.logout{
  color: #FF0000;
}
</style>
