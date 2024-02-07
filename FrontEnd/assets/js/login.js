// const serveurUrl = "http://localhost:5678/api/";

// login();

// function login(){
//     const email = document.querySelector("#email");
//     const password = document.querySelector("#password");
//     const form = document.querySelector("form");

//     form.addEventListener("submit", (event) =>{
//     event.preventDefault();
//     const user = {
//         email: email.value,
//             password: password.value,
//     };
//     fetch(serveurUrl + "users/login", {
//         method: "POST",
//         headers: {
//             "Content-type": "Application/json;charset=utf-8",
//         },
//         body: JSON.stringify(user),
//     })
//     .then((response) => {
//         if (!response.ok) {
//            let existingErrorContainer = document.querySelector("error_container");
//            if (response.status === 404) {
//             existingErrorContainer.innerText = "L'adresse mail n'est pas reconnue !";
//             return;
//            }
//            if (response.status === 401) {
//             existingErrorContainer.innerText = "Le mot de passe est incorrect !";
//             return;
//            }
//         }
//         return response.json();
//     })
//     .then((data) => {
//         localStorage.setItem("id", data.userId);
//         localStorage.setItem("token", data.token);
//         document.location.href = "index.html";
//     })
//     .catch((err) => {
//         console.log(err);
//     })
//   })
// };

// Définition de l'URL du serveur
const serverUrl = "http://localhost:5678/api-docs/";

// Événement DOMContentLoaded pour s'assurer que le DOM est chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function () {
    // Récupération de la référence de la liste de navigation (ul) où se trouve le bouton login/logout
    const navList = document.querySelector("nav ul");

    // Fonction pour rediriger vers la page de connexion (login.html)
    function redirectToLoginPage() {
      window.location.href = "assets/login.html";
    }
  
    // Fonction de déconnexion de l'utilisateur
    function logout() {
      localStorage.removeItem("token"); // Suppression du token du stockage local
      updateUI(); // Mise à jour de l'interface utilisateur
      redirectToHomePage(true); // Redirection vers la page d'accueil après déconnexion
    }
  
    // Fonction pour rediriger vers la page d'accueil
    function redirectToHomePage(isLogout) {
      if (isLogout) window.location.href = "index.html"; // Redirection vers index.html si c'est une déconnexion
      else window.location.href = "../index.html"; // Sinon, redirige vers ../index.html
    }
  
    // Fonction pour vérifier si l'utilisateur est connecté
    function isLoggedIn() {
      return !!localStorage.getItem("token"); // Retourne vrai si un token est présent dans le stockage local
    }
  
    // Fonction pour mettre à jour l'interface utilisateur en fonction de l'état de connexion
    function updateUI() {
      const loginLI = document.getElementById("loginLI"); // Sélection de l'élément <li> pour le bouton de connexion/déconnexion
  
      if (isLoggedIn()) {
        loginLI.textContent = "logout"; // Changement du texte du bouton en "logout" si l'utilisateur est connecté
        loginLI.removeEventListener("click", redirectToLoginPage); // Suppression de l'écouteur d'événement pour la redirection vers la page de connexion
        loginLI.addEventListener("click", logout); // Ajout d'un écouteur d'événement pour la déconnexion lorsque le bouton est cliqué
      } else {
        loginLI.textContent = "login"; // Changement du texte pour afficher "Login" si l'utilisateur n'est pas connecté
        loginLI.removeEventListener("click", logout); // Suppression de l'écouteur d'événement pour la déconnexion
        loginLI.addEventListener("click", redirectToLoginPage); // Ajout d'un écouteur d'événement pour la redirection vers la page de connexion
      }
    }
  
    // Création du bouton login/logout et ajout à la navigation
    function createLoginLogoutButton() {
      const loginLI = document.createElement("li"); // Création d'un nouvel élément <li>
      loginLI.id = "loginLI"; // Définition de l'ID de l'élément <li> créé
  
      // Insertion du bouton avant le dernier élément de 'navList' s'il existe plus d'un enfant
      if (navList.children.length > 1) {
        const lastLi = navList.lastElementChild; // Sélection du dernier enfant de la liste
        navList.insertBefore(loginLI, lastLi); // Insertion du nouvel élément juste avant le dernier enfant
      } else {
        navList.append(loginLI); // Ajout du nouvel élément à la fin de la liste s'il n'y a qu'un seul enfant ou aucun
      }
  
      updateUI(); // Mise à jour de l'état immédiatement après la création
    }
  
    // Gestionnaire d'événement pour la soumission du formulaire de connexion
    function handleLoginSubmit(event) {
      event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
      const emailInput = document.getElementById("email"); // Sélection de l'élément d'entrée pour l'email
      const passwordInput = document.getElementById("password"); // Sélection de l'élément d'entrée pour le mot de passe
    
      const email = emailInput.value.trim(); // Récupération de la valeur de l'email en supprimant les espaces vides au début et à la fin
      const password = passwordInput.value.trim(); // Récupération de la valeur du mot de passe en supprimant les espaces vides au début et à la fin
    
      // Effectue une requête POST vers l'endpoint de connexion du serveur
      fetch(serverUrl + "users/login", {
        method: "POST", // Utilisation de la méthode POST
        headers: { "Content-Type": "application/json" }, // Définition des en-têtes pour indiquer que le corps de la requête est au format JSON
        body: JSON.stringify({ email, password }), // Conversion des données en JSON et envoi dans le corps de la requête
      })
        .then((response) => {
          if (!response.ok) { // Vérification si la réponse n'est pas ok
            if (response.status === 404) { // Si le statut de la réponse est 404
              throw new Error("L'adresse e-mail n'est pas reconnue !"); // Lancement d'une erreur indiquant que l'adresse e-mail n'est pas reconnue
            } else if (response.status === 401) { // Si le statut de la réponse est 401
              throw new Error("Le mot de passe est incorrect !"); // Lancement d'une erreur indiquant que le mot de passe est incorrect
            } else { // Pour tout autre statut de réponse
              throw new Error(`HTTP error, status = ${response.status}`); // Lancement d'une erreur avec le statut HTTP
            }
          }
          return response.json(); // Renvoi des données JSON de la réponse
        })
        .then((data) => { // Une fois les données JSON reçues
          localStorage.setItem("token", data.token); // Stockage du token dans le stockage local
          updateUI(); // Mise à jour de l'interface utilisateur
          redirectToHomePage(false); // Redirection vers la page d'accueil
        })
        .catch((error) => { // Gestion des erreurs qui se produisent pendant le processus
          console.error("Login failed:", error.message); // Affichage d'un message d'erreur dans la console
          const errorForm = document.querySelector(".errorForm"); // Sélection de l'élément HTML avec la classe errorForm
          errorForm.textContent = error.message; // Affichage du message d'erreur dans cet élément
        });
    }

    // Attache l'événement de soumission au formulaire de connexion, s'il est présent
    const loginForm = document.getElementById("loginForm"); // Sélectionne le formulaire de connexion
    if (loginForm) {
      loginForm.addEventListener("submit", handleLoginSubmit); // Ajoute un écouteur d'événement pour la soumission du formulaire
    }
  
    // Initialise le bouton de connexion/déconnexion en fonction de l'état de connexion dans le stockage local
    createLoginLogoutButton(); // Appelle la fonction pour créer le bouton de connexion/déconnexion et l'ajouter à la navigation
});







