//  Prototype BarChart

function Timeline(){

   // Add object properties like this
   this.mode = "year"; //should be either "year" or "year-range"
}


// Add methods like this.  All objects of this type will be able to invoke this
Timeline.prototype.draw = function(data){

	//Initial w and h
    var w = 800;
    var h = 300;

    //Append the svg object to the specified div in the body of the page
    var svg = d3.select("#timeline")
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    //Create initial variables from svg
    svg = d3.select("svg"),
    margin = {top: 60, right: 40, bottom: 60, left: 40},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

    //set the Ranges
    var x = d3.scaleBand().range([0, width]);

    // Scale the range of the data
    //console.log("MIN, MAX: " + d3.extent(data, function(d) { return d[attr]; }) );
    x.domain( data.map(function(d) { return d.year; }) );

    // selects the svg object of the specified div in the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select("#timeline")
        .select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Axis vars
    var xAxis = d3.axisBottom(x)
        .;

    //  DRAW BARS
          
    var bar = svg.selectAll("g")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.year); } )
        .attr("y", function(d) { return y(d.gdp); } )
        .attr("height", function(d) { return height - y(d.gdp); })
        .attr("width", x.bandwidth());

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .call(yAxis);

};