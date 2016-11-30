//  Prototype BarChart

$(document).ready(function() {

    $( "#timeline" ).slider( {
        min: 2000,
        max: 2016,
        range: true,
        values: [2014, 2014]} )
    .slider("pips", {
        rest: "label"
    })                       
    .slider("float");

});

 


function Timeline(){

   // Add object properties like this
   this.mode = "year"; //should be either "year" or "year-range"
}


// Add methods like this.  All objects of this type will be able to invoke this
Timeline.prototype.draw = function(data){



};