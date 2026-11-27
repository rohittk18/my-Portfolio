// ===================================
// 1. MOBILE NAVIGATION MENU
// ===================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
    navLinks?.classList.remove("active");

    if (menuToggle) {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    }
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
});


// ===================================
// 2. DARK / LIGHT MODE
// ===================================

const themeToggle = document.querySelector("#themeToggle");

// Restore saved theme (localStorage can fail in private mode, so guard it)
try {
    if (localStorage.getItem("portfolio-theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
} catch (error) {
    console.warn("Could not read saved theme:", error);
}

function updateThemeButton() {
    if (themeToggle) {
        themeToggle.textContent =
            document.body.classList.contains("dark-mode")
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";
    }
}

updateThemeButton();

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const currentTheme =
        document.body.classList.contains("dark-mode")
            ? "dark"
            : "light";

    try {
        localStorage.setItem("portfolio-theme", currentTheme);
    } catch (error) {
        console.warn("Could not save theme:", error);
    }

    updateThemeButton();
});


// ===================================
// 3. SCROLL ANIMATIONS
// ===================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => observer.observe(element));
} else {
    // Old browsers: just show everything
    revealElements.forEach(element => element.classList.add("visible"));
}


// ===================================
// 4. CONTACT FORM VALIDATION
// ===================================

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all the fields.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (message.length < 10) {
            alert("Message must contain at least 10 characters.");
            return;
        }

        alert("Thank you! Your message has passed validation.");

        contactForm.reset();
    });
}


// ===================================
// 5. SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        // Ignore bare "#" links
        if (targetId.length < 2) return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ===================================
// 6. CURRENT YEAR IN FOOTER
// ===================================

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

console.log("Portfolio JavaScript loaded successfully!");
