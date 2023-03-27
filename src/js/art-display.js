const artDisplay = {

    init () {

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
    let artCreationDate
    let artUrl;
    let responses = [];
    let count = 0;
    let errorMessage = 'Not specified';
    const painting = 'painting';
    const sculpture = 'sculpture';
    const photograph = 'photograph';


    /**** FUNCTIONS ****/

    /* Function to check if an object exists and is not empty */
    function doesExistIsEmpty(obj) {
        if (typeof obj != 'undefined' && Object.keys(obj).length !== 0) {
        return true
        }
    };
    
    /* Function that fetch all the informations about one piece of art and display them */
    function fetchArtDetail(typeOfArt, urlArtDetail) {
    
        fetch(urlArtDetail)
        .then(function (response) {
            return response.json();
        })
        .then(function (artwork) {
            console.log(artwork.hits.hits[0]._source)
    
            /* Artist Name */
            if (doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0])) {
            artistName = artwork.hits.hits[0]._source.authors[0].name.fr;
            document.querySelector(`.orsay-${typeOfArt}--label .artistName`).innerHTML = artistName;
    
                /* Birth date */
                if (doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0]) && doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0].birth)) {
                birthDate = artwork.hits.hits[0]._source.authors[0].birth.display;
                document.querySelector(`.orsay-${typeOfArt}--label .birthDate`).innerHTML = '(' + birthDate.substring(0, 4) + '-';
                } else {
                document.querySelector(`.orsay-${typeOfArt}--label .birthDate`).innerHTML = '';
                };
    
                /* Death Date */
                if (doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0]) && doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0].death)) {
                deathDate = artwork.hits.hits[0]._source.authors[0].death.display;
                document.querySelector(`.orsay-${typeOfArt}--label .deathDate`).innerHTML = deathDate.substring(0, 4) + ')';
                } else {
                document.querySelector(`.orsay-${typeOfArt}--label .deathDate`).innerHTML = '';
                };
    
            } else {
            document.querySelector(`.orsay-${typeOfArt}--label .artistName`).innerHTML = errorMessage;
            document.querySelector(`.orsay-${typeOfArt}--label .birthDate`).innerHTML = '';
            document.querySelector(`.orsay-${typeOfArt}--label .deathDate`).innerHTML = '';
            };
    
            
    
            /* Wikipedia extract */
            if (doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0]) && doesExistIsEmpty(artwork.hits.hits[0]._source.authors[0].wikipedia_extract)) {
            
            if(artwork.hits.hits[0]._source.authors[0].wikipedia_extract.en != null){
                wikipedia_extract = artwork.hits.hits[0]._source.authors[0].wikipedia_extract.en;
            }
            else{
                wikipedia_extract = "Only French description available:" + artwork.hits.hits[0]._source.authors[0].wikipedia_extract.fr;
            }
    
            document.querySelector(`.orsay-${typeOfArt}--label .wikipedia_extract`).innerHTML = wikipedia_extract;
            
    
            } else {
            document.querySelector(`.orsay-${typeOfArt}--label .wikipedia_extract`).innerHTML = '';
            };
    
            /* Image URL */
            if (doesExistIsEmpty(artwork.hits.hits[0]._source.images)) {
            artUrl = artwork.hits.hits[0]._source.images[0].urls.large.url;
            document.querySelector(`.orsay-${typeOfArt}--frame .artUrl`).src=`${artUrl}`;
            document.querySelector(`.orsay-${typeOfArt}--link`).href=`${artUrl}`;
            
            } else {
            document.querySelector(`.orsay-${typeOfArt}--frame .artUrl`).innerHTML = errorMessage;
            };
    
            /* Title */
            if (doesExistIsEmpty(artwork.hits.hits[0]._source.title)) {
            artTitle = artwork.hits.hits[0]._source.title.fr;
            document.querySelector(`.orsay-${typeOfArt}--label .artTitle`).innerHTML = artTitle;
            document.querySelector(`.orsay-${typeOfArt}--frame .artUrl`).alt = `${artTitle} - ${artistName}`; // ALT of the picture
            } else {
            document.querySelector(`.orsay-${typeOfArt}--frame .artTitle`).innerHTML = errorMessage;
            };
    
            /* Technique */
            if (doesExistIsEmpty(artwork.hits.hits[0]._source.techniques)) {
            artTechnique = artwork.hits.hits[0]._source.techniques[0].name.fr;
            document.querySelector(`.orsay-${typeOfArt}--label .artTechnique`).innerHTML = artTechnique;
            } else {
            document.querySelector(`.orsay-${typeOfArt}--label .artTechnique`).innerHTML = errorMessage;
            };
    
            /* Creation Date */
            if (doesExistIsEmpty(artwork.hits.hits[0]._source.date)) {
            artCreationDate = artwork.hits.hits[0]._source.date.display;
            document.querySelector(`.orsay-${typeOfArt}--label .artCreationDate`).innerHTML = artCreationDate;
            } else {
            document.querySelector(`.orsay-${typeOfArt}--label .artCreationDate`).innerHTML = errorMessage;
            };
    
            /* Description */
            if (doesExistIsEmpty(artwork.hits.hits[0]._source.detail)) {
            artDescription = artwork.hits.hits[0]._source.detail.fr;
            document.querySelector(`.orsay-${typeOfArt}--label .artDescription`).innerHTML = artDescription;
            } else {
            document.querySelector(`.orsay-${typeOfArt}--label .artDescription`).innerHTML = errorMessage;
            };
    
            /* Height */
        
            if(artwork.hits.hits[0]._source.height > 0 && artwork.hits.hits[0]._source.height != 'undefined'){
            artHeight = artwork.hits.hits[0]._source.height / 10;
            document.querySelector(`.orsay-${typeOfArt}--label .artHeight`).innerHTML = artHeight;        
            }else{
            document.querySelector(`.orsay-${typeOfArt}--label .undefined-size`).innerHTML = errorMessage;
            };
    
            /* Width */
    
            if(artwork.hits.hits[0]._source.width > 0 && artwork.hits.hits[0]._source.width != 'undefined'){       
            artWidth = artwork.hits.hits[0]._source.width / 10;
            document.querySelector(`.orsay-${typeOfArt}--label .artWidth`).innerHTML = artWidth;
            }else{
            document.querySelector(`.orsay-${typeOfArt}--label .undefined-size`).innerHTML = errorMessage;
            }
    
        });
    
    };
    
    
    /**** MAIN CODE ****/
    
    /* fetch the artworks details json data */
    fetchArtDetail(painting, 'paintingdata.php');
    fetchArtDetail(sculpture, 'sculpturedata.php');
    fetchArtDetail(photograph, 'photographdata.php');
    
    
  

    }
}

export default artDisplay;


