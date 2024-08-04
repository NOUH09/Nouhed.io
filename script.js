// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Highlight the active section in the navigation menu
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60; // Adjust for header height
        const sectionBottom = sectionTop + section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset <= sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Add a fade-in effect to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transition = 'opacity 1s ease-in-out';
    });

    const fadeInSections = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = 1;
            }
        });
    };

    window.addEventListener('scroll', fadeInSections);
    fadeInSections(); // Initial check to fade in elements on load

    // Set the height of images to 15 cm and make them span the full width
    const cmToPx = 37.8; // Approximate conversion from cm to px
    const targetHeightInCm = 15; // Final height set to 15 cm
    const targetHeightInPx = targetHeightInCm * cmToPx;

    const images = document.querySelectorAll('img');
    images.forEach(image => {
        // Set the new height to 15 cm in pixels
        image.style.height = targetHeightInPx + 'px';

        // Make the image span the full width
        image.style.width = '100%';

        // Apply object-fit to ensure the image covers the container properly
        image.style.objectFit = 'cover';
    });

    // Show the "Hello" modal on first visit
    const helloModal = document.getElementById('helloModal');
    const closeHelloModal = document.getElementById('closeHelloModal');

    if (!sessionStorage.getItem('hasVisited')) {
        helloModal.style.display = 'block';
        sessionStorage.setItem('hasVisited', 'true');
    }

    closeHelloModal.addEventListener('click', () => {
        helloModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === helloModal) {
            helloModal.style.display = 'none';
        }
    });
});
