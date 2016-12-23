//  Prototype BarChart

function RadarChart(){

   // Add object properties like this
   this.recent_attr = new Array();
   this.countries = new Array();
   this.maxAttr = 4;
   this.maxCountries = 2;
   this.drawAttr = new Array();
   this.colors = ["red", "green", "darkviolet", "orange", "mediumblue", "sienna"]; // 6 colors right now, maybe add more ?
}


//  Aux Functions

RadarChart.prototype.maxOfAttr = function(data, attr){
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
RadarChart.prototype.maxDrawAttr = function(data){
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


RadarChart.prototype.addRecentAttr = function (attr){

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

RadarChart.prototype.removeRecentAttr = function(attr){
    var index = this.recent_attr.indexOf(attr);
    this.recent_attr.splice(index, 1);
    
    console.log("Removed recent attr :" + attr);
    console.log(this.recent_attr);
};

RadarChart.prototype.isRecentAttrFull = function(){
    if(this.recent_attr.length < this.maxAttr){
        return false;
    }
    else{
        return true;
    }
};

// Graphs prioritize global attr and then dropped attrs
RadarChart.prototype.computeDrawAttr = function(globalAttributes){

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
RadarChart.prototype.draw = function(data, countries){

    var cfg = {
         radius: 3.5,
         w: 300,
         h: 250,
         factor: 1,
         factorLegend: .85,
         levels: 3,
         maxValue: 0,
         radians: 2 * Math.PI,
         opacityArea: 0.5,
         ToRight: 5,
         TranslateX: 80,
         TranslateY: 30,
         ExtraWidthX: 200,
         ExtraWidthY: 100,
         color: d3.scaleOrdinal().range(this.colors)
    };

    if(countries.length > 2){
        var temp_countries = new Array();
        temp_countries.push(countries[0]);
        temp_countries.push(countries[1]);
        data = filterMainByCountries(data, temp_countries);
    }else{
        var temp_countries = countries;
    }

    cfg.maxValue = this.maxDrawAttr(data);
    //console.log("config");
    //console.log(cfg.maxValue);
    var allAxis = new Array();
    for(var v=0; v < this.drawAttr.length; v++){
        allAxis.push( sAttributeToReal(this.drawAttr[v]) );
    }
    //var allAxis = this.drawAttr;
    var total = allAxis.length;
    var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
    var Format = d3.format("s");
    d3.select("#radar_chart").select("svg").remove();

    var g = d3.select("#radar_chart")
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .call(d3.zoom().on("zoom", function () {
                g.attr("transform", d3.event.transform)
            }))
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")")
            //.attr("transform", "translate( -940 , -84 ) scale(2.8)");;

    //Circular segments
    for(var j=0; j<cfg.levels-1; j++){
      var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
      g.selectAll(".levels")
       .data(allAxis)
       .enter()
       .append("svg:line")
       .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
       .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
       .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
       .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
       .attr("class", "line")
       .style("stroke", "grey")
       .style("stroke-opacity", "0.75")
       .style("stroke-width", "0.3px")
       .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
    }

    // //Text indicating at what % each level is
    // for(var j=0; j<cfg.levels; j++){
    //   var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
    //   g.selectAll(".levels")
    //    .data([1]) //dummy data
    //    .enter()
    //    .append("svg:text")
    //    .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
    //    .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
    //    .attr("class", "legend")
    //    .style("font-family", "sans-serif")
    //    .style("font-size", "10px")
    //    .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
    //    .attr("fill", "#737373")
    //    .text(Format((j+1)*cfg.maxValue/cfg.levels));
    // }
    
    series = 0;

    var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

    axis.append("line")
        .attr("x1", cfg.w/2)
        .attr("y1", cfg.h/2)
        .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
        .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", "1px");

    axis.append("text")
        .attr("class", "legend")
        .text(function(d){return d})
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "1.5em")
        .attr("transform", function(d, i){return "translate(0, -10)"})
        .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
        .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});


    if(this.drawAttr.length < 2){
        return;
    }

    attrs = this.drawAttr;
    attr1 = this.drawAttr[0];
    attr2 = this.drawAttr[1];
    attr3 = this.drawAttr[2];

    //DRAW AREAS
    data.forEach(function(y, x){
        //console.log("WUT")
        //console.log(y)
        dataValues = [];
        g.selectAll(".nodes")
            .data([y], function(j, i){
                //console.log("nodesnodes")
                //console.log(j);
                //console.log(i);
                var object = y;
                //var k = 0;
                for (var property_index in attrs) {
                    property = attrs[property_index]
                    //console.log(attrs)
                    //console.log(property)
                    if (object.hasOwnProperty(property)) {
                        dataValues.push([
                            cfg.w/2*(1-(parseFloat(Math.max(object[property], 0))/cfg.maxValue)*cfg.factor*Math.sin(property_index*cfg.radians/total)), 
                            cfg.h/2*(1-(parseFloat(Math.max(object[property], 0))/cfg.maxValue)*cfg.factor*Math.cos(property_index*cfg.radians/total))
                        ]);
                    }
                    //k++;
                }         
            });
        //console.log("dataValues")
        //console.log(dataValues);
        dataValues.push(dataValues[0]);
        //console.log(dataValues)
        g.selectAll(".area")
            .data([dataValues])
            .enter()
            .append("polygon")
            .attr("class", "radar-chart-serie"+series)
            .style("stroke-width", "2px")
            .style("stroke", cfg.color(series))
            .attr("points",function(d) {
                var str="";
                for(var pti=0;pti<d.length;pti++){
                    str=str+d[pti][0]+","+d[pti][1]+" ";
                }
                return str;
            })
            .style("fill", function(j, i){return cfg.color(series)})
            .style("fill-opacity", cfg.opacityArea)
            .on('mouseover', function (d){
                z = "polygon."+d3.select(this).attr("class");
                g.selectAll("polygon")
                    .transition(200)
                    .style("fill-opacity", 0.1); 
                g.selectAll(z)
                    .transition(200)
                    .style("fill-opacity", .7);
            })
            .on('mouseout', function(){
                g.selectAll("polygon")
                    .transition(200)
                    .style("fill-opacity", cfg.opacityArea);
            });
        series++;
    });

    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            var attr = $(this).attr('data-id');
            var value = shortenLargeNumber($(this).attr('alt'), 4);
            var str = "Country: " + d.country + "</br>" +  " Year: " + d.year + "</br>" + "</br>" + " Attribute: " + attr +  "</br>" + " Value: " + value ;
            return str;
        });
            
    d3.select("svg").call(tool_tip);

    //DRAW POINTS
    series=0;
    data.forEach(function(y, x){
        //console.log("Draw Points")
        //console.log(y)

        var object = y;
        for (var property_index in attrs) {
            property = attrs[property_index]

            if (object.hasOwnProperty(property)) {

                g.selectAll(".nodes")
                .data([y]).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius)
                .attr("alt", function(j){return Math.max(object[property], 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(object[property], 0))/cfg.maxValue)*cfg.factor*Math.sin(property_index*cfg.radians/total)), 
                        cfg.h/2*(1-(parseFloat(Math.max(object[property], 0))/cfg.maxValue)*cfg.factor*Math.cos(property_index*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(object[property], 0)/cfg.maxValue)*cfg.factor*Math.sin(property_index*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(object[property], 0)/cfg.maxValue)*cfg.factor*Math.cos(property_index*cfg.radians/total));
                })
                .attr("data-id", function(j){ return sAttributeToReal(property) })
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
                .on('mouseover', tool_tip.show)
                .on('mouseout', tool_tip.hide);

            }
        }

        series++;
    });

    d3.select("svg").call(tool_tip);


    //country abbreviation array
    aux_countries = new Array();
    for(var i=0; i < temp_countries.length; i++){
        aux_countries.push( sCountryToFewer(temp_countries[i]) );
    }

    //Add legend - needs timeout
    var colors_array = this.colors;
    setTimeout(function(){

        var ordinal = d3.scaleOrdinal()
            .domain(aux_countries)
            .range(colors_array);

        d3.select("#radar_chart").select("svg").append("g")
            .attr("class", "legendOrdinal")
            .attr("transform", "translate(400,30)");

        var legendOrdinal = d3.legendColor()
            .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
            .shapePadding(10)
            .scale(ordinal);

        d3.select("#radar_chart").select("svg").select(".legendOrdinal")
            .call(legendOrdinal);  

    }, 9); //  200 ms


};