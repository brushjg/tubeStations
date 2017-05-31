$(document).ready(function(){
console.log('hrrgh')
$.getJSON( "/tubeJSON.json", function( data ) {
  var items = [];
  var currentItem = ""
  var sourceStation = ""
  var destStation = ""
  items.push('{')
  $.each( data, function( key, val ) {
  	console.log (val)
  	sourceStation = val.FIELD2;
  	destStation = val.FIELD3;

  	if (currentItem == sourceStation ) {
  		  		items.push(',"' + val.FIELD3 + '"' );
  	} else {
  		items.push('],"' + val.FIELD2 + '": [ "' + val.FIELD3 + '"' );
  		currentItem = sourceStation;
  	}
  });
    items.push('}')
 
  $( "<div>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
});



/* loopt through everything, and check both elements, if either one is the ham, take the other element, and push it into the array; then print out those results, and then add them to the list of items to supress the master array.