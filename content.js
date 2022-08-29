//import funcion here
import {find} from "./main.js"
import { name } from './main.js'
import { flatmap } from './main.js'
import { cameraPlanet } from './main.js'


const weather = document.querySelector(".weather")
const list = document.querySelector(".list")
const map = document.querySelector(".map")
const info = document.querySelector(".info")
const content = document.querySelector(".content")
const temperature = document.querySelector(".temp")
content.style.display = "none";

let solarSystem = "https://en.wikipedia.org/wiki/Solar_System"
let sun = "https://en.wikipedia.org/wiki/Sun"
let venus = "https://en.wikipedia.org/wiki/Venus"
let mars = "https://en.wikipedia.org/wiki/Mars"
let mercury = "https://en.wikipedia.org/wiki/Mercury_(planet)"
let earth = "https://en.wikipedia.org/wiki/Earth"
let jupiter = "https://en.wikipedia.org/wiki/Jupiter"
let saturn = "https://en.wikipedia.org/wiki/Saturn"
let uranus = "https://en.wikipedia.org/wiki/Uranus"
let neptune = "https://en.wikipedia.org/wiki/Neptune"


let click = 0
let page = ""

//in celcius
let planetWeather= {
    "SOLAR SYSTEM": "N/A",
    "Sun" : 15000000,
    "Mercury": 167,
    "venus" : 464,
    "Earth" : 15,
    "Mars" : -65,
    "Jupiter" : -110,
    "Saturn" : -140,
    "Uranus" : -195,
    "Neptune" : -200,
}

let wclick = 0
weather.addEventListener("click", ()=>{
    if (wclick == 0){
        temperature.style.display = "none"
        wclick+= 1
    }else if(wclick == 1){
        temperature.style.display = "flex"
        if (planetWeather[name.innerHTML] == "N/A"){
            temperature.innerHTML = "N/A"
        }else{
            temperature.innerHTML =planetWeather[name.innerHTML] + "°c"
            wclick = 0
        }
    }
})

temperature.addEventListener("mouseover", ()=>{
    if (planetWeather[name.innerHTML] == "N/A"){
            temperature.innerHTML = "N/A"
    }else{
        let planetFahrenheit =Math.floor((planetWeather[name.innerHTML] * 9/5) + 32);
        temperature.innerHTML = planetFahrenheit + "°F"
    }
        
});
temperature.onmouseout = function (){
    if (planetWeather[name.innerHTML] == "N/A"){
            temperature.innerHTML = "N/A"
    }else{
    temperature.innerHTML = planetWeather[name.innerHTML] + "°c";    
    }   
}

export let view = 0
map.addEventListener("click", ()=>{
   flatmap(view)
   if (view == 4){
    view = 0
   }else{
    view+=1
   }
})



list.addEventListener("click", ()=>{
    if (click == 0 || click == 0 && page != "list"){
        // content here
        content.style.display = "flex"
        content.innerHTML = ""
        content.appendChild(arrToUl(myArray));
        page = "list"
        click = 1
    }
    else if (click == 1 && page == "list"){
        content.style.display= "none"
        //console.log("jh")
        content.innerHTML = ""
        click = 0
    }
    else if (click == 1 && page != "list"){
        // content here
        content.style.display= "flex"
        content.innerHTML = ""
        content.appendChild(arrToUl(myArray));
        click = 1
        page = "list"
    }   
})


info.addEventListener("click", ()=>{
    if (click == 0 || click == 0 && page != "info"){
        // content here
        content.style.display = "flex"
        page = "info"
        click = 1
        information(name.innerHTML)
        
        
    }
    else if (click == 1 && page == "info"){
        content.style.display= "none"
        click = 0
        
    }
    else if (click == 1 && page != "info"){
        // content here
        content.style.display= "flex"
        information(name.innerHTML)
        click = 1
        page = "info"
    }   
})

const frame = document.createElement("iframe")

function information(ctx){
    content.innerHTML = ""
    frame.width = content.clientWidth/0.1
    frame.height= content.clientHeight
    frame.frameBorder ="0";
    frame.scrolling = "0";
    frame.style.border= "none";
    frame.style.background = "white";
    //page.classList("cnt")
    //console.log(name.innerHTML)
    if (ctx == "Sun"){
        frame.src = sun
    }else if(ctx == "SOLAR SYSTEM"){
        frame.src = solarSystem
    }else if(ctx == "Mercury"){
        frame.src = mercury
    }else if(ctx == "Mars"){
        frame.src = mars
    }else if(ctx == "Venus"){
        console.log("ok")
        frame.src = venus
    }else if(ctx == "Earth"){
        frame.src = earth
    }else if(ctx == "Jupiter"){
        frame.src = jupiter
    }else if(ctx == "Saturn"){
        frame.src = saturn
    }else if(ctx == "Uranus"){
        frame.src = uranus
    }else if(ctx == "Neptune"){
        frame.src = neptune
    }
    content.appendChild(frame)
}




let contentResize = new ResizeObserver(() =>{
    frame.height = content.clientHeight
    if (content.clientWidth > 750){
        content.style.left = "15vw"
        content.style.top = "60vh"
        content.style.height = "35vh";
        content.style.float = "right"
    }
})

contentResize.observe(content)


window.addEventListener("resize", ()=>{
    //console.log(window.innerWidth)
    if (window.innerWidth <= 600){
        content.style.display = "none"
    }else if(window.innerWidth > 600 && click == 1){
        content.style.display = "flex"
    }
})




function arrToUl(arr) {
  var ul = document.createElement('ul'), li;
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      li.appendChild(arrToUl(arr[i]));
    } else {
        let b = document.createElement("button")
      li = document.createElement('li');

      b.innerHTML = arr[i]
      //a.appendChild(document.createTextNode(arr[i]));
      li.appendChild(b)
      ul.appendChild(li);

      ul.style.listStyle = "none"
      li.style.padding = "10px"
      ul.style.display = "grid"
      ul.style.gridTemplateColumns = "1fr 1fr 1fr 1fr "
      ul.style.gridTemplateRows = "1fr 1fr 1fr"
      ul.style.textAlign = "center"
      b.style.padding = "10px"
      b.title = "button"+i
      content.style.justifyContent = "center"
       b.addEventListener("click", (event)=>{
        if (event.target.title == "button0"){find("sun")}
        else if (event.target.title == "button1"){find("venus")}
        else if (event.target.title == "button2"){find("mercury")}
        else if (event.target.title == "button3"){find("earth")}
        else if (event.target.title == "button4"){find("mars")}
        else if (event.target.title == "button5"){find("jupiter")}
        else if (event.target.title == "button6"){find("saturn")}
        else if (event.target.title == "button7"){find("uranus")}
        else if (event.target.title == "button8"){find("neptune")}
       })
    }
  }
  return ul;
}

var myArray = ['Sun', 'Venus', 'Mercury', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'neptune'];

function button(i){
    console.log(i)
}