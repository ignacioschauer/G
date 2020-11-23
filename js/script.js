$(window).on('load', function () {    
    if ($('#preloader').length) {      
        $('#preloader').delay(100).fadeOut('slow', function () {        
            $(this).remove();      
        });    
    }
  });


$('#country').change(function() {
   
    var countryIso=null;

    $.ajax({
        url: "libs/php/getCountryName.php",
        type: 'POST',
        dataType: 'json',
        data: {
            latlng: $('#country').val()
            },
        success: function(result) {

            // console.log(result);

            var markers = [];

            var coordinates = [(result['data']['results']['0']['geometry']['lat']),(result['data']['results']['0']['geometry']['lng'])]; 
        
            var marker = L.marker(coordinates, {icon: myIcon}).bindPopup(result['data']['results']['0']['components']['country']);
        
            markers.push(marker);
        
            var featureGroup = L.featureGroup(markers).addTo(mymap);

            mymap.fitBounds(featureGroup.getBounds());

            if (result.status.name == "ok") {

                $('#countryName').html(result['data']['results']['0']['components']['country']);
                $('#continent').html('Continent: ' + result['data']['results']['0']['components']['continent']);
                $('#timeZone').html('Time Zone: ' + result['data']['results']['0']['annotations']['timezone']['name']);
                $('#latitude').html('Latitude: ' + result['data']['results']['0']['geometry']['lat'] + '&#176;');
                $('#longitude').html('Longitude: ' + result['data']['results']['0']['geometry']['lng'] + '&#176;');
                $('#currency').html('Currency: ' + result['data']['results']['0']['annotations']['currency']['name'] + '  (' + result['data']['results']['0']['annotations']['currency']['iso_code'] +')');       
                countryIso = (result['data']['results']['0']['annotations']['currency']['iso_code']);
                $.ajax({
                    url: "libs/php/getCurrencyExchangeRate.php",
                    type: 'POST',
                    data: {
                        symbol: countryIso,
                        },

                    success: function(result) {

                        if (result.status.name == "ok") {

                        $('#currentExchangeRate').html('Exchange Rate: ' + result['data']['EUR_'+countryIso] + ' / EUR');

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

    
    var latitude;
    var longitude;
   
    $.ajax({
        url: "libs/php/getCountryName.php",
        type: 'POST',
        dataType: 'json',
        data: {
            latlng: $('#country').val()
            },
        success: function(result) {

            if (result.status.name == "ok") {

                latitude = (result['data']['results']['0']['geometry']['lat']);
                longitude = (result['data']['results']['0']['geometry']['lng']);     
                countryWiki = (result['data']['results']['0']['components']['country']); 

                $('#currentWeather').html('');
                $.ajax({
                url: "libs/php/getWeather.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    lat: latitude,
                    lng: longitude

                },
                success: function(result) {
                
                    var todayDate = new Date();                   
                    var month = todayDate.getMonth()+1;
                    var date_total = (todayDate.getDate()+1 +"."+month)


                console.log(date_total);
        
                if (result.status.name == "ok") {

                $('#currentWeather').html('Weather: ' + result['data']['current']['temp'] + '&#176;, humidity ' + result['data']['current']['humidity'] + '&#37;, ' + result['data']['current']['weather']['0']['description'] + '.');
                $('#weatherForecast').html('Weather Forecast: ')
                $('#dayOne').html((todayDate.getDate()+1 +"."+month)+': ' + result['data']['daily']['1']['temp']['day'] + '&#176;, ' + result['data']['daily']['1']['humidity'] + '&#37;, ' + result['data']['daily']['1']['weather']['0']['main'] + '.');
                $('#dayTwo').html((todayDate.getDate()+2 +"."+month)+': ' + result['data']['daily']['2']['temp']['day'] + '&#176;, ' + result['data']['daily']['2']['humidity'] + '&#37;, ' + result['data']['daily']['2']['weather']['0']['main'] + '.')
                $('#dayThree').html((todayDate.getDate()+3 +"."+month)+': ' + result['data']['daily']['3']['temp']['day'] + '&#176;, ' + result['data']['daily']['3']['humidity'] + '&#37;, ' + result['data']['daily']['3']['weather']['0']['main'] + '.')
                $('#dayFour').html((todayDate.getDate()+4 +"."+month)+': ' + result['data']['daily']['4']['temp']['day'] + '&#176;, ' + result['data']['daily']['4']['humidity'] + '&#37;, ' + result['data']['daily']['4']['weather']['0']['main'] + '.')
                $('#dayFive').html((todayDate.getDate()+5 +"."+month)+': ' + result['data']['daily']['5']['temp']['day'] + '&#176;, ' + result['data']['daily']['5']['humidity'] + '&#37;, ' + result['data']['daily']['5']['weather']['0']['main'] + '.')
                $('#daySix').html((todayDate.getDate()+6 +"."+month)+': ' + result['data']['daily']['6']['temp']['day'] + '&#176;, ' + result['data']['daily']['6']['humidity'] + '&#37;, ' + result['data']['daily']['6']['weather']['0']['main'] + '.')
                $('#daySeven').html((todayDate.getDate()+7 +"."+month)+': ' + result['data']['daily']['7']['temp']['day'] + '&#176;, ' + result['data']['daily']['7']['humidity'] + '&#37;, ' + result['data']['daily']['7']['weather']['0']['main'] + '.')
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
                $('#currentWeather').html('Current Weather: ' + msg);
            },
        });

        $.ajax({
            url: "libs/php/getWikipediaLinks.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat:latitude,
                lng: longitude
                },
    
            success: function(result) {
                
                if(result['data'].length < 1 ||result['data'] == undefined){
                   $('#wikipediaLinks').html('');
                }   
                else{
                      if (result.status.name == "ok") {
    
                        $('#wikipediaLinks').html('<a target="_blank" href="https://'+result['data'][0]['wikipediaUrl']+'">Wikipedia Link</a>');
                    
                    }else{
                        $('#wikipediaLinks').html('');
    
                    }
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
            $('#wikipediaLinks').html('');
            },
        }); 
    
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

    var capital;
    var timeZone;
    var flag;
    var population;
    var languages;
    $.getJSON('https://restcountries.eu/rest/v2/all', function(result) {
        $.each(result, function(i,capital_name) {
            var country_name=$('#country option:selected').text();
            if(capital_name.name == country_name){
                capital = capital_name.capital;
                timeZone = capital_name.timezones;
                flag = capital_name.flag;
                population = capital_name.population;
                languages = capital_name.languages;

                $('#capitalCity').html('Capital Name : ' + capital);
                $('#population').html('Population: ' + population);
                $('#flag').html('<img src="'+flag+'" class="flag_class" />');
                
                languages = $(languages).map( function(index,val){
                    return val.name;

                }).get().join(', ');
                $('#language').html('Language: ' + languages);
            }
              
        });
        
    });

        var covidCases;
        $('#covidCases').html('');


        $.getJSON('https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true', function(result) {
            $.each(result, function(i,covid) {

            var country_name=$('#country option:selected').text();
            if(covid.country == country_name){
                covidCases = covid.infected;
                $('#covidCases').html('Covid Infected : ' + covidCases);

                }
            });
    });
});
