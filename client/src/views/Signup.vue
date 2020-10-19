<template>
  <div>
    <div class="signup">
      <img src="../assets/logo.png" width="190" height="190">
      <form id="form" action="http://localhost:5000/users/signup" method="post" >
        <label>
          <input type="text" placeholder="Prénom..." v-model="prenom">
        </label><br>
        <label>
          <input type="text" placeholder="Nom..." v-model="nom">
        </label><br>
        <label>
          <input type="email" placeholder="Adresse email..." v-model="email">
        </label><br>
        <label>
          <input type="password" placeholder="Mot de passe..." v-model="password">
        </label><br>
        <button type="submit" @click="signup">Je m'inscris</button>
      </form>
    </div>
  </div>
</template>

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
        console.log(postData)
        window.open("http://localhost:8080/login", "_parent");
      });
    }
  }
}
</script>

<style>
.signup {
  text-align: center;
  margin-top: 70px;
}

input {
  height: 20px;
  width: 210px;
  margin: 5px;
  padding: 10px;
  border: solid black 1px;
  border-radius: 19px;
  font-size: 16px;

}
button{
  height: 45px;
  width: 310px;
  border: solid black 1px;
  border-radius: 22px;
  margin-top: 25px;
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
}

button:hover{
  opacity: 0.7;
}
</style>