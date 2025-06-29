document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('mainNav');
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
                nav.classList.remove('open');
            }
        });
    }

    // Ajout : gestion de la rubrique active selon l'URL (pour toutes les pages)
    const navLinks = document.querySelectorAll('nav ul li a');
    const path = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        // Pour les liens vers des fichiers (pages)
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
        // Pour les liens vers des ancres (index.html)
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '' || window.location.pathname === '/') {
            // Ancienne logique pour les ancres
            const sections = document.querySelectorAll('section');
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 80;
                    if (window.pageYOffset >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });
                navLinks.forEach(link2 => {
                    link2.classList.remove('active');
                    if (link2.getAttribute('href') === '#' + current) {
                        link2.classList.add('active');
                    }
                });
            });
        }
    });

    // Changement du fond selon le scroll (inchangé)
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const ratio = docHeight ? scrollY / docHeight : 0;

        document.body.classList.remove(
            'atmo-1','atmo-2','atmo-3','atmo-4','atmo-5','atmo-6','atmo-7'
        );
        if (ratio < 0.10) {
            document.body.classList.add('atmo-1');
        } else if (ratio < 0.22) {
            document.body.classList.add('atmo-2');
        } else if (ratio < 0.36) {
            document.body.classList.add('atmo-3');
        } else if (ratio < 0.52) {
            document.body.classList.add('atmo-4');
        } else if (ratio < 0.68) {
            document.body.classList.add('atmo-5');
        } else if (ratio < 0.84) {
            document.body.classList.add('atmo-6');
        } else {
            document.body.classList.add('atmo-7');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    let ignoreNextScroll = false;
    const header = document.querySelector('header');

    // Ajoute ce bloc pour tous les boutons et liens internes
    document.querySelectorAll('button, .open-modal, a[href^="#"]').forEach(el => {
        el.addEventListener('click', function() {
            ignoreNextScroll = true;
            setTimeout(() => { ignoreNextScroll = false; }, 1200); // 1200ms = 1,2s, plus confortable pour un scroll long
        });
    });

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        if (!header) return;
        if (ignoreNextScroll) return; // Ignore la disparition si clic récent
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
            header.classList.add('header-hide');
        } else {
            header.classList.remove('header-hide');
        }
        lastScrollY = window.scrollY;
    });

    // Flip card
    document.querySelectorAll('.flip-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.flip-card');
            card.classList.add('flipped');
        });
    });
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('mouseleave', function() {
            card.classList.remove('flipped');
        });
    });

    // Modale pour les projets
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = btn.getAttribute('data-modal');
            let content = '';
            if (type === 'projet1') {
                content = `
                    <h2>Station de suivie satellite</h2>
                    <p>Travail de groupe visant à mettre au point une nouvelle carte électronique
                    permettant le contrôle de la station satellite présente au batiment Z.</p>
                    <br>
                    <p>Ce travail fut mené au sein d'une équipe de deux personnes composée de Bastien
                    Gonon et moi même.</p>
                    <br>
                    <p>L'antenne à contrôler est alors la suivante :</p>
                    <div class="image-container" style="max-width: 1000px; align-items: center;">
                        <img src="IMG_4984.jpg" alt="Antenne satellite" class="responsive-image">
                    </div>
                `;
            } else if (type === 'projet2') {
                content = `<h2>Projet 2</h2><p>Description du projet 2.</p>`;
            } else if (type === 'projet3') {
                content = `<h2>Projet 3</h2><p>Description du projet 3.</p>`;
            } else if (type === 'projet4') {
                content = `<h2>Projet 4</h2><p>Description du projet 4.</p>`;
            } else if (type === 'projet5') {
                content = `<h2>Projet 5</h2><p>Description du projet 5.</p>`;
            } else if (type === 'projet6') {
                content = `<h2>Projet 6</h2><p>Description du projet 6.</p>`;
            }
            document.getElementById('modalBody').innerHTML = content;
            document.getElementById('modal').style.display = 'block';
        });
    });

    // Modale pour les boutons "À propos"
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = btn.getAttribute('data-modal');
            let content = '';
            if (type === 'formation') {
                content = `
                    <h2>Ma formation</h2>
                    <div class="image-container" style="max-width: 1000px; align-items: center;">
                        <img src="logogeii.png" alt="Logo GEII" class="responsive-image">
                    </div>
                    <p>!! WORK IN PROGRESS !!</p>
                `;
            } else if (type === 'passions') {
                content = `
                    <h2>Mes passions</h2>
                    <p>Musique (Metal), jeux vidéo, histoire/géo, etc.</p>
                    <img src="Gojiranoir.jpg" alt="Gojira" class="responsive-image">
                `;
            } else if (type === 'cv') {
                content = `
                    <h2>Mon CV</h2>
                    <iframe src="CV_Carrière_Lilian.pdf" width="100%" height="500px" style="border:none; border-radius:6px; background:#222;"></iframe>
                    <p style="margin-top:12px;"><a href="CV_Carrière_Lilian.pdf" target="_blank" style="color:#00bcd4;">Télécharger le CV (PDF)</a></p>
                `;
            }
            document.getElementById('modalBody').innerHTML = content;
            document.getElementById('modal').style.display = 'block';
        });
    });

    // Fermeture modale
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    if (modal && modalClose) {
        modalClose.onclick = function() {
            modal.style.display = 'none';
        };
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
});

