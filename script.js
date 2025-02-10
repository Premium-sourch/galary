document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('imageContainer');

    // Fetch images from JSON file
    fetch('images.json')
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                // Create image element
                const img = document.createElement('img');
                img.classList.add('clickable-image');
                img.src = image.src;
                img.alt = image.alt;

                // Append image to the container
                imageContainer.appendChild(img);
            });

            // Add event listeners after images are loaded
            addImageClickListeners();
        })
        .catch(error => console.error('Error loading images:', error));
});

// Function to add click listeners to images (for modal)
function addImageClickListeners() {
    const images = document.querySelectorAll('.clickable-image');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const downloadIcon = document.getElementById('downloadIcon');
    const imageDescription = document.getElementById('imageDescription');

    images.forEach(image => {
        image.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImage.src = this.src;
            imageDescription.innerText = this.alt;
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Download Image when the download icon is clicked
    downloadIcon.addEventListener('click', function() {
        const imageUrl = modalImage.src;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
