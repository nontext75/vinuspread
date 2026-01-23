// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct movement for the dot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Layout/Parallax mouse move effect
    const moveX = (posX - window.innerWidth / 2) * 0.05;
    const moveY = (posY - window.innerHeight / 2) * 0.05;

    // Parallax for hero content if it exists
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.to(heroContent, {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: "power2.out"
        });
    }

    // Trailing effect for outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Interactive Elements Hover
const hoverables = document.querySelectorAll('a, .gallery-item, button');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        cursorDot.style.backgroundColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorDot.style.backgroundColor = 'white';
    });
});


// Page Load Animation
function initPageAnimations() {
    const overlay = document.querySelector('.transition-overlay');

    // Animate Overlay Out (Reveal page)
    const tl = gsap.timeline();

    tl.to(overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.8,
        ease: "power4.inOut"
    });

    // Hero Animations specific to Index
    if (document.querySelector('.hero-title')) {
        tl.from(".logo, .nav-link", {
            y: -50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.3")
            .from(".hero-title .line", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out"
            }, "-=0.5")
            .from(".hero-subtitle", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.5");
    }

    // Detail Page Animations
    if (document.querySelector('.detail-title')) {
        tl.from(".detail-title", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(".info-item", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.5");
    }

    // Scroll Animations trigger setup
    initScrollAnimations();
}

function initScrollAnimations() {
    gsap.utils.toArray(".section-title, .gallery-item, .about-text, .project-description, .project-image").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
}

// Page Transition Logic
const links = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"])');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.href;

        // Animate Overlay In (Cover page)
        const overlay = document.querySelector('.transition-overlay');
        gsap.to(overlay, {
            scaleY: 1,
            transformOrigin: "bottom",
            duration: 0.6,
            ease: "power4.inOut",
            onComplete: () => {
                window.location.href = target;
            }
        });
    });
});

// Run Init
window.addEventListener('load', initPageAnimations);

// Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    // Stagger animation for links
    if (mobileMenu.classList.contains('active')) {
        gsap.to(mobileLinks, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2
        });
    } else {
        gsap.to(mobileLinks, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05
        });
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});
