// open and close mobile navigation bar on side of screen
 
function openNav() 
{
   document.getElementById("mySidenav").style ="width:250px";
}

function closeNav() 
{
   document.getElementById("mySidenav").style ="width:0";
}



function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}




// determines if the required fields have been completed
// if they have been completed, the form information is submitted and posted to alerts
// if they have not been completed, the form information turns red to signify to the 
// user that they need to complete the input fields
function canSubmit(formId)
{
   if(formId == "report")
   {
      let notComplete = []
      if(document.getElementById("location").innerText == "Click on map to add location")
      {
         notComplete.push("location");
      }
      if(document.getElementById("date").innerText == "")
      {
         notComplete.push("date");
      }
      if(document.getElementById("time").innerText == "")
      {
         notComplete.push("time");
      }
      
      if(document.getElementById("incident").value == "none")
      {
         notComplete.push("incident");
      }
      if(document.getElementById("crime").value == "none")
      {
         notComplete.push("crime");
      }
      console.log(notComplete)
      
      if(notComplete.length == 0)
      {
         window.location = '#';
      }
      else
      {
         for(let i = 0; i < notComplete.length; i++)
         {
            if(notComplete[i] == "location")
            {
               document.getElementById(notComplete[i]).style = "color:red"
            }
            else
            {
            document.getElementById(notComplete[i]).style = "border-color:red"
            }
         }
         
      }
      
   }
}