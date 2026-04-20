


    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("navLinks");
    const overlay = document.getElementById("overlay");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
        navLinks.classList.remove("active");
    overlay.classList.remove("active");
  });



// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add('visible');
            observer.unobserve(el.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

// ── DATA ──
const courses = {
    1: {
        title: "Développement Web", description: "Apprenez à créer des sites modernes et performants",
        icon: "🌐", tags: ["HTML/CSS", "JavaScript", "React"], hours: "12h", chapters: [
            { name: "Introduction HTML", video: "https://www.youtube.com/embed/qz0aGYrrlhU", duration: "45 min" },
            { name: "CSS Moderne", video: "https://www.youtube.com/embed/1Rs2ND1ryYc", duration: "55 min" },
            { name: "JavaScript ES6+", video: "https://www.youtube.com/embed/W6NZfCO5SIk", duration: "1h20" }
        ]
    },
    2: {
        title: "Data Science", description: "Maîtrisez l'analyse de données et l'intelligence artificielle",
        icon: "📊", tags: ["Python", "Pandas", "ML"], hours: "8h", chapters: [
            { name: "Python Fondamentaux", video: "https://www.youtube.com/embed/_uQrJ0TkZlc", duration: "1h10" },
            { name: "Pandas & DataFrames", video: "https://www.youtube.com/embed/vmEHCJofslg", duration: "50 min" }
        ]
    },
    3: {
        title: "UI/UX Design", description: "Concevez des interfaces intuitives et esthétiques",
        icon: "🎨", tags: ["Figma", "Prototypage", "Research"], hours: "6h", chapters: [
            { name: "Introduction UX", video: "https://www.youtube.com/embed/3Yk1m9S7C0k", duration: "40 min" }
        ]
    }
};

let isLoggedIn = false;

// ── SHOW COURSE ──
function showCourse(id) {
    const c = courses[id];

    document.querySelectorAll('.course-card').forEach(el => el.classList.remove('active'));
    document.querySelector(`.course-card[data-id="${id}"]`).classList.add('active');

    const chaptersHTML = c.chapters.map((ch, i) => `
      <div class="chapter">
        <div class="chapter-top">
          <div class="chapter-left">
            <div class="chapter-num">${String(i + 1).padStart(2, '0')}</div>
            <div>
              <h4>${ch.name}</h4>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="chapter-duration">${ch.duration}</span>
            <button class="toggle-video" onclick="toggleVideo(this)">▶ Aperçu</button>
          </div>
        </div>
        <div class="video-wrap">
          <iframe src="${ch.video}" allowfullscreen></iframe>
        </div>
        <button class="btn-access" onclick="accessCourse()">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Commencer le chapitre
        </button>
      </div>
    `).join('');

    const tagsHTML = c.tags.map(t => `<span class="tag">${t}</span>`).join('');

    document.getElementById('courseDetails').innerHTML = `
      <div class="detail-header">
        <div class="detail-header-left">
          <h2>${c.icon} ${c.title}</h2>
          <p>${c.description}</p>
          <div class="detail-tags">${tagsHTML}</div>
        </div>
        <div class="detail-stats">
          <div class="stat-box"><div class="num">${c.chapters.length}</div><div class="lbl">Chapitres</div></div>
          <div class="stat-box"><div class="num">${c.hours}</div><div class="lbl">Durée</div></div>
        </div>
      </div>
      <div class="chapters-title">Contenu du cours</div>
      ${chaptersHTML}
    `;
}

// ── TOGGLE VIDEO ──
function toggleVideo(btn) {
    const wrap = btn.closest('.chapter').querySelector('.video-wrap');
    const isOpen = wrap.classList.toggle('open');
    btn.textContent = isOpen ? '✕ Fermer' : '▶ Aperçu';
}

// ── ACCESS ──
function accessCourse() {
    if (!isLoggedIn) document.getElementById('loginAlert').classList.add('show');
}
function closeModal() {
    document.getElementById('loginAlert').classList.remove('show');
}
window.addEventListener('click', e => {
    const modal = document.getElementById('loginAlert');
    if (e.target === modal) closeModal();
});

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── SEARCH ──
document.getElementById('searchInput').addEventListener('keyup', function () {
    const val = this.value.toLowerCase();
    document.querySelectorAll('.course-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(val) ? 'flex' : 'none';
    });
});

// ── FILTER PILLS ──
document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', function () {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.course-card').forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.level === filter) ? 'flex' : 'none';
        });
    });
});

// form submit
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;
    setTimeout(() => {
        document.getElementById('successBanner').classList.add('show');
        this.reset();
        btn.innerHTML = 'Message envoyé ✓';
        btn.style.background = 'rgba(0,200,100,0.25)';
        btn.style.boxShadow = 'none';
    }, 1200);
});


