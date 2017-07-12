$(document).ready(() => {
  console.log('jq');
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

  // //fade in snippets
  // $(window).scroll(function() {
  //   $('.snippet').each(function(i) {
  //     let bottom_of_object = $(this).offset().top + $(this).outerHeight();
  //     let bottom_of_window = $(window).scrollTop() + $(window).height();
  //     // console.log(i);
  //     if (bottom_of_window > bottom_of_object) {
  //       $(this).animate({
  //         'opacity': '1'
  //       }, 300);
  //     } //end if div is fully visible
  //   }); //end watch each snippet
  // }); //end scroll animate

});

// $('.snippet').ready(() => {
//   console.log('snippets loaded');
//
//   for (var i = 0; i < 5; i++) {
//     console.log($('.snippet'));
//     $(this).css({
//       'opacity': '1'
//     });
//   };
//
//
// }); //end snippet ready
