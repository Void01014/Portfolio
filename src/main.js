import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    try {
        // 1. Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('py-4');
                navbar.classList.remove('py-6');
            } else {
                navbar.classList.add('py-6');
                navbar.classList.remove('py-4');
            }
        });

        // 2. Staggered Word Reveal (Hero Title)
        gsap.set('#hero-title', { perspective: 400 });
        gsap.from('#hero-title .word', {
            y: 40,
            opacity: 0,
            rotationX: -40,
            transformOrigin: "0% 50% -50",
            duration: 1.2,
            stagger: 0.1,
            ease: "back.out(1.4)",
        });

        gsap.from('#intro', {
            opacity: 0,
            y: -10,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
        });

        // 3. Hero Image Slider (Manual)
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        if (slides.length > 0) {
            slides[currentSlide].classList.add('active');

            const nextBtn = document.getElementById('next-slide');
            const prevBtn = document.getElementById('prev-slide');

            const showSlide = (index) => {
                slides.forEach(slide => slide.classList.remove('active'));
                slides[index].classList.add('active');
            };

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                });
            }
            
            // Auto slide for hero
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 5000);
        }

        // 4. Slider Container Entrance
        gsap.from('.slider-container', {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 1.2,
            delay: 0.8,
            ease: 'power3.out',
        });

        // Nav links
        gsap.from('.nav-link', {
            y: -8,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.1,
        });

        // 5. Automatic Screenshot Changer for Projects
        const screenshotContainers = document.querySelectorAll('.screenshot-container');
        screenshotContainers.forEach(container => {
            const images = container.querySelectorAll('.ss-img');
            if (images.length > 1) {
                let ssIndex = 0;
                setInterval(() => {
                    images[ssIndex].classList.remove('opacity-100');
                    images[ssIndex].classList.add('opacity-0');
                    
                    ssIndex = (ssIndex + 1) % images.length;
                    
                    images[ssIndex].classList.remove('opacity-0');
                    images[ssIndex].classList.add('opacity-100');
                }, 3000);
            }
        });

        // 6. Projects Section Animations
        gsap.from('.section-header h2, .section-header span', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 80%',
            }
        });

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                }
            });
        });

        // 7. About Section Animations
        gsap.from('#about-img', {
            opacity: 0,
            rotationY: 15,
            rotationX: 10,
            x: -40,
            scale: 0.95,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#about',
                start: 'top 75%',
            },
        });

        gsap.from('.about-content > *', {
            opacity: 0,
            x: 30,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#about',
                start: 'top 75%',
            }
        });

        // 8. Action Buttons Magnetic Hover
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            const xTo = gsap.quickTo(btn, "x", {duration: 0.4, ease: "power3"});
            const yTo = gsap.quickTo(btn, "y", {duration: 0.4, ease: "power3"});

            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - (rect.left + rect.width / 2);
                const relY = e.clientY - (rect.top + rect.height / 2);
                xTo(relX * 0.15); // 15% pull
                yTo(relY * 0.15);
            });

            btn.addEventListener("mouseleave", () => {
                xTo(0);
                yTo(0);
            });
        });

    } catch (error) {
        console.error('Animation init error', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}
