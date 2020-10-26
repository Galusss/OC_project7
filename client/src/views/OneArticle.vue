<template>
    <div class="oneArticle">
        <div class="headerOneArticle">
            <img src="../assets/logo.png" width="200" height="200">
        </div>
        <div class="error"></div>
        <div class="ui card">
            <div class="content">
                <div class="header">
                    {{ name }}
                </div>
                <p> {{ description }} </p>

                <div class="meta">
                    <span>Source(s) :</span> {{ source }}
                </div>
                <div class="meta">
                    <span>Publié par</span> {{ firstnameAuthor + " " + lastnameAuthor }}
                </div>
                <div class="meta">
                    <span>Date de publication :</span> {{  date }}
                </div>
            </div>
            <div class="deleteArticleBtn">
                <button class="ui red button" @click="destroy()">Supprimer l'article</button>
            </div>
        </div>


        <div class="btnOneArticle">
            <button class="ui blue button" @click="goToArticle()">Voir tout les articles</button>
            <button class="ui blue button" @click="goToNewArticle()">Créer un article</button>
        </div>
    </div>
</template>


<style scoped>
.headerOneArticle{
    text-align: center;
    margin: 60px 0px;
}

.header{
    margin-bottom: 50px;
}

.error{
  color: red;
  margin: 10px 0px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
}

.ui.card > .content > .header:not(.ui), .ui.cards > .card > .content > .header:not(.ui) {
    color: rgba(17, 16, 16, 0.795);
    font-size: 30px;
}

p{
    color: rgba(17, 16, 16, 0.795);
    font-size: 16px;   
}

.ui.card .meta, .ui.cards > .card .meta {
    color: rgba(54, 53, 53, 0.795);
    font-size: 14px;
}

.ui.card {
    padding: 30px;
    margin: auto;
    width: 700px;
    height: auto;
    background-image: url('../assets/white-texture.jpg');
    font-weight: bold;
}

.ui.card > .content p, .ui.cards > .card > .content p {
    margin-bottom: 50px;
}

.meta{
    margin: 5px 0px;
}

.deleteArticleBtn, .btnOneArticle{
    text-align: center;
    margin: 15px;
}

.btnOneArticle{
    margin: 60px 0px;
}

.ui.button{
    margin: 30px;
}

.ui.blue.button, .ui.red.button{
    font-weight: bold;
    font-size: 18px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    min-width: 300px;
}

.ui.blue.button:hover, .ui.red.button:hover{
    opacity: 0.6;
}

@media screen and (max-width: 900px) {
    img{
        width: 120px;
        height: 120px;
    }

    .ui.card{
        width: 500px;
    }
}

@media screen and (max-width: 550px) {
    img{
        width: 80px;
        height: 80px;
    }

    .ui.card{
        width: 300px;
    }
    .ui.blue.button, .ui.red.button{
        font-size: 10px;
        min-width: 150px;
        margin-top: 10px;
    }

    .ui.card > .content > .header:not(.ui), .ui.cards > .card > .content > .header:not(.ui) {
        font-size: 22px;
    }

    p{
        font-size: 12px;   
    }

    .ui.card .meta, .ui.cards > .card .meta {
        font-size: 10px;
    }
}
</style>


<script>
let data = JSON.parse(sessionStorage.getItem('article'));
let date = sessionStorage.getItem('articleDate');
let myId = sessionStorage.getItem('userId');
let myPermission = sessionStorage.getItem('userPermission');
let dataToken = JSON.parse(sessionStorage.getItem('vue-session-key')); 
let token = dataToken.jwt;
export default {
    data () {
        return {
            name: data.articleName,
            description: data.article_description,
            source: data.source_article,
            date: date,
            lastnameAuthor: data.lastnameAuthor,
            firstnameAuthor: data.firstnameAuthor
        };
    },
    methods: {
        destroy: function () {
            if (data.userId == myId || myPermission == 1) {
                this.$http.delete("http://localhost:5000/articles/" + data.article_id, {
                    headers: {
                        Authorization: 'bearer ' + token
                    }
                })    
                .then(response => {   
                    response.json().then((data) => {
                        console.log('success', data)
                        sessionStorage.removeItem('article');
                        window.open("http://localhost:8080/articles/", "_parent");
                    })       
                }, (response) => {
                    console.log('erreur', response)
                }); 
            } else{
                let error = document.querySelector(".error")
                error.innerHTML = "Erreur: Vous ne pouvez pas supprimer un article que vous n'avez pas créer."
            }
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
