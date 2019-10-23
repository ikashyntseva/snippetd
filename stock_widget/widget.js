var yourStockSymbol = "LIFE";
var $j = jQuery.noConflict();

if ($j("#jive-widgets-browser").css("display") == "block") {
  // Do Nothing as we are in edit mode
} else {
  // Build the URL to Yahoo YQL services
  var q = escape(
    'select * from yahoo.finance.quotes where symbol in ("' +
      yourStockSymbol +
      '")'
  );
  var theURL =
    "https://www.query.yahooapis.com/v1/public/yql?q=" +
    q +
    "&format=json&diagnostics=false&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=?";

  $j(document).ready(() => {
    // Load function on launch
    $j("#stockIndicator").show();
    doAjax(theURL);

    // Function for refreshing the stock by clicking on the title header
    $j(".ajaxtrigger").click(() => {
      $j("#stockIndicator").show();
      doAjax(theURL);
      return false;
    });

    // Function to add commas to numbers for volume
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }

    // Main function to make JSON request to Yahoo for stock information
    function doAjax(url) {
      $j.ajax({
        url: url,
        dataType: "jsonp",
        success: function(data) {
          var s = data.query.results;
          if (s) {
            if (s.quote.Change > 0) {
              // Change the change text to green
              $j("#stockChange").css({ color: "green" });
              $j("#stockChangePercent").css({ color: "green" });
            } else if (s.quote.Change < 0) {
              // Change the change text to red
              $j("#stockChange").css({ color: "red" });
              $j("#stockChangePercent").css({ color: "red" });
            } else {
              // Set the font to black for no price change
              $j("#stockChange").css({ color: "black" });
              $j("#stockChangePercent").css({ color: "black" });
            }

            // This is where we add the JSON values back into the HTML above
            $j("#stockSymbol").html(s.quote.symbol);
            $j("#stockAsk").html(s.quote.LastTradePriceOnly);
            $j("#stockChange").html(s.quote.Change);
            $j("#stockChangePercent").html(s.quote.ChangeinPercent);
            //$j('#stockVolume').html(numberWithCommas(s.quote.Volume));
            //$j('#stockAvgVolume').html(numberWithCommas(s.quote.AverageDailyVolume));
            //$j('#stockRange').html(s.quote.YearRange);

            $j("#stockIndicator").hide();
          } else {
            var errormsg = "<p>Error: could not load the page.</p>";
            $j("#stockIndicator").show();
            $j("#stockIndicator").html(errormsg);
          }
        },
        error: function() {
          var errormsg = "<p>Error: could not load the page.</p>";
          $j("#stockIndicator").show();
          $j("#stockIndicator").html(errormsg);
        }
      });
    }
  }); //end ready function
} //end first else
