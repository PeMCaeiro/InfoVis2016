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

// Filters data by countries: returns only the data for chosen countries
Choropleth.prototype.filterByDestination = function(data, country){
    var treated_data = new Array();

    for(var i=0; i<data.length; i++){
        //console.log("In filter by country...");
        //console.log(data[i]);
        //console.log(country);
        if( data[i]["destination"] == country){
            treated_data.push(data[i]);
        }
    }

    //console.log(treated_data);
    return treated_data;
}

// Filters data by countries: returns only the data for chosen countries
Choropleth.prototype.filterByOrigin = function(data, country){
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
    //console.log("drawAttr length");
    //console.log(this.drawAttr.length);

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

    //console.log("Drawable Attributes: ");
    //console.log(this.drawAttr);

};

Choropleth.prototype.computeNumberTrips = function(){
   this.drawAttr = ["numTrips"]; 
}










// draw the graph
Choropleth.prototype.draw = function(data_memory, countries){

    var width = 960,
    height = 360,
    buckets = 9;

    var svg = d3.select("#choropleth_map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
            }));
            //.attr("transform", "translate( -940 , -84 ) scale(2.8)");

    var max_attr = this.maxDrawAttr(data_memory);
    var colorScale = d3.scaleQuantile().range(d3.schemeBlues[9]);
    var attr = this.drawAttr[0];

    colorScale.domain( [0, buckets - 1, max_attr] );

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

        var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            var country = $(this).attr('name');
            var at = $(this).attr('attr');
            var value = 0;
            var year = 0;
            if( isInArray(country, countries) ){
                //console.log("FAFW")
                for(var i=0; i<data_memory.length; i++){
                    if(data_memory[i]["country"] == country){
                        //console.log("RFWAFWAGAW")
                        //console.log(name);
                        value = data_memory[i][at];
                        year = data_memory[i]["year"];
                        break;
                    }
                } 
            }else{
                return "Country: " + country;
            }

            var str = "Country: " + country + "</br>" +  " Year: " + year + "</br>" + "</br>" + " Attribute: " + sAttributeToReal(at) +  "</br>" + " Value: " + shortenLargeNumber(value, 4) ;
            return str;
        });
            
        d3.select("svg").call(tool_tip);

        svg.selectAll("path")
            .data(land.features)
            .enter().append("path")
            .attr("class", "region")
            .attr("d", path)
            .attr("name", function(d){
                var name = d.properties.name;
                if(name == "Czech Rep."){
                    name = "Czech Republic";
                }
                return name;
            })
            .attr("attr", attr)
            .style("fill", function(d){
                var name = d.properties.name;
                if(name == "Czech Rep."){
                    name = "Czech Republic";
                }
                //console.log(countries);
                //console.log(name);
                if( isInArray(name, countries) ){
                    for(var i=0; i<data_memory.length; i++){
                        if(data_memory[i]["country"] == name){
                            //console.log(name);
                            return colorScale(data_memory[i][attr]);
                        }
                    }
                }else{
                    return "#ccc";
                }
                //
            })
            .on('mouseover', tool_tip.show)
            .on('mouseout', tool_tip.hide);;

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










// draw the graph
Choropleth.prototype.draw2 = function(data_memory, countries, fixedCountry, mode){

    var width = 960,
    height = 360,
    buckets = 9;

    //MODE SELECT
    var colorScale = d3.scaleQuantile().range(d3.schemeGreens[9]);
    if(mode == "dest"){
        data_memory = this.filterByDestination(data_memory, fixedCountry);
    }else if(mode == "origin"){
        data_memory = this.filterByOrigin(data_memory, fixedCountry);
        colorScale = d3.scaleQuantile().range(d3.schemeOranges[9]);
    }
    
    //console.log(data_memory);


    var svg = d3.select("#choropleth_map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
            }));
            //.attr("transform", "translate( -940 , -84 ) scale(2.8)");

    var max_attr = this.maxDrawAttr(data_memory);
    var attr = this.drawAttr[0];

    //console.log("DRAW2");
    //console.log(data_memory);
    //console.log(attr);
    //console.log(max_attr);

    colorScale.domain( [0, buckets - 1, max_attr] );

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

        var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            var country = $(this).attr('name');
            var at = $(this).attr('attr');
            var value = 0;
            var year = 0;
            var str = "Country: " + country;
            if( isInArray(country, countries) ){
                //console.log("FAFW")
                for(var i=0; i<data_memory.length; i++){
                    
                    if(mode == "dest"){
                        if(data_memory[i]["country"] == country){
                            //console.log("RFWAFWAGAW")
                            //console.log(name);
                            value = data_memory[i][at];
                            year = data_memory[i]["year"];
                            break;
                        }
                    }else if(mode == "origin"){
                        if(data_memory[i]["destination"] == country){
                            //console.log("RFWAFWAGAW")
                            //console.log(name);
                            value = data_memory[i][at];
                            year = data_memory[i]["year"];
                            break;
                        }
                    }
                } 
            }else{
                return str;
            }

            if(mode == "dest"){
                str = "Origin: " + country + "</br>" +  " Destination: " + fixedCountry + "</br>" +  " Year: " + year + "</br>" + "</br>" + " Attribute: " + sAttributeToReal(at) +  "</br>" + " Value: " + shortenLargeNumber(value, 4) ;
            }else if(mode == "origin"){
                str = "Origin: " + fixedCountry + "</br>" +  " Destination: " + country + "</br>" +  " Year: " + year + "</br>" + "</br>" + " Attribute: " + sAttributeToReal(at) +  "</br>" + " Value: " + shortenLargeNumber(value, 4) ;
            }

            if(value == 0){
                str = "Country: " + country;
                return str;
            }

            //var str = "Country: " + country + "</br>" +  " Year: " + year + "</br>" + "</br>" + " Attribute: " + sAttributeToReal(at) +  "</br>" + " Value: " + shortenLargeNumber(value, 4) ;
            
            return str;
        });
            
        d3.select("svg").call(tool_tip);

        svg.selectAll("path")
            .data(land.features)
            .enter().append("path")
            .attr("class", "region")
            .attr("d", path)
            .attr("name", function(d){
                var name = d.properties.name;
                if(name == "Czech Rep."){
                    name = "Czech Republic";
                }
                return name;
            })
            .attr("attr", attr)
            .style("fill", function(d){
                var name = d.properties.name;
                if(name == "Czech Rep."){
                    name = "Czech Republic";
                }
                //console.log(countries);
                //console.log(name);
                if( isInArray(name, countries) ){
                    for(var i=0; i<data_memory.length; i++){
                        if(mode == "dest"){
                            if(data_memory[i]["country"] == name){
                                //console.log(name);
                                return colorScale(data_memory[i][attr]);
                            }
                        }else if(mode == "origin"){
                           if(data_memory[i]["destination"] == name){
                                //console.log(name);
                                return colorScale(data_memory[i][attr]);
                            } 
                        }
                        
                    }
                }else{
                    return "#ccc";
                }
                //
            })
            .on('mouseover', tool_tip.show)
            .on('mouseout', tool_tip.hide);;

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