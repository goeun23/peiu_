


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
  // return 'black';
  // return 'tranparent';
}

function getStatusColor(isOpen) {
  return isOpen == true ? 'green' : 'red'
}


 // Create Event Handlers for mouse
 function handleMouseOver() {  // Add interactivity

  var attrs = d3.select(this);
  var x,y;
  if(this instanceof SVGCircleElement){
    x = attrs.attr('cx');
    y = attrs.attr('cy');
  }else if(this instanceof SVGRectElement){
    x = attrs.attr('x');
     y = attrs.attr('y');
  }
  
  var key = attrs.attr('data-key'); 
  rccSvg.append('text').attr('id','text-'+key)
    .attr('x',function(){{return x-150;}})
    .attr('y',function(){{return y;}})
    .attr('fill','white')
    // .text(key);
    .text(function(){return [x, y,key]})
 
}

function handleMouseOut() {
  
  var attrs = d3.select(this);
  // var x = attrs.attr('x');
  // var y = attrs.attr('y');
  var key = attrs.attr('data-key');
  // Select text by id and then remove
  d3.select("#text-"+ key).remove();  // Remove text location
}


function pytha(x1, y1, x2, y2) {
  var width = Math.abs(x1 - x2),
      height = Math.abs(y1 - y2);
  lineLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  return lineLength;
}
