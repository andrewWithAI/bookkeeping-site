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
            if (navToggle.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Parallax scrolling effect
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        
        // Apply parallax effect to elements with data-parallax attribute
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    // Add parallax effect to hero and split sections
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const splitSections = document.querySelectorAll('.split-section');
    
    if (heroContent && heroImage) {
        heroContent.setAttribute('data-parallax', '0.2');
        heroImage.setAttribute('data-parallax', '0.1');
    }
    
    splitSections.forEach((section, index) => {
        const image = section.querySelector('.split-image');
        const content = section.querySelector('.split-content');
        
        if (image && content) {
            // Alternate parallax direction for each section
            if (index % 2 === 0) {
                image.setAttribute('data-parallax', '0.1');
                content.setAttribute('data-parallax', '0.2');
            } else {
                image.setAttribute('data-parallax', '0.2');
                content.setAttribute('data-parallax', '0.1');
            }
        }
    });
    
    // Only apply parallax effect on desktop
    if (window.innerWidth > 992) {
        window.addEventListener('scroll', parallaxScroll);
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
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                element.classList.add('animated');
            }
        });
    }
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('.section-title, .section-divider, .service-item, .stat-item, .contact-item').forEach(element => {
        element.classList.add('animate-on-scroll');
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add animated class to elements that are already visible
    document.querySelectorAll('.animated').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Check for elements to animate on page load
    window.addEventListener('load', animateOnScroll);
    
    // Check for elements to animate on scroll
    window.addEventListener('scroll', animateOnScroll);
    
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