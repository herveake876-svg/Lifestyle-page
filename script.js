document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. ANIMATION AU SCROLL (Intersection Observer)
       Fait apparaître les éléments avec la classe 'scroll-reveal'
       uniquement lorsqu'ils entrent dans l'écran.
    ========================================================= */
    const revealElements = document.querySelectorAll('.scroll-reveal'); 

    // Configuration de l'observateur
    const observerOptions = {
        root: null, // observe par rapport à la fenêtre de navigation
        threshold: 0.2, // déclenche l'animation quand 20% de l'élément est visible
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajoute la classe 'visible' qui déclenche l'animation CSS
                entry.target.classList.add('visible');
                // Arrête d'observer cet élément une fois qu'il est apparu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Applique l'observateur à tous les éléments concernés
    revealElements.forEach(el => revealObserver.observe(el));


    /* =========================================================
       2. COMPTE À REBOURS DE LA SORTIE DU SINGLE
    ========================================================= */
    
    // Définis ici la date de sortie de ta chanson (Année, Mois-1, Jour, Heure, Minute)
    // Note : En JS, les mois commencent à 0 (0 = Janvier, 11 = Décembre)
    // Ici configuré pour le 15 Novembre 2026 à 00:00.
    const releaseDate = new Date(2026, 10, 15, 0, 0, 0).getTime();
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = releaseDate - now;

        // Si la date est passée, on affiche un message
        if (distance < 0) {
            countdownElement.innerHTML = '<h3 class="text-danger fw-bold text-uppercase letter-spacing">Disponible partout !</h3>';
            return;
        }

        // Calculs mathématiques pour le temps
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);  

        // Construction du HTML pour afficher les blocs du compteur
        countdownElement.innerHTML = `
            <div>
                <span class="display-5 fw-bold">${days}</span>
                <span class="d-block small text-secondary text-uppercase">Jours</span>
            </div>
            <div>
                <span class="display-5 fw-bold">${hours < 10 ? '0'+hours : hours}</span>
                <span class="d-block small text-secondary text-uppercase">Heures</span>
            </div>
            <div>
                <span class="display-5 fw-bold">${minutes < 10 ? '0'+minutes : minutes}</span>
                <span class="d-block small text-secondary text-uppercase">Min</span>
            </div>
            <div>
                <span class="display-5 text-danger fw-bold">${seconds < 10 ? '0'+seconds : seconds}</span>
                <span class="d-block small text-secondary text-uppercase">Sec</span>
            </div>
        `;
    }

    // Met à jour le compteur toutes les secondes (1000 millisecondes)
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Exécute une fois immédiatement pour éviter le blanc initial
});