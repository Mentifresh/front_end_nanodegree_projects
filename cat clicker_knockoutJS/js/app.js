var initialCats = [{
  clickCount: 0,
  name: "Tabby",
  imgSrc: "img/2.jpg",
  imgAttribution: "http://www.flickr.com",
  nickNames: ["Banana", "Bob", "Ruffles"]
},{
  clickCount: 0,
  name: "Bonkers",
  imgSrc: "img/1.jpg",
  imgAttribution: "http://www.flickr.com",
  nickNames: null
},{
  clickCount: 0,
  name: "Fluffy",
  imgSrc: "img/3.jpg",
  imgAttribution: "http://www.flickr.com",
  nickNames: null
},{
  clickCount: 0,
  name: "Choff",
  imgSrc: "img/4.jpg",
  imgAttribution: "http://www.flickr.com",
  nickNames: null
},{
  clickCount: 0,
  name: "Bob",
  imgSrc: "img/5.jpg",
  imgAttribution: "http://www.flickr.com",
  nickNames: ["Chester", "Fluffy", "Gin"]
}];

var Cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);
  this.nickNames = ko.observable(data.nickNames);

  this.level = ko.computed(function() {
    var level;
    var clicks = this.clickCount();
    if (clicks >= 70) {
      level = "Elder";
    } else if (clicks >= 35) {
      level = "Adult";
    } else if (clicks >= 20) {
      level = "Young Adult";
    } else if (clicks >= 10) {
      level = "Teenage";
    } else {
      level = "infant";
    }
    return level;
  }, this);
}

var ViewModel = function() {
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem) {
      self.catList.push( new Cat(catItem) );
    });

    this.currentCat = ko.observable( this.catList()[0] );

    this.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.setCat = function(clickedCat) {
      self.currentCat(clickedCat);
    };
}

ko.applyBindings(new ViewModel());
