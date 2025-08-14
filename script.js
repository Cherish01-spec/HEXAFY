document.addEventListener('DOMContentLoaded', function() {
    // Initialize common components
    initNavbar();
    initScrollReveal();
    initThemeToggle();
    
    // Page-specific initializations
    if (document.querySelector('.hero')) {
        // Homepage
        initNotificationBanner();
        initCounters();
        initTestimonialCube();
    } 
    
    if (document.getElementById('verifyForm')) {
        // Certificate verification page
        initCertificateVerification();
    }
    
    if (document.querySelector('.admin-dashboard')) {
        // Admin panel
        initAdminPanel();
    }
    
    if (document.getElementById('contactForm')) {
        // Contact page
        initContactForm();
    }
    
    if (document.querySelector('.auth-card')) {
        // Auth pages
        initAuthForms();
        initPasswordToggle();
        if (document.getElementById('registerPassword')) {
            initPasswordStrength();
        }
    }
});

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
            
            // Update icon
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            
            // Save preference to localStorage
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('hexafy-dark-mode', isDark);
        });

        // Check for saved theme preference
        if (localStorage.getItem('hexafy-dark-mode') === 'false') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// Navigation
function initNavbar() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect on header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
}

// Notification banner
function initNotificationBanner() {
    const bannerContent = document.querySelector('.banner-content');
    if (bannerContent) {
        const bannerItems = bannerContent.querySelectorAll('span');
        bannerItems.forEach(item => {
            const clone = item.cloneNode(true);
            bannerContent.appendChild(clone);
        });
    }
}

// Scroll reveal animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(initCounters, 1);
        } else {
            counter.innerText = target + (counter.getAttribute('data-target').endsWith('+') ? '+' : '');
        }
    });
}

// Testimonial cube slider
function initTestimonialCube() {
    const cube = document.getElementById('testimonialCube');
    if (!cube) return;
    
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentFace = 0;
    let autoRotateInterval;
    
    // Set up dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentFace = parseInt(this.dataset.face);
            rotateCube();
            resetAutoRotate();
        });
    });
    
    // Rotate cube to show specific face
    function rotateCube() {
        const rotationY = -currentFace * 90;
        cube.style.transform = `rotateX(-15deg) rotateY(${rotationY}deg)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentFace);
        });
    }
    
    // Auto rotate cube
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            currentFace = (currentFace + 1) % 6;
            rotateCube();
        }, 5000);
    }
    
    // Reset auto rotate timer
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }
    
    // Start auto rotation
    startAutoRotate();
}

// Certificate verification
function initCertificateVerification() {
    const verifyForm = document.getElementById('verifyForm');
    const refreshCaptcha = document.getElementById('refreshCaptcha');
    const captchaCode = document.getElementById('captchaCode');
    const verificationResult = document.getElementById('verificationResult');
    const printResult = document.getElementById('printResult');
    const newVerification = document.getElementById('newVerification');
    
    if (!verifyForm) return;
    
    // Sample certificate data (in a real app, this would come from a backend)
    const sampleCertificates = {
        "HEX-7B92-4F1A-9C3D": {
            studentName: "Akash Sharma",
            programType: "Course Completion",
            programName: "React Masterclass",
            completionDate: "15 March 2025",
            status: "Valid"
        },
        "HEX-5A23-9D1F-7E4B": {
            studentName: "Priya Patel",
            programType: "Internship",
            programName: "Python Developer",
            completionDate: "22 April 2025",
            status: "Valid"
        }
    };
    
    // Generate random CAPTCHA
    function generateCaptcha() {
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }
    
    // Set initial CAPTCHA
    captchaCode.textContent = generateCaptcha();
    
    // Refresh CAPTCHA
    refreshCaptcha.addEventListener('click', function() {
        captchaCode.textContent = generateCaptcha();
    });
    
    // Form submission
    verifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const certificateNumber = document.getElementById('certificateNumber').value;
        const captchaInput = document.getElementById('captcha').value;
        
        // Validate CAPTCHA
        if (captchaInput !== captchaCode.textContent) {
            alert("Invalid CAPTCHA. Please try again.");
            captchaCode.textContent = generateCaptcha();
            return;
        }
        
        // Simulate verification (in a real app, this would be an API call)
        setTimeout(() => {
            if (sampleCertificates[certificateNumber]) {
                // Valid certificate
                const cert = sampleCertificates[certificateNumber];
                document.getElementById('resultCertNumber').textContent = certificateNumber;
                document.getElementById('resultStudentName').textContent = cert.studentName;
                document.getElementById('resultProgramType').textContent = cert.programType;
                document.getElementById('resultProgramName').textContent = cert.programName;
                document.getElementById('resultCompletionDate').textContent = cert.completionDate;
                document.getElementById('resultStatus').textContent = cert.status;
                document.getElementById('resultStatus').className = `status-${cert.status.toLowerCase()}`;
                
                verifyForm.style.display = 'none';
                verificationResult.style.display = 'block';
            } else {
                // Invalid certificate
                alert("Certificate not found. Please check the certificate number and try again.");
                captchaCode.textContent = generateCaptcha();
            }
        }, 1500);
    });
    
    // Print result
    if (printResult) {
        printResult.addEventListener('click', function() {
            window.print();
        });
    }
    
    // New verification
    if (newVerification) {
        newVerification.addEventListener('click', function() {
            verifyForm.style.display = 'block';
            verificationResult.style.display = 'none';
            document.getElementById('certificateNumber').value = '';
            document.getElementById('captcha').value = '';
            captchaCode.textContent = generateCaptcha();
        });
    }
}

// Admin panel
function initAdminPanel() {
    // Sample admin panel functionality
    const addCertificateForm = document.getElementById('addCertificateForm');
    const adminVerifyForm = document.getElementById('adminVerifyForm');
    
    if (addCertificateForm) {
        addCertificateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Certificate added successfully (simulated)");
            this.reset();
        });
    }
    
    if (adminVerifyForm) {
        adminVerifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Verification complete (simulated)");
        });
    }
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            
            // Show success message
            alert("Thank you for your message! We'll get back to you soon.");
            this.reset();
        }, 2000);
    });
}

// Auth forms
function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            
            // Simulate login
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                alert("Network Issue. Try Again Later.");
            }, 2000);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            
            // Simulate registration
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                alert("Network Issue. Try Again Later.");
            }, 2000);
        });
    }
}

// Password toggle
function initPasswordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('loginPassword');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    const registerToggle = document.getElementById('registerTogglePassword');
    if (registerToggle) {
        registerToggle.addEventListener('click', function() {
            const passwordInput = document.getElementById('registerPassword');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }
}

// Password strength meter
function initPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character diversity
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update meter
        const width = (strength / 5) * 100;
        strengthMeter.style.width = `${width}%`;
        
        // Update colors and text
        if (strength <= 2) {
            strengthMeter.style.backgroundColor = '#ff0000';
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#ff0000';
        } else if (strength <= 3) {
            strengthMeter.style.backgroundColor = '#ff9900';
            strengthText.textContent = 'Medium';
            strengthText.style.color = '#ff9900';
        } else {
            strengthMeter.style.backgroundColor = '#00ff00';
            strengthText.textContent = 'Strong';
            strengthText.style.color = '#00ff00';
        }
    });
}