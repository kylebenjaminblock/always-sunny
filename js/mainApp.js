/* =====================
  Set up the map
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 13
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 50,
  ext: 'png'
}).addTo(map);

/// Call and parse data ///
var dataset = "https://gist.githubusercontent.com/kylebenjaminblock/e1a3a57312624e6a76dd13c69c8a37d5/raw/4c29fa3772e22a9522d4f0173ccb6a548dc4b03e/map.geojson";
var cleanData;
var parsedData;
///var allData;
var featureGroup;

$.ajax(dataset).done(function(dataset) {
  parsedData=JSON.parse(dataset);
});

/// Add all data map as layer ///
var allData = function(){
  featureGroup = L.geoJson(parsedData, {
    filter: dataToShow,
    style: myStyle,
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, myStyle);
    }
  }).addTo(map);
};

/// Create slides ///
var state = {
  "slideNumber": 0,
  "slideData": [
    {
      "name": "It's Always Sunny in Philadelphia",
      "readMe": "Location of solar panel installations in Philly",
    },
    {
      "name": "How sunny was Philadelphia in 2010?",
      "readMe": "How sunny was Philadelphia in 2010?",
    },
    {
      "name": "How sunny was Philaelphia after 2010?",
      "readMe": "How sunny was Philaelphia after 2010?",
    },
    {
      "readMe": "Where is the sunniest place in Philadelphia with the most solar wattage?",
      "description": "Where is the sunniest place in Philadelphia with the most solar wattage?",
    },
    {
      "readMe": "Where is the sunniest ZIP in Philadelphia?",
      "description": "Where is the sunniest ZIP in Philadelphia?",
    },
  ]
};

/// Create first landing page
var slideOne = function(event){
  $(".readMe").text("It's Always Sunny in Philadelphia!");
  state.slideNumber = 0;
  clearSlide();
  allData();
  $('.prev').hide();
  $('.next').show();
};

/// Create color style style for each filtered slide
 var myStyle = function (feature) {
   if (state.slideNumber === 0){
     return {color: '#97201b'};
   }
   else if (state.slideNumber === 1){
     return {color: '#97201b'};
   }
   else if (state.slideNumber === 2){
     return {color: '#97201b'};
   }
   else if (state.slideNumber === 3){
     return {color: '#9e6689'};
   }
   else if (state.slideNumber === 4){
     return {color: '#2c57a3'};
   }
 };

/// Create function to clear points from slide prior to advancing to next
var clearSlide = function(){
  if (typeof featureGroup !== 'undefined'){
    map.removeLayer (featureGroup);
  }
};

/// Set zoom level for slide five
var slideFiveZoom = function(){
   if (state.slideNumber === 4){
     map.setView([39.962879, -75.142558], 12);
   }
   else if (state.slideNumber === 0) {
     map.setView([39.9522, -75.1639], 13);
   }
   else if (state.slideNumber === 1) {
     map.setView([39.9522, -75.1639], 13);
   }
   else if (state.slideNumber === 2) {
     map.setView([39.9522, -75.1639], 13);
   }
   else if (state.slideNumber ===3) {
     map.setView([39.9522, -75.1639], 13);
   }
 };

/// Define data to display when respective slide number is "reached"
var dataToShow = function(feature){
  if (state.slideNumber === 0){ /// return all solar installations
    return false;
    }
  else if (state.slideNumber === 1){
    if (feature.properties.YEARBUILT < 2010){ /// return installations prior to 2010
      return true;
    }
  }
else if (state.slideNumber === 2){
  if (feature.properties.YEARBUILT > 2010) { /// return installations after 2010
    return true;
    }
  }
else if (state.slideNumber === 3){ /// return high KW installations
  if (feature.properties.KW > 20){
    return true;
    }
  }
else if (state.slideNumber === 4){
  if (feature.properties.ZIPCODE === 19123){ /// return installations in NoLibs
    return true;
    }
  }
};

/// Increase slide number and clear existing data upon "next" click event
var clickNext = function(event) {
  if (state.slideNumber < state.slideData.length) {
  $(".readMe").text(state.slideData[state.slideNumber]["readMe"]);
  state.slideNumber = state.slideNumber +1;
    } else {
    state.slideNumber = 0;
    }
  clearSlide();
  allData()
  return state.slideNumber;
};

/// Subtract slide number and clear existing data upon "previous" click event
var clickPrev = function(event) {
  if (state.slideNumber >1) {
    state.slideNumber = state.slideNumber -1;
    $(".readMe").text(state.slideData[state.slideNumber]["readMe"]);
  } else {
    state.slideNumber = 0;
    slideOne();
  }
    clearSlide();
    allData();
    return state.slideNumber;
  };

/// Define next click event and pass event into slide advancement function
function nextClicked() {
  alert('ok, you clicked next');
}

var nextEvent = function(){
  $(".next").click(function(){
    if (state.slideNumber < state.slideData.length){
      if (state.slideNumber < state.slideData.length -1){
        $('.prev').show();
        $('.next').show();
        clickNext()
      }
      else {
        $('.prev').show();
        $('.next').hide();
        clickNext();
              }
            }
          })
        }

/// Define previous click event and pass event into slide substraction function
var prevEvent = function() {
  $(".prev").click(function() {
    if (state.slideNumber > 0) {
      if (state.slideNumber == state.slideData.length){
        $('.prev').show();
        $('.next').hide();
        clickPrev()
      } else {
        $('.prev').show();
        $('.next').show();
      }
      clickPrev();
    }
  });
}

/// Execute next and previous click events
nextEvent();
prevEvent();
