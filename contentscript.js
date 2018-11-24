$(document).ready(function() {
  var fuelPrice = "";
  var mileage = "";
  
  chrome.storage.local.get(['gasPrice'], function(result){
    fuelPrice = result.gasPrice;
  });
  chrome.storage.local.get(['gasMileage'], function(result){
    mileage = result.gasMileage;
  });

  var oldFuelPrice = "";
  var oldMileage = "";
  setInterval(function() {
    chrome.storage.local.get(['gasPrice'], function(result){
      fuelPrice = result.gasPrice;
      if (oldFuelPrice != fuelPrice) calculateTripCost();
      oldFuelPrice = fuelPrice;
    });
    chrome.storage.local.get(['gasMileage'], function(result){
      mileage = result.gasMileage;
      if (oldMileage != mileage) calculateTripCost();
      oldMileage = mileage;
    });
  }, 500);

  var lastUrl = "";
  setInterval(function() {
    var newUrl = window.location.href
    if(newUrl != lastUrl && ~newUrl.indexOf("dir")) calculateTripCost();
    lastUrl = window.location.href
  }, 100);

  function getTotalPrice(fp,d,e) {
    return ((parseFloat(d) / parseFloat(e))*parseFloat(fp)).toFixed(2);
  }
  
  function calculateTripCost() {
    if(mileage != undefined && fuelPrice != undefined) {
      $(".section-directions-trip-distance").each(function(i,obj) {
        distance = $(obj).find("div").html();
        distance = distance.slice(0,-3);
        $(".tripCost"+i).remove();
        $('<div class="tripCost'+i+'"><b>$'+getTotalPrice(fuelPrice,distance.replace(/,/g, ''),mileage)+'</b></div>').appendTo(obj);
      });
    }
  }
});