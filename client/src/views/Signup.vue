<template>
  <div class="signup">
    <div class="ui form">
      <div class="centerDisplay">
        <img src="../assets/logo.png" width="190" height="190">
      </div>
      <div class="required field">
        <label>Prénom</label>
        <input type="text" placeholder="Prénom..." v-model="prenom">
      </div>
      <div class="required field">
        <label>Nom</label>
        <input type="text" placeholder="Nom..." v-model="nom">
      </div>
      <div class="required field">
        <label>Email</label>
        <input type="text" placeholder="Email..." v-model="email">
      </div>
      <div class="required field">
        <label>Mot de passe</label>
        <input type="text" placeholder="Mot de passe..." v-model="password">
      </div>
      <div class="centerDisplay">
        <button class="ui primary basic button" @click="signup">Je m'inscris</button>
      </div>
    </div>
  </div>
</template>


<style>
.ui.form{
  width: 50%;
  margin: auto;
  margin-top: 30px;
}

.centerDisplay{
display: flex;
justify-content: center;
}
</style>


<script>
export default {
  data: function () {
    return {
      prenom: "",
      nom: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signup() {
      const postData = { prenom: this.prenom, nom: this.nom, email: this.email, password: this.password };
      this.$http
      .post('http://localhost:5000/users/signup', postData)
      .then(res => {
        console.log(res.body)
        window.open("http://localhost:8080/", "_parent");
      });
    }
  }
}
</script>
