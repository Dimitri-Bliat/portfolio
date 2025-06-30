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
                    <h2>Projet SmartLight</h2>
                    <p>Le projet SmartLight aura été la première introduction au monde du projet dans le domaine du GEII. Ce projet simple m'aura notamment permis de prendre
                    en main la conception de PCB sur KiCad et de découvrir la microsoudure. J'ai aussi pu réaliser des programmes simples pour
                    faire fonctionner ce dispositif dont le but est de contrôler une lampe en fonction de l'intensité lumineuse ambiante, ou via
                    des boutons présents sur la carte.</p>
                    <div class="image-container" style="max-width: 1000px; align-items: center;">
                        <img src="smartlight.png" alt="SmartLight" class="responsive-image">
                    </div>
                `;
            } else if (type === 'projet2') {
                content = `
        <h2>Projet Assistant Domotique</h2>
        <p>Ce projet intervient au cours de la seconde année de BUT GEII. Il consiste à développer une carte électronique permettant d'accueillir les composants nécessaires
        à la mise en place d'un système domotique simple. L'objectif de ce projet est de familiariser les étudiants avec les pratiques de
        développement d'un produit électronique et de leur faire comprendre l'intérêt de la documentation.</p>
        <iframe src="Dossier de fabrication.pdf" width="100%" height="700px" style="border:none; border-radius:6px; background:#222; margin-top:24px;"></iframe>
        <p style="margin-top:12px;">
            <a href="Dossier de fabrication.pdf" target="_blank" style="color:#00bcd4;">Télécharger le dossier de fabrication (PDF)</a>
        </p>
    `;
            } else if (type === 'projet3') {
                content = `
        <h2>Projet Programmation du robot éviteur d'obstacle avec Mr Gies</h2>
        <p>L'objectif de ce projet est de faire évoluer les capacités de programmation embarquées des étudiants en utilisant des robots éviteurs d'obstacles
        utilisés dans le cadre d'une pseudo compétition. Les séances de projet ont permis de se familiariser avec MPlabX et Visual Studio, et de comprendre
        le fonctionnement de plusieurs principes fondamentaux de la programmation pour la robotique.</p>
        <iframe src="Compte rendu TP2 Robotique Brunner Carrière.pdf" width="100%" height="700px" style="border:none; border-radius:6px; background:#222; margin-top:24px;"></iframe>
        <p style="margin-top:12px;">
            <a href="Compte rendu TP2 Robotique Brunner Carrière.pdf" target="_blank" style="color:#00bcd4;">Télécharger le compte rendu TP2 (PDF)</a>
        </p>
        <iframe src="RAPPORT_BRUNNER_CARRIERE_ESE(A).pdf" width="100%" height="700px" style="border:none; border-radius:6px; background:#222; margin-top:24px;"></iframe>
        <p style="margin-top:12px;">
            <a href="RAPPORT_BRUNNER_CARRIERE_ESE(A).pdf" target="_blank" style="color:#00bcd4;">Télécharger le rapport Brunner (PDF)</a>
        </p>
    `;
            } else if (type === 'projet4') {
                content = `
                <h2>Projet Maquette de vérification</h2>
                <p>L'objectif de ce projet était de permettre aux étudiants de découvrir les méthodes de vérification et de test
                qu'il faut mettre en place lorsque l'on tente de dépanner un système électronique.</p>`;
            } else if (type === 'projet5') {
                content = `
        <h2>Projet Opti'Plant</h2>
        <p>Le projet Opti'Plant est le résultat du travail collaboratif des étudiants d'AII et d'ESE sur le dernier semestre de la troisième année 
        du BUT GEII. Pour les ESE, ce projet consiste en la création d'une interface web et d'une base de données pour un système d'ombrière
        intelligente. Cette ombrière est conçue pour récupérer l'eau de pluie et arroser des plans de culture. Les étudiants de la spécialisation ESE ont
        alors découvert l'importance de la coordination d'équipes et les différentes phases d'un projet de grande ampleur.</p>
        <iframe src="Rapport_Projet_OptiPlant_ESE_B.pdf" width="100%" height="700px" style="border:none; border-radius:6px; background:#222; margin-top:24px;"></iframe>
        <p style="margin-top:12px;">
            <a href="Rapport_Projet_OptiPlant_ESE_B.pdf" target="_blank" style="color:#00bcd4;">Télécharger le rapport Opti'Plant (PDF)</a>
        </p>
    `;
            } else if (type === 'projet6') {
                content = `
                <h2>Projet Emetteur Récepteur</h2>
                <p>Ce projet de fin de première année a pour objectif de concevoir un système de communication sans fil en équipe de 4.
                Il permet notamment de mettre en oeuvre les connaissances en électronique et en programmation acquises durant l'année et
                d'apporter aux étudiants une première approche de la gestion du temps et des ressources dans un projet technique.</p>`;
            } else if (type === 'projetbob') {
                content = `
                    <h2>Projet Programmation d'un robot éviteur d'obstacle simple</h2>
                    <p>L'objectif de ce projet de fin de première année est de mettre les étudiants en équipe de 2 sur le développement 
                    du programme d'un robot devant être capable d'éviter des obstacles en vue de participer à une compétition interne.
                    Ce projet permet de faire évoluer les compétences en programmation et en logique/algorithmique des étudiants tout en apportant
                    une touche d'amusement.</p>
                    <div class="image-container" style="max-width: 1000px; align-items: center;">
                        <img src="bob.jpg" alt="Bob" class="responsive-image">
                    </div>
                `;
            } else if (type === 'projetnuage') {
                content = `
        <h2>Projet Station satellite autonome</h2>
        <p>Le projet de station satellite autonome consiste en la mise en marche d'un dispositif permettant de contrôler un rotor dirigeant des antennes afin de 
        cibler des satellites lors de leurs passages dans le ciel. Ce projet a été divisé en deux parties. La première fut effectuée à la fin de la seconde année de BUT GEII. Pour cette
        première phase, l'objectif était d'assembler, de programmer et d'essayer une carte électronique servant d'interface électronique 
        entre le module de contrôle du rotor de la station et l'ESP32 utilisé pour permettre la programmation des déplacements de la station.
        La seconde phase du projet réalisée au début de la troisième année consiste en une refonte totale de la méthode de contrôle de la station
        avec la conception d'un nouveau design de carte électronique, et l'utilisation d'un nouveau contrôleur cette fois-ci fonctionnant sous Linux.
        Ce projet a donc permis de mettre en pratique les compétences de conception, d'intégration et de programmation des étudiants.
        </p>
        <iframe src="Rapport_Projet_PointageAntenne_Gonon_Carrière.pdf" width="100%" height="700px" style="border:none; border-radius:6px; background:#222; margin-top:24px;"></iframe>
        <p style="margin-top:12px;">
            <a href="Rapport_Projet_PointageAntenne_Gonon_Carrière.pdf" target="_blank" style="color:#00bcd4;">Télécharger le rapport projet pointage antenne (PDF)</a>
        </p>
    `;
            } else if (type === 'projetpcb') {
                content = `
        <h2>Sujet stage BUT3 - Conception d'un outillage d'essai de cartes de mesure</h2>
        <p>Ce projet intervient dans le cadre du stage de fin d'études du BUT3 GEII. 
        L'objectif pour le stagiaire est de concevoir, programmer et tester un prototype de banc d'essai pour des cartes de mesure
        de rayonnements ionisants. Le système doit générer des impulsions électriques venant simuler la captation d'une particule radioactive
        par un capteur spécifique.<br>
        Ce projet est mené en collaboration avec les équipes de Mirion Technologies Lamanon pour une durée de 14 semaines.
        Au cours de cette période, j'ai pu mettre en pratique les connaissances que j'ai vues au cours du BUT GEII, principalement
        la programmation embarquée, la conception de carte électronique et la réalisation d'essais sur une carte.</p>
        <iframe src="Rapport_Stage_BUT3_Carrière.pdf" width="100%" height="700px" style="border:none; border-radius:6px; background:#222; margin-top:24px;"></iframe>
        <p style="margin-top:12px;">
            <a href="Rapport_Stage_BUT3_Carrière.pdf" target="_blank" style="color:#00bcd4;">Télécharger le rapport de stage (PDF)</a>
        </p>
    `;
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
        <div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start; margin-bottom: 24px;">
            <div style="flex:1 1 320px; min-width:220px; max-width:480px;">
                <h3>Baccalauréat Général</h3>
                <ul>
                    <li>Spécialités : Mathématiques & Sciences de l'Ingénieur</li>
                    <li>Option Mathématiques Expertes</li>
                    <li>Lycée Rouvière (2022)</li>
                </ul>
                <div class="image-container" style="max-width:260px; margin: 16px auto; background:rgba(255,255,255,0.35); border-radius:18px; padding:18px;">
                    <img src="logo_rouviere_250_63.png" alt="Lycée Rouvière" class="responsive-image">
                </div>
            </div>
            <div style="flex:1 1 320px; min-width:220px; max-width:480px;">
                <h3>BUT GEII</h3>
                <ul>
                    <li>Génie Électrique et Informatique Industrielle</li>
                    <li>Spécialité : Électronique et Systèmes Embarqués</li>
                    <li>IUT de Toulon (2022-2025)</li>
                </ul>
                <div class="image-container" style="max-width:260px; margin: 16px auto; background:rgba(255,255,255,0.35); border-radius:18px; padding:18px;">
                    <img src="2MF-Logos-partenaires-700px-Univ-TLN-V1.webp" alt="Logo GEII" class="responsive-image">
                </div>
            </div>
        </div>
        <div style="margin-bottom: 24px;">
            <h3>À venir</h3>
            <ul>
                <li>INSA Rennes – Ingénieur Électronique, Systèmes Embarqués et Télécommunications (en alternance)</li>
                <li>Projet de poursuite en doctorat selon opportunités</li>
            </ul>
            <div class="image-container" style="max-width:420px; margin: 16px auto; background:rgba(255,255,255,0.35); border-radius:18px; padding:18px;">
                <img src="insa-fiche-site.png" alt="Logo INSA Rennes" class="responsive-image">
            </div>
        </div>
    `;
            } else if (type === 'passions') {
                content = `
        <h2>Mes centres d'intérêt</h2>
        <div style="display:flex; gap:16px; margin-bottom:24px;">
            <button class="passion-btn" data-passion="musique">Musique</button>
            <button class="passion-btn" data-passion="histoire et jeux vidéos">Histoire et Jeux vidéos</button>
        </div>
        <div id="passion-content">
            <!-- Contenu par défaut (Musique) -->
            <h3>Musique</h3>
            <p>Si vous demandez à mes amis (je n'ai que toi Valentin à l'aide) ils vous diront
                que ce qui me définit le plus est mon amour inconditionnel pour la musique et tout particulièrement pour
                le Metal et ses genres.</p>
            <p>En effet, c'est en l'an de grâce 2015 que je découvre cet univers avec le
                groupe Megadeth et leur titre "Rust In Peace... Polaris" qui reste pour moi l'un des meilleurs morceaux
                du genre tout entier</p>
            <p>Continuant mon aventure dans ce monde, je commence à m'intéresser à de nombreux
                groupes et genres apparentés au Trash Metal de Megadeth.
                Je finis alors par découvrir un groupe français reconnu pour sa musique engagée et traitant de sujets comme
                l'écologie ou l'emprise psychique. À cette époque,
                ce "petit" groupe attire ma curiosité et se forgea une place importante
                au sein de mes playlists.
                Mais c'est alors qu'un jour, le dimanche 2 juillet 2023, alors que j'eus pu assister au premier concert
                de Métal de ma vie dans les Arènes de Nîmes.
                La première partie venait de se finir et c'est là, dès les premiers instants de jeu du groupe que j'étais
                venu voir, que j'ai compris qu'un nom resterait gravé à jamais dans ma mémoire.
            </p>
            <p>Ce nom était :</p>
            <div class="image-container" style="max-width: 1000px; align-items: center;">
                <img src="gojira.jpg" alt="Gojira" class="responsive-image">
            </div>
            <div class="image-text-container reverse">
                <p>Encore une fois, si vous demandez à Valentin ce qui me caractérise le mieux,
                    il vous répondra sûrement qu'il s'agit de mon obsession pour ce groupe (ou alors pour l'URSS mais on y
                    reviendra peut-être plus tard)
                    Je pense effectivement pouvoir dire que je suis un de leurs plus grands fans depuis cet événement.
                    Étant guitariste, je suis évidemment capable de jouer au moins la moitié de tous leurs titres. Et
                    comme en témoigne mon étagère, l'amour peut coûter cher :</p>
                <div class="image-container">
                    <img src="lescds.jpg" alt="les cd de la mort" class="responsive-image">
                </div>
            </div>
        </div>
    `;
            } else if (type === 'cv') {
                content = `
        <h2>Mon CV</h2>
        <iframe src="CV_Carrière_Lilian.pdf" width="100%" height="900px" style="border:none; border-radius:6px; background:#222;"></iframe>
        <p style="margin-top:12px;"><a href="CV_Carrière_Lilian.pdf" target="_blank" style="color:#00bcd4;">Télécharger le CV (PDF)</a></p>
    `;
            } else if (type === 'aptitudes') {
                content = `
        <h2>Mes Aptitudes</h2>
        <div style="display: flex; gap: 32px; flex-wrap: wrap; justify-content: center; margin-bottom: 24px;">
            <div style="background:rgba(20,40,70,0.92); border-radius:16px; box-shadow:0 2px 16px #1e2746; padding:28px 22px; min-width:220px; max-width:340px; flex:1 1 220px; display:flex; flex-direction:column; align-items:center;">
                <span style="font-size:2.2rem; margin-bottom:10px;">🤝</span>
                <h3 style="color:#3fa7d6; margin-bottom:12px;">Soft Skills</h3>
                <ul style="text-align:left; padding-left:18px; margin:0;">
                    <li>Travail en équipe</li>
                    <li>Communication</li>
                    <li>Adaptabilité</li>
                    <li>Esprit d'analyse</li>
                    <li>Créativité</li>
                    <li>Gestion du temps</li>
                    <li>Curiosité</li>
                </ul>
            </div>
            <div style="background:rgba(20,40,70,0.92); border-radius:16px; box-shadow:0 2px 16px #1e2746; padding:28px 22px; min-width:220px; max-width:340px; flex:1 1 220px; display:flex; flex-direction:column; align-items:center;">
                <span style="font-size:2.2rem; margin-bottom:10px;">🛠️</span>
                <h3 style="color:#3fa7d6; margin-bottom:12px;">Hard Skills</h3>
                <ul style="text-align:left; padding-left:18px; margin:0;">
                    <li>Programmation (C/C++, Python, JavaScript)</li>
                    <li>Électronique analogique et numérique</li>
                    <li>Conception de cartes électroniques (PCB)</li>
                    <li>Maîtrise de l'environnement Linux</li>
                    <li>Utilisation d'outils de CAO (KiCad, Altium)</li>
                    <li>Rédaction de dossiers techniques</li>
                    <li>Anglais technique</li>
                </ul>
            </div>
        </div>
        <p style="text-align:center; color:#b0b8d1; margin-top:18px;">Ces aptitudes sont le fruit de mes expériences académiques, projets et stages.</p>
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

    // Après avoir injecté le contenu, ajoute ce bloc juste après l'injection de la modale :
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = btn.getAttribute('data-modal');
            if (type === 'passions') {
                setTimeout(() => {
                    const passionContent = document.getElementById('passion-content');
                    document.querySelectorAll('.passion-btn').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const passion = btn.getAttribute('data-passion');
                            if (passion === 'musique') {
                                passionContent.innerHTML = `
                                    <h3>Musique</h3>
                                    <p>Si vous demandez à mes amis (je n'ai que toi Valentin à l'aide) ils vous dirons
                                        que ce qui me défini le plus est mon amour inconditionnel pour la musique et tout particulièrement pour
                                        le Metal et ses genres.</p>
                                    <p>En effet, c'est en l'an de grâce 2015 que je découvre cet univers avec le
                                        groupe Megadeth et leur titre "Rust In Peace... Polaris" qui reste pour moi l'un des meilleurs morceau
                                        du genre tout entier</p>
                                    <p>Continuant mon aventure dans ce monde, je commence à m'intéresser à de nombreux
                                        groupes et genres apparentés au Trash Metal de Megadeth.
                                        Je finis alors par découvrir un groupe français reconnue pour sa musique au états-unis. A cette époque,
                                        ce "petit" groupe attire ma curiosité et se forgea une place importante
                                        au sein de mes playlists.
                                        Mais c'est alors qu'un jour, le Dimande 2 Juillet 2023 alors que j'eusse pu assister au premier concert
                                        de Métal de ma vie dans les Arènes de Nîmes.
                                        La première partie venait de se finir et c'est là, dès les premiers instant de jeu du groupe que j'était
                                        venu voir que j'ai compris qu'un nom resterai gravé à jamais dans ma mémoire.
                                    </p>
                                    <p>Ce nom était :</p>
                                    <div class="image-container" style="max-width: 1000px; align-items: center;">
                                        <img src="gojira.jpg" alt="Gojira" class="responsive-image">
                                    </div>
                                    <div class="image-text-container reverse">
                                        <p>Encore une fois, si vous demandez à Valentin ce qui me caratérise le mieux,
                                            il vous répondra surement qu'il s'agit de mon obsession pour ce groupe (ou alors pour l'URSS mais on y
                                            reviendra peut être plus tard)
                                            Je pense effectivement pouvoir dire que je suis un de leur plus grand fan depuis cet évennement.
                                            Etant guitariste, je suis évidement capable de jouer au moins la moitié de tous leurs titres. Et
                                            comme en témoigne mon étagère, l'amour peut coûter cher :</p>
                                        <div class="image-container">
                                            <img src="lescds.jpg" alt="les cd de la mort" class="responsive-image">
                                        </div>
                                    </div>
                                `;
                            } else if (passion === 'histoire et jeux vidéos') {
                                passionContent.innerHTML = `
                                    <h3>Histoire & Jeux vidéos</h3>
                                    <p>Depuis tout petit, je suis passionné par l'histoire et la géographie (oui je
                                        sais un passe-temps relativement "chiant" pour une majorité de personnes qui, à cet âge, préfèrent manger
                                        des bonbons).</p>
                                    <p>Et en ajoutant à cela mon amour pour les jeux vidéo, il était évident que
                                        je tomberais amoureux d'une licence aussi mythique que celle des Sid Meier's Civilization. Et avec
                                        la sortie du VII opus (oui on compte en chiffre romain quand on doit prouver des choses) le 11
                                        février (enfin le VI pour les gens privilégiés comme moi (si privilégié veut dire payer le jeu II
                                        fois plus cher)) on peut dire que mes heures de sommeil sont sur le point de subir une nette restriction budgétaire.</p>
                                    <div style="display: flex; gap: 16px; justify-content: center; margin-top: 24px;">
                                        <img src="CIV7.png" alt="Civilization VII" class="responsive-image" style="max-width:400px;">
                                        <img src="civ6.jpg" alt="Civilization VI" class="responsive-image" style="max-width:400px;">
                                    </div>
                                    <div style="display: flex; justify-content: center; margin-top: 16px;">
                                        <img src="civ5.jpg" alt="Civilization V" class="responsive-image" style="max-width:400px;">
                                    </div>
                                    <p>Je me suis aussi très vite pris des jeux d'un studio permettant d'incarner des dirigeants et des pays pour refaire l'histoire à notre manière. Je parle évidemment
                                    des jeux de Paradox Interactive, tels que Europa Universalis et Crusader Kings.</p>
                                    <div style="display: flex; gap: 16px; justify-content: center; margin-top: 24px;">
                                        <img src="europa-universalis.jpg" alt="Europa Universalis IV" class="responsive-image" style="max-width:400px;">
                                        <img src="ck3.jpg" alt="Crusader Kings III" class="responsive-image" style="max-width:400px;">
                                    </div>
                                    <p>Bien que ces jeux ne soient pas des simulateurs historiques à proprement parler, ils permettent d'explorer des périodes fascinantes de l'histoire tout en s'amusant.
                                    Et permettent néanmoins d'accroître ses connaissances sur les contextes historiques et les enjeux de certaines époques.</p>
                                `;
                            } else if (passion === 'jeux') {
                                passionContent.innerHTML = `
                                    
                                `;
                            }
                        });
                    });
                }, 0);
            }
        });
    });
});

