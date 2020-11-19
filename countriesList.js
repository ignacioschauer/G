$(function(){
    var countryOptions;
    $.getJSON('https://restcountries.eu/rest/v2/all', function(result) {
        $.each(result, function(i,country) {
            //lat = (country.latlng)[0];
            //lng = (country.latlng)[1];
            countryOptions+="<option value="+country.latlng+">"+country.name+"</option>";
        });
        $('#country').html(countryOptions);
              
    });

    console.log(countryOptions);  
});




