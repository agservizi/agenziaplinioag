// Inizializza Swiper
const swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// Inizializza lo slider per le testimonianze
const testimonialSwiper = new Swiper(".mySwiperTestimonials", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
});

// Inizializza Rellax
const rellax = new Rellax('.rellax', {
    speed: -2,
    center: true,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
});

// Inizializza AOS
AOS.init({
    duration: 800,
    once: true,
});

// Animazione GSAP per la navbar
gsap.from(".navbar", {
    opacity: 0,
    y: -50,
    duration: 1,
    delay: 0.5,
});

// Animazioni GSAP per le sezioni
gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
    });
});

// Scroll fluido
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar toggle aggiornato per Tailwind
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('navMenu');
    toggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
});

// Gestione dell'attivazione del menu: mantieni is-active dopo il click
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.navbar-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            navItems.forEach(i => i.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Funzione per impostare il link attivo in base all'URL (hash)
function setActiveLink() {
    const currentHash = window.location.hash;
    const navItems = document.querySelectorAll('.navbar-item');
    navItems.forEach(item => {
        // Se il valore href corrisponde allo hash corrente, aggiungi is-active
        if(item.getAttribute('href') === currentHash) {
            item.classList.add('is-active');
        } else {
            item.classList.remove('is-active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Imposta subito in base all'URL
    setActiveLink();

    // Gestione del click sul menu
    const navItems = document.querySelectorAll('.navbar-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Se si naviga a una sezione, aggiorna lo hash
            // (in questo modo setActiveLink verrà richiamato anche su hashchange)
            navItems.forEach(i => i.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Aggiorna al cambiamento dell'hash per mantenere attivo il link
window.addEventListener('hashchange', setActiveLink);

// Gestione del form della newsletter
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('newsletterMessage');
    message.classList.remove('is-hidden');
    setTimeout(() => {
        message.classList.add('is-hidden');
    }, 3000);
    this.reset();
});

// Gestione del cookie banner
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const rejectCookies = document.getElementById('rejectCookies');

if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.classList.add('is-active');
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('is-active');
});

rejectCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    cookieBanner.classList.remove('is-active');
});

// Aggiungi funzione throttle
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Gestione della sezione FAQ
document.addEventListener('DOMContentLoaded', () => {
    const faqMessages = document.querySelectorAll('.accordion .message');
    faqMessages.forEach(message => {
        const header = message.querySelector('.message-header');
        header.addEventListener('click', () => {
            message.classList.toggle('is-active');
            const expanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !expanded);
        });
    });
});

// Rimuovi il blocco che nasconde il preloader
/*
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        preloader.classList.add('hidden');
    }
});
*/

/*
// Modalità Light/Dark toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    // Aggiorna il testo del bottone in base al tema attivo
    if(document.body.classList.contains('light-theme')) {
        themeToggle.textContent = 'Modo Dark';
        // Persisti preferenza, se necessario:
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.textContent = 'Modo Light';
        localStorage.setItem('theme', 'dark');
    }
});

// Imposta il tema salvato in localStorage al caricamento
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = 'Modo Dark';
    }
});
*/

// Migliorare le transizioni tra sezioni con GSAP se necessario (esempio base):
gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%"
        }
    });
});

/* Include qui inizializzazioni comuni, animazioni e funzioni di utilità */

// Tariff search functionality
document.addEventListener('DOMContentLoaded', () => {
  const tariffSearch = document.getElementById('tariffSearch');
  const tariffCards = document.querySelectorAll('#tariffCards > div');
  if (tariffSearch) {
    tariffSearch.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      tariffCards.forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
    });
  }
});

// Countdown timer functionality
function startCountdown(endDate, elementId) {
  const countdownElement = document.getElementById(elementId);
  function updateCountdown() {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) {
      countdownElement.textContent = "Offerta terminata!";
      clearInterval(interval);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
}
document.addEventListener('DOMContentLoaded', () => {
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 3); // Offerta scade fra 3 giorni
  startCountdown(offerEndDate, 'countdown');
});

// Theme toggle (esempio light/dark)
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if(themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
  }
  if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light-theme');
  }
});