$(document).ready(() => {

  //check if in mobile browser
  if (typeof window.orientation != 'undefined') {
    //set height of search and nav bar to fixed height
    let searchBarHeight = $('#searchBar').outerHeight();
    let navBarHeight = $('#navBar').outerHeight();
    $('#searchBar, #searchBarOffset').css({
      height: searchBarHeight
    });
    $('#navBar, #navBarOffset').css({
      height: navBarHeight
    });
  } //end check if mobile

});
