$( document ).ready(function() {
  var toggled = true;
  var toggle1 = true;

  $(".toggleBar").click(function(){
    console.log("toggle clicked.")
    if(toggled) {
      toggled=false;
      $(".icon-container").hide();
      $("#toggle").attr('class', 'fa fa-toggle-off');
      $(".icons").animate({width: "5px"}, "fast");
    }else {
      toggled=true;
      $(".icon-container").show();
      $("#toggle").attr('class', 'fa fa-toggle-on');
      $(".icons").animate({width: "55px"}, "fast");
    }
  });

  
  $(".left").mouseover(function(){
    console.log("side bar hovered");
    $(".left").animate({width: "85px"}, "fast");
    // $(".left").css({
    //   "width": "85px",
    // });
  });

  $(".left").mouseout(function(){
    console.log("side bar left");
    $(".left").animate({width: "55px"}, "fast");

    // $(".left").css({
    //   "width": "55px",
    // });
  });
});
