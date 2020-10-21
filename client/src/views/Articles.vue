<template>
    <div class="article">
        <div class="headerArticle">
            <img src="../assets/logo.png" width="250" height="250">
            <h1>Voici tous les articles présents sur Groupomania !</h1>
        </div>
        <div class="ui cards">
            <div class="card" v-for="article in articles" :key="article" @click="getOne(article)">
                <div class="content">
                    <div class="header">
                        {{ article.articleName }}
                    </div>
                </div>
            </div>
        </div>
        <div class="btnArticle">
            <button class="ui primary basic button" @click="goToNewArticle()">Créer un article</button>
        </div>
    </div> 
</template>


<style>
.headerArticle{
  text-align: center;
  margin-bottom: 50px;
}

.card{
    width: 350px;
    height: 150px;
}

.header{
    text-align: center; 
}

.ui.card .content, .ui.cards .card .content {
    margin: 53px;
}

.ui.cards .card{
    margin: 40px;
    justify-content: center;
}

.btnArticle{
    margin-top: 30px;
    text-align: center;
}
</style>


<script>
let data = JSON.parse(sessionStorage.getItem('vue-session-key')); 
let token = data.jwt;
export default {
    data () {
        return {
            articles: []    
        };
    },
    mounted () {
        this.$http.get("http://localhost:5000/articles", {
            headers: {
                Authorization: 'bearer ' + token
            }
        })    
        .then(response => {   
            response.json().then((data) => {
                this.articles = data
            })

        }, (response) => {
            console.log('erreur', response)
        });  
    },
    methods: {
        getOne (article) {
            this.$http.get("http://localhost:5000/articles/" + article.article_id, {
                headers: {
                    Authorization: 'bearer ' + token
                }               
            })    
            .then(response => {   
                response.json().then((data) => {
                    this.article = data
                    console.log('success', data)
                    sessionStorage.setItem('article', JSON.stringify(data));
                    window.open("http://localhost:8080/article/" + article.article_id, "_parent");
                })       
            }, (response) => {
                console.log('erreur', response)
            });  
        },
        goToNewArticle() {
            window.open("http://localhost:8080/article/new", "_parent");
        }
    }
}
</script>
