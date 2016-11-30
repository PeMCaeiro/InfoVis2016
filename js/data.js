//      Data Loading, treatment and filter functions

//  Global Variables

var euData = new Array();
var originsData = new Array();
var mainData = new Array();

//  Aux Data Selection Functions

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
        for(var i=0;i<data.length;i++){
            originsData[i] = new Object();

            originsData[i]["country"] = data[i]["country"];
            originsData[i]["destination"] = data[i]["destination"];
            originsData[i]["numTrips"] = data[i]["numberTrips"];
            originsData[i]["year"] = data[i]["year"];

        }
        //console.log(originsData);
    });

    d3.json("data/mainTable.json", function(data) {
        //console.log(data);  
        //  Get input data and load it into memory
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
            mainData[i]["year"] = data[i]["year"];
            mainData[i]["receipts"] = data[i]["receiptsDollars"];

        }
        //console.log(mainData);
    });

    d3.json("data/eu.json", function(data) {
        //console.log(data);  
        //  Get input data and load it into memory
        for(var i=0;i<data.length;i++){
            euData[i] = new Object();

            euData[i]["arrivals"] = data[i]["arrivalsWW"];
            euData[i]["country"] = data[i]["country"];
            euData[i]["departures"] = data[i]["departuresWW"];
            euData[i]["directToGdp"] = data[i]["directContributionToGdpDollars"];
            euData[i]["numJobs"] = data[i]["employmentNumberJobs"];
            euData[i]["expenditures"] = data[i]["expendituresDollars"];
            euData[i]["gdp"] = data[i]["gdp"];
            euData[i]["percentToGdp"] = data[i]["percentageContributionGdp"];
            euData[i]["population"] = data[i]["population"];
            euData[i]["year"] = data[i]["year"];
            euData[i]["receipts"] = data[i]["receiptsDollars"];

        }
        //console.log(euData);
    });


});