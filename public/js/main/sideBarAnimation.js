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
    var isHoveredonPageReload = $('.icon-group-active').is(":hover"); // returns true or false
    var onBorder = $('.verticalLine').is(":hover"); // returns true or false
    console.log(isHoveredonPageReload);
    if(toggle1 && !running && open && !isHoveredonPageReload && !onBorder){
      running = true;
      console.log("side bar hovered");
      $(".left").animate({width: "135px"}, "fast");
      $(".header").animate({left: "157px"}, "fast");
      $(".left:animated").promise().done(function() {
        toggle1 = false;
        running = false;
        $("#home").append("<span class=\"side-bar-text\"> Home</span>");
        $("#about").append("<span class=\"side-bar-text\"> About Me</span>");
        $("#git").append("<span class=\"side-bar-text\"> GitHub</span>");
        $("#twitter").append("<span class=\"side-bar-text\"> Twitter</span>");
        $("#resume").append("<span class=\"side-bar-text\"> Resume</span>");
        $("#projects").append("<span class=\"side-bar-text\"> Projects</span>");
        $("#hobbies").append("<span class=\"side-bar-text\"> Hobbies</span>");
        $("#skills").append("<span class=\"side-bar-text\"> Skills</span>");
        $("#contact").append("<span class=\"side-bar-text\"> Contact Me</span>");
        $(".icons").css({
          "text-align": "left",
        });
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
      $(".header").animate({left: "77px"}, "slow");
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
      $(".header").animate({left: "77px"}, "slow");
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
