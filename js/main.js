//		Main 

//	Aux Functions
function draw_year_graphs(){

	// Instantiate new objects with 'new'

	var bar_chart = new BarChart("arrivals");

	// Invoke methods like this

	//bar_chart.setAttribute("numJobs");
	//console.log(bar_chart.getAttribute());

	var mainSelectionData = filterMainByCountries(mainData, selectedCountries);

	mainSelectionData = filterByYearRange(mainSelectionData, first_year, second_year);
	
	console.log("Filtered Data: ");
	console.log(mainSelectionData);

	bar_chart.draw(mainSelectionData);

}

function delete_year_graphs(){
	$("#bar_chart svg").remove();
}

function update_graphs(range){
	if(range == true){
		//delete_year_graphs();			SHOULD BE HIDE_YEAR_GRAPHS
	}
	else{
		delete_year_graphs();
		draw_year_graphs();
	}
}


//	MAIN Code

//	Runs code after everything else finishes loading - MAIN
$(window).load(function(){

	//console.log(euData);
	draw_year_graphs();

});