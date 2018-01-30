const searchButton = document.querySelector('button'); //button to trigger search
const searchField = document.querySelector('input'); // input field where user types in searchwords
const content = document.querySelector('.content'); // container where images will be displayed
const list = document.querySelector('ul'); //list where related search word will be stored

const appendListItem = (wordList) => {

  for (let j = 0; j < wordList.length; j++) {

    let listItem = document.createElement('li');
    let link = document.createElement('a');

    listItem.innerHTML = `<a href="#">${wordList[j]}</a>`;
    listItem.firstChild.addEventListener('click', search);
    list.appendChild(listItem);
  }
}; //appends words from an array to the list and attaches a link to enable searching by clickin on the list items

const checkForWordType = (wordClass) => {

  const relationTypes = ["syn","sim", "ant","usr", "rel"];

  relationTypes.forEach(type => {

    if (wordClass[type]) {

      appendListItem(wordClass[type]);
    }
  });
}; //loops thrue all the possible realtiontyps there are on the bighugelabs api and runs the append functions if givven object has the type as an key

const checkForWordClass = (res) => {

  const wordClasses = ["verb", "adjective", "noun", "adverb", "pronoun"];

  wordClasses.forEach(wordClass => {
    
    if (res[wordClass]) {

      checkForWordType(res[wordClass]);
    }     
  });
}; // loops thure some apropriet wordclasses and runs checkforwordtype function if incomping object has key that matches the curent word class

const removeContent = (container) => {

  while(container.hasChildNodes()) {

    container.removeChild(container.firstChild);
  }
}; // removes all images from the container

const displayResults = (res) => {

  for (let i = 0; i < res.length; i++) {
    
    let figure = document.createElement('figure');
    let link = document.createElement('a');
    let img = document.createElement('img');

    link.target = "_blank";
    link.href = `https://www.flickr.com/photos/${res[i].owner}/${res[i].id}`;
    img.src = `https://farm${res[i].farm}.staticflickr.com/${res[i].server}/${res[i].id}_${res[i].secret}.jpg`;

    link.appendChild(img);
    figure.appendChild(link);
    content.appendChild(figure);
  }
}; // creates new elements with the data from the search ressult and apends to the container

const fetchAndDisplayData = (completeUrl) => {

  fetch(completeUrl)
    .then(res => res.json())
    .then(res => {

      if(completeUrl.includes("api.flickr.com")) {

        res = res.photos.photo;

        removeContent(content);
        displayResults(res);  

      } else {

        removeContent(list);
        checkForWordClass(res);
      } /*this works becous there are only cales made to two diffrent api's if more where called 
      adisional else if would be nacesary to preform the corect actions if they are not the same as for the big huges api*/
     
    }).catch(e => {

      console.log(e);
    });
}; // makes an async api call to fetch data from given api

const determineSearchValue = (self) => {

  let value;

  if (searchField.value) {
    
    value = searchField.value;

    searchField.value = "";

  } else {

    value = self.innerHTML;
  }

  return value;
}; // determins if seatchfield has a value (if not search has been made by clicking on a link) and returns corect value and emptys search field if filld

const search = function(e) {

  e.preventDefault();

  const flickerUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
  const flickerApiKey = "2e0240e78ddd71b7a1fb75ec2a28b41c";
  const flickerApendage = "safe_search=1&format=json&nojsoncallback=1";
  const bigHugeUrl = "http://words.bighugelabs.com/api/2/";
  const bigHugeApiKey = "9b7c8ee5f8778f4292b2aebad9fed742";

  let searchTerm = determineSearchValue(this);

  fetchAndDisplayData(`${flickerUrl}&api_key=${flickerApiKey}&text=${searchTerm}&${flickerApendage}`);
    
  fetchAndDisplayData(`${bigHugeUrl}${bigHugeApiKey}/${searchTerm}/json`);

}; /* search function that prevents pagereload, sets a few varibles and then uses abow defined functions
 to determine what to search for and then fetches data from  the flickar and big Huge api's */

searchButton.addEventListener('click',search);
