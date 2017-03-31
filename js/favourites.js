// get favorites from local storage or empty array
var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// add class 'fav' to each favorite
favorites.forEach(function(favorite) {
  document.getElementById(favorite).className = 'fav';
});

function addFavEventHandlers() {
    // register click event listener
    document.querySelector('.list').addEventListener('click', function(e) {
        // console.log("click");
      var id = e.target.id,
          item = e.target,
          index = favorites.indexOf(id);

      // return if target doesn't have an id (shouldn't happen)
      if (!id) return;
      // item is not favorite
      if (index == -1) {
        favorites.push(id);
        item.className = 'fav btn btn-positive btn-block';
        console.log('Fave ON!');
        //alert('Added to your Favourites!');
      // item is already favorite
      } else {
        favorites.splice(index, 1);
        item.className = 'noFav btn btn-positive btn-block';
        console.log('Fave OFF!');
        //alert('Removed from Favourites!');
      }
      // store array in local storage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
    // local storage stores strings so we use JSON to stringify for storage and parse to get out of storage.
    // var buttonRemove = document.getElementsByTagName("#faves button");
    // for (var i = 0; i < buttonRemove.length; i++) {
    // buttonRemove[i].onclick = function() {this.parentNode.removeChild(this);}
    // }
}