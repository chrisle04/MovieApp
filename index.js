const apiKey = "1f85def1668eddb97c42127708ff2511";
const imgApi = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const form = document.getElementById("search-form");
const query = document.getElementById("search-input");
const result = document.getElementById("result");

let page = 1;
let isSearch = false;

// Fetch JSOn
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        return await response.json();
    } catch (error) {
        return null;
    }
}

// fetch and show results
async function fetchAndShowResult(url) {
    const data = await fetchData(url);
    if (data && data.results) {
        showResults(data.results);
    }
}

// create Movie card
function createMovieCard(movie) {
    const { posterPath, originalTitle, releaseDate, overview } = movie;
    const imagePath = posterPath ? imgApi + posterPath : "./img-01.jpeg";
    const truncatedTitle = originalTitle.length > 15 ? originalTitle.slice(0, 15) + "..." : originalTitle;
    const formattedDate = releaseDate || "No release date";
    const cardTemplate = `
        <div class="column">
            <div class="card">
                <a class="card-media" href="./img-01.jpeg">
                    <img src="${imagePath}" alt="${originalTitle}" 
                    width ="100%" />
                </a>
                <div class="card-content">
                    <div class="card-header">
                        <div class="left-content">
                        <h3 style="font-weight: 600">${truncatedTitle}</h3>
                        <span style="color: #12efec">${formattedDate}</span>
                        </div>
                    <div class="right-content">
                        <a href="${imagePath}" target="_blank"
                        class="card-btn">See Cover</a>
                    </div>
                </div>
                <div class="info">
                    ${overview || "No overview yet"} 
                </div>
            </div>
        </div>
    </div>    
    `; 
    return cardTemplate;
}

// clear results
