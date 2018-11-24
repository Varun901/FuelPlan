$.ajaxSetup({
    headers : {
      'Accept' : "application/json, text/plain, */*"
    }
  });
  
  $(document).ready(function() {
      loadYears();
      $("#year").change(loadMakes);
      $("#make").change(loadModels);
      $("#model").change(loadTrims);
      $("#options").change(getMileage);
  });
  
  function converttoCADL(FuelPrice) {
      return (FuelPrice * 1.32) / 3.785
  }
  
  function converttoKML(Mpg) {
      return Mpg/2.352
  }
  
  function loadYears() {
      let dropdown = $('#year');
      url = "https://fueleconomy.gov/ws/rest/vehicle/menu/year"
      $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
          $.each(data, function(key, entry) {
              if (data.menuItem.text == undefined) {
                      $.each(data.menuItem, function(key, entry) {
                      dropdown.append($('<option></option>').attr('value', entry.value).text(entry.text));
                  })
              } else {
                      $.each(data, function(key, entry) {
                      dropdown.append($('<option></option>').attr('value', entry.value).text(entry.text));
                  })
              }
          });
      },
      type: 'GET'
      });
  }
  
  function loadMakes() {
      let dropdown = $('#make');
      dropdown.html('<option value="" disabled selected>Make</option>');
      $("#options").html('<option value="" disabled selected>Options</option>');
      $("#make").html('<option value="" disabled selected>Make</option>');
      $("#model").html('<option value="" disabled selected>Model</option>');
      let year = $("#year").val();
      url = "https://fueleconomy.gov/ws/rest/vehicle/menu/make?year="+year
      $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
          $.each(data, function(key, entry) {
              if (data.menuItem.text == undefined) {
                      $.each(data.menuItem, function(key, entry) {
                      dropdown.append($('<option></option>').attr('value', entry.value).text(entry.text));
                  })
              } else {
                      $.each(data, function(key, entry) {
                      dropdown.append($('<option></option>').attr('value', entry.value).text(entry.text));
                  })
              }
          });
      },
      type: 'GET'
      });
  }
  
  function loadModels() {
      let dropdown = $('#model');
      dropdown.html('<option value="" disabled selected>Model</option>');
      $("#options").html('<option value="" disabled selected>Options</option>');
      $("#model").html('<option value="" disabled selected>Model</option>');
      let year = $("#year").val();
      let make = $("#make").val();
      url = "https://fueleconomy.gov/ws/rest/vehicle/menu/modelNoPhev?year="+year+"&make="+make
      $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
          $.each(data, function(key, entry) {
              if (data.menuItem.text == undefined) {
                      $.each(data.menuItem, function(key, entry) {
                      dropdown.append($('<option></option>').attr('value', entry.value).text(entry.text));
                  })
              } else {
                      $.each(data, function(key, entry) {
                      dropdown.append($('<option></option>').attr('value', entry.value).text(entry.text));
                  })
              }
          });
      },
      type: 'GET'
      });
  }
  
  function loadTrims() {
      let dropdown = $('#options');
      dropdown.html('<option value="" disabled selected>Options</option>');
      $("#options").html('<option value="" disabled selected>Options</option>');
      let year = $("#year").val();
      let make = $("#make").val();
      let model = $("#model").val();
      url = "https://fueleconomy.gov/ws/rest/vehicle/menu/options?year="+year+"&make="+make+"&model="+model
      $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
          $.each(data, function(key, entry) {
              if (data.menuItem.text == undefined) {
                      $.each(data.menuItem, function(key, entry) {
                      dropdown.append($('<option></option>').attr('value', entry.value).text(entry.text));
                  })
              } else {
                      $.each(data, function(key, entry) {
                      dropdown.append($('<option></option>').attr('value', entry.value).text(entry.text));
                  })
              }
          });
      },
      type: 'GET'
      });
  }
    
  function getFuelPrice(fuelType) {
      url = "https://fueleconomy.gov/ws/rest/fuelprices"
      $.ajax({
          url: url,
          dataType: 'json',
          success: function(data) {
              var fuelPrice = converttoCADL(data[fuelType.toLowerCase()]).toFixed(2);
              $("#fuelPrice").val(fuelPrice);
              chrome.storage.local.set({gasPrice: fuelPrice}, function() {
                console.log('Value is set to ' + fuelPrice);
              });
          },
          type: 'GET'
      });
  }

  function getMileage() {
      let dropdown = $('#options');
      let id = $("#options").val();
      url = "https://fueleconomy.gov/ws/rest/v2/"+id
      $.ajax({
          url: url,
          dataType: 'json',
          success: function(data) {
              let mileage = converttoKML(data.comb08).toFixed();
              $("#mileage").html("Fuel Efficiency: "+ mileage +" KmpL")
              getFuelPrice(data.fuelType);
              chrome.storage.local.set({gasMileage: mileage}, function() {
                console.log('Value is set to ' + mileage);
              });
          },
          type: 'GET'
      });
  }