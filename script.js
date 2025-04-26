document.addEventListener("DOMContentLoaded", function () {
    let products = document.querySelectorAll(".product-item");
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    let slideInterval = 5000; // 5 seconds per slide
    let hasAnimatedCounter = false; // Prevents counter re-animation

    

    // Hide loader after the page loads
    window.addEventListener("load", () => {
        document.getElementById("page-loader").style.opacity = "0";
        setTimeout(() => {
        document.getElementById("page-loader").style.display = "none";
        }, 550); // Match with transition duration
    });

    // Show loader before navigating to a new internal link
    document.querySelectorAll("a").forEach(link => {
        if (link.hostname === window.location.hostname) {
        link.addEventListener("click", function (e) {
            // Open in same tab only
            if (!link.hasAttribute("target")) {
            e.preventDefault();
            document.getElementById("page-loader").style.display = "flex";
            document.getElementById("page-loader").style.opacity = "1";

            setTimeout(() => {
                window.location.href = link.href;
            }, 500); // Add delay so user sees animation
            }
        });
        }
    });


    const menuButton = document.querySelector(".menu-button");
    const menuDropdown = document.querySelector(".menu-dropdown");

    menuButton.addEventListener("click", function() {
        menuDropdown.classList.toggle("show");
        menuButton.classList.toggle("open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
        if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.remove("show");
            menuButton.classList.remove("open");
        }
    });
    
    /*** SLIDESHOW FUNCTIONALITY ***/
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").addEventListener("click", prevSlide);

    setInterval(nextSlide, slideInterval); // Auto-slide
    showSlide(currentIndex); // Show first slide

    /*** SCROLL TO ABOUT US SECTION ***/
    function scrollToAbout() {
        const aboutSection = document.querySelector("#about-us");
        const offset = -165; // Adjust this value to decrease the scroll amount
        const topPosition = aboutSection.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
    document.querySelector(".scroll-down").addEventListener("click", scrollToAbout);

    function scrollToProducts() {
        const productSection = document.querySelector("marble-text-heading");
        const offset = -165; // Adjust this value to decrease the scroll amount
        const topPosition = productSection.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
    document.querySelector(".scroll-down").addEventListener("click", scrollToProducts);


    /*** ABOUT US FADE-IN ANIMATION ***/
    document.addEventListener("scroll", function () {
        let aboutSection = document.querySelector("#about-us");
        let sectionPosition = aboutSection.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;

        if (sectionPosition < screenHeight - 100) {
            aboutSection.style.opacity = "1";
            aboutSection.style.transform = "translateY(0)";
        } else {
            aboutSection.style.opacity = "0";
            aboutSection.style.transform = "translateY(50px)";
        }
    });

    /*** COUNTER ANIMATION (ONLY ONCE) ***/
    function animateCounter(counter) {
        let target = +counter.getAttribute("data-target");
        let count = 0;
        let speed = Math.max(1, Math.floor(1000 / target));

        let updateCount = () => {
            if (count < target) {
                count++;
                counter.innerText = count;
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    }

    let collectionsCounterSection = document.querySelector(".counter-section");
    let counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        (entries) => {
            let entry = entries[0];
            if (entry.isIntersecting && !hasAnimatedCounter) {
                counters.forEach(counter => animateCounter(counter));
                hasAnimatedCounter = true; // Prevent re-animation
            }
        },
        { threshold: 0.5 }
    );

    counterObserver.observe(collectionsCounterSection);

    /*** COLLECTIONS TEXT ANIMATION (Fixed After 30%, Covers 70% Screen) ***/
    let collectionsText = document.querySelector(".collections-text");
    let collectionsSection = document.querySelector(".collections-section");

    window.addEventListener("scroll", function () {
        let scrollPos = window.scrollY;
        let sectionTop = collectionsSection.offsetTop;
        let sectionHeight = collectionsSection.offsetHeight;
        let progress = ((scrollPos - sectionTop) / sectionHeight) * 100;

        if (progress < 0) {
            // Reset when scrolled up completely
            collectionsText.style.opacity = "0";
            collectionsText.style.position = "absolute";
            collectionsText.style.top = "22%";
            collectionsText.style.left = "45%";
            collectionsText.style.transform = "translate(-45%,50%) scale(2)";
        }  
        if (progress >= 0 && progress <= 20) {
            let scaleValue = 2 - (progress / 20);
            let opacityValue = Math.min(progress / 20, 0.5);
            collectionsText.style.transform = `scale(${scaleValue})`;
            collectionsText.style.opacity = opacityValue;
            collectionsText.style.position = "absolute";
            collectionsText.style.top = "22%";
            collectionsText.style.left = "45%";
            collectionsText.style.transform = `translate(-45%,50%) scale(${scaleValue})`;
        }

        if (progress >= 20 && progress < 80) {
            collectionsText.style.transform = "translate(-45%,50%) scale(1)";
            collectionsText.style.position = "fixed";
            collectionsText.style.top = "5%"; // Covers 70% of the screen
            collectionsText.style.left = "45%";
            collectionsText.style.opacity = "1";
        }

        if (progress >= 80) {
            collectionsText.style.opacity = "0"; // Fade out after 100%
            collectionsText.style.pointerEvents = "none"; // Disable interaction

        }
    });
    
    /*** PRODUCT ANIMATIONS (FADE-IN & ZOOM) ***/
    function checkScroll() {
        let screenHeight = window.innerHeight;
        products.forEach(product => {
            let position = product.getBoundingClientRect().top;
            let isLeftAligned = product.classList.contains("left");

            if (position < screenHeight - 100 && position > -screenHeight / 2) {
                product.classList.remove("slide-left", "slide-right", "fade-out");

                if (isLeftAligned) {
                    product.classList.add("slide-left");
                } else {
                    product.classList.add("slide-right");
                }
            } else {
                product.classList.add("fade-out");
            }
        });
    }

    document.addEventListener("scroll", checkScroll);
    checkScroll(); // Run on load in case elements are already in view

    const starContainer = document.getElementById("star-rating");
    const ratingEmoji = document.getElementById("rating-emoji");
    const totalRatingsElement = document.getElementById("total-ratings");
    const averageRatingElement = document.getElementById("average-rating");
    const reviewsContainer = document.getElementById("reviews-container");
    const reviewText = document.getElementById("review-text").value;

    let selectedRating = 0;
    let totalRatings = 0;
    let totalStars = 0;

    const emojis = {
        0: "😊",  // Default neutral face
        1: "😡",  // 1 star - Very Angry
        2: "☹️",  // 2 stars - Sad
        3: "😐",  // 3 stars - Neutral
        4: "🙂",  // 4 stars - Happy
        5: "😁"   // 5 stars - Very Happy
    };

    starContainer.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN") {
            selectedRating = e.target.getAttribute("data-value");
            highlightStars(selectedRating);
            ratingEmoji.textContent = emojis[rating];
            ratingEmoji.style.transform = "scale(1.2)"; // Slight animation effect
        }
    });
    /*starContainer.addEventListener("mouseleave", () => {
        highlightStars(selectedRating);
        ratingEmoji.textContent = emojis[selectedRating] || emojis[0];
        ratingEmoji.style.transform = "scale(1)";
    });*/
    starContainer.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN") {
            selectedRating = e.target.getAttribute("data-value");
            highlightStars(selectedRating);
            ratingEmoji.textContent = emojis[selectedRating];
        }
    });

    function highlightStars(rating) {
        document.querySelectorAll(".stars span").forEach((star, index) => {
            star.style.color = index < rating ? "gold" : "#ccc";
        });
    }

    document.getElementById("submit-review").addEventListener("click", () => {
        const reviewText = document.getElementById("review-text").value;
        if (selectedRating && reviewText) {
            totalRatings++;
            totalStars += parseInt(selectedRating); // Convert selectedRating to a number

            // Calculate average rating
            const averageRating = (totalStars / totalRatings).toFixed(1);

            // Update the UI
            totalRatingsElement.textContent = `${totalRatings} Ratings`;
            averageRatingElement.textContent = `Average: ${averageRating} ★`;

            addReview(selectedRating, reviewText);
            document.getElementById("review-text").value = "";
            highlightStars(0);
            selectedRating = 0;
            ratingEmoji.textContent = emojis[0];
        }
        if (selectedRating) {
            totalRatings++;
            totalStars += parseInt(selectedRating); // Convert selectedRating to a number

            // Calculate average rating
            const averageRating = (totalStars / totalRatings).toFixed(1);

            // Update the UI
            totalRatingsElement.textContent = `${totalRatings} Ratings`;
            averageRatingElement.textContent = `Average: ${averageRating} ★`;

            //reset the form
            document.getElementById("review-text").value = ""; // Clear the review text input
            highlightStars(0); // Reset the stars
            selectedRating = 0; // Reset the selected rating
            ratingEmoji.textContent = emojis[0]; // Reset the emoji
        } 
    });

    function addReview(rating, text) {
        const reviewContainer = document.getElementById("reviews-container");
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");
        reviewCard.innerHTML = `<div class='stars'>${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div><p>${text}</p>`;
        reviewContainer.appendChild(reviewCard);
    }

    document.querySelector(".prev").addEventListener("click", () => {
        document.getElementById("reviews-container").scrollBy({ left: -300, behavior: "smooth" });
    });

    document.querySelector(".next").addEventListener("click", () => {
        document.getElementById("reviews-container").scrollBy({ left: 300, behavior: "smooth" });
    });
    
});
function togglePopup() {
    document.getElementById("enquiryPopup").classList.toggle("show");
  }
  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const countryCode = document.getElementById("countryCode").value;
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (!name || !phone || !email || !countryCode) {
      alert("Please fill all fields.");
      return false;
    }
  
    if (!/^\d{10,}$/.test(phone)) {
      alert("Please enter at least a 10-digit phone number (without country code).");
      return false;
    }
  
    const fullNumber = countryCode + phone;
  
    alert("Thank you for your enquiry!\nWe'll contact you at: " + fullNumber);
    togglePopup();
    document.getElementById("enquiryForm").reset();
    return false;

  }
  function togglePopup() {
    const popup = document.getElementById("enquiryPopup");
    const isOpen = popup.classList.toggle("show");

    // Lock or unlock background scroll
    if (isOpen) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // restore scroll
    }
  }
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const icon = item.querySelector('.faq-icon');
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('active');
      icon.textContent = item.classList.contains('active') ? '-' : '+';

    });
  });

  