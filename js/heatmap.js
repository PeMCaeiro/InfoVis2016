//  Prototype Heatmap

function Heatmap(){

   // Add object properties like this
   this.recent_attr = new Array();
   this.countries = new Array();
   this.maxAttr = 1;
   this.drawAttr = new Array();
}

Heatmap.prototype.maxOfAttr = function(data, attr){
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
Heatmap.prototype.maxDrawAttr = function(data){
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

// Filters data by countries: returns only the data for chosen countries
Heatmap.prototype.filterByCountry = function(data, country){
    var treated_data = new Array();

    for(var i=0; i<data.length; i++){
        //console.log("In filter by country...");
        //console.log(data[i]);
        //console.log(country);
        if( data[i]["country"] == country){
            treated_data.push(data[i]);
        }
    }

    //console.log(treated_data);
    return treated_data;
}

Heatmap.prototype.getYearsArray = function(data){
	var years = new Array();

    for(var i=0; i<data.length; i++){
        if( isInArray(data[i]["year"], years) == false){
            years.push(data[i]["year"]);
        }
    }

    return years;
}


//  Aux Functions

Heatmap.prototype.addRecentAttr = function (attr){

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

Heatmap.prototype.removeRecentAttr = function(attr){
    var index = this.recent_attr.indexOf(attr);
    this.recent_attr.splice(index, 1);
    
    console.log("Removed recent attr :" + attr);
    console.log(this.recent_attr);
};

Heatmap.prototype.isRecentAttrFull = function(){
    if(this.recent_attr.length < this.maxAttr){
        return false;
    }
    else{
        return true;
    }
};

// Graphs prioritize clicked/global attr and then dropped/recent attrs
Heatmap.prototype.computeDrawAttr = function(globalAttributes){

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

// draw the graph
Heatmap.prototype.draw = function(data, countries){

	console.log(data);

	//Initial w and h
    var w = 600;
    var h = 300;

    //Append the svg object to the specified div in the body of the page
    var svg = d3.select("#heatmap")
        .append("svg")
        .attr("width",w)
        .attr("height",h)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }));

    //Create initial variables from svg
    svg = d3.select("svg"),
    margin = {top: 20, right: 70, bottom: 30, left: 70},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;
    
    var years = this.getYearsArray(data);
    var categories_years = years.length;
    var categories_countries = countries.length;

    //Tril and error? Try to get it right
    var categories = 15;
    if(categories_years < 7){
    	categories = 7;
    }else{
    	categories = categories_years;
    }
    var gridSize = Math.floor(width / categories);

    var legendElementWidth = gridSize*2,
    buckets = 9,
    colors = d3.schemeBlues[9];

    // selects the svg object of the specified div in the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select("#heatmap").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Setup the tool tip.  Note that this is just one example, and that many styling options are available.
    // See original documentation for more details on styling: http://labratrevenge.com/d3-tip/
    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "Country: " + d.country + "</br>" + "Year: " + d.year + "</br>" + "</br>" + "Attribute: " + sAttributeToReal(attr) + "</br>" +  "Value: " + shortenLargeNumber(d[attr], 4) ; });
        //.html(function(d) { return "Points: " + d.upoints ; });

    var min_date = d3.min(data, function(d) { return d["date"]; });
    var max_date =  d3.max(data, function(d) { return d["date"]; });
    var min_year = d3.min(data, function(d) { return d["year"]; });
    var max_year = d3.max(data, function(d) { return d["year"]; });
    var max_attr = this.maxDrawAttr(data);
    var attr = this.drawAttr[0];

    //country abbreviation array
    aux_countries = new Array();
    for(var i=0; i < countries.length; i++){
        aux_countries.push( sCountryToFewer(countries[i]) );
    }

      var countryLabels = svg.selectAll(".countryLabel")
          .data(aux_countries)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", "country");

     var yearsLabels = svg.selectAll(".yearsLabel")
          .data(years)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", "years");

    if(this.drawAttr.length <= 0){
    	return
    }

    var colorScale = d3.scaleQuantile().range(d3.schemeBlues[9]);

    colorScale.domain( [0, buckets - 1, max_attr] );
    
    // Create the heatmap visualization
  	var viz = svg.selectAll(".attr")
        .data(data)
        .enter().append("rect")
        .attr("class", "attr")
        .attr("x", function(d, i) {return (d.year - min_year) * gridSize })
        .attr("y", function(d, i) {return  gridSize * (i % categories_countries) ; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", function(d){return colorScale(d[attr]) ; })
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide);

    d3.select("svg").call(tool_tip);

};