//change left not icons as icons is percentage based


$( document ).ready(function() {
  var toggled = true;
  var toggle1 = true;
  var running = false;

  $(".toggleBar").click(function(){
    console.log("toggle clicked.")
    if(toggled) {
      toggled=false;
      running=true;
      $(".icon-container").hide();
      $("#toggle").attr('class', 'fa fa-toggle-off');
      $(".left").animate({width: "5px"}, "fast");
      $(".left:animated").promise().done(function() {
        running = false;
      });
    }else {
      toggled=true;
      running=true;
      $(".icon-container").show();
      $("#toggle").attr('class', 'fa fa-toggle-on');
      $(".left").animate({width: "55px"}, "fast");
      $(".left:animated").promise().done(function() {
        running = false;
      });
    }
  });


  $("div.icons").mouseover(function(){
    var pixels = $(".icons").css("width");
    var open = parseInt(pixels, 10) > 54;
    if(toggle1 && !running && open){
      running = true;
      console.log("side bar hovered");
      $(".left").animate({width: "155px"}, "fast");
      $("#home").append(" Home");
      $("#about").append(" About Me");
      $("#git").append(" GitHub");
      $("#twitter").append(" Twitter");
      $("#resume").append(" Resume");
      $("#hobbies").append(" Hobbies");
      $("#skills").append(" Skills");
      $("#contact").append(" Contact Me");
      $(".icons").css({
        "text-align": "left",
      });
      $(".left:animated").promise().done(function() {
        toggle1 = false;
        running = false;
      });
    }
  });

  $("div.icons").mouseleave(function(){ //mouseout vs mouseleave, former runs in children, mouseleave doesnt
    var pixels = $(".icons").css("width");
    var open = parseInt(pixels, 10) > 54;
    if(!toggle1 && !running && open){
      running = true;
      console.log("side bar left");
      $( ".side-bar-text" ).remove();
      $(".left").animate({width: "55px"}, "fast");
      $(".icons").css({
        "text-align": "center",
      });
      $(".left:animated").promise().done(function() {
        toggle1 = true;
        running = false;
      });
    }
  });


  //ewwww, fixed frame being stuck open, even though scrolling on it will fix it(kinda)
  var i = 0;
  function fixSB() {
    var pixels = $(".icons").css("width");
    var open = parseInt(pixels, 10) > 54;
    if(!$('div.icons').is(":hover") && !toggle1 && !running && open){
      running = true;
      console.log("side bar left");
      $( ".side-bar-text" ).remove();
      $(".left").animate({width: "55px"}, "fast");
      $(".icons").css({
        "text-align": "center",
      });
      $(".left:animated").promise().done(function() {
        toggle1 = true;
        running = false;
      });
    }
    setTimeout(fixSB, 1000); //quarter a second
  }
  setTimeout(fixSB, 0);
});
