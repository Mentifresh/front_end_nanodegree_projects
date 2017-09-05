
function loadData() {

    const $body = $('body');
    const $wikiElem = $('#wikipedia-links');
    const $nytHeaderElem = $('#nytimes-header');
    const $nytElem = $('#nytimes-articles');
    const $greeting = $('#greeting');
    const $street = $("#street");
    const $city = $("#city");
    const streetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
    let NYTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";


    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    let givenStreet = $street.val();
    let givenCity = $city.val();
    let query = `${streetViewURL}${givenStreet}, ${givenCity}`;
    $body.append(`<img class="bgimg" src="${query}">`);

    // NYTimes request
    NYTimesURL += '?' + $.param({
  'api-key': "bad4cc507b8349bda6bea92b96de71a2"
});

    $.getJSON(NYTimesURL, function(result) {
        console.log(result);
        let docs = result.response.docs;
        console.log(docs);
        for (let doc of docs){
          $("#nytimes-articles").append(
            `<li class="article"><a href="${doc.web_url}">${doc.headline.main}</a><p>${doc.snippet}</p></li>`
          );
        }
    }).error(function() {
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
    });


    // Wikipedia request

    let wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text("Failed to get wiki resources");
    }, 8000);

    let wikipediaURL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${givenCity}&format=json&callback=wikiCallback`;
    $.ajax({
           url: wikipediaURL,
           dataType: "jsonp",
           success: function(response) {
              console.log(response);
              for (let result of response[1]) {
                $wikiElem.append(`<li><a href="https://en.wikipedia.org/wiki/${result}">${result}</a></li>`);
              }
              clearTimeout(wikiRequestTimeout);
        //
      }
    });

    return false;
};

$('#form-container').submit(loadData);
