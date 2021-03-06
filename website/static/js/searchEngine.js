/*
  BLOG
 */
if( document.URL.includes("blog") ){
  // Doc : https://developers.facebook.com/docs/plugins/page-plugin/
  
  // Load SDK
  //document.getElementsByTagName("head")[0].insertAdjacentHTML('beforeend', '<div id="fb-root"></div><script async defer crossorigin="anonymous" src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v5.0"></script>');

  // When page ready
  window.addEventListener('load', function () {
    // Load pre-loaded iframe
    // Not the "normal" way => Can break at next Fb API update
    document.getElementsByTagName("nav")[1].insertAdjacentHTML('afterend','<div class="fb-page fb_iframe_widget" data-href="https://www.facebook.com/GamaPlatform/" data-tabs="timeline, events" data-width="225" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" fb-xfbml-state="rendered" fb-iframe-plugin-query="adapt_container_width=true&amp;container_width=0&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FGamaPlatform%2F&amp;locale=en_US&amp;sdk=joey&amp;show_facepile=true&amp;small_header=true&amp;tabs=timeline%2C%20events&amp;width=225"><span style="vertical-align: bottom; width: 225px; height: 500px;"><iframe name="f379555b4e85f84" width="225px" height="1000px" title="fb:page Facebook Social Plugin" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v2.7/plugins/page.php?adapt_container_width=true&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D44%23cb%3Df1bf407761c6da%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff1fa2751bea77c%26relation%3Dparent.parent&amp;container_width=0&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FGamaPlatform%2F&amp;locale=en_US&amp;sdk=joey&amp;show_facepile=true&amp;small_header=true&amp;tabs=timeline%2C%20events&amp;width=225" style="border: none; visibility: visible; width: 225px; height: 500px;" class=""></iframe></span></div>'); 
  })
}

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
      // Remove algoria useless events
      var searchBar = document.getElementById('search_input_react');
      searchBar.parentNode.replaceChild(searchBar.cloneNode(true), searchBar);

      // Set custom events
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

function isDuplicateResult(resultList, tag, title){

  var result = false;

//  if( tag.includes("Concept") ){
    var prevResult = resultList.getElementsByTagName("a");
    for (var i = 0; i < prevResult.length; i++) {
      //console.log( prevResult[i].innerText );
      if (prevResult[i].innerText == title){
        result = true;
        break;
      }
    }
//  }

  return result;

}

function createSearchResult(result) {
  // Prepare list container
  var resultDiv = document.createElement("DIV");
  var resultList = document.createElement("UL");
  var tagTitle;

  var prevTag = ""; var prevSubCat = ""; 
  for (var i = 0; i < result.length; i++) {

    // Remove duplicate from results
    if ( isDuplicateResult(resultList, result[i]["tag"], result[i]["title"]) ){
      continue;
    }

    // Display new Tag title if changing
    if (prevTag != result[i]["tag"]) {

      prevSubCat = ""; // Debug
      prevTag = result[i]["tag"];
      resultList.appendChild( document.createElement("HR") );

      tagTitle = document.createElement("H4");
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
    if ( arrayString[0] != "Concept" ) //isUpperCase(arrayString[1][0]) )
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

  // If no request
  if (getRequest === undefined || getRequest == '' ){
    // Home doc
    window.location.replace( queryBuilder(true, true) );
  }else{

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
      window.location.replace( queryBuilder(true, true) );
    else
      window.location.replace( queryBuilder(resultTag["url"]) );

  }
}

function queryBuilder(item, doc=false){
  return realUrl[0] + "//" + realUrl[2] + "/wiki/" + (doc ? "Home" : item);
}

/*
 *  INIT
 */
// On page ready
// -> Wait Fuse.js to be loaded
document.addEventListener('DOMContentLoaded', initSearchEngine, false);
