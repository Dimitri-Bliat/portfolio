// Fonction pour écrire le texte ligne par ligne
async function typeText(element, text, speed) {
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

// Fonction pour afficher le texte avec animation
async function displayTextWithAnimation(elements, addCursor = true) {
    for (const element of elements) {
        element.classList.remove('hidden'); // Rendre l'élément visible
        const text = element.textContent.trim(); // Supprimer les espaces inutiles
        element.textContent = ''; // Effacer le texte initial
        await typeText(element, text, 10); // Écrire le texte
    }

    // Ajouter le curseur clignotant à la dernière ligne (si demandé)
    if (addCursor) {
        const lastElement = elements[elements.length - 1];
        lastElement.insertAdjacentHTML('beforeend', '<span class="cursor"></span>');
    }
}

// Fonction pour afficher le texte directement sans animation
function displayTextDirectly(elements) {
    elements.forEach((element) => {
        element.classList.remove('hidden');
        element.textContent = element.textContent.trim(); // Afficher le texte sans animation
    });
}

// Fonction principale pour gérer l'affichage du texte
function handleTextDisplay() {
    // Sélectionner tous les éléments avec la classe .typed-text.hidden
    const elements = document.querySelectorAll('.typed-text.hidden');

    // Séparer le titre du reste du texte
    const titleElement = document.querySelector('h1.typed-text.hidden');
    const otherElements = Array.from(elements).filter((element) => element !== titleElement);

    // Gestion du titre
    if (titleElement && !localStorage.getItem('hasVisited')) {
        // Si c'est la première visite, afficher le titre avec animation (sans curseur)
        displayTextWithAnimation([titleElement], false);
        // Enregistrer que l'utilisateur a visité le site
        localStorage.setItem('hasVisited', 'true');
    } else if (titleElement) {
        // Si l'utilisateur a déjà visité, afficher le titre directement
        displayTextDirectly([titleElement]);
    }

    // Gestion du reste du texte
    if (otherElements.length > 0) {
        // Toujours afficher le reste du texte avec animation (avec curseur)
        displayTextWithAnimation(otherElements, true);
    }
}

// Démarrer l'affichage du texte lorsque la page est chargée
document.addEventListener('DOMContentLoaded', handleTextDisplay);

