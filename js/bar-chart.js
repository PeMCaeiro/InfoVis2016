//  Prototype BarChart

function BarChart(){

   // Add object properties like this
   this.recent_attr = new Array();
   this.countries = new Array();
   this.maxAttr = 1;
   this.drawAttr = new Array();
}


//  Aux Functions

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
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

    //Get attribute to use for bars from object
    if(this.drawAttr.length > 0){
        var attr = this.drawAttr[0];
    }else{
        return;
    }

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
    //console.log("MAX: " + d3.max(data, function(d) { return d[attr]; }) );

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
        .attr("y", function(d) { return y(d[attr]); } )
        .attr("height", function(d) { return height - y(d[attr]); })
        .attr("width", x.bandwidth());

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .call(yAxis);

};