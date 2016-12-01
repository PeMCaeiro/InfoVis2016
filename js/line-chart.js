//  Prototype LineChart

function LineChart(){

   // Add object properties like this
   this.recent_attr = new Array();
   this.countries = new Array();
   this.maxAttr = 1;
   this.drawAttr = new Array();
   this.valuelines = new Array();
   this.colors = ["steelblue", "red", "green", "darkviolet", "orange", "sienna"]; // 6 colors right now, maybe add more ?
}

LineChart.prototype.maxOfAttr = function(data, attr){
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
LineChart.prototype.maxDrawAttr = function(data){
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
LineChart.prototype.filterByCountry = function(data, country){
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


//  Aux Functions

LineChart.prototype.addRecentAttr = function (attr){

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

LineChart.prototype.removeRecentAttr = function(attr){
    var index = this.recent_attr.indexOf(attr);
    this.recent_attr.splice(index, 1);
    
    console.log("Removed recent attr :" + attr);
    console.log(this.recent_attr);
};

LineChart.prototype.isRecentAttrFull = function(){
    if(this.recent_attr.length < this.maxAttr){
        return false;
    }
    else{
        return true;
    }
};

// Graphs prioritize clicked/global attr and then dropped/recent attrs
LineChart.prototype.computeDrawAttr = function(globalAttributes){

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
LineChart.prototype.draw = function(data, countries){

	//Initial w and h
    var w = 800;
    var h = 300;

    //Append the svg object to the specified div in the body of the page
    var svg = d3.select("#line_chart")
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    //Create initial variables from svg
    svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 110},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

    //Get attribute to use for bars from object
    if(this.drawAttr.length > 0){
        var attr = this.drawAttr[0];
    }else{
        return;
    }

    //set the Ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // selects the svg object of the specified div in the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select("#line_chart").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    //console.log("MIN, MAX: " + d3.extent(data, function(d) { return d[attr]; }) );
    //console.log("MAX: " + d3.max(data, function(d) { return d[attr]; }) );

    var min_date = d3.min(data, function(d) { return d["date"]; });
    var max_date =  d3.max(data, function(d) { return d["date"]; });
    var min_year = d3.min(data, function(d) { return d["year"]; });
    var max_year = d3.max(data, function(d) { return d["year"]; });

    x.domain( [min_date, max_date] );
    var max_attr = this.maxDrawAttr(data);
    y.domain( [0, max_attr ] );

    var diff = max_year - min_year;
    var numberTicks = diff + 1;

    // Axis vars
    var xAxis = d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%Y"))
        .ticks(numberTicks); //Axis date format;

    var yAxis = d3.axisLeft(y);

    this.valuelines = new Array();
    var country = "";;
    var filteredData = new Array();
    var horizontalAdjust = 0;
    var horizontalInc = 50;
    var verticalAdjust = 0;
    var verticalInc = 20;

    // Draw Lines
    for(var i=0; i < countries.length; i++){
        country = countries[i];

        //create valuelines
        this.valuelines[i] = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d[attr]); });

        //filter data by country
        filteredData = this.filterByCountry(data, country);
        
        //console.log("Filtered for Valueline:");
        //console.log(filteredData);

        // Add the valueline path
        svg.append("path")
          .data([filteredData])
          .attr("class", "line")
          .style("stroke", this.colors[i])
          .style("stroke-width", "2px")
          .style("fill", "none")
          .attr("d", this.valuelines[i]);

        //Add legends

        //Adjust text vertically
        // if(i < 3){
        //     svg.append("text")
        //         .attr("x", width + horizontalAdjust)
        //         .attr("y", verticalAdjust - (margin.top / 2))
        //         .attr("text-anchor", "middle")
        //         .style("text-decoration", "bold")
        //         .style("fill", this.colors[i])
        //         .text(this.countries[i]);

        //     horizontalAdjust = horizontalAdjust + horizontalInc;
        // }

        // verticalAdjust = verticalAdjust + verticalInc;
        // horizontalAdjust = 0;

        // if(i >= 3){
        //     svg.append("text")
        //         .attr("x", width + horizontalAdjust)
        //         .attr("y", verticalAdjust - (margin.top / 2))
        //         .attr("text-anchor", "middle")
        //         .style("text-decoration", "bold")
        //         .style("fill", this.colors[i])
        //         .text(this.countries[i]);

        //     horizontalAdjust = horizontalAdjust + horizontalInc;
        // }
    }

    // Draw the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Draw the Y Axis
    svg.append("g")
        .call(yAxis);

    // Append legend
    

};