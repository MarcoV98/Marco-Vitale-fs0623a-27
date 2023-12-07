const imgContainer = document.querySelector('.album .container .row')
    const searchInput = document.getElementById('searchInput')
    const searchButton = document.getElementById('searchButton')
    const loadImages = document.getElementById('loadImagesButton')
    const loadSecondaryImages = document.getElementById('loadSecondaryImagesButton')

    function load(query) {
      const apiKey = 'cEgFRgoD0zu3u9WxSLP7lLG9EpDLsSgrCBPvjBclk9WUukiGvcsMICtn'
      const url = `https://api.pexels.com/v1/search?query=${query}`

      fetch(url, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        })
        .then(response => response.json())
        .then(data => {
          // Clear existing images
          imgContainer.innerHTML = ''

          const images = data.images

          images.forEach(image => {
            const card = `
              <div class="col-md-4">
                  <div class="card mb-4 shadow-sm">
                      <img src="${image.src.medium}" alt="${image.url}" class="bd-placeholder-img card-img-top">
                      <div class="card-body">
                          <h5 class="card-title">${image.photographer}</h5>
                          <p class="card-text">${image.photographer_url}</p>
                          <div class="d-flex justify-content-between align-items-center">
                              <div class="btn-group">
                                  <button type="button" class="btn btn-sm btn-outline-secondary toggle-button">
                                      Hide
                                  </button>
                              </div>
                              <small class="text-muted">${image.width}x${image.height}</small>
                          </div>
                      </div>
                  </div>
              </div>`

            imgContainer.innerHTML += card
          })

          document.querySelectorAll('.toggle-button').forEach(button => {
            button.addEventListener('click', hideImage)
          })
        })
        .catch(error => {
          console.log('Fetching error:', error)
        })
    }

    function hideImage(event) {
      const card = event.target.closest('.card')
      card.style.display = 'none'
    }

    searchButton.addEventListener('click', () => {
      const searchQuery = searchInput.value.trim()
      if (searchQuery !== '') {
        load(searchQuery)
      }
    })

    loadImagesButton.addEventListener('click', () => {
      load('cats')
    })

    loadSecondaryImagesButton.addEventListener('click', () => {
        load('dogs')
      })
