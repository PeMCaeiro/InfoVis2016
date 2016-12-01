//      Graphs Functions

//  Global Variables

var bar_chart = new BarChart();

//	Functions

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

function delete_year_graphs(){
	$("#bar_chart svg").remove();
	$("#scatterplot svg").remove();
	$("#radial_chart svg").remove();
	$("#bar_chart svg").remove();
}

// Hide & Show Divs functions
function hide_year_graphs(){
	$(".year").hide();
}

function show_year_graphs(){
	$(".year").show();
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
		//delete_range_graphs();
		//draw_range_graphs();
		hide_year_graphs();
		show_range_graphs();
	}
	else{
		hide_range_graphs();
		show_year_graphs();
		delete_year_graphs();
		draw_year_graphs();
	}
}