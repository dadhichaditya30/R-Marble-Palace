function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // Extract the 'id' parameter from the URL
}

function loadProduct(id) {
  const product = products[id];
  if (!product) {
    console.error(`Product with ID "${id}" not found.`);
    return;
  }

  // Populate product details
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-description").textContent = product.description;

  // Populate display image
  const displayImageElement = document.getElementById("product-display-image");
  if (displayImageElement) {
    displayImageElement.src = product.displayImage;
  }
  // Populate product specifications
  const specificationList= document.getElementById("specification-answer-list");
  specificationList.innerHTML = ""; // Clear existing features
  product.specifications.forEach(specification => {
    const li = document.createElement("li");
    li.textContent = specification;
    specificationList.appendChild(li);
  });

  // Populate product specifications list 2
  const specificationList2= document.getElementById("specification-answer-list-2");
  specificationList2.innerHTML = ""; // Clear existing features
  product.specifications2.forEach(specification2 => {
    const li = document.createElement("li");
    li.textContent = specification2;
    specificationList2.appendChild(li);
  });

  // Populate product features
  const featuresList = document.getElementById("product-features");
  featuresList.innerHTML = ""; // Clear existing features
  product.features.forEach(feature => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });



  // Populate suggested products
  const suggestions = document.getElementById("suggested-products");
  suggestions.innerHTML = ""; // Clear existing suggestions

  product.suggestions.forEach(suggestionId => {
    const suggestion = products[suggestionId];
    if (!suggestion) {
      console.error(`Suggested product with ID "${suggestionId}" not found.`);
      return;
    }
    const box = document.createElement("div");
    box.className = "suggested-product";
    box.innerHTML = `
      <img src="${suggestion.image}" alt="${suggestion.name}" class="suggested-product-image">
      <p>${suggestion.name}</p>
    `;
    box.onclick = () => {
      window.location.href = `product.html?id=${suggestionId}`;
    };
    suggestions.appendChild(box);
  });
  // Populate product usage
const productUsageSection = document.querySelector(".product-usage");
productUsageSection.innerHTML = ""; // Clear existing content
if (product.usage && product.usage.length > 0) {
  product.usage.forEach(usage => {
    const usageDiv = document.createElement("div");
    usageDiv.className = "product-usage-list";
    usageDiv.innerHTML = `
      <img src="${usage.image}" alt="Usage Image">
      <ul>${usage.label}</ul>
    `;
    productUsageSection.appendChild(usageDiv);
  });
} else {
  productUsageSection.innerHTML = "<p>No usage information available.</p>";
}

// Update SEO meta tags
document.title = `${product.name} - R Marble Palace`;
const metaDescription = document.getElementById("dynamic-description");
if (metaDescription) {
  metaDescription.setAttribute("content", product.description);
}
const canonicalLink = document.getElementById("dynamic-canonical");
if (canonicalLink) {
  canonicalLink.setAttribute("href", `https://www.yourwebsite.com/product.html?id=${id}`);
}

// Add structured data
const structuredData = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.name,
  "image": product.image,
  "description": product.description,
  "brand": "R Marble Palace",
  "url": `https://www.yourwebsite.com/product.html?id=${id}`
};
const structuredDataScript = document.getElementById("structured-data");
if (structuredDataScript) {
  structuredDataScript.textContent = JSON.stringify(structuredData);
}
}

// Extract product ID from URL and load the product
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
if (productId) {
loadProduct(productId);
} else {
console.error("No product ID found in URL!");
}