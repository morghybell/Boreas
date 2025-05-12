//this for slider based - setting up slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

//Get time funtion - it passes time to the animation control function gettimeofday
function updatetime() {
	var now = new Date();
    gettimeofday(now.getHours());
    //reset the slider to the actual time
	slider.value = now.getHours();  
	output.innerHTML = now.getHours();
}

//Animation control function
function gettimeofday(now) {
	hour = now;
	if (hour >= 0 && hour < 5) { // NIGHT
		timeofdaypercent = hour - 0;
		timeofdaypercent = (timeofdaypercent / 4) * 100;
		var moon = document.getElementById('moon');
		var moonheight = (timeofdaypercent * 2.5) + 50;
		moon.style.top = moonheight + "px";
		var sun = document.getElementById('sun');
		sun.style.top = "450px";
		document.body.style.backgroundColor = "#002551";
		var world = document.getElementById('world');
		world.style.borderBottom = "5px solid #67a8f1";
		document.getElementById('toggle-label-left').style.color = "#d3d3d3";
		document.getElementById('toggle-label-right').style.color = "#d3d3d3";
		document.getElementsByClassName('simtime')[0].style.color = "#d3d3d3";
		document.body.classList.add('moon-mode');
        document.body.classList.remove('sun-mode');
	}
	if (hour >= 5 && hour < 12) {// MORNING (DAY)
		timeofdaypercent = hour - 5;
		timeofdaypercent = (timeofdaypercent / 7) * 100;
		var sun = document.getElementById('sun');
		var sunheight = 300 - (timeofdaypercent * 2.9);
		sun.style.top = sunheight + "px";
		var moon = document.getElementById('moon');
		moon.style.top = "400px";
		document.body.style.backgroundColor = "#f4c042";
		var world = document.getElementById('world');
		world.style.borderBottom = "5px solid #7a6021";
		document.getElementById('toggle-label-left').style.color = "#7a6021";
		document.getElementById('toggle-label-right').style.color = "#7a6021";
		document.getElementsByClassName('simtime')[0].style.color = "#7a6021";
		document.body.classList.add('sun-mode');
        document.body.classList.remove('moon-mode');
	}
	if (hour >= 12 && hour < 19) {// AFTERNOON (DAY)
		timeofdaypercent = hour - 12;
		timeofdaypercent = (timeofdaypercent / 7) * 100;
		var sun = document.getElementById('sun');
		var sunheight = (timeofdaypercent * 2.9) + 50;
		sun.style.top = sunheight + "px";
		var moon = document.getElementById('moon');
		moon.style.top = "400px";
		document.body.style.backgroundColor = "#f4c042";
		var world = document.getElementById('world');
		world.style.borderBottom = "5px solid #7a6021";
		document.getElementById('toggle-label-left').style.color = "#7a6021";
		document.getElementById('toggle-label-right').style.color = "#7a6021";
		document.getElementsByClassName('simtime')[0].style.color = "#7a6021";
		document.getElementById('toggle-label-right').style.color = "#7a6021";
        document.getElementsByClassName('simtime')[0].style.color = "#7a6021";
		document.body.classList.add('sun-mode');
        document.body.classList.remove('moon-mode');
	}
	if (hour >= 19 && hour <= 24) {// NIGHT
		timeofdaypercent = hour - 20;
		timeofdaypercent = (timeofdaypercent / 5) * 100;
		var moon = document.getElementById('moon');
		var moonheight = 200 - (timeofdaypercent * 2.5) + 50;
		moon.style.top = moonheight + "px";
		var sun = document.getElementById('sun');
		sun.style.top = "450px";
		document.body.style.backgroundColor = "#002551";
		var world = document.getElementById('world');
		world.style.borderBottom = "5px solid #67a8f1";
		document.getElementById('toggle-label-left').style.color = "#d3d3d3";
		document.getElementById('toggle-label-right').style.color = "#d3d3d3";
		document.getElementsByClassName('simtime')[0].style.color = "#d3d3d3";
		document.body.classList.add('moon-mode');
        document.body.classList.remove('sun-mode');
	}
}


//Start the loop going based of real time
updatetime();
var timeloop = setInterval(updatetime, 1000);

//Toggle switch functions
var togglestate=0;
document.getElementsByClassName('toggle')[0].onclick = function() {
  this.classList.toggle('on');
  if (togglestate == 0) {
  		togglestate = 1;
  		clearInterval(timeloop);
  		slider.oninput = function() {
	  		output.innerHTML = this.value;
	  		gettimeofday(this.value);
		}
	document.getElementById('slidecontainer').style.maxHeight = "300px";
	document.getElementById('toggle-label-left').style.opacity = "0.2";
	document.getElementById('toggle-label-right').style.opacity = "1";
  } else if (togglestate == 1) {
		togglestate = 0;
		updatetime();
		timeloop = setInterval(updatetime, 1000);
		slider.oninput = null;
		document.getElementById('slidecontainer').style.maxHeight = "0px";
		document.getElementById('toggle-label-left').style.opacity = "1";
		document.getElementById('toggle-label-right').style.opacity = "0.2";
  }
}