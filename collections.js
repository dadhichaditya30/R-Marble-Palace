document.addEventListener("DOMContentLoaded", () => {
  function setupScrollableContainer(containerId, nextBtnId, prevBtnId) {
    const container = document.getElementById(containerId);
    const nextBtn = document.getElementById(nextBtnId);
    const prevBtn = document.getElementById(prevBtnId);
  
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
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  
    // Previous button scroll
    prevBtn.addEventListener("click", () => {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  
    // Auto-scroll every 2 seconds
    setInterval(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
  
      if (container.scrollLeft + scrollAmount >= maxScrollLeft - 5) {
        // If near the end, scroll back to the start
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 2000);
  }
  
  // Initialize scrollable containers
  setupScrollableContainer("scrollable-container", "nextBtn", "prevBtn");
  setupScrollableContainer("scrollable-container-2", "nextBtn2", "prevBtn2");
  setupScrollableContainer("scrollable-container-3", "nextBtn3", "prevBtn3");
  setupScrollableContainer("scrollable-container-4", "nextBtn4", "prevBtn4");
  
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