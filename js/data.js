//      Data Loading, treatment and filter functions

//  Global Variables

var euData = new Array();
var originsData = new Array();
var mainData = new Array();

//  Aux Data Selection/Filter Functions

// Remove sentinel entries from data
function removeMainDataObjSentinel(data_object){

    //console.log("Before: ");
    //console.log(data_object);

    if(data_object["arrivals"] < 0){
        data_object["arrivals"] = 0;
    }
    if(data_object["departures"] < 0){
        data_object["departures"] = 0;
    }
    if(data_object["directToGdp"] < 0){
        data_object["directToGdp"] = 0;
    }
    if(data_object["numJobs"] < 0){
        data_object["numJobs"] = 0;
    }
    if(data_object["expenditures"] < 0){
        data_object["expenditures"] = 0;
    }
    if(data_object["gdp"] < 0){
        data_object["gdp"] = 0;
    }
    if(data_object["netOccupancyRate"] < 0){
        data_object["netOccupancyRate"] = 0;
    }
    if(data_object["percentToGdp"] < 0){
        data_object["percentToGdp"] = 0;
    }
    if(data_object["population"] < 0){
        data_object["population"] = 0;
    }
    if(data_object["receipts"] < 0){
        data_object["receipts"] = 0;
    }

    //console.log("After: ");
    //console.log(data_object);

    return data_object;
}

// Filters data by countries: returns only the data for chosen countries
function filterMainByCountries(data, countries_array){
    var treated_data = new Array();

    for(var j = 0; j < countries_array.length; j++){
        for(var i=0; i<data.length; i++){
            if( data[i]["country"] == countries_array[j]){
              treated_data.push(data[i]);
            }
          }  
    }

    //console.log(treated_data);
    return treated_data;
}

// Filters data by year range: returns only the data between chosen years
function filterByYearRange(data, initial_year, end_year){
    var treated_data = new Array();

    var years = new Array();

    for(var k = initial_year; k <= end_year; k++){
        years.push(k);
    }

    //console.log(years);

    for(var j = 0; j < years.length; j++){
        for(var i=0; i<data.length; i++){
            if( data[i]["year"] == years[j]){
              treated_data.push(data[i]);
            }
          }  
    }

    //console.log(treated_data);
    return treated_data;
}

//  Loads Data after Document is ready

$(document).ready(function() {

    //  Retrieve Data

    d3.json("data/originsDestinations.json", function(data) {
        //console.log(data);  
        //  Get input data and load it into memory
        var date = new Date();
        for(var i=0;i<data.length;i++){
            originsData[i] = new Object();

            originsData[i]["country"] = data[i]["country"];
            originsData[i]["destination"] = data[i]["destination"];
            originsData[i]["numTrips"] = data[i]["numberTrips"];
            originsData[i]["year"] = data[i]["year"];
            date = new Date(data[i]["year"], 0 ,1);
            originsData[i]["date"] = date;
            //console.log(date);

        }
        //console.log(originsData);
    });

    d3.json("data/mainTable.json", function(data) {
        //console.log(data);  
        //  Get input data and load it into memory
        var parseTime = d3.timeParse("%Y");
        var date_string = "";
        var parsed_date = "";
        var date = new Date();

        for(var i=0;i<data.length;i++){
            mainData[i] = new Object();

            mainData[i]["arrivals"] = data[i]["arrivalsWW"];
            mainData[i]["country"] = data[i]["country"];
            mainData[i]["departures"] = data[i]["departuresWW"];
            mainData[i]["directToGdp"] = data[i]["directContributionToGdpDollars"];
            mainData[i]["numJobs"] = data[i]["employmentNumberJobs"];
            mainData[i]["expenditures"] = data[i]["expendituresDollars"];
            mainData[i]["gdp"] = data[i]["gdp"];
            mainData[i]["netOccupancyRate"] = data[i]["netOccupancyRate"];
            mainData[i]["percentToGdp"] = data[i]["percentageContributionGdp"];
            mainData[i]["population"] = data[i]["population"];
            mainData[i]["receipts"] = data[i]["receiptsDollars"];
            mainData[i]["year"] = data[i]["year"];

            date = new Date(data[i]["year"], 0 ,1);
            date_string = date.getFullYear(); // fullYear
            //console.log(date);
            parsed_date = parseTime(date_string);
            //console.log("PARSED: " + parsed_date);
            mainData[i]["date"] = parsed_date;
            

            mainData[i] = removeMainDataObjSentinel(mainData[i]);

        }
        //console.log(mainData);
    });

    d3.json("data/eu.json", function(data) {
        //console.log(data);  
        //  Get input data and load it into memory
        var parseTime = d3.timeParse("%Y");
        var date_string = "";
        var parsed_date = "";
        var date = new Date();
        for(var i=0;i<data.length;i++){
            mainData[i] = new Object();

            mainData[i]["arrivals"] = data[i]["arrivalsWW"];
            mainData[i]["country"] = data[i]["country"];
            mainData[i]["departures"] = data[i]["departuresWW"];
            mainData[i]["directToGdp"] = data[i]["directContributionToGdpDollars"];
            mainData[i]["numJobs"] = data[i]["employmentNumberJobs"];
            mainData[i]["expenditures"] = data[i]["expendituresDollars"];
            mainData[i]["gdp"] = data[i]["gdp"];
            mainData[i]["netOccupancyRate"] = 0;
            mainData[i]["percentToGdp"] = data[i]["percentageContributionGdp"];
            mainData[i]["population"] = data[i]["population"];
            mainData[i]["year"] = data[i]["year"];
            mainData[i]["receipts"] = data[i]["receiptsDollars"];
            
            date = new Date(data[i]["year"], 0 ,1);
            date_string = date.getFullYear(); // fullYear
            //console.log(date);
            parsed_date = parseTime(date_string);
            //console.log("PARSED: " + parsed_date);
            mainData[i]["date"] = parsed_date;
            //console.log(date);

            mainData[i] = removeMainDataObjSentinel(mainData[i]);

        }
        //console.log(euData);
    });


});