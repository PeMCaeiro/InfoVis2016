//  Prototype Scatterplot

function Scatterplot(){

   // Add object properties like this
   this.recent_attr = new Array();
   this.countries = new Array();
   this.maxAttr = 2;
   this.drawAttr = new Array();
   this.colors = ["steelblue", "red", "green", "darkviolet", "orange", "sienna"]; // 6 colors right now, maybe add more ?
}


//  Aux Functions

Scatterplot.prototype.maxOfAttr = function(data, attr){
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

Scatterplot.prototype.minOfAttr = function(data, attr){
    var min = 99999999999999999999999999999999;
    var temp = 0;
    for(var i=0; i < data.length; i++){
        temp = data[i][attr];
        if(temp < min){
            min = temp;
        }
    }
    return min;
};


// Compute Max between drawable attributes in data
Scatterplot.prototype.maxDrawAttr = function(data){
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

// Compute Min between drawable attributes in data
Scatterplot.prototype.minDrawAttr = function(data){
    var min = 999999999999999999999999999999999;
    var temp = 0;
    var attr = "";
    if(this.drawAttr.length == 0){
        return 0;
    }
    else{
        for(var i=0; i < this.drawAttr.length; i++){
            attr = this.drawAttr[i].toString();
            temp = this.minOfAttr(data, attr);
            //console.log("maxDrawAttr: " + this.drawAttr[i] + " with max: " + temp);
            if(temp < max){
                min = temp;
            }
        }
        return min;
    }
};


Scatterplot.prototype.addRecentAttr = function (attr){

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

Scatterplot.prototype.removeRecentAttr = function(attr){
    var index = this.recent_attr.indexOf(attr);
    this.recent_attr.splice(index, 1);
    
    console.log("Removed recent attr :" + attr);
    console.log(this.recent_attr);
};

Scatterplot.prototype.isRecentAttrFull = function(){
    if(this.recent_attr.length < this.maxAttr){
        return false;
    }
    else{
        return true;
    }
};

// Graphs prioritize global attr and then dropped attrs
Scatterplot.prototype.computeDrawAttr = function(globalAttributes){

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

Scatterplot.prototype.draw = function(data, countries){

    //d3.select(".d3-tip").remove();

    //Initial w and h
    var w = 600;
    var h = 300;

    //Append the svg object to the specified div in the body of the page
    var svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    //Create initial variables from svg
    svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 80},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

    if(this.drawAttr.length < 2){
        return;
    }

    // Setup the tool tip.  Note that this is just one example, and that many styling options are available.
    // See original documentation for more details on styling: http://labratrevenge.com/d3-tip/
    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "Country: " + d.country + "</br>" + "Year: " + d.year + "</br>" + "</br>" + "Attribute1: " + sAttributeToReal(attr1) + "</br>" +  "Value: " + shortenLargeNumber(d[attr1], 4)
        + "</br>" + "</br>" + "Attribute2: " + sAttributeToReal(attr2) + "</br>" +  "Value: " + shortenLargeNumber(d[attr2], 4)  ; });
            
    d3.select("svg").call(tool_tip);

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var color = d3.scaleOrdinal().range(this.colors);

    var attr1 = this.drawAttr[0];
    var attr2 = this.drawAttr[1];

    // setup x 
    var xValue = function(d) { console.log(attr1); return d[attr1];}, // data -> value
        xScale = d3.scaleLinear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}; // data -> display

    var max_attr = d3.max(data, xValue);

    if(max_attr >= 1000000000){
        var tickScale = 1e9;
        var f = d3.formatPrefix(".1", tickScale);
        var xAxis = d3.axisBottom(xScale)
            .tickFormat(function(d) { return f(d).replace('G', 'B'); });
    }else if(max_attr < 1000000000 && max_attr >= 1000000){
        var tickScale = 1e6;
        var f = d3.formatPrefix(".1", tickScale);
        var xAxis = d3.axisBottom(xScale)
            .tickFormat(f);
    }else if(max_attr < 1000000 && max_attr >= 100000){
        var tickScale = 1e3;
        var f = d3.formatPrefix(".1", tickScale);
        var xAxis = d3.axisBottom(xScale)
            .tickFormat(f);
    }else if(max_attr < 100000){
        var xAxis = d3.axisBottom(xScale);
    }

    // setup y
    var yValue = function(d) { return d[attr2];}, // data -> value
        yScale = d3.scaleLinear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}; // data -> display

    max_attr = d3.max(data, yValue);
        
    if(max_attr >= 1000000000){
        var tickScale = 1e9;
        var f = d3.formatPrefix(".1", tickScale);
        var yAxis = d3.axisLeft(yScale)
            .tickFormat(function(d) { return f(d).replace('G', 'B'); });
    }else if(max_attr < 1000000000 && max_attr >= 1000000){
        var tickScale = 1e6;
        var f = d3.formatPrefix(".1", tickScale);
        var yAxis = d3.axisLeft(yScale)
            .tickFormat(f);
    }else if(max_attr < 1000000 && max_attr >= 100000){
        var tickScale = 1e3;
        var f = d3.formatPrefix(".1", tickScale);
        var yAxis = d3.axisLeft(yScale)
            .tickFormat(f);
    }else if(max_attr < 100000){
        var yAxis = d3.axisLeft(yScale);
    }

    // setup fill color
    var cValue = function(d) { return sCountryToFewer(d["country"]);},
        color = d3.scaleOrdinal().range(this.colors);

    // selects the svg object of the specified div in the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select("#scatterplot").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
    yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 10) + ")")
      .style("text-anchor", "middle")
      .text(sAttributeToReal(attr1));

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2) + 20)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(sAttributeToReal(attr2));      


      // draw dots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return color(cValue(d));}) 
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);

    //country abbreviation array
    aux_countries = new Array();
    for(var i=0; i < countries.length; i++){
        aux_countries.push( sCountryToFewer(countries[i]) );
    }

    //Add legend - needs timeout
    var colors_array = this.colors;
    setTimeout(function(){

        var ordinal = d3.scaleOrdinal()
            .domain(aux_countries)
            .range(colors_array);

        svg.append("g")
            .attr("class", "legendOrdinal")
            .attr("transform", "translate(475,0)");

        var legendOrdinal = d3.legendColor()
            .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
            .shapePadding(10)
            .scale(ordinal);

        svg.select(".legendOrdinal")
            .call(legendOrdinal);  

    }, 8); //  200 ms

}