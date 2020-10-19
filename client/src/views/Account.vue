<template>
    <div class="account">
        <div class="cardAccount">
            <h1>Informations du compte</h1>
            <div>
                <span>Email :</span> <input id="email">
            </div>
            <div>
                <span>Prenom :</span> <input id="prenom">
            </div>
            <div>
                <span>Nom :</span> <input id="nom">
            </div>
            <div class="btnAccount">
                <button class="btnEdit" @click="edit">Modifier les informations de compte</button>
                <button class="btnDelete" @click="destroy">Supprimer le compte</button>
            </div>
        </div>
    </div>
</template>

<style>
.cardAccount{
    font-size: 20px;
    color: #2c3e50;
    background-color: #f0f0f0;
    border: solid 1px black;
    border-radius: 30px;
    width: 1000px;
    height: 600px;
    margin: 0 auto;
    margin-top: 60px;
    text-align: center;
}

.cardAccount h1{
    margin: 50px;
}

.cardAccount div, span{
    display: flex;
    margin: auto;    
    font-size: 26px;
    text-decoration: underline;
    font-weight: bold;
    color: #2c3e50;
}
.cardAccount div{
    margin-top: 40px;
    margin-right: 85px;
    text-decoration: none;
}

.cardAccount input{
    height: 20px;
    width: 450px;
    padding: 10px;
    border: solid black 1px;
    border-radius: 19px;
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
}

.btnEdit{
    background-color: #42b983;
    margin-left: 80px;
    margin-right: 30px;
}

.btnDelete{
    background-color: #FF0000;
}
</style>

<script>
let id = sessionStorage.getItem("userId");
let data = JSON.parse(sessionStorage.getItem('vue-session-key')); 
let token = data.jwt;
export default {
    mounted () {
        this.$http.get("http://localhost:5000/users/" + id)    
        .then(response => {   
            let userData = JSON.parse(response.bodyText);
            let email = document.getElementById("email");
            email.value = userData.email;
            let prenom = document.getElementById("prenom");
            prenom.value = userData.prenom;
            let nom = document.getElementById("nom");
            nom.value = userData.nom;        
        }, (response) => {
            console.log('erreur', response)
        });  
    },
    methods: {
        edit: function () {
            let email = document.getElementById("email");
            let prenom = document.getElementById("prenom");
            let nom = document.getElementById("nom");
            const postData = { email: email.value, prenom: prenom.value, nom: nom.value };
            this.$http.put("http://localhost:5000/users/account/" + id, postData, {
                headers: {
                    Authorization: 'bearer ' + token
                }
            })
            .then(response => {
                response.json().then((data) => {
                    console.log('success', data)
                    this.postData = data
                }) 
            }, (response) => {
                console.log('erreur', response)
            })
        },
        destroy: function () {

            this.$http.delete("http://localhost:5000/users/account/" + id, {
                headers: {
                    Authorization: 'bearer ' + token
                }
            })  
            .then(response => {   
                response.json().then((data) => {
                    console.log('success', data)
                    this.$session.destroy()
                    sessionStorage.clear();
                    window.open("http://localhost:8080/", "_parent");
                })       
            }, (response) => {
                console.log('erreur', response)
            }); 
        }
    }
}
</script>