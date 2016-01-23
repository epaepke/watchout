// start slingin' some d3 here.


// settings global variabls here perhaps?

// starting speed,
// planet count,
// planet size?

// initiate asteroids data here with random creator!

var astereoidData = [
  {x: 5, y: 10},
  {x: 50, y: 60},
  {x: 150, y: 100},
  {x: 200, y: 150}
];

var mousePositionData = [];

var selection;
var width = 100;

var initializeAsteroids = function() {
  selection = d3.select(".board").selectAll("circle").data(astereoidData);

  // ENTER
  selection
    .enter()
   
    // Circle code
    .append("circle")
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y})
    .attr("fill", "red")
    .attr("r", "50")
    .attr("top", '1000px')
    .attr("left", '1000px')  
    .attr("width", width)  
    .attr("height", 100)

    // Image code
    // .append('image')
    // .attr("width", "100px")
    // .attr("height", "100px")
    // .attr("xlink:href", "asteroid.png");

    // position editing here

  // EXIT
  selection
    .exit()
    .remove();
};
initializeAsteroids();


// var recordNewMousePosition = function() {

// }

// add dragability to asteroid
// add element to d3 .board
var addDraggableElement = function() {
  console.log('adds draggable elemt')
  d3.select(".board").append("image")
    .attr("x", 150)
    .attr("y", 100)
    .attr("height", "50px")
    .attr("width", "50px")
    .attr("xlink:href", "asteroid.png")
}
addDraggableElement();

// declare mover function
var mover = function() {
  console.log('mover fires')
  var xPos = d3.event.x - parseInt(d3.select('image').attr("width")) / 2;
  var yPos = d3.event.y - parseInt(d3.select('image').attr("height")) / 2;
  console.log('mover report', xPos, yPos)
  d3.select('image')
    .attr("x", xPos)
    .attr("y", yPos);
}
// initiate drag listener
var drag = d3.behavior.drag()
  .on("drag", function(){
    mover();
    recordNewMousePosition()
  });
// call drag on image!
d3.select(".board").select("image").call(drag);


var update = function () {
  // rebuild object with new datapoints
  for (var ast in astereoidData) {
    // console.log(astereoidData[ast].)
    astereoidData[ast].x = Math.floor( (Math.random() - 0.5 ) * 1000) + 300;
    astereoidData[ast].y = Math.floor( (Math.random() - 0.5 ) * 1000) + 300;
    // console.log(astereoidData);
  }

  selection
    .transition()
    .duration(1000)
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y})
};

// init timer
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