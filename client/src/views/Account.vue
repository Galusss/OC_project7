<template>
    <div class="account">
        <div class="ui form">
            <div class="centerDisplay">
                <img src="../assets/logo.png" width="190" height="190">
            </div>    
            <div class="required field">
                <label>Email</label>
                <input id="email" type="text" >
            </div>
            <div class="required field">
                <label>Prenom</label>
                <input id="prenom" type="text">
            </div>
            <div class="required field">
                <label>Nom</label>
                <input id="nom" type="text">
            </div>
            <div class="centerDisplay">
                <button class="ui positive basic button" @click="edit()">Modifier les informations</button>
                <button class="ui negative basic button" @click="destroy()">Supprimer le compte</button>
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