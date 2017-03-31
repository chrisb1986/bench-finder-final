// Get User's Coordinate from their Browser.
function getBench() {
  // HTML5/W3C Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(UserLocation);
    console.log("#1");
  }
  else
    // NearestBench(53.6469273, -1.78238153); // Default to Huddersfield Town Centre.
    NearestBench(53.5419012, -2.11464285); // default to Oldham Town Centre;
    console.log("#2");
}

// Callback function for asynchronous call to HTML5 geolocation
function UserLocation(position) {
  NearestBench(position.coords.latitude, position.coords.longitude);
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

function NearestBench(latitude, longitude) {
  var benches=JSON.parse(ajaxRequest.responseText);
  var mindif = 99999;
  var closest;
  for (index = 0; index < benches.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, benches[index].benchLat, benches[index].benchLong);
      // console.log(benches[index].benchDesc+" "+dif) - use for other nearest benches.
    if (dif < mindif) {
      closest = index;
      mindif = dif;
    }
  }
  console.log("#3");
  console.log("Bench Lat = "+latitude+". Bench Long = "+longitude);
  // echo the nearest bench to user location in the .content element.
  console.log("Closest = "+benches[closest].benchDesc);
  document.getElementById("results").innerHTML="<iframe frameborder='0' style='width: 100%; height: 350px;' src='https://www.google.com/maps/embed/v1/directions?origin="+latitude+","+longitude+"&destination="+benches[closest].benchLat+","+benches[closest].benchLong+"&key=AIzaSyCFoNU8y-kMILqbWT00U_mRDyNATDR0HP4 &mode=walking' allowfullscreen></iframe><table><tr><td>Description:</td><td>"+benches[closest].benchDesc+"</td></tr><tr><td>Rating:</td><td><img src='images/rating/"+benches[closest].benchRating+"'</td></tr><tr><td colspan='2'><img src='images/"+benches[closest].benchImage+"' alt='image of a bench' width='100%'/></td></tr></table>";
  // echo 'Add to faves' link.  
  // document.getElementById("faves").innerHTML="<ul class='list'><li id="+benches[closest].id+">'Bench "+benches[closest].id+"' fave this bench?</li></ul><br><button class='btn btn-primary btn-block' onClick='history.go(0)' value='Refresh'>Home</button>";
  document.getElementById("faves").innerHTML="<br><ul class='list'><li id="+benches[closest].id+" class='btn btn-positive btn-block'>Favourites</li><br><button class='btn btn-primary btn-block' onClick='history.go(0)' value='Refresh'>Home</button>";
  addFavEventHandlers()
}

