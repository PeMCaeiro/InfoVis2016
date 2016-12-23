//      Graphs Functions

//  Global Variables

var gMode = "free";

var bar_chart = new BarChart();
var line_chart = new LineChart();
var heatmap = new Heatmap();
var scatterplot = new Scatterplot();
var radar_chart = new RadarChart();

var choropleth = new Choropleth();

//	Functions


// Main draw functions

function draw_map(){
	var mainSelectionData = filterMainByCountries(mainData, allCountries);
	
	//console.log("Entered Maps");
	//console.log("Data to draw:");
	//console.log(mainSelectionData);

	//d3.select(".d3-tip").remove();
	d3.select(".d3-tip").remove();
	if(gMode == "free"){
		mainSelectionData = filterByYearRange(mainSelectionData, first_year, first_year);
		choropleth.computeDrawAttr(selectedGlobalAttr);
		choropleth.draw(mainSelectionData, allCountries);
	}else if(gMode == "dest" || gMode == "origin"){
		mainSelectionData = originsData;
		//console.log("SO IT BEGINS");
		//console.log(mainSelectionData);
		mainSelectionData = filterByYearRange(mainSelectionData, first_year, first_year);
		//console.log(mainSelectionData);
		//console.log(mainSelectionData);
		choropleth.computeNumberTrips();
		choropleth.draw2(mainSelectionData, allCountries, gKeyCountry, gMode);
	}
}

function draw_year_graphs(){

	maxGlobalAttr = 4;

	// Invoke methods like this
	//bar_chart.setAttribute("numJobs");
	//console.log(bar_chart.getAttribute());

	var mainSelectionData = filterMainByCountries(mainData, selectedCountries);

	mainSelectionData = filterByYearRange(mainSelectionData, first_year, second_year);
	
	console.log("Entered draw_year_graphs");
	//console.log("Data to draw:");
	//console.log(mainSelectionData);

	d3.select(".d3-tip").remove();

	bar_chart.computeDrawAttr(selectedGlobalAttr);
	bar_chart.draw(mainSelectionData, selectedCountries);
	radar_chart.computeDrawAttr(selectedGlobalAttr);
	radar_chart.draw(mainSelectionData, selectedCountries);

}

function draw_range_graphs(){

	maxGlobalAttr = 4;
	//if(selectedGlobalAttr.length == 3){
	//	var a = selectedGlobalAttr[2];
	//	selectedGlobalAttr.length = 2;
	//}

	// Invoke methods like this
	//bar_chart.setAttribute("numJobs");
	//console.log(bar_chart.getAttribute());

	//Filter by countries
	var mainSelectionData = filterMainByCountries(mainData, selectedCountries); //selectedCountries is a global var from countries.js

	//Filter by year range
	mainSelectionData = filterByYearRange(mainSelectionData, first_year, second_year); //first and second_year are global vars from timeline.js
	
	console.log("Entered draw_range_graphs");
	//console.log("Data to draw:");
	//console.log(mainSelectionData);

	d3.select(".d3-tip").remove();

	line_chart.computeDrawAttr(selectedGlobalAttr);
	line_chart.draw(mainSelectionData, selectedCountries);
	heatmap.computeDrawAttr(selectedGlobalAttr);
	heatmap.draw(mainSelectionData, selectedCountries);
	scatterplot.computeDrawAttr(selectedGlobalAttr);
	scatterplot.draw(mainSelectionData, selectedCountries);

}

//Aux functions

function delete_map_graphs(){
	$("#choropleth_map svg").remove();
}


function delete_year_graphs(){
	$("#bar_chart svg").remove();
	$("#overview svg").remove();
	$("#radar_chart svg").remove();
}

// Hide & Show Divs functions
function hide_year_graphs(){
	$(".year").hide();
}

function show_year_graphs(){
	$(".year").show();
}

function delete_range_graphs(){
	$("#line_chart svg").remove();
	$("#heatmap svg").remove();
	$("#scatterplot svg").remove();
}

function hide_range_graphs(){
	$(".year-range").hide();
}

function show_range_graphs(){
	$(".year-range").show();
}

// Update function

function update_graphs(range){
	console.log("Entered update_graphs");
	if(range == true){
		hide_year_graphs();
		delete_range_graphs();
		draw_range_graphs();
		show_range_graphs();
		
		delete_map_graphs();
		draw_map();
	}
	else{
		hide_range_graphs();
		delete_year_graphs();
		draw_year_graphs();
		show_year_graphs();
		
		delete_map_graphs();
		draw_map();
	}
}