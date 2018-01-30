//api_key=e42fbfbee78372e658de2b9941176e5d  flicker apikey

//  Big Huge Thesaurus api key  http://words.bighugelabs.com/api/2/9b7c8ee5f8778f4292b2aebad9fed742/word/json

const searchButton = document.querySelector('button');
const searchField = document.querySelector('input');
const content = document.querySelector('.content');
const list = document.querySelector('ul');
const flickerUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
const flickerApiKey = "2e0240e78ddd71b7a1fb75ec2a28b41c";
const flickerApendage = "safe_search=1&format=json&nojsoncallback=1";
const bigHugeUrl = "http://words.bighugelabs.com/api/2/";
const bigHugeApiKey = "9b7c8ee5f8778f4292b2aebad9fed742";
let results;

const appendListItem = (wordList) => {

  for (let j = 0; j < wordList.length; j++) {
    let listItem = document.createElement('li');
    let link = document.createElement('a');

    listItem.innerHTML = `<a href="#">${wordList[j]}</a>`;
    listItem.firstChild.addEventListener('click', search);
    list.appendChild(listItem);
  }
};

const checkForWordType = (wordType) => {
  
  if(wordType.syn) {
    appendListItem(wordType.syn);
  } else if(wordType.ant) {
    appendListItem(wordType.ant);
  } else if(wordType.usr) {
    appendListItem(wordType.usr);
  }

};

const removeContent = (container) => {
  while(container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
};

const displayResults = (results) => {

  for (let i = 0; i < results.length; i++) {
    
    let figure = document.createElement('figure');
    let link = document.createElement('a');
    let img = document.createElement('img');

    link.target = "_blank"
    link.href = `https://www.flickr.com/photos/${results[i].owner}/${results[i].id}`;
    img.src = `https://farm${results[i].farm}.staticflickr.com/${results[i].server}/${results[i].id}_${results[i].secret}.jpg`;

    link.appendChild(img);
    figure.appendChild(link);
    content.appendChild(figure);
  }
};

const search = function(e) {
  e.preventDefault();

  let searchValue;

  if(searchField.value) {
    searchValue = searchField.value;
  } else {
    searchValue = this.innerHTML;
  }

  removeContent(content);

  fetch(`${flickerUrl}&api_key=${flickerApiKey}&text=${searchValue}&${flickerApendage}`)
    .then(res => res.json()).then(res => {
    
      results = res.photos.photo;

      displayResults(results);

      searchField.value = "";
     
   
    }).catch(e => {
      console.log(e);
    });

  fetch(`${bigHugeUrl}${bigHugeApiKey}/${searchValue}/json`)
    .then(res => res.json())
    .then(res => {

      removeContent(list);

      if (res.noun) {
        checkForWordType(res.noun);
        
      } else if (res.verb) {
        checkForWordType(res.verb);
      }
     
    }).catch(e => {
      console.log(e);
    });
};


searchButton.addEventListener('click',search);
