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

// Leer parámetros UTM de la URL (o de sessionStorage si ya se capturaron antes)
function getUtmParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign'];
    const utms = {};
    utmKeys.forEach(function(key) {
        const val = urlParams.get(key);
        if (val) { sessionStorage.setItem(key, val); }
        utms[key] = sessionStorage.getItem(key) || '';
    });
    return utms;
}

// Enviar datos a Google Sheets via Apps Script
function sendToGoogleSheets(data) {
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbw5RkAsFLdNT6bzKCDRcWpf8M4Dg33ru0OZZg8nCsDf0DIW29w_wCfx2Kw9O_3F_95m/exec';
    fetch(appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(function() {});
}

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

        // Enviar a Google Sheets
        var utmsWs = getUtmParams();
        sendToGoogleSheets({
            nombre: nombre,
            email: email,
            telefono: phone,
            proyecto: 'Valle Bucalemu',
            plan: tiempoCompra,
            utm_source: utmsWs.utm_source,
            utm_medium: utmsWs.utm_medium,
            utm_campaign: utmsWs.utm_campaign,
            origen: 'Formulario WhatsApp'
        });
        
        whatsappForm.reset();
        whatsappModal.classList.remove('active');
    });
}

// Thank You Page
function showThankYouPage(data) {
    const footerForm = document.querySelector('.footer-form');
    if (footerForm) {
        footerForm.innerHTML = `
            <div style="text-align: center; padding: 50px 0;">
                <div style="background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.3); border-radius: 15px; padding: 50px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #fff; margin-bottom: 20px; font-size: 2rem;">¡Gracias por tu interés!</h2>
                    <p style="color: rgba(255,255,255,0.85); font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        Hemos recibido tu solicitud correctamente. Nuestro equipo se contactará contigo pronto para brindarte más información sobre Valle Bucalemu.
                    </p>
                    <p style="color: rgba(255,255,255,0.65); font-size: 14px; margin-bottom: 20px;">
                        <strong>Datos recibidos:</strong><br>
                        Nombre: ${data.nombre}<br>
                        Email: ${data.email}<br>
                        Teléfono: ${data.telefono}
                    </p>
                </div>
            </div>
        `;
    }
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

        const submitBtn = contactForm.querySelector('.btn-submit');
        if (submitBtn) submitBtn.disabled = true;

        // Enviar a Google Sheets via webhook
        var utms = getUtmParams();
        const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbw5RkAsFLdNT6bzKCDRcWpf8M4Dg33ru0OZZg8nCsDf0DIW29w_wCfx2Kw9O_3F_95m/exec';
        fetch(appsScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                telefono: phone,
                proyecto: 'Valle Bucalemu',
                plan: tiempoCompra,
                mensaje: mensaje,
                utm_source: utms.utm_source,
                utm_medium: utms.utm_medium,
                utm_campaign: utms.utm_campaign,
                origen: 'Formulario Contacto'
            })
        }).catch(function() {});

        // Mostrar thank you page
        showThankYouPage({ nombre: nombre, email: email, telefono: phone });
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
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal Reservar
const btnReservarNav = document.getElementById('btn-reservar-nav');
const reservarModal = document.getElementById('reservar-modal');
const reservarModalClose = document.querySelector('.reservar-modal-close');
const btnReservarAhora = document.getElementById('btn-reservar-ahora');

if (btnReservarNav) {
    btnReservarNav.addEventListener('click', (e) => {
        e.preventDefault();
        reservarModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function closeReservarModal() {
    reservarModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (reservarModalClose) {
    reservarModalClose.addEventListener('click', closeReservarModal);
}

if (btnReservarAhora) {
    btnReservarAhora.addEventListener('click', () => {
        closeReservarModal();
        const mensaje = encodeURIComponent('Hola, vi sus opciones de reservas y me interesa hacer una. ¿Me pueden dar más información?');
        window.open(`https://wa.me/56940329987?text=${mensaje}`, '_blank');
    });
}

if (reservarModal) {
    reservarModal.addEventListener('click', (e) => {
        if (e.target === reservarModal) {
            closeReservarModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reservarModal && reservarModal.classList.contains('active')) {
        closeReservarModal();
    }
});