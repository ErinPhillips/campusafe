
// allows user to drag the mobile alert content up and down

dragElement(document.getElementById("drag-alert"));
   
 function dragElement(elmnt) 
{
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").ontouchstart = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.ontouchstart = dragMouseDown;
  }

  function dragMouseDown(e) 
   {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos4 = e.touches[0].clientY;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) 
   {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position
    pos2 = pos4 - e.touches[0].clientY;
    pos4 = e.touches[0].clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  }

  function closeDragElement() 
   {
    // stop moving when mouse button is released:
    document.ontouchend = null;
    document.ontouchmove = null;
  }
 }