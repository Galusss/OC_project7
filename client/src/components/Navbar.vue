<template>
  <div>
    <div class="ui inverted segment">
      <div class="ui inverted secondary pointing menu">
        <a class="item" @click="goToHome()">
          Accueil
        </a>
        <a class="item" v-show="this.$session.exists()" @click="goToArticles">
          Articles
        </a>
        <a class="item" v-show="this.$session.exists()" @click="goToAccount">
          Mon compte
        </a>
        <a class="item"  @click="logout()" v-show="this.$session.exists()">
          Déconnexion
        </a>
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
    goToHome: function () {
      window.open("http://localhost:8080/", "_parent");
    },
    goToArticles: function() {
      window.open("http://localhost:8080/articles", "_parent");      
    },
    goToAccount: function() {
      window.open("http://localhost:8080/account", "_parent"); 
    }
  }
}
</script>

<style>
.ui.segment{
  border-radius: 0px;
}

a:active{
  color: red;
}
</style>
