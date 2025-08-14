# HEXAFY

HEXAFY - Tech Education Platform
Description
HEXAFY is a modern tech education platform that offers courses, internships, and career development opportunities for aspiring technologists. This repository contains the complete frontend implementation of the HEXAFY platform, featuring:

Responsive landing page with animated components

Course catalog with filtering options

Internship listings with company details

Certificate verification system

Admin dashboard for managing students, courses, and certificates

User authentication system (login/registration)

Contact form with validation

Neon-themed UI with dark/light mode toggle

The platform is built with HTML5, CSS3, and vanilla JavaScript, featuring smooth animations, responsive design, and an interactive user experience.

Features
Interactive UI: Neon-themed design with glowing elements and smooth animations

Responsive Design: Fully responsive across all device sizes

Dark/Light Mode: Toggle between dark and light themes

Certificate Verification: Secure system to verify issued certificates

Admin Dashboard: Management interface for platform administrators

Course Catalog: Filterable list of available courses

Internship Listings: Detailed internship opportunities with company information

Testimonial Slider: 3D cube slider showcasing student success stories

Form Validation: Client-side validation for all forms

Password Strength Meter: Visual feedback for password creation

Installation
To run this project locally, follow these steps:

Clone the repository:

bash
git clone https://github.com/yourusername/hexafy.git
cd hexafy
The project doesn't require any build tools or dependencies as it's built with vanilla HTML, CSS, and JavaScript. Simply open any HTML file in your browser to view it.

For best results, use a local development server to avoid CORS issues with fonts and other resources. You can use Python's built-in server:

bash
python3 -m http.server 8000
Then open http://localhost:8000 in your browser.

Usage
Pages Overview
index.html: Main landing page with stats, course previews, and testimonials

courses.html: Complete course catalog with filtering options

internships.html: Internship listings with company information

verify-certificate.html: Certificate verification system

contact-us.html: Contact form with multiple departments

login.html: User login page

register.html: User registration page

admin.html: Admin dashboard (protected area)

JavaScript Functionality
The main JavaScript file (script.js) includes:

Navigation menu toggle for mobile

Scroll reveal animations

Theme toggle (dark/light mode)

Counter animations

3D testimonial cube slider

Form validations

Password strength meter

Certificate verification system

Admin panel functionality
