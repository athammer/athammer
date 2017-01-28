$( document ).ready(function() {
  var currentLocation = window.location.pathname;
  if(currentLocation == "/" || currentLocation == "" || currentLocation == null){
    $(".icon-group-home").attr('class', 'icon-group-active');
  }else if (currentLocation == "/about") {
    $(".icon-group-about").attr('class', 'icon-group-active');
  }else if (currentLocation == "/hobbies") {
    $(".icon-group-hobbies").attr('class', 'icon-group-active');
  }else if (currentLocation == "/skills") {
    $(".icon-group-skills").attr('class', 'icon-group-active');
  }else if (currentLocation == "/skills") {
    $(".icon-group-contact").attr('class', 'icon-group-active');
  }

});
