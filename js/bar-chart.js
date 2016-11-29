//  Prototype BarChart

function BarChart(attribute){

   // Add object properties like this
   this.attribute = attribute;
   this.countries = new Array();
}

// Attribute Setter
BarChart.prototype.setAttribute = function(new_attr){
    this.attribute = new_attr;
};

// Attribute Getter
BarChart.prototype.getAttribute = function(){
    return this.attribute;
};


// Add methods like this.  All objects of this type will be able to invoke this
BarChart.prototype.draw = function(data){

	//Initial w and h
    var w = 800;
    var h = 300;

    //Append the svg object to the specified div in the body of the page
    var svg = d3.select("#bar_chart")
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    //Create initial variables from svg
    svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 110},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

    //Get attribute to use for bars from object
    var attr = this.attribute;

    //set the Ranges
    var x = d3.scaleBand().range([0, width]).padding(0.1);
    var y = d3.scaleLinear().range([height, 0]);

    // selects the svg object of the specified div in the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select("#bar_chart").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data
    //console.log("MIN, MAX: " + d3.extent(data, function(d) { return d[attr]; }) );

    x.domain( data.map(function(d) { return d.year; }) );
    y.domain( [0, d3.max(data, function(d) { return d[attr]; }) ] );

    // Axis vars
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

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