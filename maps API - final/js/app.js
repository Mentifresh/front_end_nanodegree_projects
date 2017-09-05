var locations = [{
    title: 'Parque Municipal García Sanabria',
    venueID: "4d525ab89b27721ecb03c146",
    location: {
      lat: 28.471613,
      lng: -16.253834
    }
  },
  {
    title: 'Plaza Weyler',
    venueID: "4b56f8d0f964a5203c2128e3",
    location: {
      lat: 28.467670,
      lng: -16.255650
    }
  },
  {
    title: 'Plaza del Príncipe',
    venueID: "4c2645f1905a0f477af76260",
    location: {
      lat: 28.468306,
      lng: -16.250410
    }
  },
  {
    title: 'Plaza de España',
    venueID: "4c6a874fc946e21e88deec8e",
    location: {
      lat: 28.466853,
      lng: -16.247127
    }
  },
  {
    title: 'TEA Tenerife Espacio de las Artes',
    venueID: "4bd0b582b221c9b6023fd4d0",
    location: {
      lat: 28.463874,
      lng: -16.251035
    }
  },
  {
    title: 'La Casita',
    venueID: "4da73baccda1480291cba65d",
    location: {
      lat: 28.468161,
      lng: -16.254125
    }
  },
  {
    title: 'CC Meridiano',
    venueID: "4b6464e4f964a520b5af2ae3",
    location: {
      lat: 28.456887,
      lng: -16.258734
    }
  },
  {
    title: 'Barbas Bar Saloon',
    venueID: "536e7cd4498efb3ebef7e597",
    location: {
      lat: 28.470375,
      lng: -16.247605
    }
  },
  {
    title: 'Burguer King',
    venueID: "4bd436f4caff9521e050d6f0",
    location: {
      lat: 28.467379,
      lng: -16.250052
    }
  },
  {
    title: 'Centro de Arte la Recova',
    venueID: "4c000689efa2ef3b5f36aa8c",
    location: {
      lat: 28.465532,
      lng: -16.250809
    }
  },
  {
    title: 'Kokken Gastrobar',
    venueID: "52b5a6a811d28e6fdaa9500c",
    location: {
      lat: 28.470066,
      lng: -16.250840
    }
  },
  {
    title: 'CC Parque Bulevar',
    venueID: "4c9c6a4454c8a1cd51e3794b",
    location: {
      lat: 28.470280,
      lng: -16.251550
    }
  }
];

// ViewModel
function ViewModel() {
  var self = this;

  self.map = null;
  self.currentInfoWindow = null;
  self.locationsToBeShown = ko.observableArray();
  self.markers = ko.observableArray();
  self.filter = ko.observable("");

  self.filterLocations = function() {
    var filter = self.filter().toLowerCase();
    var locationsToBeShown = [];

    locations.forEach(function(location) {
      if (location.title.toLowerCase().includes(filter)) {
        locationsToBeShown.push(location);
      }
    });

    return locationsToBeShown;
  };

  // Update List based on filter
  self.updateList = function(locations) {
    self.locationsToBeShown(self.filterLocations());
    self.clearMarkers();
    self.updateMarkers(self.filterLocations());
  };

  // Clear Markers
  self.clearMarkers = function() {
    self.markers().forEach(function(marker, i) {
      marker.setMap(null);
    });
    self.markers.removeAll();
  };

  // Update markers based on filter
  self.updateMarkers = function(filterLocations) {
    filterLocations.forEach(function(location) {
      location.marker = new google.maps.Marker({
        map: self.map,
        position: location.location,
        venueID: location.venueID,
        likes: null,
        animation: null
      });

      location.marker.addListener('click', function() {
        self.selectedLocation(location);
      });

      self.getFourSquareLikes(location);
      self.markers().push(location.marker);

    });
  };

  self.selectedLocation = function(location) {
    self.showInfoWindow(location);
    // Put infoWindow in the center of the map
    self.map.setCenter(location.marker.getPosition());
    // Animate the marker
    self.animate(location.marker);
  };

  self.showInfoWindow = function(location) {
    if (self.currentInfoWindow !== null) {
      self.currentInfoWindow.close();
    }
    // Content of infoWindow
    location.infoWindow = new google.maps.InfoWindow({
      content: self.getContent(location)
    });

    self.currentInfoWindow = location.infoWindow;
    self.currentInfoWindow.open(self.map, location.marker);

  };

  // sets the content to info window
  self.getContent = function(location) {
    return `<h2>${location.title}</h2>
    <div><b>Latitude:</b> ${location.location.lat}</div>
    <div><b>Longitude:</b> ${location.location.lng}</div>
    <div><b>Number of likes:</b> ${location.likes}</div>`;
  };

  // request location likes from foursquare
  self.getFourSquareLikes = function(location) {
    const id = "LU0UBZGN5O1AF4CFPJGAHPGG0NZEAF2QFPZ4IGOBEKUPAW3Q";
    const secret = "WQ00KFG2D2EBXM02BZ0AE3OVT2M5I0FKNWPQ4BTEBVL1Q5JN";

    $.ajax({
      //building URL, venue ID, client id and client secret
      url: `https://api.foursquare.com/v2/venues/${location.venueID}?client_id=${id}&client_secret=${secret}&v=20170830`,
      dataType: "json",
      //on success, save number of likes
      success: function(data) {
        location.likes = data.response.venue.likes.count;
      },
      timeout: 10000,
      //on error, slap an error message
      error: function(error) {
          alert("An issue happened when retrieving data from FourSquare! Ups!");
      }
    });
  };

  // Animate the selected item
  self.animate = function(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.DROP);
    }
  };


  // Initialize the Map
  self.initMap = function() {
    self.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 28.467646,
        lng: -16.255952
      },
      zoom: 15,
      mapTypeControl: false
    });
  };
}


// Google Error
function googleFailedMe() {
  alert("An issue happened when retrieving data from Google Maps API! Ups!");
}

var viewModel;

//Initialize everything
function init() {

  viewModel = new ViewModel();
  viewModel.initMap();
  viewModel.updateList();
  ko.applyBindings(viewModel, document.getElementById("listing"));
}
