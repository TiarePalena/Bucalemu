// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animar icono de hamburguesa
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Dropdown para móvil
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', (e) => {
        // En móvil, prevenir navegación y mostrar/ocultar dropdown
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// cerrar menu al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // No cerrar si es un dropdown en móvil
        const isMobileDropdown = link.closest('.dropdown') && window.innerWidth <= 768;
        
        if (!isMobileDropdown) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Cerrar todos los dropdowns
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
});

// Master Plan Modal
const masterplanImage = document.getElementById('masterplanImage');
const masterplanModal = document.getElementById('masterplanModal');
const masterplanModalClose = document.querySelector('.masterplan-modal-close');

if (masterplanImage) {
    masterplanImage.addEventListener('click', () => {
        masterplanModal.classList.add('active');
    });
}

if (masterplanModalClose) {
    masterplanModalClose.addEventListener('click', () => {
        masterplanModal.classList.remove('active');
    });
}

window.addEventListener('click', (event) => {
    if (event.target == masterplanModal) {
        masterplanModal.classList.remove('active');
    }
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentImageIndex = 0;

galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        lightboxImg.src = galleryItems[currentImageIndex].src;
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        lightboxImg.src = galleryItems[currentImageIndex].src;
    });
}

window.addEventListener('click', (event) => {
    if (event.target == lightbox) {
        lightbox.classList.remove('active');
    }
});

// Teclado para lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            lightboxImg.src = galleryItems[currentImageIndex].src;
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            lightboxImg.src = galleryItems[currentImageIndex].src;
        } else if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    }
});

// WhatsApp Modal
const whatsappFloat = document.getElementById('whatsapp-float');
const whatsappModal = document.getElementById('whatsapp-modal');
const whatsappClose = document.querySelector('.whatsapp-close');
const whatsappForm = document.getElementById('whatsapp-form');

if (whatsappFloat) {
    whatsappFloat.addEventListener('click', () => {
        whatsappModal.classList.add('active');
    });
}

if (whatsappClose) {
    whatsappClose.addEventListener('click', () => {
        whatsappModal.classList.remove('active');
    });
}

window.addEventListener('click', (event) => {
    if (event.target == whatsappModal) {
        whatsappModal.classList.remove('active');
    }
});

// WhatsApp Form Submit
if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('ws-nombre').value;
        const email = document.getElementById('ws-email').value;
        const phone = document.getElementById('ws-phone').value;
        const tiempoCompra = document.getElementById('ws-tiempo-compra').value;
        const mensaje = document.getElementById('ws-mensaje').value;
        
        const text = `Hola, me gustaría consultar sobre Valle Bucalemu%0A%0ANombre: ${nombre}%0AEmail: ${email}%0ATeléfono: +56 9 ${phone}%0AQuiero comprar en: ${tiempoCompra}%0AMensaje: ${mensaje}`;
        
        const whatsappLink = `https://wa.me/56940329987?text=${text}`;
        window.open(whatsappLink, '_blank');
        
        whatsappForm.reset();
        whatsappModal.classList.remove('active');
    });
}

// Contact Form Submit
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = contactForm.querySelector('input[name="nombre"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const phone = contactForm.querySelector('input[name="telefono"]').value;
        const tiempoCompra = contactForm.querySelector('select[name="tiempo_compra"]').value;
        const mensaje = contactForm.querySelector('textarea[name="mensaje"]').value;
        
        const text = `Hola, me gustaría consultar sobre Valle Bucalemu%0A%0ANombre: ${nombre}%0AEmail: ${email}%0ATeléfono: ${phone}%0AQuiero comprar en: ${tiempoCompra}%0AMensaje: ${mensaje}`;
        
        const whatsappLink = `https://wa.me/56940329987?text=${text}`;
        window.open(whatsappLink, '_blank');
        
        contactForm.reset();
    });
}

// Phone number validation with libphonenumber-js
const phoneInput = document.getElementById('phone-input');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^\d+]/g, '');
        
        // Auto-agregar +56 si no empieza con +
        if (value.length > 0 && !value.startsWith('+')) {
            if (value.startsWith('56')) {
                value = '+' + value;
            } else if (value.startsWith('9')) {
                value = '+56' + value;
            } else {
                value = '+56' + value;
            }
        }
        
        // Formatear con libphonenumber-js
        try {
            const formatter = new libphonenumber.AsYouType('CL');
            e.target.value = formatter.input(value);
        } catch (err) {
            e.target.value = value;
        }
    });

    phoneInput.addEventListener('blur', () => {
        const phoneError = document.getElementById('phone-error');
        const value = phoneInput.value;
        
        if (!value) {
            phoneError.style.display = 'none';
            phoneInput.style.borderColor = '';
            return;
        }

        try {
            const phoneNumber = libphonenumber.parsePhoneNumber(value, 'CL');
            if (phoneNumber && phoneNumber.isValid()) {
                phoneError.style.display = 'none';
                phoneInput.style.borderColor = '#2ecc71';
                // Formatear al perder foco
                phoneInput.value = phoneNumber.formatInternational();
            } else {
                phoneError.textContent = 'Ingresa un número de teléfono válido';
                phoneError.style.display = 'block';
                phoneInput.style.borderColor = '#e74c3c';
            }
        } catch (err) {
            phoneError.textContent = 'Ingresa un número de teléfono válido';
            phoneError.style.display = 'block';
            phoneInput.style.borderColor = '#e74c3c';
        }
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observar elementos animables
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('will-animate');
    observer.observe(el);
});

document.querySelectorAll('.feature-item').forEach(el => {
    el.classList.add('will-animate');
    observer.observe(el);
});

document.querySelectorAll('.gallery-item').forEach(el => {
    el.classList.add('will-animate');
    observer.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});