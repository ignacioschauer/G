$(window).on('load', function () {    
    if ($('#preloader').length) {      
        $('#preloader').delay(100).fadeOut('slow', function () {        
            $(this).remove();      
        });    
    }
  });

$('#country').change(function() {

    $.ajax({
        url: "libs/php/getCountryName.php",
        type: 'POST',
        dataType: 'json',
        data: {
            latlng: $('#country').val()
            },
        success: function(result) {

            console.log(result);

            var markers = [];

            var coordinates = [(result['data']['results']['0']['geometry']['lat']),(result['data']['results']['0']['geometry']['lng'])]; 
        
            var marker = L.marker(coordinates, {icon: myIcon}).bindPopup(result['data']['results']['0']['components']['country']);
        
            markers.push(marker);
        
            var featureGroup = L.featureGroup(markers).addTo(mymap);

            mymap.fitBounds(featureGroup.getBounds());

            if (result.status.name == "ok") {

                $('#countryName').html('Country Name : ' + result['data']['results']['0']['components']['country']);
                $('#continent').html('Continent: ' + result['data']['results']['0']['components']['continent']);
                $('#timeZone').html('Time Zone: ' + result['data']['results']['0']['annotations']['timezone']['name']);
                $('#latitude').html('Latitude: ' + result['data']['results']['0']['geometry']['lat']);
                $('#longitude').html('Longitude: ' + result['data']['results']['0']['geometry']['lng']);
                $('#currency').html('Currency: ' + result['data']['results']['0']['annotations']['currency']['name'] + '  (' + result['data']['results']['0']['annotations']['currency']['iso_code'] +')');
                var countryIso = (result['data']['results']['0']['annotations']['currency']['iso_code']);
                console.log(countryIso);
            }
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
            msg = 'ERROR: Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
            msg = 'ERROR: Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
            msg = 'ERROR: Internal Server Error [500].';
            } else if (exception === 'parsererror') {
            msg = 'ERROR: Requested JSON parse failed.';
            } else if (exception === 'timeout') {
            msg = 'ERROR: Time out error.';
            } else if (exception === 'abort') {
            msg = 'ERROR: Ajax request aborted.';
            } else {
            msg = 'ERROR: Uncaught Error.\n' + jqXHR.responseText;
            }
        $('#countryName').html(msg);
        },
    }); 

    $.ajax({
        url: "libs/php/getWikipediaLinks.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#country').val()[0],
            lng: $('#country').val()[1],
            },

        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#wikipediaLinks').html('Wikipedia: ' + result['data'][0]['summary']);
            }
        
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
            msg = 'ERROR: Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
            msg = 'ERROR: Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
            msg = 'ERROR: Internal Server Error [500].';
            } else if (exception === 'parsererror') {
            msg = 'ERROR: Requested JSON parse failed.';
            } else if (exception === 'timeout') {
            msg = 'ERROR: Time out error.';
            } else if (exception === 'abort') {
            msg = 'ERROR: Ajax request aborted.';
            } else {
            msg = 'ERROR: Uncaught Error.\n' + jqXHR.responseText;
            }
        $('#wikipediaLinks').html(msg);
        },
    }); 

    $.ajax({
        url: "libs/php/getWeather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#country').val()[0],
            lng: $('#country').val()[1],
            },
        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#currentWeather').html('Weather: ' + result['data']['current']['weather']['0']['description']);
            }
        
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
            msg = 'ERROR: Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
            msg = 'ERROR: Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
            msg = 'ERROR: Internal Server Error [500].';
            } else if (exception === 'parsererror') {
            msg = 'ERROR: Requested JSON parse failed.';
            } else if (exception === 'timeout') {
            msg = 'ERROR: Time out error.';
            } else if (exception === 'abort') {
            msg = 'ERROR: Ajax request aborted.';
            } else {
            msg = 'ERROR: Uncaught Error.\n' + jqXHR.responseText;
            }
        $('#currentWeather').html(msg);
        },
    }); 

    $.ajax({
        url: "libs/php/getCurrencyExchangeRate.php",
        type: 'POST',
        data: {
            symbol: JSON.stringify(countryIso),
            },

        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

            $('#currentExchangeRate').html('Current Exchange Rate: ' + result.data.USD_EUR);

            }
        
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {   
            msg = 'ERROR: Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
            msg = 'ERROR: Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
            msg = 'ERROR: Internal Server Error [500].';
            } else if (exception === 'parsererror') {
            msg = 'ERROR: Requested JSON parse failed.';
            } else if (exception === 'timeout') {
            msg = 'ERROR: Time out error.';
            } else if (exception === 'abort') {
            msg = 'ERROR: Ajax request aborted.';
            } else {
            msg = 'ERROR: Uncaught Error.\n' + jqXHR.responseText;
            }
        $('#currentExchangeRate').html('Current Exchange Rate: ' + msg);
        },
    }); 
});
