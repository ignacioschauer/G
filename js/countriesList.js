$(function(){
    var countryOptions;
    $.getJSON('https://restcountries.eu/rest/v2/all', function(result) {
        $.each(result, function(i,country) {
            countryOptions+="<option value="+country.latlng+">"+country.name+"</option>";
        });
        $('#country').html(countryOptions);     
    });
});




