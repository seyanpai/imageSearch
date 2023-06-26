//key
const accessKey = 's6Jf5b7SX9hWyXEaeNrcpSrn4YQ70AtVMZFtm_0eAT0';

//html elements for manipulation
const formElement = document.querySelector('form');
const searchInputElement = document.getElementById('search-input');
const searchResultElement = document.querySelector('.output-container');
const showMoreElement = document.querySelector('.show-more-btn');
const showMoreButton = document.querySelector('.btn-more');
const outputCard = document.querySelector('.card');

//initialize input value
let inputData = "";
let page = 1;
let desc = "";

//request images from API
async function searchImages() {
    inputData = searchInputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    //get data from url json
    const response = await fetch(url);

    //parse and convert to data to json
    const data = await response.json();

    const output = data.results; //10 objects from data

    output.map((outputItem) => { //map the 10 objects
        const imageWrapper = document.createElement("div");//create a container for results
        
        //create the img
        imageWrapper.classList.add('card');
        const image = document.createElement("img");
        image.classList.add('card-image');
        image.src = outputItem.urls.small;
        image.alt = outputItem.alt_description;
        desc = (image.alt.charAt(0).toUpperCase() + image.alt.slice(1)); //capitalize first letter

        //anchor
        const link = document.createElement('a');
        link.classList.add('para');
        link.href = outputItem.links.html;
        link.target = '_blank';
        link.innerHTML = `${desc}.`;

        //append
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(link);

        //output the newly created htmlinside the output container
        searchResultElement.appendChild(imageWrapper);
    });
    page++;

    if (page > 1) {
        showMoreButton.style.display = "block";
        console.log(showMoreElement.style.display);
    }    
}

//event listener
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    searchImages(); //create this function
});

//show more
showMoreButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchImages();
});