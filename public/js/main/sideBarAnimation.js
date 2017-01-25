$( document ).ready(function() {
  console.log("doc ready");
  var toggled = true;

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
      $(".icons").animate({width: "85px"}, "fast");

    }
  });
});
