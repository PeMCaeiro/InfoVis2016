//      Countries Selection Menu

// Global Variables

var selectedCountries = new Array();

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

