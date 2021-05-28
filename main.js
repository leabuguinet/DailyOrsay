/**** GLOBAL VARIABLES ****/

let currentDate;
let hashedCurrentDate;
let dividedHashedDate;
let idOfTheDay;
let artistName;
let birthDate;
let deathDate; 
let citizenship;
let wikipedia_extract;
let artTitle;
let artWidth;
let artHeight; 
let artDescription;
let artTechnique;
let artUrl;
let responses = [];
let count = 0;
let errorMessage = 'Not specified'
const API_KEY = config.API_KEY;
const myInit = {
  method: 'GET',
  headers: {'ApiKey': API_KEY}
};

/**** FUNCTIONS ****/

/* Function to hash a string -> transform it into a number */
String.prototype.hashCode = function () {
  var hash = 0;
  if (this.length == 0) return hash;
  for (i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  return hash;
};

/* Function to check if an object exists and is not empty */
function doesExistIsEmpty(obj){
  if(typeof obj != 'undefined' && Object.keys(obj).length !==0){
    return true
  }
};

/* Function that fetch all the informations about one piece of art */
function fetchArtDetail(idOfTheDay, typeOfArt){
  urlArtDetail = `https://api.art.rmngp.fr:443/v1/works/${idOfTheDay}`;

  fetch(urlArtDetail, myInit)
    .then(function(response)
    {
    return response.json();
    })
    .then(function(artwork)
    {
      console.log(artwork.hits.hits[0]._source)

      /* Artist Name */
      if (doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0])){
        artistName = artwork.hits.hits[0]._source.authors[0].name.fr;
        document.querySelector(`.orsay-${typeOfArt}--label .artistName`).innerHTML = artistName;
      }
      else{
        document.querySelector(`.orsay-${typeOfArt}--label .artistName`).innerHTML = errorMessage;
      };

      /* Birth date */
      if (doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0]) && doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0].birth)){
        birthDate = artwork.hits.hits[0]._source.authors[0].birth.display;
        document.querySelector(`.orsay-${typeOfArt}--label .birthDate`).innerHTML = birthDate;
      }
      else{
        document.querySelector(`.orsay-${typeOfArt}--label .birthDate`).innerHTML = errorMessage;
      };

      /* Death Date */
      if (doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0]) && doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0].death)){
        deathDate = artwork.hits.hits[0]._source.authors[0].death.display;
        document.querySelector(`.orsay-${typeOfArt}--label .deathDate`).innerHTML = deathDate;
      }
      else{
        document.querySelector(`.orsay-${typeOfArt}--label .deathDate`).innerHTML = errorMessage;
      };

      /* Wikipedia extract */
      if (doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0]) && doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0].wikipedia_extract)){
        wikipedia_extract = artwork.hits.hits[0]._source.authors[0].wikipedia_extract.fr;
        document.querySelector(`.orsay-${typeOfArt}--label .wikipedia_extract`).innerHTML = wikipedia_extract;
      }
      else{
        document.querySelector(`.orsay-${typeOfArt}--label .wikipedia_extract`).innerHTML = '';
      };

      /* Image URL */
      if (doesExistIsEmpty(artwork.hits.hits[0]._source.images)){
        artUrl = artwork.hits.hits[0]._source.images[0].urls.large.url;
        document.querySelector(`.orsay-${typeOfArt}--frame .artUrl`).src = artUrl;
      }
      else{
        document.querySelector(`.orsay-${typeOfArt}--frame .artUrl`).innerHTML = errorMessage;
      };

      /* Title */
      if (doesExistIsEmpty(artwork.hits.hits[0]._source.title)){
        artTitle = artwork.hits.hits[0]._source.title.fr;
        document.querySelector(`.orsay-${typeOfArt}--frame .artTitle`).innerHTML = artTitle;

        document.querySelector(`.orsay-${typeOfArt}--frame .artUrl`).alt = `${artTitle} - ${artistName}`; // ALT of the picture
      }
      else{
        document.querySelector(`.orsay-${typeOfArt}--frame .artTitle`).innerHTML = errorMessage;
      };

      /* Technique */
      if (doesExistIsEmpty(artwork.hits.hits[0]._source.techniques)){
        artTechnique = artwork.hits.hits[0]._source.techniques[0].name.fr;
        document.querySelector(`.orsay-${typeOfArt}--label .artTechnique`).innerHTML = artTechnique;
      }
      else{
        document.querySelector(`.orsay-${typeOfArt}--label .artTechnique`).innerHTML = errorMessage;
      };

      /* Description */
      if (doesExistIsEmpty(artwork.hits.hits[0]._source.detail)){
        artDescription = artwork.hits.hits[0]._source.detail.fr;
        document.querySelector(`.orsay-${typeOfArt}--label .artDescription`).innerHTML = artDescription;
      }
      else{
        document.querySelector(`.orsay-${typeOfArt}--label .artDescription`).innerHTML = errorMessage;
      };

      artHeight = artwork.hits.hits[0]._source.height / 100;
      artWidth = artwork.hits.hits[0]._source.width / 100;

      document.querySelector(`.orsay-${typeOfArt}--label .artHeight`).innerHTML = artHeight;
      document.querySelector(`.orsay-${typeOfArt}--label .artWidth`).innerHTML = artWidth;
      });
};

/**** MAIN CODE ****/

/* Get today's date and transform it into a hash number */

currentDate = new Date();

hashedCurrentDate = currentDate.toDateString().hashCode(); 

/* Division of the hash number to fit with each array's length. The arrays are stored in data.js */
dividedHashedDate = hashedCurrentDate / 2147483647 ;

indexPositionPainting = Math.abs(Math.round(dividedHashedDate * idListPaintings.length)); 
indexPositionSculpture = Math.abs(Math.round(dividedHashedDate * idListSculptures.length));
indexPositionPhotograph = Math.abs(Math.round(dividedHashedDate * idListPhotographs.length));

/* Get the Ids of the day */

let idPaintingOfTheDay = idListPaintings[indexPositionPainting];
let idSculptureOfTheDay = idListSculptures[indexPositionSculpture];
let idPhotographOfTheDay = idListPhotographs[indexPositionPhotograph];


// Construire un "objet" Formdata qui va contenir toutes les valeurs a transmettre en POST

let data = new FormData();
data.append('idPaintingOfTheDay' , idPaintingOfTheDay );
data.append('idSculptureOfTheDay' , idSculptureOfTheDay );
data.append('idPhotographOfTheDay' , idPhotographOfTheDay );
                    
// constuire les options de configuration de la requete AJAX sous la forme d'un objet

let parameters = 
  {
    'method' : "post",
    'body' : data
  }                       

  window.fetch('index.php', parameters )
                // choisir le format pour recuperer les données de la page PHP
                .then(function( response )
                {
                    return response.text();
                })
                .then(function( text )
                {
                    document.getElementById("result").innerHTML =   text ;
                })





const painting = 'painting';
const sculpture = 'sculpture';
const photograph = 'photograph';

/* API requests to get informations from the IDs of the day using the function fetchArtDetail*/

fetchArtDetail(idPaintingOfTheDay, painting);
fetchArtDetail(idSculptureOfTheDay, sculpture);
fetchArtDetail(idPhotographOfTheDay, photograph);