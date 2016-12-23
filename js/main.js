//		Main 

//	MAIN Code

//	Runs code after everything else finishes loading - MAIN
$(window).load(function(){

	//Initial w and h
    var w = 600;
    var h = 300;
    //Append the svg object to the specified div in the body of the page
    var svg = d3.select("#choropleth_map")
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    w = 350;
    d3.select("#scatterplot")
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    d3.select("#heatmap")
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    w = 200;
    h = 150;

    d3.select("#overview")
        .append("svg")
        .attr("width",w)
        .attr("height",h);


    d3.select("#radial_chart")
        .append("svg")
        .attr("width",w)
        .attr("height",h);


	//Select a default global attribute - default active button is Arrivals
	addGlobalAttr("arrivals");

    delete_map_graphs();
    $("#overview svg").remove();
    draw_map();
	//console.log(euData);
	draw_year_graphs();

});