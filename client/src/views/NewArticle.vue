<template>
  <div>
    <div class="newArticle">
      <img src="../assets/logo.png" width="190" height="190">
      <form id="form" method="post" action="http://localhost:5000/articles">
        <label>
          <input type="text" placeholder="Nom de l'article..." v-model="articleName">
        </label><br>
        <label>
          <input type="text" placeholder="Description de l'article..." class="input_description" v-model="description_article">
        </label><br>
        <label>
          <input type="text" placeholder="Source de l'article...(facultatif)" v-model="source_article">
        </label><br>
        <button type="submit" @click="create">Créer un article</button>
      </form>
    </div>
  </div>
</template>

<script>
let id = sessionStorage.getItem("userId");
let data = JSON.parse(sessionStorage.getItem('vue-session-key')); 
let token = data.jwt;
export default {
  data: function () {
    return {
      userId: id,
      articleName: "",
      description_article: "",
      source_article: ""
    };
  },
  methods: {
    create () {
      const postData = { articleName: this.articleName,  userId: this.userId, description_article: this.description_article, source_article: this.source_article };
      this.$http
      .post('http://localhost:5000/articles', postData, {
          headers: {
            'Authorization': 'bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br'
          }
      })
      .then(response => {     
        console.log('success', response)    
        console.log(postData)
        event.preventDefault()      
      }, (response) => {
        console.log('erreur', response)
        console.log(postData)
        event.preventDefault()
      })
    },
  }
}
</script>

<style>
.newArticle {
  text-align: center;
  margin-top: 20px;
}

input {
  height: 20px;
  width: 450px;
  margin: 5px;
  padding: 10px;
  border: solid black 1px;
  border-radius: 19px;
  font-size: 16px;
}

.input_description{
    height: 250px;
}

.input_description::placeholder{
    margin: 0;
}

button{
  height: 65px;
  width: 600px;
  border: solid black 1px;
  border-radius: 40px;
  margin-top: 25px;
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

button:hover{
  opacity: 0.7;
}
</style>