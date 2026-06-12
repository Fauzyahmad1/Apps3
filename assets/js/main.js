// Initialize AOS Animation
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function() {
            document.body.classList.toggle("dark-theme");
            const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
            localStorage.setItem("theme", theme);
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById("mainNavbar");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Custom ScrollSpy implementation
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", function() {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // Interactive Prototype Hotspot Simulator
    const screens = [
        {
            src: "assets/img/splash.png",
            hotspot: { bottom: "45px", left: "calc(50% - 22px)", right: "auto", top: "auto", width: "44px", height: "44px", borderRadius: "50%" }
        },
        {
            src: "assets/img/home.png",
            hotspot: { top: "145px", left: "20px", right: "auto", bottom: "auto", width: "105px", height: "130px", borderRadius: "10px" }
        },
        {
            src: "assets/img/product.png",
            hotspot: { bottom: "16px", left: "20px", right: "auto", top: "auto", width: "220px", height: "45px", borderRadius: "25px" }
        },
        {
            src: "assets/img/cart.png",
            hotspot: { bottom: "24px", right: "16px", left: "auto", top: "auto", width: "110px", height: "35px", borderRadius: "20px" }
        },
        {
            src: "assets/img/profile.png",
            hotspot: { top: "18px", left: "15px", right: "auto", bottom: "auto", width: "35px", height: "35px", borderRadius: "50%" }
        }
    ];

    let currentScreenIndex = 0;
    const simScreen = document.getElementById("simulatedPhoneScreen");
    const hotspot = document.getElementById("hotspotBtn");
    const steps = document.querySelectorAll(".stepper-step");

    function updateSimulatedScreen(index) {
        if (!simScreen || !hotspot) return;

        // Apply screen fade effect
        simScreen.style.opacity = 0;
        setTimeout(() => {
            simScreen.src = screens[index].src;
            simScreen.style.opacity = 1;

            // Apply new hotspot coordinates
            const coords = screens[index].hotspot;
            hotspot.style.top = coords.top;
            hotspot.style.bottom = coords.bottom;
            hotspot.style.left = coords.left;
            hotspot.style.right = coords.right;
            hotspot.style.width = coords.width;
            hotspot.style.height = coords.height;
            hotspot.style.borderRadius = coords.borderRadius;

            // Update stepper active class
            steps.forEach((step, stepIdx) => {
                if (stepIdx === index) {
                    step.classList.add("active");
                } else {
                    step.classList.remove("active");
                }
            });
        }, 300);
    }

    if (hotspot) {
        hotspot.addEventListener("click", function() {
            currentScreenIndex = (currentScreenIndex + 1) % screens.length;
            updateSimulatedScreen(currentScreenIndex);
        });

        // Add click listener to stepper steps for direct navigation
        steps.forEach((step, stepIdx) => {
            step.style.cursor = "pointer";
            step.addEventListener("click", function() {
                currentScreenIndex = stepIdx;
                updateSimulatedScreen(currentScreenIndex);
            });
        });

        // Initial setup
        updateSimulatedScreen(0);
    }

    // Figma Interactive Prototype Chips Logic
    const figmaProtoIframe = document.getElementById("figmaProtoIframe");
    const pChips = document.querySelectorAll(".proto-chips .pchip");
    if (figmaProtoIframe && pChips.length > 0) {
        pChips.forEach(chip => {
            chip.addEventListener("click", function() {
                pChips.forEach(c => c.classList.remove("on"));
                this.classList.add("on");
                const nodeId = this.getAttribute("data-node");
                if (nodeId) {
                    const newSrc = `https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F5aLzuRKCWcvQYTto2bHuzZ%2FUntitled%3Fnode-id%3D${nodeId}%26starting-point-node-id%3D1%253A746%26t%3DwDJCuvwCNXOWV57H-1`;
                    figmaProtoIframe.src = newSrc;
                }
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Navbar height offset
                behavior: 'smooth'
            });

            // Close mobile collapse menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});
