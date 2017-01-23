
var toggled = true;

$("#toggleBar").click(function(){
  console.log("toggle clicked.")
  if(toggled) {
    toggled=false;
    $(this).animate({width: "20px"}, "fast");
  }else {
    toggled=true;
    $(this).animate({width: "200px"}, "fast");
  }
});
