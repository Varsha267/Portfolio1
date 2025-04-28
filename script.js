// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Modal functionality for project, certification, and achievement images
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalDesc = document.getElementById('modal-desc');
    const imageModalClose = document.getElementById('image-modal-close');

    // Animated Designation (Typewriter/Fade Effect)
    const titles = [
        'UI/UX DESIGNER',
        'Full Stack Developer',
        'Frontend Developer',
        'Problem Solver',
        'Computer Science Student'
    ];
    const designationSpan = document.querySelector('.animated-designation');
    let titleIndex = 0;
    let charIndex = 0;
    let typing = true;

    function showTitle(title) {
        designationSpan.textContent = title;
    }

    function typeWriter() {
        const currentTitle = titles[titleIndex];
        if (typing) {
            if (charIndex < currentTitle.length) {
                designationSpan.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeWriter, 70);
            } else {
                typing = false;
                setTimeout(typeWriter, 1200);
            }
        } else {
            if (charIndex > 0) {
                designationSpan.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeWriter, 30);
            } else {
                typing = true;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(typeWriter, 400);
            }
        }
    }
    if (designationSpan) {
        typeWriter();
    }

    // Add scrolled class to header when scrolling
    function toggleHeaderClass() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Highlight active section in navigation
    function highlightActiveSection() {
        let scrollPosition = window.scrollY + 100; // Adjusted offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        const triggerBottom = windowHeight * 0.8;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate-active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // Event Listeners
    window.addEventListener('scroll', toggleHeaderClass);
    window.addEventListener('scroll', highlightActiveSection);
    window.addEventListener('scroll', animateOnScroll);
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Initialize
    toggleHeaderClass();
    highlightActiveSection();
    animateOnScroll();

    // Add animation classes to elements
    document.querySelectorAll('.skill-card, .project-card, .internship-card, .certification-card, .achievement-card').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Add animation to section titles
    document.querySelectorAll('.section-title').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Helper to get description from card
    function getCardDescription(imgElem) {
        // Project
        let card = imgElem.closest('.project-card');
        if (card) {
            let desc = card.querySelector('.project-description');
            return desc ? desc.textContent : '';
        }
        // Certification
        card = imgElem.closest('.certification-card');
        if (card) {
            let desc = card.querySelector('.certification-title');
            return desc ? desc.textContent : '';
        }
        // Achievement
        card = imgElem.closest('.achievement-card');
        if (card) {
            let desc = card.querySelector('.achievement-description');
            return desc ? desc.textContent : '';
        }
        return '';
    }

    function openImageModal(imgElem) {
        modalImg.src = imgElem.src;
        modalImg.alt = imgElem.alt;
        modalDesc.textContent = getCardDescription(imgElem);
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
        modalImg.src = '';
        modalDesc.textContent = '';
    }

    // Add click listeners to all relevant images (including internship image)
    document.querySelectorAll('.project-image img, .certification-image img, .achievement-image img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            openImageModal(this);
        });
    });

    // Internship image modal
    const internshipCard = document.querySelector('.internship-card');
    const internshipImg = document.querySelector('.internship-image-cropped');
    if (internshipCard && internshipImg) {
        internshipCard.addEventListener('click', function(e) {
            // Prevent double event if image is clicked
            if (e.target.tagName === 'IMG') {
                openInternshipModal();
            } else {
                openInternshipModal();
            }
        });
        internshipImg.addEventListener('click', function(e) {
            e.stopPropagation();
            openInternshipModal();
        });
    }
    function openInternshipModal() {
        if (!internshipImg) return;
        modalImg.src = internshipImg.getAttribute('data-fullimg') || internshipImg.src;
        modalImg.alt = internshipImg.alt;
        // Show only the image, no description
        modalDesc.innerHTML = '';
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal on close button
    imageModalClose.addEventListener('click', closeImageModal);
    // Close modal when clicking outside modal content
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });

    // Contact Form Submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Use provided EmailJS values
            const serviceID = 'service_y1ftfu1';
            const templateID = 'template_dvzr2vh';
            const userID = 'mXsoi2pPVEL-hKXpQ';
            emailjs.sendForm(serviceID, templateID, contactForm, userID)
                .then(function() {
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 3500);
                }, function(error) {
                    formSuccess.style.display = 'block';
                    formSuccess.textContent = 'Sorry, there was an error. Please try again later.';
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                        formSuccess.textContent = 'Thank you! Your message has been sent.';
                    }, 3500);
                });
        });
    }

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    function setTheme(mode) {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.textContent = '🌙';
        }
    }
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
    themeToggle && themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    });
});