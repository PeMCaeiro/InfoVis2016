//  Prototype Heatmap

function Choropleth(){

   // Add object properties like this
   this.recent_attr = new Array();
   this.countries = new Array();
   this.maxAttr = 1;
   this.drawAttr = new Array();
}

Choropleth.prototype.maxOfAttr = function(data, attr){
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
Choropleth.prototype.maxDrawAttr = function(data){
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
Choropleth.prototype.filterByCountry = function(data, country){
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

Choropleth.prototype.getYearsArray = function(data){
  var years = new Array();

    for(var i=0; i<data.length; i++){
        if( isInArray(data[i]["year"], years) == false){
            years.push(data[i]["year"]);
        }
    }

    return years;
}


//  Aux Functions

Choropleth.prototype.addRecentAttr = function (attr){

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

Choropleth.prototype.removeRecentAttr = function(attr){
    var index = this.recent_attr.indexOf(attr);
    this.recent_attr.splice(index, 1);
    
    console.log("Removed recent attr :" + attr);
    console.log(this.recent_attr);
};

Choropleth.prototype.isRecentAttrFull = function(){
    if(this.recent_attr.length < this.maxAttr){
        return false;
    }
    else{
        return true;
    }
};

// Graphs prioritize clicked/global attr and then dropped/recent attrs
Choropleth.prototype.computeDrawAttr = function(globalAttributes){

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
Choropleth.prototype.draw = function(data_memory, countries){

    var width = 960,
    height = 360;

    //var projection = d3.geoNaturalEarth();
    //var projection = d3.geoMercator();

    d3.json('js/eu.topo.json', function(err, data) {

        var land = topojson.feature(data, data.objects.europe);

        //console.log(land);
        
        //var path = d3.geoPath(projection);
        var projection = d3.geoMercator()
              .rotate([-9 - 8 / 60, -48 - 41 / 60])
              .fitExtent([[20, 20], [940, 340]], land);
        
        var path = d3.geoPath(projection);
        
        // var graticule = d3.geoGraticule()
        //     .step([5, 5]);
        
        var svg = d3.select("#choropleth_map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
            }));
            //.attr("transform", "translate( -940 , -84 ) scale(2.8)");

        svg.selectAll("path")
            .data(land.features)
            .enter().append("path")
              .attr("class", "tract")
              .attr("d", path);

    });
    
    // svg.append("path")
    //     .datum(graticule)
    //     .attr("class", "graticule")
    //     .attr("d", path);
        
    // var land = svg.append("g");

    // d3.json('js/eu.topo.json', function(err, data) {
    //     console.log("MAP");
    //     console.log(data.objects.europe);

    //     land.append("path")
    //         .datum(topojson.feature(data, data.objects.europe))
    //         .attr("class", "land")
    //         .attr("d", path);
    // });

};