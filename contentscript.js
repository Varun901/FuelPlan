$(document).ready(function() {
  var lastUrl = "";
  setInterval(function() {
    var newUrl = window.location.href
    if(newUrl != lastUrl && ~newUrl.indexOf("dir")) calculateTripCost();
    lastUrl = window.location.href
  }, 100);
  function calculateTripCost() {
    $(".section-directions-trip-distance").each(function(i,obj) {
      $(".tripCost").remove();
      obj.append('TESTING');
    });
  }
});