$(document).ready(function() {
    // Function to dynamically load popular tutorials from an API
    function loadPopularTutorials() {
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/popular-tutorials', // Endpoint for fetching popular tutorials
            type: 'GET',
            beforeSend: function() {
                // Add a loader to the carousel container before data loads
                $('#carouselExampleControls2 .carousel-inner').html('<div class="loader">Loading...</div>');
            },
            success: function(response) {
                let carouselInnerHtml = '';

                // Loop through each tutorial and build the carousel items
                response.forEach(function(tutorial, index) {
                    carouselInnerHtml += `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <div class="d-flex justify-content-center">
                                <div class="card" style="width: 18rem;">
                                    <img src="${tutorial.thumb_url}" class="card-img-top" alt="Thumbnail">
                                    <div class="card-body">
                                        <h5 class="card-title">${tutorial.title}</h5>
                                        <p class="card-text">${tutorial['sub-title']}</p>
                                        <div class="d-flex align-items-center mb-2">
                                            <img src="${tutorial.author_pic_url}" class="rounded-circle mr-2" style="width: 30px; height: 30px;" alt="Author">
                                            <strong>${tutorial.author}</strong>
                                        </div>
                                        <span class="text-muted">${tutorial.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });

                // Update the carousel's inner HTML with new content
                $('#carouselExampleControls2 .carousel-inner').html(carouselInnerHtml);
                // Reinitialize the carousel to work with the new dynamic content
                $('#carouselExampleControls2').carousel();
            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error("Error loading tutorials: " + error);
                $('#carouselExampleControls2 .carousel-inner').html('<p>Error loading content.</p>');
            }
        });
    }

    // Call the function to load tutorials when the document is ready
    loadPopularTutorials();
});
