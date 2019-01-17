function tooltipHtml(n, d) {
  /* function to create html content string in tooltip div. */
  return (
    "<h4>" +
    n +
    "</h4><table>" +
    "<tr><td>Low</td><td>" +
    "$" +
    d.low +
    "</td></tr>" +
    "<tr><td>Average</td><td>" +
    "$" +
    d.avg +
    "</td></tr>" +
    "<tr><td>High</td><td>" +
    "$" +
    d.high +
    "</td></tr>" +
    "</td></tr>" +
    "<tr><td>Total</td><td>" +
    "$" +
    d.total +
    "</td></tr>" +
    "</table>"
  );
}

var initialData = {};
[
  "HI",
  "AK",
  "FL",
  "SC",
  "GA",
  "AL",
  "NC",
  "TN",
  "RI",
  "CT",
  "MA",
  "ME",
  "NH",
  "VT",
  "NY",
  "NJ",
  "PA",
  "DE",
  "MD",
  "WV",
  "KY",
  "OH",
  "MI",
  "WY",
  "MT",
  "ID",
  "WA",
  "DC",
  "TX",
  "CA",
  "AZ",
  "NV",
  "UT",
  "CO",
  "NM",
  "OR",
  "ND",
  "SD",
  "NE",
  "IA",
  "MS",
  "IN",
  "IL",
  "MN",
  "WI",
  "MO",
  "AR",
  "OK",
  "KS",
  "LA",
  "VA"
].forEach(function(d) {
  initialData[d] = {
    low: "0",
    high: "0",
    avg: "0",
    color: "#ffffcc"
  };
});

/* draw states on id #statesvg */
function drawMap(orders) {
  var mapData = this.getMapData(orders);

  uStates.draw("#statesvg", mapData, tooltipHtml);
  d3.select(self.frameElement).style("height", "600px");
}

/*
  Helper Functions
*/

// Converts price string to 2 decimal float
function priceToNum(price) {
  return parseFloat(price.replace(/[^0-9\.]+/g, ""));
}

// Add up values in array and return total
function total(arr) {
  var sum = 0.0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Convert orders data into map data for d3
function getMapData(orders) {
  states = {};
  // Group customers who are in the same state and keep track of order amounts in a list
  for (var i = 0; i < orders.length; i++) {
    order = orders[i];
    state = order.state;
    amount = this.priceToNum(order.order_amount);
    !states[state] && (states[state] = []);
    states[state].push(amount);
  }

  var mapData = initialData;

  // Create object data for each state for use with tooltip
  for (var state in states) {
    var arr = states[state]; // NOTE: this returns an object not array
    var total = d3.sum(arr);
    var low = d3.min(arr);
    var high = d3.max(arr);
    var average = total / arr.length;
    mapData[state] = {
      low: low.toFixed(2),
      high: high.toFixed(2),
      avg: average.toFixed(2),
      total: total.toFixed(2),
      color: d3.interpolate("#ffffcc", "#008026")(total / 15000)
    };
  }

  return mapData;
}
