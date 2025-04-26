document.addEventListener("DOMContentLoaded", () => {
  const suggestedContainer = document.getElementById("suggested-products");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  // Scroll distance in pixels, responsive to screen size
  let scrollAmount = getScrollAmount();

  function getScrollAmount() {
    if (window.innerWidth <= 480) {
      return 200;
    } else if (window.innerWidth <= 768) {
      return 300;
    } else if (window.innerWidth <= 1024) {
      return 320;
    } else {
      return 370; // Default for larger screens
    }
  }

  window.addEventListener("resize", () => {
    scrollAmount = getScrollAmount();
  });

  // Next button scroll
  nextBtn.addEventListener("click", () => {
    suggestedContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Previous button scroll
  prevBtn.addEventListener("click", () => {
    suggestedContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  // Auto-scroll every 2 seconds
  setInterval(() => {
    const maxScrollLeft = suggestedContainer.scrollWidth - suggestedContainer.clientWidth;

    if (suggestedContainer.scrollLeft + scrollAmount >= maxScrollLeft - 5) {
      // If near the end, scroll back to the start
      suggestedContainer.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      suggestedContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, 2000);

  // Enable touch and mouse drag scrolling
  let isDragging = false;
  let startX;
  let scrollLeft;

  suggestedContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - suggestedContainer.offsetLeft;
    scrollLeft = suggestedContainer.scrollLeft;
    suggestedContainer.classList.add("dragging");
  });

  suggestedContainer.addEventListener("mouseleave", () => {
    isDragging = false;
    suggestedContainer.classList.remove("dragging");
  });

  suggestedContainer.addEventListener("mouseup", () => {
    isDragging = false;
    suggestedContainer.classList.remove("dragging");
  });

  suggestedContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - suggestedContainer.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    suggestedContainer.scrollLeft = scrollLeft - walk;
  });

  // Touch support for mobile devices
  suggestedContainer.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - suggestedContainer.offsetLeft;
    scrollLeft = suggestedContainer.scrollLeft;
  });

  suggestedContainer.addEventListener("touchend", () => {
    isDragging = false;
  });

  suggestedContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - suggestedContainer.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    suggestedContainer.scrollLeft = scrollLeft - walk;
  });
  
});
const SpecificationItems = document.querySelectorAll('.specification-item');

    SpecificationItems.forEach(item => {
    const icon = item.querySelector('.plus-icon');
    item.querySelector('.specification-question').addEventListener('click', () => {
      item.classList.toggle('active');
      icon.textContent = item.classList.contains('active') ? '-' : '+';

    });
  });
  const featureItems = document.querySelectorAll('.feature-item');

    featureItems.forEach(item => {
    const icon = item.querySelector('.plus-icon');
    item.querySelector('.feature-question').addEventListener('click', () => {
      item.classList.toggle('active');
      icon.textContent = item.classList.contains('active') ? '-' : '+';

    });
  });
  
        const img = document.getElementById("product-image");
    const lens = document.getElementById("lens");
    let zoom = 2; // Initial zoom
    let lensSize = 250; // Initial lens size
    
    img.onload = () => {
      lens.style.backgroundImage = `url('${img.src}')`;
      updateBackgroundSize();
    };
    
    function updateLensSize() {
      lens.style.width = `${lensSize}px`;
      lens.style.height = `${lensSize}px`;
      lens.style.borderRadius = "50%"; // Ensure the lens is circular
    }
    
    function updateBackgroundSize() {
      lens.style.backgroundSize = `${img.naturalWidth * zoom}px ${img.naturalHeight * zoom}px`;
      lensSize = 600 / zoom; // Adjust the lens size based on zoom
      updateLensSize();
    }
    
    function moveLens(e) {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
    
      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;
    
      const lensWidth = lens.offsetWidth;
      const lensHeight = lens.offsetHeight;
    
      let lensX = x - lensWidth / 2;
      let lensY = y - lensHeight / 2;
    
      // Clamp inside image boundaries
      lensX = Math.max(0, Math.min(lensX, rect.width - lensWidth));
      lensY = Math.max(0, Math.min(lensY, rect.height - lensHeight));
    
      // Position the lens
      lens.style.left = `${lensX + rect.left}px`;
      lens.style.top = `${lensY + rect.top}px`;
    
      // Adjust background position to ensure proper zoom at edges
      const bgX = Math.max(0, Math.min(img.naturalWidth * zoom - lensWidth, x * scaleX * zoom - lensWidth / 2));
      const bgY = Math.max(0, Math.min(img.naturalHeight * zoom - lensHeight, y * scaleY * zoom - lensHeight / 2));
    
      lens.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    }
    
    img.addEventListener("mouseenter", () => lens.style.display = "block");
    img.addEventListener("mouseleave", () => lens.style.display = "none");
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("mousemove", moveLens);
    
    // Scroll to zoom in/out
    img.addEventListener("wheel", (e) => {
      e.preventDefault();
      zoom += e.deltaY * -0.01;
      zoom = Math.min(Math.max(1, zoom), 2); // Clamp zoom between 1x and 5x
      updateBackgroundSize();
      moveLens(e); // Recalculate background position
    });
    function togglePopup() {
      const popup = document.getElementById("enquiryPopup");
      if (popup) {
        popup.classList.toggle("show");
      }
    }
    
    function validateForm() {
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
    
      if (!name || !phone || !email) {
        alert("Please fill out all required fields.");
        return false;
      }
      return true;
    }