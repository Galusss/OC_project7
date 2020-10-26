<template>
  <div class="signup">
    <div class="ui form">
      <div class="centerDisplay">
        <img class="signupLogo" src="../assets/logo.png" width="200" height="200">
      </div>
      <div class="error"></div>
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
      <div class="centerDisplay btnSignup">
        <button class="ui blue button" @click="signup">Je m'inscris</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.signupLogo{
  margin: 40px 0px;
}

.error{
  color: red;
  margin: 10px 0px;
  font-size: 18px;
  font-weight: 400;
}

.ui.form{
  width: 50%;
  margin: auto;
  margin-top: 30px;
}

.ui.form input[type="text"] {
  border: solid black 1px;
}

.centerDisplay{
  display: flex;
  justify-content: center;
}

.ui.blue.button {
  margin: 50px;
  font-weight: bold;
  font-size: 18px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  min-width: 300px;
}

.ui.blue.button:hover{
    opacity: 0.6;
}

@media screen and (max-width: 900px) {
  img{
    width: 120px;
    height: 120px;
  }
}

@media screen and (max-width: 550px) {
  img{
    width: 80px;
    height: 80px;
  }

  .ui.blue.button {
    font-size: 12px;
    min-width: 150px;
  }
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
      if (this.prenom.length > 0 && this.nom.length > 0 && this.email.length > 0 && this.password.length > 0) {
        this.$http
        .post('http://localhost:5000/users/signup', postData)
        .then(res => {
          if (res.body.error) {
            document.querySelector(".btnSignup").addEventListener("click", function(event) {
              event.preventDefault()
            }) 
            let error = document.querySelector(".error")
            error.innerHTML = "Erreur: Cette adresse email est déjà utilisé." 
          } else if (!res.body.error) {
            window.open("http://localhost:8080/", "_parent");
          } 
        });
      } else {
          let error = document.querySelector(".error")
          error.innerHTML = "Erreur: Vous n'avez pas rempli tous les champs requis(*)."
      }
    },
  }
}
</script>
