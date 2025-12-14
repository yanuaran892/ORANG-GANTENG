// Smooth scroll behavior for navigation links
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

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for scroll reveal
document.querySelectorAll('section').forEach(section => {
    section.classList.add('scroll-reveal');
    observer.observe(section);
});

// Skill cards reveal
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s forwards`;
});

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const hero = document.querySelector('.hero::before');
    if (hero) {
        document.querySelector('.hero').style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Add scroll class to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.borderBottomColor = 'rgba(51, 65, 85, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'var(--border-color)';
    }
});

// Typing animation for hero text
const animateHeroText = () => {
    const headlines = document.querySelectorAll('.animated-text');
    headlines.forEach(headline => {
        headline.classList.add('animated');
    });
};

// Call animation when page loads
window.addEventListener('load', () => {
    animateHeroText();
});

// Active nav link tracking
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--accent-light);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .scroll-reveal.reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
