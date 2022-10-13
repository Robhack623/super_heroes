const selectedMovie = document.getElementById('selectedMovie')
const moviesUL = document.getElementById('moviesUL')
const movieTitleHeading = document.getElementById('movieTitleHeading')

function getAllMovies(moviesCallback) {

    let request = new XMLHttpRequest
    request.addEventListener('load', function() {
        const result = JSON.parse(this.responseText)
        let allMovies = result.Search
        moviesCallback(allMovies)    
    })
    request.open('GET', 'http://www.omdbapi.com/?s=Batman&page=2&apikey=8ad0d025')
    request.send()
}

function displayMovies(allMovies) {
    const movieItems = allMovies.map(function(movie) {
        return `
            <li><img src = ${movie.Poster}>
            <a href = "#" onclick= "showDetails('${movie.imdbId}')">${movie.Title}</a>
            </li>
        `
    })
    moviesUL.innerHTML = movieItems.join('')

}

function showDetails(imdbId) {
    console.log(imdbId)
    const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=8ad0d025`
    let request = new XMLHttpRequest
    request.addEventListener('load', function() {
        const result = JSON.parse(this.responseText)
        movieTitleHeading.innerHTML = result.Title
    })
    request.open('GET', url)
    request.send()
}

getAllMovies(displayMovies)