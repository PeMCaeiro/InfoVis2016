//      Timeline

// Global Variables

var first_year = 2014;
var second_year = 2014;
var changeMadeInSelection = false;
var changeMadeInSlider = false;


// Run when document finishes loading
$(document).ready(function() {

    // Timeline selects to appropriate default value (2014)
    $("#year-start").val(first_year).change();
    $("#year-end").val(second_year).change();

    // Creates Timeline slider
    $( "#timeline" ).slider({
        min: 2000,
        max: 2016,
        range: true,
        values: [2014, 2014],
        change: function (event, ui) { // When selected values change perform operations
            if(changeMadeInSelection == false){
                //console.log("slider Select: " + changeMadeInSelection);
                //console.log("slider Slider: " + changeMadeInSlider);
                changeMadeInSlider = true;

                //Global variables equal to new years
                first_year = $("#timeline .ui-slider-pip-selected-1 .ui-slider-label").attr("data-value");
                second_year = $("#timeline .ui-slider-pip-selected-2 .ui-slider-label").attr("data-value");
                //console.log("First Year: " + first_year);
                //console.log("Second Year: " + second_year);

                //Change timeline selection menu years to new values
                $("#year-start").val(first_year).change();
                $("#year-end").val(second_year).change();

                //if years are the same -> change to "year" mode
                if(second_year == first_year){

                }
                //if years are NOT the same -> change to "year-range" mode
                else{

                }

                changeMadeInSlider = false;
            }

        }
    })
    .slider("pips", {
        rest: "label"
    })                       
    .slider("float");

});

setTimeout(function(){

// Event handlers for Timeline selection menus

$( "#year-start" ).change(function() {
    if(changeMadeInSlider == false){
        //console.log("Select: " + changeMadeInSelection);
        //console.log("Slider: " + changeMadeInSlider);
        changeMadeInSelection = true;

        //console.log("BEFORE fy: " + first_year);
        //console.log("new val: " +    $( "#year-start option:selected" ).val() );

        if( $( "#year-start option:selected" ).val() > second_year){
            $("#year-start").val(first_year).change();
            changeMadeInSelection = false;
        }

        first_year = $( "#year-start option:selected" ).val();
        $("#timeline").slider({
            values: [first_year, second_year]
        });

        //console.log("AFTER fy: " + first_year);
        changeMadeInSelection = false;
    }
});

$( "#year-end" ).change(function() {
    if(changeMadeInSlider == false){
        changeMadeInSelection = true;
        if( $( "#year-end option:selected" ).val() < first_year){
            $("#year-end").val(second_year).change();
            changeMadeInSelection = false;
        }
        second_year = $( "#year-end option:selected" ).val();
        $("#timeline").slider({
            values: [first_year, second_year]
        });
        changeMadeInSelection = false;
    }

});


}, 200); //  200 ms

