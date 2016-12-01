//		Main 

//	MAIN Code

//	Runs code after everything else finishes loading - MAIN
$(window).load(function(){

	//Select a default global attribute - default active button is Arrivals
	addGlobalAttr("arrivals");

	//console.log(euData);
	draw_year_graphs();

});