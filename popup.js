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

function converttoCAD(getFuelPrice) {
    FuelPrice_CAD = getFuelPrice * 1.32
return FuelPrice_CAD
}

function convertoLiters(FuelPrice_CAD)
    FuelPrice_CADL = FuelPrice_CAD / 3.785
return FuelPrice_CADL

function converttoKML(getMileage) {
    Mileage_KML = getMileage/2.352
return Mileage_KML
}

function getTotalPrice(FuelPrice_CADL, Distance,Mileage_KML) {
    TotalPrice = (Distance / Mileage_KML)*FuelPrice_CADL
return TotalPrice
}

function getFuelPrice(fuelType) {
	url = "https://fueleconomy.gov/ws/rest/fuelprices"
	$.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            $("#fuelPrice").val(data[fuelType.toLowerCase()]);
        },
        type: 'GET'
	});
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

function getMileage() {
	let dropdown = $('#options');
    let id = $("#options").val();
    url = "https://fueleconomy.gov/ws/rest/v2/"+id
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            $("#mileage").html("Gas Mileage: "+data.comb08+"mpg")
            getFuelPrice(data.fuelType)
        },
        type: 'GET'
	});
}