
var toggled = true;

$("#left").click(function(){
  if(toggled) {
    toggled=false;
    $(this).animate({width: "20px"}, "fast");
  }else {
    toggled=true;
    $(this).animate({width: "200px"}, "fast");
  }
});
