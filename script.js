// Smooth scrolling mejorado para navegación
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80 // Altura del header fijo
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

// Event listeners para navegación
document.addEventListener("DOMContentLoaded", () => {
  // Navegación suave mejorada
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })

  // Smooth scroll alternativo para navegadores que no lo soporten
  if (!CSS.supports("scroll-behavior", "smooth")) {
    // Polyfill para smooth scroll
    const smoothScrollPolyfill = (target, duration = 800) => {
      const targetElement = document.getElementById(target)
      if (!targetElement) return

      const headerHeight = 80
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime = null

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
      }

      function ease(t, b, c, d) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
      }

      requestAnimationFrame(animation)
    }

    // Usar polyfill si el navegador no soporta smooth scroll
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href").substring(1)
        smoothScrollPolyfill(targetId)
      })
    })
  }

  // Resaltar enlace activo en navegación
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })
})

// Función mejorada para botones del hero
function scrollToProjects() {
  scrollToSection("proyectos")
}

// Función para abrir WhatsApp
function openWhatsApp() {
  const phoneNumber = "584120224932"
  const message = encodeURIComponent(
    "Hola José, estuve viendo tu portafolio y me interesa saber si me podrías ayudar con el siguiente trabajo",
  )
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappURL, "_blank")
}

// Función para abrir GitHub
function openGitHub() {
  window.open("https://github.com/jose022k", "_blank")
}

// Función para abrir LinkedIn
function openLinkedIn() {
  window.open("https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav", "_blank")
}

// Animaciones al hacer scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".skill-card, .project-card")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animate")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)

// Inicializar efectos cuando la página carga
window.addEventListener("load", () => {
  animateOnScroll()
})

// Mejorar el scroll suave en dispositivos móviles
document.documentElement.style.scrollBehavior = "smooth"



function downloadCV() {
    // Crea un enlace temporal
    const link = document.createElement('a');
    link.href = 'CV_JOSÉPALMA.pdf';   // archivo en la misma carpeta que index
    link.download = 'CV_JOSÉPALMA.pdf'; // nombre con el que se descargará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}





// Configuración de imágenes por proyecto (CORREGIDO)
const projectImages = {
    "Sofware control de nómina - Web": [
        "imagenes/ETIEVAN_1.png",
        "imagenes/ETIEVAN 2.png",
        "imagenes/ETIEVAN 3.png",
        "imagenes/ETIEVAN 4.png",
        "imagenes/ETIEVAN 5.png"
    ],
    "Sistema de reservas bibliotecarias - Web": [
         "imagenes/LIBRO 1.png",
        "imagenes/LIBRO 2.png",
        "imagenes/LIBRO 3.png",
        "imagenes/LIBRO 4.png",
        "imagenes/LIBRO 5.png"
    ],
    "Mini Casino - Web": [
        "imagenes/DOLLAR WIN 1.png",
        "imagenes/DOLLAR WIN 2.png",
        "imagenes/DOLLAR WIN 3.png",
        "imagenes/DOLLAR WIN 4.png",
        "imagenes/DOLLAR WIN 5.png"
    ]
};

// Elementos del modal
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalPrev = document.querySelector(".modal-nav.modal-prev");
const modalNext = document.querySelector(".modal-nav.modal-next");
const modalCounter = document.querySelector(".modal-counter");

let currentImages = [];
let currentIndex = 0;

// Función para abrir el modal con imágenes
function openModal(projectTitle) {
    currentImages = projectImages[projectTitle] || [];
    if (currentImages.length === 0) return;

    currentIndex = 0;
    modalImg.src = currentImages[currentIndex];
    modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    modal.style.display = "flex";
}

// Navegación
modalPrev.onclick = (e) => {
    e.stopPropagation(); // Evita que cierre al hacer clic en botón
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModalImage();
};

modalNext.onclick = (e) => {
    e.stopPropagation(); // Evita que cierre al hacer clic en botón
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModalImage();
};

function updateModalImage() {
    modalImg.src = currentImages[currentIndex];
    modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

// Cerrar al hacer clic en el fondo (fuera del contenido)
modal.onclick = () => {
    modal.style.display = "none";
};

// Evitar que se cierre al hacer clic dentro del contenido (imagen, botones, contador)
document.querySelector(".modal-content").onclick = (e) => {
    e.stopPropagation();
};

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") modal.style.display = "none";
    if (e.key === "ArrowRight" && modal.style.display === "flex") modalNext.click();
    if (e.key === "ArrowLeft" && modal.style.display === "flex") modalPrev.click();
});

// Asignar eventos a los botones "Ver Proyecto"
document.querySelectorAll('.project-card').forEach(card => {
    const title = card.querySelector('h3').textContent;
    const btn = card.querySelector('.btn-outline');
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita conflicto
        openModal(title);
    });
});
