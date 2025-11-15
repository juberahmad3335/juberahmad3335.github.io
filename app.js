// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

let currentTheme = 'dark';

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);
});

// Navbar Scroll Effect
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

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Active Navigation Link
const sections = document.querySelectorAll('.section');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const roles = [
  'Implementation Analyst',
  'Configuration Expert',
  'Data Migration Specialist',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// Particles Animation
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.setProperty('--duration', (Math.random() * 10 + 5) + 's');
  particle.style.animationDelay = Math.random() * 5 + 's';
  particlesContainer.appendChild(particle);
}

// Cursor Trail Effect
const cursorTrail = document.getElementById('cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  
  requestAnimationFrame(animateTrail);
}

animateTrail();

// Scroll Animations (AOS alternative)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-item')) {
        const progressBar = entry.target.querySelector('.skill-progress');
        const progress = progressBar.getAttribute('data-progress');
        progressBar.style.setProperty('--progress-width', progress + '%');
        progressBar.style.width = progress + '%';
      }
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// Observe skill items
document.querySelectorAll('.skill-item').forEach(el => {
  observer.observe(el);
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    projectCards.forEach((card, index) => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.classList.add('aos-animate');
        }, index * 100);
      } else {
        card.style.display = 'none';
        card.classList.remove('aos-animate');
      }
    });
  });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  if (!phone) return true; // Phone is optional
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return re.test(phone);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message');
  formGroup.classList.add('error');
  errorElement.textContent = message;
}

function clearError(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
}

[nameInput, emailInput, phoneInput, messageInput].forEach(input => {
  input.addEventListener('input', () => clearError(input));
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let isValid = true;
  
  // Clear previous errors
  [nameInput, emailInput, phoneInput, messageInput].forEach(clearError);
  
  // Validate name
  if (nameInput.value.trim().length < 2) {
    showError(nameInput, 'Name must be at least 2 characters');
    isValid = false;
  }
  
  // Validate email
  if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate phone
  if (phoneInput.value && !validatePhone(phoneInput.value.trim())) {
    showError(phoneInput, 'Please enter a valid phone number');
    isValid = false;
  }
  
  // Validate message
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, 'Message must be at least 10 characters');
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Show loading state
  const submitBtn = contactForm.querySelector('.submit-btn');
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Simulate form submission (Replace with actual EmailJS implementation)
  try {
    // EmailJS configuration
    // emailjs.init('YOUR_PUBLIC_KEY');
    // const templateParams = {
    //   from_name: nameInput.value,
    //   from_email: emailInput.value,
    //   phone: phoneInput.value,
    //   message: messageInput.value
    // };
    // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showToast('Message sent successfully!', 'success');
    contactForm.reset();
  } catch (error) {
    showToast('Failed to send message. Please try again.', 'error');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Resume Actions
const downloadResumeBtn = document.getElementById('download-resume');
const printResumeBtn = document.getElementById('print-resume');

downloadResumeBtn.addEventListener('click', () => {
  // Create a link to download the resume
  const link = document.createElement('a');
  link.href = '/assets/resume.pdf';
  link.download = 'Juber_Ahmad_Resume.pdf';
  link.click();
  showToast('Resume download started', 'success');
});

printResumeBtn.addEventListener('click', () => {
  window.print();
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add stagger animation delays
document.querySelectorAll('[data-aos]').forEach((el, index) => {
  const delay = el.getAttribute('data-delay');
  if (delay) {
    el.style.transitionDelay = delay + 'ms';
  }
});

// Performance optimization: Reduce animations on mobile
if (window.innerWidth < 768) {
  // Disable cursor trail on mobile
  cursorTrail.style.display = 'none';
  
  // Reduce particle count
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    if (index > 20) {
      particle.remove();
    }
  });
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth < 768) {
      cursorTrail.style.display = 'none';
    } else {
      cursorTrail.style.display = 'block';
    }
  }, 250);
});