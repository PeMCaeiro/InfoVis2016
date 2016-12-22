//  Prototype BarChart

function BarChart(){

   // Add object properties like this
   this.recent_attr = new Array();
   this.countries = new Array();
   this.maxAttr = 3;
   this.drawAttr = new Array();
   this.colors = ["steelblue", "red", "green", "darkviolet", "orange", "sienna"]; // 6 colors right now, maybe add more ?
}


//  Aux Functions

BarChart.prototype.maxOfAttr = function(data, attr){
    var max = 0;
    var temp = 0;
    for(var i=0; i < data.length; i++){
        temp = data[i][attr];
        if(temp > max){
            max = temp;
        }
    }
    return max;
};

// Compute Max between drawable attributes in data
BarChart.prototype.maxDrawAttr = function(data){
    var max = 0;
    var temp = 0;
    var attr = "";
    if(this.drawAttr.length == 0){
        return max;
    }
    else{
        for(var i=0; i < this.drawAttr.length; i++){
            attr = this.drawAttr[i].toString();
            temp = this.maxOfAttr(data, attr);
            //console.log("maxDrawAttr: " + this.drawAttr[i] + " with max: " + temp);
            if(temp > max){
                max = temp;
            }
        }
        return max;
    }
};


BarChart.prototype.addRecentAttr = function (attr){

    if(this.recent_attr.length < this.maxAttr){
        this.recent_attr.push(attr);
    }
    // if the recent_attr array is "full", remove first ele and add this new ele at end
    else{
        this.recent_attr.shift();
        this.recent_attr.push(attr);
    }

    console.log("Dropped recent attr: " + attr);
    console.log(this.recent_attr);

};

BarChart.prototype.removeRecentAttr = function(attr){
    var index = this.recent_attr.indexOf(attr);
    this.recent_attr.splice(index, 1);
    
    console.log("Removed recent attr :" + attr);
    console.log(this.recent_attr);
};

BarChart.prototype.isRecentAttrFull = function(){
    if(this.recent_attr.length < this.maxAttr){
        return false;
    }
    else{
        return true;
    }
};

// Graphs prioritize global attr and then dropped attrs
BarChart.prototype.computeDrawAttr = function(globalAttributes){

    this.drawAttr = new Array();
    console.log("drawAttr length");
    console.log(this.drawAttr.length);

    for(var i=0; i < globalAttributes.length; i++ ){

        if( this.drawAttr.length < this.maxAttr ){
            this.drawAttr.push(globalAttributes[i]);
        }

    }

    for(var j=0; j < this.recent_attr.length; j++ ){
        
        if( this.drawAttr.length < this.maxAttr ){
            this.drawAttr.push(this.recent_attr[j]);
        }
    }

    console.log("Drawable Attributes: ");
    console.log(this.drawAttr);

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
    width = (w - margin.left - margin.right),
    height = (h - margin.top - margin.bottom);


    // Setup the tool tip.  Note that this is just one example, and that many styling options are available.
    // See original documentation for more details on styling: http://labratrevenge.com/d3-tip/
    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "Attribute: " + sAttributeToReal(d.name) + "</br>" + "</br>" +  "Value: " + shortenLargeNumber(d.value, 4) ; });
        //.html(function(d) { return "Points: " + d.upoints ; });
            
    d3.select("svg").call(tool_tip);

    //set the Ranges
    var x0 = d3.scaleBand().range([0, width]).padding(0.1);
    var x1 = d3.scaleBand();
    var y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal().range(this.colors);

    // selects the svg object of the specified div in the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select("#bar_chart").select("svg")
        .attr("width", w)
        .attr("height", h)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")"); 

    var attrs = this.drawAttr;
    //console.log(attrs);

    data.forEach(function(d) {
        d.ages = attrs.map(function(name) { return {name: name, value: +d[name]}; });
    });

    //console.log(data);

    max_attr = this.maxDrawAttr(data);
    
    // Scale the range of the data
    x0.domain( data.map(function(d) { return d.country; }) );
    x1.domain(attrs).range([0, x0.bandwidth()]);
    y.domain( [0, this.maxDrawAttr(data) ] );

    // Axis vars
    var xAxis = d3.axisBottom(x0);

    if(max_attr >= 1000000000){
        var tickScale = 1e9;
        var f = d3.formatPrefix(".1", tickScale);
        var yAxis = d3.axisLeft(y)
            .tickFormat(function(d) { return f(d).replace('G', 'B'); });
    }else if(max_attr < 1000000000 && max_attr >= 1000000){
        var tickScale = 1e6;
        var f = d3.formatPrefix(".1", tickScale);
        var yAxis = d3.axisLeft(y)
            .tickFormat(f);
    }else if(max_attr < 1000000 && max_attr >= 100000){
        var tickScale = 1e3;
        var f = d3.formatPrefix(".1", tickScale);
        var yAxis = d3.axisLeft(y)
            .tickFormat(f);
    }else if(max_attr < 100000){
        var yAxis = d3.axisLeft(y);
    }

    //  DRAW BARS

    var attribute = svg.selectAll(".attribute")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "attribute")
        .attr("transform", function(d) { return "translate(" + x0(d.country) + ",0)"; } );

    var bars = attribute.selectAll(".bar")
        .data(function(d) { return d.ages; })
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", x1.bandwidth() )
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.name); })
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);

    // Add the X Axis
    var gX = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    var gY = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

};