$( document ).ready(function() {
  $( window ).resize(function() {
    $('.main').css("width", $( document  ).width() - 20);
    $('.main').css("height", $( document  ).height() - 92);
  }
});
