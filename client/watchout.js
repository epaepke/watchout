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
  selection = d3.select(".board").selectAll("circle").data(astereoidData);

  console.log(selection);

  // console.log(selection)



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


var update = function () {
  console.log('update');
  // selection
    // .attr();
    // no appaending allowed in here.
  // width -= 10;
  // var newX = Math.floor(Math.random() * 100) + 300;
  // var newY = Math.floor(Math.random() * 100) + 300;

  // selection.transition().duration(1000).attr("cx", newX).attr("cy", newY);

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