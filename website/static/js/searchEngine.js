//import Fuse from 'fuse.js';

/*
 *  VARIABLES
 */
var database, fuse;

var realUrl = document.URL.split('/');

var options = {
  shouldSort: false,
  tokenize: true,
  findAllMatches: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "tag"
  ]
};

/*
 *  INIT SEARCH ENGINE
 */
function initSearchEngine(){
  /*  SET DB  */

  var client = new XMLHttpRequest();
  
  // Get json file with an asynchrone request
  client.open('GET', '/database/index.json');

  // Prepare request
  client.onreadystatechange = function() {
  
    // Get database
    const tmp = client.responseText;
    database = JSON.parse(tmp);

    // Load Fuse search engine
    fuse = new Fuse(database, options);

    /*  EVENT LISTENER  */
    if (realUrl[realUrl.length -1] == "search" || realUrl[realUrl.length -1].charAt(6) == "?"){
      // Redirect API
      endpoint();
    }else{
      // Get search input
      document.getElementById('search_input_react').addEventListener('keyup', requestSearch);
      document.getElementById('search_input_react').setAttribute("onfocusout", "setTimeout(cleanSearchResult, 200)");
    }
  }

  // Send request
  client.send();
}


/*
 *  SEARCH ENGINE
 */
function requestSearch(e) {

  // Clean previous result (if multiple request)
  cleanSearchResult();

  // Don't display empty result if field empty
  if( e.srcElement.value != "") {
    // Send request
    var result = fuse.search(e.srcElement.value);

    createSearchResult(result);
  }
}

function createSearchResult(result) {
  // Prepare list container
  var resultDiv = document.createElement("DIV");
  var resultList = document.createElement("UL");

  var prevTag = ""; var prevSubCat = ""; 
  for (var i = 0; i < result.length; i++) {

    // Display new Tag title if changing
    if (prevTag != result[i]["tag"]) {
      prevSubCat = ""; // Debug
      prevTag = result[i]["tag"];
      resultList.appendChild( document.createElement("HR") );

      var tagTitle = document.createElement("H4");
      tagTitle.innerHTML = createTitle(prevTag);

      resultList.appendChild( tagTitle );
    }

    // Display new subcat title if changing
    if ( result[i]["subcat"] && prevSubCat != result[i]["subcat"] ){ // if dictionary entry exist && is different
      prevSubCat = result[i]["subcat"];

      var subTagTitle = document.createElement("H5");
      subTagTitle.innerHTML = createTitle(prevSubCat);

      resultList.appendChild( subTagTitle );
    }

    // Prepare result item
    var link = document.createElement("A");

    // Create link
    var url = queryBuilder( result[i]["url"] );
    
    link.setAttribute( "href", url.replace(/\s/g, '') );
    link.appendChild( document.createTextNode(result[i]["title"] ) );

    // Append result item
    var li = document.createElement("LI");

    li.appendChild(link);

    resultList.appendChild( li );
  }

  // If no-result
  if(resultList.childElementCount ==  0){
      var tagTitle = document.createElement("H4");
      tagTitle.appendChild( document.createTextNode( "No result ..." ) );

      resultList.appendChild( tagTitle );
  }

  // Append result list
  resultDiv.appendChild(resultList);

  // Set id => Apply CSS
  resultDiv.id = "searchResult";

  // Append display in webpage
  document.body.appendChild(resultDiv);
}

// Look for result display (base on ID) and remove it
function cleanSearchResult(){
  var searchResult = document.getElementById('searchResult');
  if (searchResult != null)
    searchResult.parentNode.removeChild(searchResult);
}

function isUpperCase(str) {
    return str === str.toUpperCase();
}

// Create innerHTML Title for search side result 
function createTitle(str){
  var returnStr = "";
  var arrayString = str.split(" ");

  // Remove if white space at the beginning
  while (arrayString[0] == ""){
    arrayString = arrayString.slice(1, 10);
  }

  // Check if have multiple word
  if ( arrayString[1] != null){
    // If second word if not caps -> it's a GAML keyword
    if ( isUpperCase(arrayString[1][0]) )
      returnStr = str;
    else 
      returnStr = arrayString[0] + " <code>" + arrayString[1] + "</code>";
  }
  else{
    returnStr = str;
  }

  return returnStr;
}

/*
 *  END POINT
 */
function endpoint(){
  var getRequest = document.URL.split('?')[1];

  console.log(getRequest);

  if (getRequest == undefined || getRequest == '' ){
    // Home doc
    window.location.replace( queryBuilder(true, true, true) );
  }

  /* Request on tag */
  const optionsTag = {
    findAllMatches: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "tag"
    ]
  };
  fuse = new Fuse(database, optionsTag);
  var resultTag = fuse.search( getRequest.split("&")[0].split("=")[1] );

  if (resultTag.length == 0)
    resultTag = database;

  /* Request on title 
  on filtred db */
  const optionsTitle = {
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "title"
    ]
  };

  fuse = new Fuse(resultTag, optionsTitle);
  resultTag = fuse.search( getRequest.split("&")[1].split("=")[1] )[0];
  if (resultTag == undefined)
    window.location.replace( queryBuilder(true, true, true) );
  else
    window.location.replace( queryBuilder(resultTag["url"]) );
}

function queryBuilder(item, wiki=true, doc=false){
    var url = realUrl[0] + "//";

    // BaseURL
    for (var i = 2; i < realUrl.length; i++) {
      if ( !(realUrl[i] == ("wiki" || "download") // Basic pages (docs & static)
        || realUrl[i].charAt(6) == "?") ) { // Search Endpoint
        url += realUrl[i] + '/';
      }else{
        break;
      }
      
    }

    if(doc){
        url += "wiki/Home"; 
    }else{

      if (wiki) {
        url += "wiki/" + item; 
      }
      else{
          url += item;
      }

    }

    return url;
}

/*
 *  INIT
 */
// On page ready
// -> Wait Fuse.js to be loaded
document.addEventListener('DOMContentLoaded', initSearchEngine, false);