//      Graphs Functions

//  Global Variables

var bar_chart = new BarChart();
var line_chart = new LineChart();

//	Functions


// Main draw functions

function draw_year_graphs(){

	// Invoke methods like this
	//bar_chart.setAttribute("numJobs");
	//console.log(bar_chart.getAttribute());

	var mainSelectionData = filterMainByCountries(mainData, selectedCountries);

	mainSelectionData = filterByYearRange(mainSelectionData, first_year, second_year);
	
	console.log("Entered draw_year_graphs");
	console.log("Data to draw:");
	console.log(mainSelectionData);

	bar_chart.computeDrawAttr(selectedGlobalAttr);
	bar_chart.draw(mainSelectionData);

}

function draw_range_graphs(){

	// Invoke methods like this
	//bar_chart.setAttribute("numJobs");
	//console.log(bar_chart.getAttribute());

	//Filter by countries
	var mainSelectionData = filterMainByCountries(mainData, selectedCountries); //selectedCountries is a global var from countries.js

	//Filter by year range
	mainSelectionData = filterByYearRange(mainSelectionData, first_year, second_year); //first and second_year are global vars from timeline.js
	
	console.log("Entered draw_range_graphs");
	console.log("Data to draw:");
	console.log(mainSelectionData);

	line_chart.computeDrawAttr(selectedGlobalAttr);
	line_chart.draw(mainSelectionData, selectedCountries);

}

//Aux functions

function delete_year_graphs(){
	$("#bar_chart svg").remove();
	$("#scatterplot svg").remove();
	$("#radial_chart svg").remove();
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
	$("#overview svg").remove();
	$("#heatmap svg").remove();
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
	}
	else{
		hide_range_graphs();
		delete_year_graphs();
		draw_year_graphs();
		show_year_graphs();
	}
}