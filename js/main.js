// Kinolar haqidagi malumotlarni normaga keltirish

var normalizeMovies = movies.map(function (movie, i) {
    return {
        id: i + 1,
        title: movie.Title.toString(),
        year: movie.movie_year,
        categories: movie.Categories.split('|'),
        imgUrl: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
        imdbReting: movie.imdb_rating,
        runtime: movie.runtime,
        language: movie.language,
        summary: movie.summary,
        trailerLink: `https://youtube.com/watch?v=${movie.ytid}`,
    };
});

console.log(normalizeMovies);




//kerakli elementlarni chaqirib olosh

var elSearchForm = $_(".js-search-form");
var elSearchInput = $_(".js-search-form__input", elSearchForm);
var elSearchResults = $_(".search-results");
var elSearchResultTemplate = $_("#search-results-template").content;



//Logigaka oid yordamchi funksiyalar

var createMovieElement = function (movie) {
    var movieElement = elSearchResultTemplate.cloneNode(true);


    $_(".movie__title", movieElement).textContent = movie.title;
    $_(".movie__poster", movieElement).src = movie.imgUrl;
    $_(".movie__rating", movieElement).textContent = movie.imdbReting;
    $_(".movie__summary", movieElement).textContent = movie.summary;
    $_(".movie__trailer-link", movieElement).href = movie.trailerLink;

    return movieElement;
};

var renderMovies = function (movies) {
    elSearchResults.innerHTML = '';

    var searchResultFragment = document.createDocumentFragment();

    movies.forEach(function(movie){
        searchResultFragment.appendChild(createMovieElement(movie));

    });

    elSearchResults.appendChild(searchResultFragment);
}





// qidruvga oid funksiya 

var searchForMovies = function (evt){
    evt.preventDefault();

    elResultPage.style.display = "none";
    var  searchQuery = new RegExp(elSearchInput.value.trim(), 'gi');


    var searchResults = normalizeMovies.filter(function (movie){
        return movie.title.match(searchQuery);
    });
    renderMovies(searchResults);

}

elSearchForm.addEventListener("submit", searchForMovies);




var elResultPage = $_(".js-result")
normalizeMovies.forEach(function (movie){
    var elItem = document.createElement("li");
    var elItemImg = document.createElement("img")
    var elItemTitle = document.createElement("h3")
    var elItemRating = document.createElement("p")
    var elItemSummary = document.createElement("p")
    var elItemLink = document.createElement("a")

    elItemImg.src = movie.imgUrl
    elItem.setAttribute("class", " p-3 w-25 m-4  rounded bg-white shadow-sm");
    elItemTitle.textContent = movie.title;
    elItemRating.textContent = movie.imdbReting;
    // elItemSummary.textContent = movie.summary;
    elItemLink.href= movie.trailerLink;
    elItemLink.textContent = 'movie link';
    elItemLink.target = '_block';

    elItem.appendChild(elItemImg);
    elItem.appendChild(elItemTitle);
    elItem.appendChild(elItemRating);
    elItem.appendChild(elItemSummary);
    elItem.appendChild(elItemLink);
    elResultPage.appendChild(elItem);
});