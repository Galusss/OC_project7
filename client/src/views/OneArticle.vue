<template>
    <div id="app">
        <div id="article">
            <div class="card">
                <div class="header">
                    {{ name }}
                </div>
                <div class="content">
                    {{ description }}
                </div>
                <div class="source">
                    <span>Source(s):</span> {{ source }}
                </div>
          
                    <div class="divBtn">
                        <button @click="destroy" class="deleteBtn">Supprimer</button>
                    </div>
            </div>
        </div>
        <div class="btn">
            <router-link to="/articles">
                <button>Voir tout les articles</button>
            </router-link>
            <router-link to="/article/new">
                <button>Créer un article</button>
            </router-link>
        </div>
    </div>
</template>

<style>
.card{
    font-size: 20px;
    color: #2c3e50;
    background-color: #f0f0f0;
    border: solid 1px black;
    border-radius: 30px;
    width: 700px;
    height: 500px;
    margin: 0 auto;
    margin-top: 60px;
}
.card div{
    padding: 25px;
    word-wrap: break-word;
}
.header{
    font-size: 36px;
    font-weight: bold;
}
.source span{
    text-decoration: underline;
}
.divBtn{
    display: flex;
    justify-content: center;
}
.deleteBtn{
    height: 50px;
    width: 250px;
    background-color: rgb(247, 114, 114);
}
.btn{
    display: flex;
    justify-content: center;
    margin: 80px;
}
button{
    margin: 0px 10px;
}
</style>

<script>
let data = JSON.parse(sessionStorage.getItem('article'));
console.log(data.userId);
let myId = sessionStorage.getItem('userId');
console.log(myId);
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
            if (data.userId === myId) {
                this.$http.delete("http://localhost:5000/articles/" + data.article_id)    
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
        }
    }
}
</script>