$(window).load(function(){

	//console.log(euData);

	//	Control variables
	var selectedCountries = new Array();


	// Instantiate new objects with 'new'

	var bar_chart = new BarChart("gdp");

	// Invoke methods like this

	//bar_chart.setAttribute("numJobs");
	//console.log(bar_chart.getAttribute());

	selectedCountries.push("Portugal");
	selectedCountries.push("Austria");

	var mainSelectionData = filterMainByCountries(mainData, selectedCountries);
	console.log(mainSelectionData);

	bar_chart.draw(mainSelectionData);

});