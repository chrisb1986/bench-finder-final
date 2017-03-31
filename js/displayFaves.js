function getFaves() {
  var benches=JSON.parse(ajaxRequest.responseText);
  var i = 0,
  oJson = {},
  sKey;
  for (; sKey = window.localStorage.key(i); i++) {
  oJson[sKey] = window.localStorage.getItem(sKey);
  }
  var faveBenchId = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log(oJson);
  if (faveBenchId > 0) {
    console.log("Bench ID = "+faveBenchId);
    //document.getElementById("faveList").innerHTML="<li>"+benches[faveBenchId].benchDesc+" <button onclick='getBenchFaves()'>View directions</button></li>";
    document.getElementById("faves").innerHTML="<h3>Your favourite benches.</h3><hr><ul id='faveList'></ul><li>"+benches[faveBenchId].benchDesc+"<br><img src='images/"+benches[faveBenchId].benchImage+"' alt='image of a bench' width='100%'><br><button class='btn btn-primary btn-block' onclick='getBenchFaves()'>View Directions</button> <button class='del btn btn-negative btn-block' onclick='delBench()'>Delete Bench</button><hr></li>";
    console.log(benches[faveBenchId].id);
  } else {
    document.getElementById("faves").innerHTML="<h3>No favourite benches yet...</h3><ul id='faveList'></ul><li>You have no favourite benches. Discover benches using the 'Find me a bench' button above to populate some benches here.</li>";
    console.log("No benches favourited/in Local Storage");
  }
}

var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function delBench() {
    document.querySelector('.del').addEventListener('click', function(e) {
         console.log("click");
      var id = e.target.id,
         item = e.target,
         index = favorites.indexOf(id);
         favorites.splice(index, 1);
         console.log('Deleted favourite bench!');
         localStorage.setItem('favorites', JSON.stringify(favorites));
         history.go(0);
    });
}
