$(window).on('load', function(){


  var width, height;

  var resizeWindow = function() {
    width = $(window).width();
    height = $(window).height();
    $('body').css('height', height);
    $('body').css('width', width);
    renderChart();
  }

  resizeWindow(); // run the first time
  $(window).on('resize', resizeWindow);

  var url = "http://api.fixer.io/latest?base=USD"

  var ratesArray = [];

  var rateScalingFactor = 20;
  var rateHeight = 15;
  var verticalDistance = 5;

  var getNewRates = function() {
    $.ajax(url, {
      success: function(a, b, c) {
        // console.log('success!');
        // console.log(rates)
        processRates(a);
      },
      error: function() {
        // console.log('failure');
      }
    })
  }

  getNewRates();

  // takes data from api and forms it to our array requirements
  var processRates = function(input) {  
    var base = input.base;
    var date = input.date;
    var rates = input.rates;
    for( var rate in rates ) {
      var countryCode = rate;
      var exRate = rates[rate];
      var newObj = {country: countryCode,
                    rate: exRate};
      ratesArray.push(newObj);
    }
    console.log('process finish, render chart')
    renderChart();
  }


  var renderChart = function() {
    console.log('render chart')

    d3.select('.currencyGraph')
      .attr('background', 'blue')
      // .attr('height', '100%')
      .selectAll('rect')
      .data(ratesArray)
      .enter()
      .append('rect')
      .attr('width', function(d, i){
        console.log(d, i);
        return d.rate * rateScalingFactor
      })
      .attr('height', rateHeight)
      .attr('y', function(d, i){
        return i * (rateHeight + verticalDistance)
      })
      .attr('x', 0)
  }



})