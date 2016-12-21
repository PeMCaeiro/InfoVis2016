//      Formating

function sCountryToFewer(sCountry){
    var sFewer = "";
    switch (sCountry){
        case "Austria":
            sFewer = "AT";
            break;
        case "Belgium":
            sFewer = "BE";
            break;
        case "Bulgaria":
            sFewer = "BG";
            break;
        case "Croatia":
            sFewer = "HR";
            break;
        case "Cyprus":
            sFewer = "CY";
            break;
        case "Czech Republic":
            sFewer = "CZ";
            break;
        case "Denmark":
            sFewer = "DK";
            break;
        case "Estonia":
            sFewer = "EE";
            break;
        case "Finland":
            sFewer = "FI";
            break;
        case "France":
            sFewer = "FR";
            break;
        case "Germany":
            sFewer = "DE";
            break;
        case "Greece":
            sFewer = "GR";
            break;
        case "Hungary":
            sFewer = "HU";
            break;
        case "Ireland":
            sFewer = "IE";
            break;
        case "Italy":
            sFewer = "IT";
            break;
        case "Latvia":
            sFewer = "LV";
            break;
        case "Lithuania":
            sFewer = "LT";
            break;
        case "Luxembourg":
            sFewer = "LU";
            break;
        case "Malta":
            sFewer = "MT";
            break;
        case "Netherlands":
            sFewer = "NL";
            break;
        case "Poland":
            sFewer = "PL";
            break;
        case "Portugal":
            sFewer = "PT";
            break;
        case "Romania":
            sFewer = "RO";
            break;
        case "Slovakia":
            sFewer = "SK";
            break;
        case "Spain":
            sFewer = "ES";
            break;
        case "Sweden":
            sFewer = "SE";
            break;
        case "United Kingdom":
            sFewer = "UK";
            break;
        case "European Union":
            sFewer = "EU";
            break;
    }

    return sFewer;
}

function sAttributeToReal(sAttr){
    sFewer = "";

    switch (sAttr){
        case "arrivals":
            sFewer = "Arrivals";
            break;
        case "departures":
            sFewer = "Departures";
            break;
        case "directToGdp":
            sFewer = "Direct Contribution To GDP (USD $)";
            break;
        case "numJobs":
            sFewer = "Number of Jobs in Tourism";
            break;
        case "expenditures":
            sFewer = "Expenditures (USD $)";
            break;
        case "gdp":
            sFewer = "GDP (USD $)";
            break;
        case "netOccupancyRate":
            sFewer = "Net Occupancy Rate (%)";
            break;
        case "percentToGdp":
            sFewer = "Percentage Contribution to GDP (%)";
            break;
        case "population":
            sFewer = "Population";
            break;
        case "receipts":
            sFewer = "Receipts (USD $)";
            break;
        case "year":
            sFewer = "Year";
            break;
        case "country":
            sFewer = "Country";
            break;
        case "destination":
            sFewer = "Destination";
            break;
        case "numTrips":
            sFewer = "Number of Trips";
            break;
    }

    return sFewer;
}

function shortenLargeNumber(num, digits) {
    //substituted 'G' with 'B'
    var units = ['k', 'M', 'B'],
        decimal;

    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}