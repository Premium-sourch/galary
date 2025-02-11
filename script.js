let allImages = [];  // Store all images globally

// Fetch and display images from JSON
fetch('images.json')
  .then(response => response.json())
  .then(data => {
    allImages = data;
    displayImages(allImages);  // Display all images initially
  })
  .catch(error => console.error('Error loading JSON:', error));

// Function to display images based on category
function displayImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';  // Clear the gallery

  images.forEach(item => {
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    imageDiv.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" onclick="openModal('${item.src}')">
    `;
    gallery.appendChild(imageDiv);
  });
}

// Function to filter images based on category
function showCategory(category) {
  if (category === 'All') {
    displayImages(allImages);  // Show all images
  } else {
    const filteredImages = allImages.filter(image => image.category === category);
    displayImages(filteredImages);  // Show images from selected category
  }
}

// Open modal with the clicked image
function openModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  modal.style.display = 'flex';
  modalImage.src = imageSrc;
}

// Close the modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Download the image
function downloadImage() {
  const imageSrc = document.getElementById('modal-image').src;
  const link = document.createElement('a');
  link.href = imageSrc;
  link.download = imageSrc.split('/').pop();
  link.click();
}
