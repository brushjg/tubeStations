$(document).ready(function(){
  var dataSet = [];
  var sourceStation = "";
  var destStation = "";
  var theHam = "";
  var matches = [];
  var stagesToLook = 0;
  var nextStations = ["East Ham"];
  var priorStations = [];
  $.getJSON( "/tubeJSON.json", function( data ) {
    dataSet = data;
  });

  $('.button').click(function(){
    stagesToLook = $('.numSteps').val();
     sourceStation = "";
     destStation = "";
     theHam = "";
     priorStations = [];
     nextStations = ["East Ham"];
     matches = [];
     $('.output').html("");
    calculateStations();
  })

  function calculateStations() {
    for (var i = stagesToLook; i > 0 ; i--) {
      // console.log ('checking for matches from these stations ')
      // console.log (nextStations);
      // console.log ('exempting these stations')
      // console.log (priorStations)
      $.each( nextStations, function( key, val ) {
        if (priorStations.indexOf(val) === -1) {
          priorStations.push(val)
        }
      });
      var nS = nextStations.length;
      for (var j = 0; j < nS ; j++) {
        theHam = nextStations[j];
        // console.log ('matching '+ theHam)
        $.each( dataSet, function( key, val ) {
          sourceStation = val.FIELD2;
          destStation = val.FIELD3;

          if (val.FIELD3 == theHam) {
            if (matches.indexOf(val.FIELD2) === -1) {
              if (priorStations.indexOf(val.FIELD2) === -1) {
                matches.push(val.FIELD2)
              }
            }
          }

          if  (val.FIELD2 == theHam) {
            if (matches.indexOf(val.FIELD3) === -1) {
              if (priorStations.indexOf(val.FIELD3) === -1) {
                matches.push(val.FIELD3)
              }
            }
          } 
        }); //each
        priorStations.push(theHam);
     } // j for loop
     nextStations = matches;

      if (i != 1) {
        matches = []
      }
    }
    $( "<div>", {
      "class": "my-new-list",
      html: matches.join( "<br>" )
    }).appendTo( ".output" );
  }
});



/* loopt through everything, and check both elements, if either one is the ham, take the other element, and push it into the array; then print out those results, and then add them to the list of items to supress the master array. */