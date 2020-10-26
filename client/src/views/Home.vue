<template>
  <div class="home">
    <div class="headerHome">
      <img src="../assets/logo.png" width="200" height="200">
        <h1>Bienvenue sur le réseau social de Groupomania</h1>
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
              <div class="error"></div>
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
      <button class="ui blue button" @click="goToArticle()">Voir tout les articles</button>
      <button class="ui blue button" @click="goToNewArticle()">Créer un article</button>
    </div>
  </div>
</template>


<style scoped>
a{
  text-decoration: none;
}

h1{
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 40px;
  color: rgba(17, 16, 16, 0.795);
}

h1:after{
  margin: 0;
  content: ' .';
  animation: dots 2s infinite;
}

@keyframes dots{
  0%, 20% {
    color: #8a8169;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: #8a8169;
    text-shadow: 0.25em 0 0 #8a8169, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 #8a8169, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%, 100% {
    text-shadow: 0.25em 0 0 #8a8169, 0.5em 0 0 #8a8169;
  }
}

.headerHome{
  text-align: center;
  margin: 60px 0px;
}

.btnHome{
  text-align: center;
}

.error{
  color: red;
  margin: 10px 0px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
}

.ui.placeholder.segment {
  margin: 90px;
}

.ui.button{
  margin: 30px;
}

.ui.blue.button {
  margin-bottom: 70px;
  font-weight: bold;
  font-size: 18px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  min-width: 300px;
}

.ui.blue.button:hover{
  opacity: 0.6;
}

@media screen and (max-width: 1200px) {
  h1{
    font-size: 28px;
  }
}

@media screen and (max-width: 900px) {
  h1{
    font-size: 20px;
  }

  img{
    width: 120px;
    height: 120px;
  }

  .ui.vertical.divider {
    display: none;
  }
  .ui.blue.submit.button {
    min-width: 150px;
  }
}

@media screen and (max-width: 550px) {
  h1{
    font-size: 14px;
  }

  img{
    width: 80px;
    height: 80px;
  }

  .ui.blue.submit.button {
    font-size: 12px;
    min-width: 100px;
    margin-bottom: 20px;
  }

  .ui.big.button, .ui.big.buttons .button, .ui.big.buttons .or {
    font-size: 12px;
    margin: 0px;
    margin-bottom: 20px;
  }

  div.column{
    margin: 0px;
    padding: 0px;
  }

  .ui.input > input {
    height: 20px;
    font-size: 10px;
  }

  .button.ui.blue.button{
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
  }
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
        if (response.status === 200 && 'token' in response.body && (this.email.length > 0 && this.password.length > 0)) {
          this.$session.start()
          this.$session.set('jwt', response.body.token)
          this.$http.headers.common['Authorization'] = 'Bearer ' + response.body.token
          window.open("http://localhost:8080/", "_parent");
          console.log(response)
          let dataUser = JSON.parse(response.bodyText)
          sessionStorage.setItem('userId', dataUser.userId)
          sessionStorage.setItem('userPermission', dataUser.userPermission)
          sessionStorage.setItem('userFirstname', dataUser.userFirstname)
          sessionStorage.setItem('userLastname', dataUser.userLastname)
        } else if (this.email.length <= 0 || this.password.length <= 0){
            let error = document.querySelector(".error")
            error.innerHTML = "Erreur: Identifiant ou Email incorrect."
        }
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
