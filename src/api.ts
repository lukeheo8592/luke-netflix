const API_KEY = "7b12967fb62dd9e20c2646bc875ac8e7";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies(){

    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}