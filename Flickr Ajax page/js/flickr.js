$(document).ready(function() {
  $('button').click(function() {
    $("button").removeClass("selected");
    $(this).addClass("selected");
    
    const flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    let animal = $(this).text();
    let flickrOptions = {
      tags: animal,
      format: "json"
    };
    
    function displayPhotos(data) {
      let photoHTML = '<ul>';
      $.each(data.items , function(index, photo){
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="'+ photo.media.m +'"></a></li>';
      });
      photoHTML += '</ul>';
      $("#photos").html(photoHTML);
    }
    
    $.getJSON(flickerAPI/*URL*/, 
              flickrOptions/*data to flickr*/, 
              displayPhotos/*callback function*/);
  });
  
  $('form').submit(function (event) {
    event.preventDefault();
    var searchTerm = $('#search').val();
    
    const flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    let flickrOptions = {
      tags: searchTerm,
      format: "json"
    };
    
    function displayPhotos(data) {
      let photoHTML = '<ul>';
      $.each(data.items , function(index, photo){
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="'+ photo.media.m +'"></a></li>';
      });
      photoHTML += '</ul>';
      $("#photos").html(photoHTML);
    }
    
    $.getJSON(flickerAPI/*URL*/, 
              flickrOptions/*data to flickr*/, 
              displayPhotos/*callback function*/);
  });
}); // end of .ready