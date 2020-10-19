<template>
    <div id="app">
            <div id="article">
                <div id="card" v-for="article in articles" :key="article" @click="getOne(article)">
                    <div class="content">
                        {{ article.articleName }}
                    </div>
                </div>
            </div>
        <div class="btn">
            <router-link to="/article/new">
                <button>Créer un article</button>
            </router-link>
        </div>
    </div>
</template>

<style>
#card{
    font-size: 22px;
    font-weight: bold;
    color: #2c3e50;
    background-color: #f0f0f0;
    border: solid 1px black;
    border-radius: 30px;
    width: 350px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px;
}

#article{
    display: flex;
}

.btn{
  margin: auto;
  margin-top: 90px;
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
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
    }
}
</script>