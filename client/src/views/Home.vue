<template>
  <div class="home">
    <div class="tophome">
      <img src="../assets/logo.png" width="250" height="250">
        <h1>Bienvenue sur le réseau social de Groupomania !</h1>
    </div>
    <div v-if="this.$session.exists()">
      <div class="btn">
        <router-link to="/articles">
          <button>Voir tout les articles</button>
        </router-link>
        <router-link to="/article/new">
          <button>Créer un article</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
a{
  text-decoration: none;
}

.tophome{
  text-align: center;
  font-size: 30px;
  color: #2c3e50;
  font-weight: bold;
  margin-top: 40px;
}

h1{
  margin: 0;
}

.btn{
  margin-top: 120px;
}

button{
  display: block;
  margin: auto;
  height: 70px;
  width: 390px;
  border: solid black 1px;
  border-radius: 40px;
  margin-top: 40px;
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

button:hover{
  opacity: 0.7;
}
</style>

<script>
export default {

}
</script>
