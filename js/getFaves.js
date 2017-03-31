// Get User's Coordinate from their Browser.
function getBenchFaves() {
  // HTML5/W3C Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(UserLocationFaves);
    console.log("#4");
  }
  else
    // faveDirections(53.6469273, -1.78238153); // Default to Huddersfield Town Centre.
    faveDirections(53.5419012, -2.11464285); // default to Oldham Town Centre;
    console.log("#5");
}

// Callback function for asynchronous call to HTML5 geolocation
function UserLocationFaves(position) {
  faveDirections(position.coords.latitude, position.coords.longitude);
}

// Convert Degress to Radians
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

// nearestBenches function.
function faveDirections(latitude, longitude) {
  var benches=JSON.parse(ajaxRequest.responseText);
  var faveBenchId = JSON.parse(localStorage.getItem('favorites')) || [];
  var mindif = 99999;
  //var closest;
  for (index = 0; index < benches.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, benches[index].benchLat, benches[index].benchLong);
    if (dif < mindif) {
      closest = index;
      mindif = dif;
    }
  }
  console.log("#6");
  console.log("Fave Lat = "+latitude+". Fave Long = "+longitude);
  // echo the favourited bench to user location in the .content element.
  document.getElementById("results").innerHTML="<iframe frameborder='0' style='width: 100%; height: 350px;' src='https://www.google.com/maps/embed/v1/directions?origin="+latitude+","+longitude+"&destination="+benches[faveBenchId].benchLat+","+benches[faveBenchId].benchLong+"&key=AIzaSyCFoNU8y-kMILqbWT00U_mRDyNATDR0HP4 &mode=walking' allowfullscreen></iframe>";
}
