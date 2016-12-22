//      Countries Selection Menu

// Global Variables

var selectedCountries = new Array();
var allCountries = new Array( "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark",
    "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania",
    "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Spain", "Sweden", "United Kingdom"  );

console.log(allCountries);

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

