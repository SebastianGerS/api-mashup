//api_key=e42fbfbee78372e658de2b9941176e5d  flicker apikey

//  Big Huge Thesaurus api key  http://words.bighugelabs.com/api/2/9b7c8ee5f8778f4292b2aebad9fed742/word/json

const searchButton = document.querySelector('button');
const searchField = document.querySelector('input');
const content = document.querySelector('.content');
const list = document.querySelector('ul');
const flickerUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search"
const flickerApiKey = "2e0240e78ddd71b7a1fb75ec2a28b41c";
const bigHugeUrl = "http://words.bighugelabs.com/api/2/";
const bigHugeApiKey = "9b7c8ee5f8778f4292b2aebad9fed742";
let results;

const appendListItem = (wordList) => {

  for (let j = 0; j < wordList.length; j++) {
    let listItem = document.createElement('li');
    listItem.innerHTML = wordList[j];
    list.appendChild(listItem);
  }
};
const search = (e) => {
  e.preventDefault();
  let searchValue = searchField.value;
  fetch(`${flickerUrl}&api_key=${flickerApiKey}&text=${searchValue}&safe_search=1&format=json&nojsoncallback=1"`)
    .then(res => res.json()).then(res => {
    
      results = res.photos.photo;
      for (let i = 0; i < results.length; i ++) {
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        img.src = `https://farm${results[i].farm}.staticflickr.com/${results[i].server}/${results[i].id}_${results[i].secret}.jpg`;
        figure.appendChild(img)
        content.appendChild(figure);
      }
   
    }).catch(e => {
      console.log(e);
    });

    fetch(`${bigHugeUrl}${bigHugeApiKey}/${searchValue}/json`)
    .then(res => res.json())
    .then(res => {
      if (res.noun) {
        if(res.noun.syn) {
          appendListItem(res.noun.syn);
        } else if(res.noun.ant) {
          appendListItem(res.noun.ant);
        } else if(res.noun.usr) {
          appendListItem(res.noun.usr);
        }
        
      } else if (res.verb) {
        if(res.noun.syn) {
          appendListItem(res.noun.syn);
        } else if(res.noun.ant) {
          appendListItem(res.noun.ant);
        } else if(res.noun.usr) {
          appendListItem(res.noun.usr);
        }
      }
     
    });
};


searchButton.addEventListener('click',search);
