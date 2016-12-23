//      Countries Selection Menu

// Global Variables

var selectedCountries = new Array();
var allCountries = new Array( "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark",
    "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania",
    "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Spain", "Sweden", "United Kingdom"  );

var gKeyCountry = "Austria";

//console.log(allCountries);

setTimeout(function(){

    // Event handler for Countries selection menu
    $( "#countries" ).change(function() {
        selectedCountries = new Array();

        $("#countries option:selected").each(function () {
            selectedCountries.push( $(this).val() );
        });

        update_graphs(year_range);

        //console.log(selectedCountries);

        //TODO: Update graphs
    });

}, 150); //  150 ms

setTimeout(function(){

    // Event handler for Countries selection menu
    $( "#mode" ).change(function() {

        $("#mode option:selected").each(function () {
            gMode = $(this).val();
        });

        //console.log(gMode);

        update_graphs(year_range);

        //console.log(selectedCountries);

        //TODO: Update graphs
    });

}, 150); //  150 ms

setTimeout(function(){

    // Event handler for Countries selection menu
    $( "#country" ).change(function() {

        $("#country option:selected").each(function () {
            gKeyCountry = $(this).val();
        });

        update_graphs(year_range);

        console.log("TESTETEETs")
        console.log(gKeyCountry)

        //console.log(selectedCountries);

        //TODO: Update graphs
    });

}, 150); //  150 ms