## OC_project7

### Formation Développeur Web OpenclassRooms (P7)

### __Exercice :__ Créez un réseau social d’entreprise

#### __Compétences évaluées :__
 1. Gérer un stockage de données à l'aide de SQL
 2. Personnaliser le contenu envoyé à un client web
 3. Implémenter un stockage de données sécurisé en utilisant SQL
 4. Authentifier un utilisateur et maintenir sa session

#### __Fonctionnement :__ 
 1. Framework Frontend : Vue.js
 2. Base de données : MySQL
 3. Serveur : Node.js
 4. Framework Backend : Express
 5. Le projet doit être codé en JavaScript (donc utilisation du framework Symfony interdite).
 
 #### __Mission :__ 
 1. Faire en sorte que la web app puisse se connecter et se déconnecter à l’application et que la session de l’utilisateur persiste pendant qu’il est connecté.
 2. L'une des 2 fonctionnalitée présentés par Groupomania doit être 100% fonctionnelle.
 3. L’utilisateur doit pouvoir requêter les données requises depuis SQL et soumettre ces changements à la base de données SQL.
 4. Les données de connexion doivent être sécurisées. 
 5. La création d’un compte doit être simple et possible depuis un téléphone mobile.
 6. Le profil doit contenir très peu d’informations pour que sa complétion soit rapide.  
 7. La suppression du compte doit être possible.
 8. L’accès à un forum où les salariés publient des contenus multimédias doit être présent.
 9. L’accès à un forum où les salariés publient des textes doit être présen.
 10. Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés.
 11. Le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre les salariés.
 12. Le ou la chargé-e de communication Groupomania doit pouvoir afficher les dernières participations des salariés.

 #### __Installation du projet :__ 
 Required: 
 - MySQL
 - Node.js & npm
##### __Base de données :__ 
1. Créer une base de données en local et nommé la "groupomania_db_dev".
2. Créer un nouvel utilisateur ayant les droit sur cette base de données.

##### __Application :__ 
1. Cloner le répository.
2. Remplacer les informations de connexion vers la base de données dans "config/db.js"
3. Faire un "npm install" directement depuis le dossier racine de l'application.
4. Faire un nouveau "npm install" cette fois ci depuis le dossier "client" de l'application.
5. Lancer le serveur de développement Vue.JS avec le script npm "serve" depuis votre IDE ou "vue-cli-service serve" depuis un terminal de commande.
6. Lancer le serveur backend avec le script npm "dev" depuis votre IDE ou avec la commande "nodemon server.js" depuis un terminal de commande.
