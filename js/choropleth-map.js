function ChoroplethMap(attribute){

   // Add object properties like this
   this.attribute = attribute;
   this.countries = new Array();
}

// Attribute Setter
ChoroplethMap.prototype.setAttribute = function(new_attr){
    this.attribute = new_attr;
};

// Attribute Getter
ChoroplethMap.prototype.getAttribute = function(){
    return this.attribute;
};

//ChoroplethMap.prototype.draw = function(data){
	
	/*var w = 900;
    var h = 500;
	
	var projection = d3.geoMercator()
    .scale(1070)
    .translate([width / 2, height / 2]);

	var path = d3.geo.path()
    .projection(projection);
	
	var svg = d3.select("#choropleth_map")
        .append("svg")
        .attr("width",w)
        .attr("height",h);*/
		
	var europePopMap = SimpleMapD3({
    container: '.simple-map-d3-europe-pop-map',
    datasource: 'example-data/europe-population-density-geocommons.geo.json',
    colorSet: 'Spectral',
    colorOn: true,
    colorProperty: 'population',
    colorReverse: true,
    projection: 'azimuthalEqualArea',
    rotation: [0, 0, -20],
    canvasDragOn: true,
    tooltipContent: function(d) {
      var p = d.properties;
      return '<h5>' + p.country + '</h5>' +
        p.population + ' population per square kilometer';
    }
  });
  
//}
		

	
