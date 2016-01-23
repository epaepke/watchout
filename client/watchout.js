// start slingin' some d3 here.


// settings global variabls here perhaps?

// starting speed,
// planet count,
// planet size?

var mouseStartPosition = [300, 100];
// initiate asteroids data here with random creator!

var astereoidData = [
  {x: 600, y: 400}
  // {x: 600, y: 400},
  // {x: 600, y: 400},
  // {x: 600, y: 400},
  // {x: 600, y: 400},
  // {x: 600, y: 400}
];

var mousePositionData = mouseStartPosition;

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
    .attr("x", mouseStartPosition[0])
    .attr("y", mouseStartPosition[1])
    .attr("height", "50px")
    .attr("width", "50px")
    .attr("xlink:href", "asteroid.png")
}
addDraggableElement();

// declare mover function
var mover = function() {
  var xPos = d3.event.x - parseInt(d3.select('image').attr("width")) / 2;
  var yPos = d3.event.y - parseInt(d3.select('image').attr("height")) / 2;
  recordNewMousePosition(xPos, yPos);
  d3.select('image')
    .attr("x", xPos)
    .attr("y", yPos);
}
// initiate drag listener
var drag = d3.behavior.drag()
  .on("drag", function(){
    mover();
  });
// call drag on image!
d3.select(".board").select("image").call(drag);

var recordNewMousePosition = function(x, y) {
  // x value
  mousePositionData[0] = x;
  // y value
  mousePositionData[1] = y;
}

var update = function () {
  // rebuild object with new datapoints
 // var oldXAsteroidData = _.pluck(astereoidData, 'x');

  // var oldAsteroidData = _.clone(astereoidData);
  // console.log('old data', oldAsteroidData)

  for (var ast in astereoidData) {
    // console.log(astereoidData[ast].)
    astereoidData[ast].x = Math.floor( (Math.random() - 0.5 ) * 1100) + 600;
    astereoidData[ast].y = Math.floor( (Math.random() - 0.5 ) * 700) + 400;
    // console.log(astereoidData);
  }
    // console.log('old data after ', oldAsteroidData);
    // console.log('new data after ', astereoidData);

  selection
    .transition()
    .duration(10000)
    .tween("cx", function (d, t, i) {
      var ast = d3.select(this);
      var xStart = ast.attr("cx");
      var yStart = ast.attr("cy");
      var xEnd = d.x;
      var yEnd = d.y;

      return function (t) {
        // console.log(mousePositionData);
        
      }
    })

    // })
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y});
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

updatePositions(10000);










// $(window).on('resize', function(){
//   var cssWidthRule = $(window).width();
//   $('body').css('width', cssWidthRule);
// });











