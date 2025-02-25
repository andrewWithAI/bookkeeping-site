// JavaScript for Design 3
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle && navToggle.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Fix for theme switcher CORS error
    window.addEventListener('error', function(e) {
        // Ignore errors from theme-switcher.js
        if (e.filename && e.filename.includes('theme-switcher.js')) {
            console.log('Theme switcher error handled');
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
    
    // Modified parallax scrolling effect
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        
        // Apply parallax effect to elements with data-parallax attribute
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.1;
            // Use a more subtle parallax effect to avoid layout issues
            element.style.transform = `translateY(${scrolled * speed * 0.3}px)`;
        });
    }
    
    // Add parallax effect to hero and split sections with reduced intensity
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const splitSections = document.querySelectorAll('.split-section');
    
    if (heroContent && heroImage) {
        heroContent.setAttribute('data-parallax', '0.1');
        heroImage.setAttribute('data-parallax', '0.05');
    }
    
    splitSections.forEach((section, index) => {
        const image = section.querySelector('.split-image');
        const content = section.querySelector('.split-content');
        
        if (image && content) {
            // Use more subtle parallax values
            if (index % 2 === 0) {
                image.setAttribute('data-parallax', '0.05');
                content.setAttribute('data-parallax', '0.08');
            } else {
                image.setAttribute('data-parallax', '0.08');
                content.setAttribute('data-parallax', '0.05');
            }
        }
    });
    
    // Only apply parallax effect on desktop and ensure it doesn't break layout
    if (window.innerWidth > 992) {
        window.addEventListener('scroll', parallaxScroll);
        // Disable parallax on window resize if width becomes too small
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 992) {
                window.removeEventListener('scroll', parallaxScroll);
                // Reset any transforms
                document.querySelectorAll('[data-parallax]').forEach(element => {
                    element.style.transform = '';
                });
            } else {
                window.addEventListener('scroll', parallaxScroll);
            }
        });
    }
    
    // Animate service icons on hover
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const iconElement = this.querySelector('i');
            iconElement.style.transition = 'transform 0.6s ease';
            iconElement.style.transform = 'rotateY(360deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            const iconElement = this.querySelector('i');
            iconElement.style.transition = 'transform 0.6s ease';
            iconElement.style.transform = 'rotateY(0deg)';
        });
    });
    
    // Improved animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Trigger animation when element is 85% into the viewport
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('animated');
            }
        });
    }
    
    // Add animate-on-scroll class to elements with staggered delays
    const animatedElements = [
        '.section-title',
        '.section-divider',
        '.service-item',
        '.stat-item',
        '.contact-item',
        '.services-grid',
        '.stats-container',
        '.contact-info',
        '.form-container'
    ];
    
    // Apply animation classes with a small delay between element types
    animatedElements.forEach((selector, index) => {
        document.querySelectorAll(selector).forEach((element, elementIndex) => {
            element.classList.add('animate-on-scroll');
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            // Add a small delay based on element index for staggered animations
            const delay = index * 0.1 + elementIndex * 0.05;
            element.style.transition = `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`;
        });
    });
    
    // Ensure elements are visible even if JavaScript fails
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll:not(.animated)').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 2000);
    
    // Add animated class to elements that are already visible
    document.querySelectorAll('.animated').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Check for elements to animate on page load
    window.addEventListener('load', function() {
        // Delay initial animation check to ensure all elements are properly rendered
        setTimeout(animateOnScroll, 100);
    });
    
    // Check for elements to animate on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateOnScroll();
                scrollTimeout = null;
            }, 50);
        }
    });
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Get error elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            
            // Reset error messages
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            
            // Flag to track validation status
            let isValid = true;
            
            // Validate name (not empty)
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Please enter your name';
                isValid = false;
            }
            
            // Validate email (format)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate message (not empty and minimum length)
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Please enter your message';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            // If form is valid, simulate form submission
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                
                // Clear form fields
                contactForm.reset();
                
                // Create success message
                const formContainer = contactForm.closest('.form-container');
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #16c79a; margin-bottom: 15px;"></i>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out. I will get back to you as soon as possible.</p>
                    </div>
                `;
                
                // Replace form with success message
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
                
                // Restore form after 5 seconds (for demo purposes)
                setTimeout(() => {
                    formContainer.innerHTML = '';
                    formContainer.appendChild(contactForm);
                }, 5000);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});