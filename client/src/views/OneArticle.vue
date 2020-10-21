<template>
    <div class="oneArticle">
        <div class="headerOneArticle">
            <img src="../assets/logo.png" width="250" height="250">
        </div>
        <div class="ui card">
            <div class="content">
                <div class="header">
                    {{ name }}
                </div>
                <div class="meta">
                    <span>Source(s) :</span> {{ source }}
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div class="deleteArticleBtn">
                <button class="ui negative basic button" @click="destroy()">Supprimer l'article</button>
            </div>
        </div>


        <div class="btnOneArticle">
            <button class="ui primary basic button" @click="goToArticle()">Voir tout les articles</button>
            <button class="ui primary basic button" @click="goToNewArticle()">Créer un article</button>
        </div>
    </div>
</template>


<style>
.headerOneArticle{
    text-align: center;
}

.ui.card {
    padding: 30px;
    margin: auto;
    width: 700px;
    height: 600px;
}

.meta, p{
    padding-top: 50px;
}

.deleteArticleBtn, .btnOneArticle{
    text-align: center;
}

.btnOneArticle{
    margin-top: 20px;
}
</style>


<script>
let data = JSON.parse(sessionStorage.getItem('article'));
let myId = sessionStorage.getItem('userId');
let myPermission = sessionStorage.getItem('userPermission');
let dataToken = JSON.parse(sessionStorage.getItem('vue-session-key')); 
let token = dataToken.jwt;
export default {
    data () {
        return {
            name: data.articleName,
            description: data.article_description,
            source: data.source_article
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
                        window.open("http://localhost:8080/articles/", "_parent");
                    })       
                }, (response) => {
                    console.log('erreur', response)
                }); 
            } else{
                alert('Vous ne pouvez pas supprimer un article que vous n\'avez pas créer')
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
