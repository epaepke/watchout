$(window).on('load', function(){
  // variable declarations
  var mouseStartPosition = [300, 100];
  var circleSize = Math.floor(boardWidth / 20);
  var cursorSize = 50;
  var timeInterval = 3000;
  var currentScore = 0;
  var highScore = 0;
  var numCollisions = 0;
  var boardWidth;
  var boardHeight;
  var edgeBoundary = 1;
  var headerHeight;
  var circleScale = 2;
  var durationScale = 10;
  
  var resizeBody = function() {

    headerHeight = $('.scoreboard')[0].clientHeight;

    boardWidth = $(window).width();
    boardHeight = $(window).height() - headerHeight - 10;

    cursorSize = (boardHeight + boardWidth) / 35;
    d3.select('.board').select('image')
      .attr('width', cursorSize);

    $('body').css('height', boardHeight);
    $('body').css('width', boardWidth);

    circleSize = Math.floor((boardHeight + boardWidth) / 100);

    d3.select('.board').selectAll('circle')
      .attr("r", circleSize);
  };

  resizeBody();

  $(window).on('resize', function(){
    resizeBody();
  });

  // initiate asteroids data here with random creator!
  var astereoidData = [
    {x: 600, y: 400},
    {x: 600, y: 400},
    {x: 600, y: 400},
    {x: 600, y: 400},
    {x: 600, y: 400},
    {x: 600, y: 400},
    {x: 600, y: 400},
    {x: 600, y: 400},
    {x: 600, y: 400}
  ];

  var mousePositionData = mouseStartPosition;

  var selection;
  var circleWidth = 100;

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
      .attr("r", circleSize)
      .attr("top", '1000px')
      .attr("left", '1000px')  
      .attr("width", circleWidth)  
      .attr("height", 100);

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
    d3.select(".board").append("image")
      .attr("x", mouseStartPosition[0])
      .attr("y", mouseStartPosition[1])
      .attr("height", cursorSize + "px")
      .attr("width", cursorSize + "px")
      .attr("xlink:href", "asteroid.png");
  };

  addDraggableElement();

  // declare mover function
  var mover = function() {
    var xPos = d3.event.x - parseInt(d3.select('image').attr("width")) / 2;
    var yPos = d3.event.y - parseInt(d3.select('image').attr("height")) / 2;
    recordNewMousePosition(xPos, yPos);
    d3.select('image')
      .attr("x", xPos)
      .attr("y", yPos);
  };
  // initiate drag listener
  var drag = d3.behavior.drag()
    .on("drag", function(){
      mover();
    });
  // call drag on image!
  d3.select(".board").select("image").call(drag);

  var recordNewMousePosition = function(x, y) {
    // x value
    x = x + (cursorSize / 2);
    y = y + (cursorSize / 2);
    mousePositionData[0] = x;

    // y value
    mousePositionData[1] = y;
  };

  var update = function () {
    console.log(boardWidth);
    for (var ast in astereoidData) {
      astereoidData[ast].x = Math.floor( (Math.random() * (boardWidth - circleSize * 2) + circleSize * edgeBoundary));
      astereoidData[ast].y = Math.floor( (Math.random() * (boardHeight - circleSize* 2) + circleSize * edgeBoundary));
    }

    selection
      .transition()
      .duration(Math.max(200, timeInterval - durationScale * 10 * currentScore))
      .delay(function(d) {
        return (d.x / 5) * ( Math.random() * 10 ); 
      })
      .tween("cx", function (final1, t, i) {
        var initial = d3.select(this);
        var xStart = parseInt( initial.attr("cx") );
        var yStart = parseInt( initial.attr("cy") );
        var reldx = (final1.x - xStart);
        var reldy = (final1.y - yStart);

        return function (t) {
          var xCurrent = xStart + reldx * t;
          var yCurrent = yStart + reldy * t;
          var xCursor = mousePositionData[0];
          var yCursor = mousePositionData[1];
          var dist = Math.sqrt(Math.pow((xCurrent - xCursor),2) + Math.pow((yCurrent - yCursor), 2));
          if (dist <= (circleSize + currentScore * circleScale + cursorSize * 1.2) / 2) {
            throttledCollisionUpdate();
          }
        };
      })
      .attr("cx", function(d) {return d.x})
      .attr("cy", function(d) {return d.y})
      .attr("r", circleSize + currentScore * circleScale);
  };

  var collisionUpdate = function() {
    currentScore = 0;
    numCollisions++;
    d3.select(".current").select("span").text(0);
    d3.select(".collisions").select("span").text(numCollisions);
  };

  var throttledCollisionUpdate = _.throttle(collisionUpdate, 500);

  // init timer
  var timer;
  var updatePositions = function(time) {
    update();
    timer = setInterval( function(){
      update();
    },time);
  };
  var stopTimer = function() {
    clearInterval(timer);
  };

  updatePositions(timeInterval);

  setInterval(function(){
    currentScore++;
    if (currentScore > highScore) {
      highScore++;
      d3.select('.highscore').select('span').text(currentScore);
    }
    d3.select('.current').select('span').text(currentScore);
  }, 1000);
});
