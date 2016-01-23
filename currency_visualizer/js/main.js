$(window).on('load', function(){
  console.log('yo js');

  var url = "http://api.fixer.io/latest?base=USD"

  var rates;

  var getNewRates = function() {
    $.ajax(url, {
      success: function(a, b, c) {
        console.log('success!');
        rates = a.rates;
        // console.log(rates)
        renderNewRates(rates);
      },
      error: function() {
        console.log('failure');
      }
    })
  }

  getNewRates();

  var renderNewRates = function(rates) {
    console.log(rates);
  }


})