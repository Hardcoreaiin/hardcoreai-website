document.addEventListener('DOMContentLoaded', () => {
    // Interactive Purple Dots Animation
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: null, y: null };

        // Configuration
        const particleCount = window.innerWidth < 768 ? 60 : 120;
        const connectionDistance = 140;
        const interactionRadius = 120; // Reduced radius
        const color = 'rgba(139, 92, 246, 0.6)'; // Light Purple/Violet

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.originX = this.x; // Anchor point
                this.originY = this.y;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                // Spring force to return to origin
                const dxOrigin = this.originX - this.x;
                const dyOrigin = this.originY - this.y;
                this.vx += dxOrigin * 0.05;
                this.vy += dyOrigin * 0.05;

                // Mouse interaction (Attraction/Disturbance)
                if (mouse.x != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < interactionRadius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (interactionRadius - distance) / interactionRadius;
                        const strength = 1.0;

                        this.vx += forceDirectionX * force * strength;
                        this.vy += forceDirectionY * force * strength;
                    }
                }

                // Heavy Friction for static feel
                this.vx *= 0.85;
                this.vy *= 0.85;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Connect particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.4 * (1 - distance / connectionDistance)})`; // Subtle purple lines
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            init();
        });

        init();
        animate();
    }

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve so animations can repeat if needed
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Waitlist Form Handling
    const form = document.getElementById('waitlistForm');
    const successMsg = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Collect form data
            const formData = new FormData(form);

            try {
                // Send to Web3Forms (free email service)
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Success state
                    form.style.display = 'none';
                    successMsg.classList.remove('hidden');
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your request. Please try again or email us directly at hardcore.ai1234@gmail.com');
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // Review Form Handling
    const reviewForm = document.getElementById('reviewForm');
    const reviewSuccessMsg = document.getElementById('reviewSuccessMessage');
    const starRating = document.getElementById('starRating');
    const ratingValue = document.getElementById('ratingValue');

    // Star Rating Interaction
    if (starRating) {
        const stars = starRating.querySelectorAll('.star');
        let selectedRating = 0;

        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.dataset.rating);
                ratingValue.value = selectedRating;
                updateStars(selectedRating);
            });

            star.addEventListener('mouseenter', () => {
                const hoverRating = parseInt(star.dataset.rating);
                updateStars(hoverRating);
            });
        });

        starRating.addEventListener('mouseleave', () => {
            updateStars(selectedRating);
        });

        function updateStars(rating) {
            stars.forEach(star => {
                const starRating = parseInt(star.dataset.rating);
                if (starRating <= rating) {
                    star.classList.add('active');
                    star.textContent = '★';
                } else {
                    star.classList.remove('active');
                    star.textContent = '☆';
                }
            });
        }
    }

    // Review Form Submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate rating
            if (!ratingValue.value) {
                alert('Please select a star rating before submitting.');
                return;
            }

            const btn = reviewForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Submitting...';
            btn.disabled = true;

            // Collect form data
            const formData = new FormData(reviewForm);

            try {
                // Send to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Success state
                    reviewForm.style.display = 'none';
                    reviewSuccessMsg.classList.remove('hidden');
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your review. Please try again or email us directly at hardcore.ai1234@gmail.com');
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#pilot') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Scrollytelling Process Section
    const processSteps = document.querySelectorAll('.step-item');
    const processImages = document.querySelectorAll('.process-img');

    if (processSteps.length > 0 && processImages.length > 0) {
        const processObserverOptions = {
            threshold: 0.5, // Trigger when 50% of the step is visible
            rootMargin: '0px'
        };

        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target.dataset.step;

                    // Activate corresponding step
                    processSteps.forEach(s => s.classList.remove('active'));
                    entry.target.classList.add('active');

                    // Activate corresponding image
                    processImages.forEach(img => {
                        img.classList.remove('active');
                        if (img.dataset.step === step) {
                            img.classList.add('active');
                        }
                    });
                }
            });
        }, processObserverOptions);

        processSteps.forEach(step => {
            processObserver.observe(step);
        });
    }
});
