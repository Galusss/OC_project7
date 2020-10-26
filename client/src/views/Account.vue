<template>
    <div class="account">
        <div class="ui form">
            <div class="centerDisplay">
                <img class="accountLogo" src="../assets/logo.png" width="200" height="200">
            </div>    
            <div class="field">
                <label>Email</label>
                <input id="email" type="text" >
            </div>
            <div class="field">
                <label>Prenom</label>
                <input id="prenom" type="text">
            </div>
            <div class="field">
                <label>Nom</label>
                <input id="nom" type="text">
            </div>
            <div class="centerDisplay btnAccount">
                <button class="ui green button" @click="edit()">Modifier les informations</button>
                <button class="ui red button" @click="destroy()">Supprimer le compte</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.accountLogo{
    margin: 40px 0px;
}

.ui.form{
    width: 50%;
    margin: auto;
    margin-top: 30px;
}

.ui.form input[type="text"] {
    border: solid black 1px;
}

.centerDisplay{
    display: flex;
    justify-content: center;
}

.btnAccount{
    margin: 40px 0px;
}

.ui.button{
    margin: 30px;
}

.ui.red.button, .ui.green.button{
    font-weight: bold;
    font-size: 18px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    min-width: 300px;
}

.ui.red.button:hover, .ui.green.button:hover{
    opacity: 0.6;
}

@media screen and (max-width: 1200px) {
    .ui.red.button, .ui.green.button{
        font-size: 12px;
    }
}

@media screen and (max-width: 900px) {
    img{
        width: 120px;
        height: 120px;
    }

    .ui.red.button, .ui.green.button{
        min-width: 210px;
    }
}

@media screen and (max-width: 550px) {
    img{
        width: 80px;
        height: 80px;
    }

    .ui.red.button, .ui.green.button{
        font-size: 8px;
        min-width: 130px;
    }
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