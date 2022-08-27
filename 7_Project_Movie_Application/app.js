const API_KEY = 'a9de4dcc-d6b6-4b7e-a451-c7a34ebb17b1'
const API_URL_POPULAR =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1'
const API_URL_SEARCH =
    'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMoviies(API_URL_POPULAR)

async function getMoviies(url) {
    const resp = await fetch(url, {
        headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY
        }
    })
    const respData = await resp.json()
    showMovies(respData)
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return 'green'
    } else if (vote > 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

function showMovies(data) {
    const moviesElement = document.querySelector('.movies')

    // Очищение предыдущих фильмов
    document.querySelector(".movies").innerHTML = ""

    data.films.forEach((movie) => {
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `<div class="movie_cover-inner">
        <img
            src="${movie.posterUrlPreview}"
            alt="${movie.nameRu}"
            class="movie_cover"
        />

        <div class="movie_cover-darkened"></div>
    </div>
    <div class="movie_info">
        <div class="movie-title">${movie.nameRu}</div>
        <div class="movie_category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
        )}</div>
        ${movie.rating && (`
        <div class="movie_average movie_average-${getClassByRate(
            movie.rating
        )}">${movie.rating}</div>
        `)
        }
    </div>`

        moviesElement.appendChild(movieElement)
    })
}

const form = document.querySelector("form")
const search = document.querySelector(".header_search")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if (search.value) {
        getMoviies(apiSearchUrl)

        search.value = ""
    }

})