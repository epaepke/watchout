// start slingin' some d3 here.


var astereoidData = [
  {x: 5, y: 10},
  {x: 50, y: 60},
  {x: 150, y: 100},
  {x: 200, y: 150}
];

// var astereoidData = {0: ;



var selection = d3.select(".board").selectAll("div").data(astereoidData)

var fnKey = function (d) {
  console.log('d', d);

};
console.log(selection)


// console.log(selection)

// ENTER
selection
  .enter()
  .append("svg")
  .attr("width", 100)
  .attr("height", 100)  
  .append("image")
  .attr("width", 100)
  .attr("height", 100)
  .attr("xlink:href", "asteroid.png")


// EXIT
selection
  .exit()
  .remove();


var timer;
var updatePositions = function(time) {
  timer = setInterval( function(){
    console.log('BANG!')

    selection





  },time)
}

var stopTimer = function() {
  clearInterval(timer);
}

updatePositions(1000);