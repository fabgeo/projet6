// Récupération de l'élément portfolio
const portfolioSection = document.getElementById('portfolio');

// Création des boutons
const categories = ['Tous', 'Objets', 'Appartements', 'Hôtels & Restaurants'];
const buttonsContainer = document.createElement('div');
buttonsContainer.id = 'buttons';
buttonsContainer.classList.add('button-container'); // Ajout de la classe pour personnalisation CSS

categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.classList.add('filter-button'); // Ajout de la classe pour personnalisation CSS
    button.addEventListener('click', () => filtrerElements(category));
    buttonsContainer.appendChild(button);
});

// Ajout des boutons au conteneur
portfolioSection.appendChild(buttonsContainer);

// Récupération de la galerie
const gallery = document.querySelector('.gallery');

// Fonction pour filtrer les éléments
function filtrerElements(categorie) {
    const elements = gallery.querySelectorAll('figure');
    elements.forEach(element => {
        if (categorie === 'Tous' || element.classList.contains(categorie)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}




























// const filters = document.querySelector(".filters");

// document.addEventListener("DOMContentLoaded", function () {
//     const images = [
//         { src: "assets/images/abajour-tahina.png", alt: "Abajour Tahina", caption: "Abajour Tahina" },
//         { src: "assets/images/appartement-paris-v.png", alt: "Appartement Paris V", caption: "Appartement Paris V" },
//         { src: "assets/images/restaurant-sushisen-londres.png", alt: "Restaurant Sushisen - Londres", caption: "Restaurant Sushisen - Londres" },
//         { src: "assets/images/la-balisiere.png", alt: "Villa “La Balisiere” - Port Louis", caption: "Villa “La Balisiere” - Port Louis" },
//         { src: "assets/images/structures-thermopolis.png", alt: "Structures Thermopolis", caption: "Structures Thermopolis" },
//         { src: "assets/images/appartement-paris-x.png", alt: "Appartement Paris X", caption: "Appartement Paris X" },
//         { src: "assets/images/le-coteau-cassis.png", alt: "Pavillon “Le coteau” - Cassis", caption: "Pavillon “Le coteau” - Cassis" },
//         { src: "assets/images/villa-ferneze.png", alt: "Villa Ferneze - Isola d’Elba", caption: "Villa Ferneze - Isola d’Elba" },
//         { src: "assets/images/appartement-paris-xviii.png", alt: "Appartement Paris XVIII", caption: "Appartement Paris XVIII" },
//         { src: "assets/images/bar-lullaby-paris.png", alt: "Bar “Lullaby” - Paris", caption: "Bar “Lullaby” - Paris" },
//         { src: "assets/images/hotel-first-arte-new-delhi.png", alt: "Hotel First Arte - New Delhi", caption: "Hotel First Arte - New Delhi" }
//     ];

//     const gallery = document.querySelector(".gallery");

//     images.forEach(function (image) {
//         const figure = document.createElement("figure");
//         const img = document.createElement("img");
//         const figcaption = document.createElement("figcaption");

//         img.src = image.src;
//         img.alt = image.alt;

//         figcaption.textContent = image.caption;

//         figure.appendChild(img);
//         figure.appendChild(figcaption);

//         gallery.appendChild(figure);
//     });
// });

