// Initialisation des animations et fonctionnalités
document.addEventListener('DOMContentLoaded', function() {
    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observer les cartes
    document.querySelectorAll('.glass-card, .card').forEach(card => {
        observer.observe(card);
    });

    // Calcul du prix amélioré
    if (window.calculer) {
        window.calculer = function() {
            const longueur = parseFloat(document.getElementById('L').value) || 0;
            const largeur = parseFloat(document.getElementById('l').value) || 0;
            const hauteur = parseFloat(document.getElementById('h').value) || 0;
            
            if (longueur <= 0 || largeur <= 0 || hauteur <= 0) {
                document.getElementById('res').innerHTML = 
                    '<div style="color:#ff6b6b; background:rgba(255,107,107,0.1); padding:15px; border-radius:8px; border:1px solid rgba(255,107,107,0.3)">Veuillez entrer des dimensions valides</div>';
                return;
            }
            
            const v = (longueur * largeur * hauteur) / 1000000;
            let p = 0;
            let tarif = '';
            
            if (v <= 0.1) { p = 50; tarif = "Carton (0,1 m³)"; }
            else if (v <= 0.5) { p = 195; tarif = "0,5 m³"; }
            else if (v <= 1) { p = 390; tarif = "1 m³"; }
            else if (v <= 2) { p = 780; tarif = "2 m³"; }
            else if (v <= 5) { p = 1950; tarif = "5 m³"; }
            else if (v <= 10) { p = 3900; tarif = "10 m³"; }
            else { 
                document.getElementById('res').innerHTML = `
                    <div style="background:linear-gradient(135deg, rgba(255,87,51,0.1), rgba(0,43,92,0.2)); padding:25px; border-radius:12px; border:1px solid var(--orange-mada)">
                        <h3 style="margin-top:0; color:var(--orange-mada)">Volume : ${v.toFixed(2)} m³</h3>
                        <p>Sur devis personnalisé</p>
                        <button onclick="window.location.href='contact.html'" style="margin-top:15px; background:var(--orange-mada); color:white; padding:12px 30px; border:none; border-radius:8px; cursor:pointer">
                            Demander un devis
                        </button>
                    </div>`;
                return;
            }
            
            document.getElementById('res').innerHTML = `
                <div style="background:linear-gradient(135deg, rgba(0,43,92,0.2), rgba(255,87,51,0.1)); padding:25px; border-radius:12px; border:1px solid rgba(255,255,255,0.1)">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px">
                        <div>
                            <h3 style="margin:0 0 10px 0; color:var(--text-light)">Estimation</h3>
                            <p style="color:var(--text-muted)">Tarif : ${tarif}</p>
                        </div>
                        <div style="text-align:right">
                            <div style="font-size:2.5rem; font-weight:700; color:var(--orange-mada); line-height:1">${p.toLocaleString('fr-FR')} €</div>
                            <p style="color:var(--text-muted); font-size:0.9rem">TTC</p>
                        </div>
                    </div>
                    <div style="margin-top:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:8px">
                        <p style="margin:0; color:var(--orange-mada)">
                            <strong>Volume calculé :</strong> ${v.toFixed(3)} m³
                        </p>
                    </div>
                </div>`;
        };
    }

    // Validation du formulaire de contact
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nom = this.querySelector('input[type="text"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (!nom || !message) {
                alert('Veuillez remplir tous les champs obligatoires');
                return;
            }
            
            // Simulation d'envoi
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Envoi en cours...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = '✓ Message envoyé !';
                btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Ajout de la date actuelle dans le footer
    const footer = document.querySelector('footer');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2026', year);
    }
});

// Effet de particules subtiles pour le fond
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.1, random: true },
                size: { value: 2, random: true },
                line_linked: { enable: false },
                move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" }
            }
        });
    }
}

// Ajouter un élément de particules au body si désiré
document.body.insertAdjacentHTML('beforeend', '<div id="particles-js" style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:-1;"></div>');