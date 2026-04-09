/**
 * HardcoreAI App Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 1. Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        animateObserver.observe(el);
    });

    // 2. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(8, 10, 14, 0.98)';
                navbar.style.padding = '1rem 0';
            } else {
                navbar.style.background = 'rgba(8, 10, 14, 0.85)';
                navbar.style.padding = '1.25rem 0';
            }
        });
    }

    // 3. Notification Bar
    const bar = document.getElementById('cli-notify-bar');
    const close = document.getElementById('cli-notify-close');
    
    if (bar && close) {
        const dismiss = () => {
            bar.classList.add('hiding');
            setTimeout(() => bar.remove(), 450);
        };

        close.addEventListener('click', dismiss);
        setTimeout(dismiss, 8000);
    }
});

// Global function for onclick in HTML
window.cliWaitlistSubmit = function() {
    const input    = document.getElementById('cli-email');
    const feedback = document.getElementById('cli-feedback');
    const btn      = document.getElementById('cli-notify-btn');
    const email    = input.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.style.borderColor = '#ff5252';
        input.focus();
        return;
    }

    input.style.borderColor = '';
    input.disabled = true;
    btn.disabled   = true;
    btn.textContent = '✓ Done';
    btn.style.opacity = '0.6';
    feedback.classList.add('visible');
};
