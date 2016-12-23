//  Prototype Overview

function Overview(){

   // Add object properties like this
   this.recent_attr = new Array();
   this.countries = new Array();
   this.maxAttr = 3;
   this.drawAttr = new Array();
   this.colors = ["red", "green", "darkviolet", "orange", "mediumblue", "sienna"]; // 6 colors right now, maybe add more ?
}


// draw the graph
Overview.prototype.draw = function(data, fixedCountry){

	$('#wrapper').remove();

	$('#overview').append("<div id='wrapper'></div>");

	$('#wrapper').append('<img id="theImg" style="display: block; margin: auto; width: 200px; height: 150px;" alt="' + fixedCountry +'" src="img/' + fixedCountry + '.png" />');

	$('#wrapper').append('<p style="text-align: center; font-weight: bold; font-size: 13px;" > </br> ' +  fixedCountry + ' </p>');

	//console.log("OVERVIEW");
	//console.log(data);
	$('#wrapper').append('<p style="text-align: center; font-size: 13px;" > Year: '+ data[0]["year"] + ' </p>');

	$('#wrapper').append('<p style="text-align: center; font-size: 13px;" > Population: '+ shortenLargeNumber(data[0]["population"], 4) + ' </p>');

	$('#wrapper').append('<p style="text-align: center; font-size: 13px;" > GDP: '+ shortenLargeNumber(data[0]["gdp"], 4) + ' USD ($) </p>');

	$('#wrapper').append('<p style="text-align: center; font-size: 13px;" > Expenditures: '+ shortenLargeNumber(data[0]["expenditures"], 4) + ' USD ($) </p>');

	$('#wrapper').append('<p style="text-align: center; font-size: 13px;" > Receipts: '+ shortenLargeNumber(data[0]["receipts"], 4) + '  USD ($) </p>');





};
