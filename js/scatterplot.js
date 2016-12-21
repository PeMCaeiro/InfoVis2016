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

    //Initial w and h
    var w = 600;
    var h = 300;

    //Append the svg object to the specified div in the body of the page
    var svg = d3.select("#bar_chart")
        .append("svg")
        .attr("width",w)
        .attr("height",h);

    //Create initial variables from svg
    svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 80},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

    // Setup the tool tip.  Note that this is just one example, and that many styling options are available.
    // See original documentation for more details on styling: http://labratrevenge.com/d3-tip/
    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "Country: " + d.country + "</br>" + "Year: " + d.year + "</br>" + "</br>" + "Attribute: " + sAttributeToReal(attr) + "</br>" +  "Value: " + shortenLargeNumber(d[attr], 4) ; });
            
    d3.select("svg").call(tool_tip);

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    // selects the svg object of the specified div in the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select("#bar_chart").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")"); 

    var attrs = this.drawAttr;


}