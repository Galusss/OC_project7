<template>
  <div class="home">
    <div class="headerHome">
      <img src="../assets/logo.png" width="250" height="250">
        <h1>Bienvenue sur le réseau social de Groupomania !</h1>
    </div>
    <div v-if="!this.$session.exists()">
      <div class="ui placeholder segment">
        <div class="ui two column very relaxed stackable grid">
          <div class="column">
            <div class="ui form">
              <div class="field">
                <label>Email</label>
                <div class="ui left icon input">
                  <input type="text" placeholder="Email..." v-model="email">
                  <i class="user icon"></i>
                </div>
              </div>
              <div class="field">
                <label>Mot de passe</label>
                <div class="ui left icon input">
                  <input type="password" placeholder="Mot de passe..." v-model="password">
                  <i class="lock icon"></i>
                </div>
              </div>
              <div class="ui blue submit button" @click="login()">
                Connexion
              </div>
            </div>
          </div>
          <div class="middle aligned column">
            <div class="ui big button" @click="goToSignup()">
              <i class="signup icon"></i>
              Inscription
            </div>
          </div>
        </div>
        <div class="ui vertical divider">
          OU
        </div>
      </div>
    </div>
    <div class="btnHome" v-else>
      <button class="ui primary basic button" @click="goToArticle()">Voir tout les articles</button>
      <button class="ui primary basic button" @click="goToNewArticle()">Créer un article</button>
    </div>
  </div>
</template>


<style>
a{
  text-decoration: none;
}

h1{ 
  margin: 0;
}

.headerHome{
  text-align: center;
  margin: 70px;
  margin-top: 10px;
}

.btnHome{
  text-align: center;
}

.ui.button{
  margin: 30px;
  width: 250px;
}
</style>


<script>
export default {
  data: function () {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      const postData = { email: this.email, password: this.password };
      this.$http
      .post('http://localhost:5000/users/login', postData)
      .then(function (response) {
        if (response.status === 200 && 'token' in response.body) {
          this.$session.start()
          this.$session.set('jwt', response.body.token)
          this.$http.headers.common['Authorization'] = 'Bearer ' + response.body.token
          window.open("http://localhost:8080/", "_parent");
          let dataUser = JSON.parse(response.bodyText)
          sessionStorage.setItem('userId', dataUser.userId)
          sessionStorage.setItem('userPermission', dataUser.userPermission)
          console.log(dataUser)
          console.log("Connexion réussi")
        }
      }, function (err) {
        console.log('err', err)
      })
    },
    goToSignup() {
      window.open("http://localhost:8080/signup/", "_parent");
    },
    goToArticle() {
      window.open("http://localhost:8080/articles/", "_parent");      
    },
    goToNewArticle() {
      window.open("http://localhost:8080/article/new", "_parent");
    }
  }
}
</script>
