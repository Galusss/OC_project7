<template>
  <div class="newArticle">
    <div class="ui form">
      <div class="centerDisplay">
        <img src="../assets/logo.png" width="190" height="190">
      </div>
      <div class="required field">
        <label>Nom</label>
        <input type="text" placeholder="Nom de l'article..." v-model="articleName">
      </div>
      <div class="required field">
        <label>Text</label>
        <textarea type="text" placeholder="Description de l'article..." v-model="article_description"></textarea>
      </div>
      <div class="field">
        <label>Source (facultatif)</label>
        <input type="text" placeholder="Sources utilisées sur l'article..." v-model="source_article">
      </div>
      <div class="centerDisplay">
        <button class="ui primary basic button" @click="create()">Créer l'article</button>
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
let id = sessionStorage.getItem("userId");
let data = JSON.parse(sessionStorage.getItem('vue-session-key')); 
let token = data.jwt;
export default {
  data: function () {
    return {
      articleName: "",
      article_description: "",
      source_article: "",
      userId: id
    };
  },
  methods: {
    create() {
      if (this.articleName.length > 0 && this.article_description.length > 0) {
        if (this.source_article >= 0) {
          this.source_article = "Pas de source renseignée"
        }
        const postData = { articleName: this.articleName, article_description: this.article_description, source_article: this.source_article, userId: this.userId };
        this.$http.post('http://localhost:5000/articles', postData, {
          headers: {
            Authorization: 'bearer ' + token
          }        
        })
        .then(res => {
          console.log(res)
          window.open('http://localhost:8080/articles', "_parent")
        });
      } else {
        alert("Le nom d'article est déjà utilisé ou vous n'avez pas correctement renseigner les champs obligatoire.")
      }
    }
  }
}
</script>
