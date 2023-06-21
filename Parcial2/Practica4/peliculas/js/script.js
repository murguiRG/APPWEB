//Initial references
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    //If input field is not empty
    if (movieName.length > 0) {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {

                //If the movie exists in the database
                if (data.Response == "True") {
                    
                    result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Tittle}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("<div></div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                     `;
                }
                //If the movie doesn't exist in the database
                else {
                    result.innerHTML = `<h3>Couldn't find the movie you're looking for</h3>`;
                }
            })
    }
    // //If result is empty
    // else {
    //     result.innerHTML = `<h3>Please enter a movie here</h3>`;
    // }    
        //If an error occurs
        trycatch(() => {
            result.innerHTML = `<h3>An error ocurred</h3>`;
        });      
    
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);