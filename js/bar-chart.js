// Prototype Attribute Button
function BarChart(){

   // Add object properties like this
   //this.attribute = attribute;
}

// Add methods like this.  All objects of this type will be able to invoke this
Person.prototype.draw = function(data){
	
	console.log(data);

	//Initial w and h
    var w = 450;
    var h = 300;

    //Append the svg object to the specified div in the body of the page
    var svg = d3.select("#rank_chart")
        .append("svg")
        .attr("width",w)
        .attr("height",h);
          
    //var padding = 30;
    //var bar_w = 15;

    //Create initial variables from svg
    svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

            //set the Ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

    //  AXES SCALE AND VARS

    //Ordinal Attribute
    var xscale = d3.scaleBand()
        .domain(istidArray)
        .range([padding,w-padding])
        .padding(0.1);

    //Quantitative Attribute
    var yscale = d3.scaleLinear()
        .domain([getMaxOfArray(upointsArray),0])
        .range([padding, h-padding]);

    var xaxis = d3.axisBottom()
        .scale(xscale);

    var yaxis = d3.axisLeft()
        .scale(yscale);

    // Setup the tool tip.  Note that this is just one example, and that many styling options are available.
    // See original documentation for more details on styling: http://labratrevenge.com/d3-tip/
    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "Player: " + d.istid + "</br>" + "</br>" +  "Points: " + d.upoints ; });
        //.html(function(d) { return "Points: " + d.upoints ; });
            
    d3.select("svg").call(tool_tip);

    //  DRAW BARS
          
    var bar = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + xscale(d.istid.toString()) + ", 0)"; });

    bar.append("rect")
        .attr("y", function(d) { return yscale(d.upoints); } )
        .attr("height", function(d) { return h - padding - yscale(d.upoints); })
        .attr("width", xscale.bandwidth())
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);

    // DRAW AXES

    svg.append("g")
        .attr("transform","translate(30,0)")  
        .attr("class","y axis")
        .call(yaxis);

    svg.append("g")
        .attr("transform","translate(0," + (h - padding) + ")")
        .attr("class","x axis")
        .call(xaxis);
        //.selectAll("text")
        //.attr("y", 0)
        //.attr("x", 9)
        //.attr("dy", ".35em")
        //.attr("transform", "rotate(40)")
        //.style("text-anchor", "start");

};