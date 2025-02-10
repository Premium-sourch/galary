let imagesData = [];

fetch('images.json')
  .then(response => response.json())
  .then(data => {
    imagesData = data;
    displayImages(imagesData);
  });

function displayImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.url;
    imgElement.alt = image.title;
    gallery.appendChild(imgElement);
  });
}

function filterImages(category) {
  if (category === 'All') {
    displayImages(imagesData);
  } else {
    const filteredImages = imagesData.filter(image => image.category === category);
    displayImages(filteredImages);
  }
}
