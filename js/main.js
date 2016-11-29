$(window).load(function(){

//	Draw Initial State - only runs after data is loaded

console.log(euData);

// Instantiate new objects with 'new'

var bar_chart = new BarChart("gdp");

// Invoke methods like this

//bar_chart.setAttribute("numJobs");
console.log(bar_chart.getAttribute());

bar_chart.draw(euData);

});