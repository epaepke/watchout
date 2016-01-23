// start slingin' some d3 here.


var astereoidData = [
  {x: 5, y: 10},
  {x: 50, y: 60},
  {x: 150, y: 100},
  {x: 200, y: 150}
];

// var astereoidData = {0: ;

var fnKey = function (d) {
  console.log('d', d);

};


var selection;
var width = 100;

var initializeAsteroids = function() {
  selection = d3.select(".board").selectAll("div").data(astereoidData)

  console.log(selection);

  // console.log(selection)



  // ENTER
  selection
    .enter()
    .append("svg")
    .attr("width", width)
    .attr("height", 100)  
    .append("image")
    .attr("width", width)
    .attr("height", 100)
    .attr("xlink:href", "asteroid.png");

  // EXIT
  selection
    .exit()
    .remove();
};

initializeAsteroids();


var update = function () {
  console.log('update');
  // selection
    // .attr();
    // no appaending allowed in here.
  width += 10;
  selection.transition().duration(1000).attr("width", width)
};


var timer;
var updatePositions = function(time) {
  update();
  timer = setInterval( function(){
    console.log('BANG!');
    update();
  },time);
};

var stopTimer = function() {
  clearInterval(timer);
};

updatePositions(1000);