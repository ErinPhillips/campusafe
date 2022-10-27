// [] figure out how to connect the firebase to the data (personally) - Matt
// [] figure out how to call the firebase with specific varabiles
// [] what vairables are we using to call each part of collection
// [] do we need to create a collection based on each individual person to keep record?
//
// Connecting the alerts to the database 
// Alerts have how many variables per report?
// [date,time,location,severity(string selected from dropdown),violent(boolean),description]
// 
// if(submit is pressed) {
//		firebase collection takes inputs from function canSubmit
//		
// for creation of collection that can be linked to the user id to 
//	keep record of what is being recorded 
//	
//	if(submit is pressed) {
//		how can we create a collection based on each person that created an account
//		can we look at the id of the person with the firebase collection and create 
//		another collection to form the report 
// 
//
//
//

// open and close mobile navigation bar on side of screen
 
function openNav() 
{
   document.getElementById("mySidenav").style ="width:250px";
}

function closeNav() 
{
   document.getElementById("mySidenav").style ="width:0";
}

function addFriend()
{
   
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

function canSubmit(formId)
{
   if(formId == "report")
   {
      let notComplete = []
      if(document.getElementById("location").innerText == "")
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
      
      if(document.getElementById("incident").value == "")
      {
         notComplete.push("incident");
      }
      if(document.getElementById("crime").value == "")
      {
         notComplete.push("crime");
      }
      console.log(notComplete)
      
      if(notComplete.length == 0)
      {
         window.location = '#';
      }
      // else
      // {
      //    for(let i = 0; i < notComplete.length; i++)
      //    {
      //       if(notComplete[i] == "location")
      //       {
      //          document.getElementById(notComplete[i]).style = "color:red"
      //       }
      //       else
      //       {
      //       document.getElementById(notComplete[i]).style = "border-color:red"
      //       }
      //    }
         
      // }
      
   }
}
