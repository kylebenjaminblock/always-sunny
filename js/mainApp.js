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

/// Create Slides ///

var state = {
  "slideNumber": 0, // slideNumber keeps track of what slide you are on. It should increase when you
                    // click the next button and decrease when you click the previous button. It
                    // should never get so large that it is bigger than the dataset. It should never
                    // get so small that it is smaller than 0.
  "slideData": [
    {
      "id": "0",
      "name": "It's Always Sunny in Philadelphia",
      "description": "Location of solar panel installations in Philly",
    },
    {
      "id": "1",
      "name": "How sunny was Philadelphia in 2010?",
      "description": "Installations before 2010",
      "pre_2010": 2010,
    },
    {
      "id": "2",
      "name": "How sunny was Philaelphia after 2010?",
      "description": "Installations after 2010",
      "post_2010": 2010,
    },
    {
      "id": "3",
      "name": "Where is the sunniest place in Philadelphia?",
      "description": "Wattage of installations",
    },
    {
      "id": "4",
      "name": "Where is the sunniest ZIP in Philadelphia?",
      "description": "ZIP code of installations",
    },
  ]
};

// Advance slide number upon "next" click
var clickNext = function(event) {
  var limit = state.slideData.length - 1;
  if (state.slideNumber + 1 > limit) {
    state.slideNumber = 0;
  } else {
    state.slideNumber = state.slideNumber + 1;
  }
  return state.slideData[state.slideNumber];
};

// Feed slide advance function upon next click event
$("#next").click(function(event) {
  clickNext();
});

// Subtract slide number upon "previous" click
var clickPrev = function(event) {
  var limit = 0;
  if (state.slideNumber = limit) {
    state.slideNumber = 0;
  } else {
    state.slideNumber = state.slideNumber - 1;
  }
  return state.slideData[state.slideNumber];
};

// Feed slide subtraction function upon previous click event
$("#prev").click(function(event) {
  clickPrev();
});

// /// Slide 1 Function
// var myStyle1 = function(YEARBUILT) {
//   // myStyle1Zoom();
//  if (cleanData.YEARBUILT < 2010) {
//    pre_2010.addTo(map);
//  }
//     $('#prev').hide();
//     $("#sidebar").empty().append("It's Always Sunny in Philadelphia");
// };

/// Get and parse data

var cleanData;
$.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json").done(function(rawData){
   cleanData = JSON.parse(rawData);
   console.log(cleanData);
   _.each(cleanData, function(rawData){
     L.marker([cleanData.LAT, cleanData.LONG_]).addTo(map);
    });
   });



// /// SLIDE 1 ///
// plot all solar installations in Philly FILTER by YEARBUILT



/// Slide 2 ///
// Plot all solar installations prior to 2010

// function pre2010 (YEARBUILT) {
//   return
// }
//
// var pre2010 = function(YEARBUILT){
//   if (cleanData.YEARBUILT < 2010) {
//
//   }
// }
// //


// downloadData.done(function(rawData) {
//     for (var i = 0; i < cleanData.length -1; i++) {
//       if (cleanData[i].YEARBUILT < 2010) {
//         filtered_pre2010.push(cleanData[i]);
//       } else {
//         filtered_out.push(cleanData[i]);
//       };
//     };
//   });
//     console.log(filtered_pre2010);



/// SLIDE 3 ///
// Filter installations after 2010

// var pre2010 = [2010];
// var filtered_pre2010 = []
// var filtered_out = []

// for (var i = 0; i < cleanData.length -1; i++) {
//   /// Necessary to convert to string? ///
//   if (cleanData[i].YEARBUILT < 2010) {
//     filtered_pre2010.push(cleanData[i]);
//   } else {
//     filtered_out.push(cleanData[i]);
//   }
// }

/// SLIDE 4 ///
/// Show KWs in a popup

// var color;
//   if (filtered_pre2010[i].YEARBUILT){
//   color = '#0000FF'
// };
//
// var pathOpts = {'radius': filtered_pre2010[i].cleanData,
//                   'fillColor': color};

  // L.circleMarker([filtered_data[i].LAT, [i].LONG_], pathOpts).bindPopup(filtered_pre2010[i].NAME).addTo(map);

/// Slide 5
/// Show ZIP code in pop up

$.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json").done(function(rawData){
   cleanData = JSON.parse(rawData);
   console.log(cleanData);
   _.each(cleanData, function(rawData){
     L.marker([cleanData.LAT, cleanData.LONG_]).addTo(map);
    });
   });

 /// FILTERING OPTION 1
 var pre2010 = [];
 var filtered_out_2010 = [];
 for (var i = 0; i < cleanData.length - 1; i++) {
   b42010 = cleanData[i].YEARBUILT <2010;
   filter_condition = (b42010);

   if (filter_condition) {
     pre2010.push(cleanData[i]);
   } else {
     filtered_out_2010.push(cleanData[i]);
   }
 }

/// FILTER OPTION 2

pre2010 = _.filter(cleanData,function(YEARBUILT){
     return cleanData.YEARBUILT < 2010;
             });
   slideBikeMarkers = L.geoJSON(bike, {
       pointToLayer: function (feature, latlng) {
           return L.circleMarker(latlng, bikeMarkerOptions);
       }
   }).addTo(map);
 };

  //  var all =  cleanData.;
  //  var pre2010=cleanData.YEARBUILT>2010;
  //  var post2010;=
  //  var wattage;
  //  var zipcode;

// if (slideNumber===0) {
//           all.addTo(map);
//         } else if (slideNumber===1) {
//           pre2010.addTo(map);
//         } else if (slideNumber===2) {
//           post2010.addTo(map);
//         }  else if (slideNumber==3)  {
//           wattage.addTo(map);
//         } else if (slideNumber==4) {
//           zipcode.addTo(map);
//         };
//       };
