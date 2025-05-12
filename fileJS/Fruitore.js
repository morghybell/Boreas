var moon = document.getElementById('moon');
var moonheight = (timeofdaypercent * 2.5) + 50;
moon.style.top = moonheight + "px";

document.body.classList.add('moon-mode');

var sun = document.getElementById('sun');
var sunheight = 300 - (timeofdaypercent * 2.9);
sun.style.top = sunheight + "px";

document.body.style.backgroundColor = "#f4c042";
var world = document.getElementById('world');
world.style.borderBottom = "5px solid #7a6021";

document.body.classList.add('sun-mode');
