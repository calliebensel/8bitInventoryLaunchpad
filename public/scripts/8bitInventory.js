// properties by which searches can be done
var sizes = [ 'small', 'medium', 'large' ];
var colors = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];

////// global array of items in inventory //////
var items = [];

// $( document ).ready( function(){
//   var addObject = function( colorIn, nameIn, sizeIn ){
//     console.log( 'in addObject' );
//     // assemble object from new fields
//     var newItem = {
//       color: colorIn,
//       name: nameIn,
//       size: sizeIn
//     }; // end testObject
//     console.log( 'adding:', newItem );
//     ////// TODO: add ajax call to addItem route to add this item to the table
//
//     // add to items array
//     items.push( newItem );
//   }; // end addObject
//
//   var findObject = function( colorCheck, sizeCheck ){
//     console.log( 'in findObject. Looking for:', colorCheck, sizeCheck );
//     // array of matches
//     var matches = [];
//     for ( var i = 0; i < items.length; i++ ) {
//       if( items[i].color == colorCheck && items[i].size == sizeCheck ){
//         // match, add to array
//         matches.push( items[i] );
//       } // end if
//     } // end for
//     console.log( 'matches:', matches );
//     ////// TODO: display matches
//   }; // end findObject
//
//   var getObjects = function(){
//     console.log( 'in getObjects');
//     // populate the items array
//     ////// TODO: replace the stuff in this function with getting items from the database ////////
//     ////// hint: make a get call to the getInventory and use it's response data to fill the items array ////////
//   }; // end getObjects
//
//   // get objects when doc is ready
//   getObjects();
//   // the below are tests to show what is returned when running findObject
//   addObject( 'blue', 'blueberry', 'small' );
//   findObject( 'blue', 'small' );
//   findObject( 'blue', 'large' );
// }); // end doc ready
/////////////////////// jquery version

$( document ).ready( function(){
  $( '#addObject' ).on( 'click', function(){
    addObject( event );
    $('#objectName').val('');
    $('#colorIn').val('none');
    $('#sizeIn').val('none');
  }); // end on click

  $( 'searchButton' ).on( 'click', function(){
    getObjects( event );
  }); // end search button
}); // end doc ready

var addObject = function( event ){
  console.log( 'in addObject' );
  // assemble object from new fields
  var newItem = {
    color: $('#objectName').val(),
    name: $('#colorIn').val(),
    size: $('#sizeIn').val()
  }; // end newItem
  console.log( 'adding:', newItem );
  ////// TODO: add ajax call to addItem route to add this item to the table
  $.ajax({
    type: 'POST',
    url: '/addItem',
    data: newItem,
    success: function(){
      console.log( 'back from POST', response );
    }, // end success function
    error: function(){
      console.log( 'error with ajax call' );
    } // end error function
  }); // end ajax post
  // add to items array
  items.push( newItem );
}; // end addObject

var findObject = function(array){
//  console.log( 'in findObject. Looking for:', $('#searchColor').val(), $('#searchSize').val());
  // array of matches
  var matches = [];
  for ( var i = 0; i < items[0].length; i++ ) {
    if(items[0][i].color == $('#searchColor').val() && items[0][i].size == $('#searchSize').val()){
      // match, add to array
      matches.push(items[0][i]);
    } // end if
  } // end for
//  console.log( 'matches:', matches );
  ////// TODO: display matches
  displaySearchResults(matches);
}; // end findObject function

var displaySearchResults = function(array){
  $('#outputDiv').html('');//clear outputDiv
  if(array.length <1){
    $('#outputDiv').append('<h3>' + 'There are no matches in the inventory' + '</h3>');
  } else {
    $('#outputDiv').append('<h4>Search Results:</h4>');
    for(var i=0; i < array.length; i++ ){
      $('#outputDiv').append('<p id="resultsDisplay">' + array[i].size + ' ' + array[i].color + ' ' + array[i].object_name + '</p>');
    }//end for loop
  }//end else statement
};//end displaySearchResults function

var getObjects = function(event){
//  console.log( 'in getObjects');
  event.preventDefault();
  $.ajax({
    type: 'GET',
    url: '/getInventory',
    success: function(response){
  //    console.log('added to items array from get:', response);
      items.push(response);
      findObject(items);
    }//end success function
  });//end getObjects ajax
}; // end getObjects function
