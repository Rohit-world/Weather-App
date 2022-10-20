
let map = document.getElementById("gmap_canvas");
let main = document.getElementById("main");
let key ="2cb475d41d975eabf7330d4a07b5efcf";
getwheater()



//input wheater
async function getwheaterbylocation(lat,lon) {
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);

    data = await res.json();
    display(data)
  } catch (err) {
    console.log(err);
  }
}



//location weather
async function getwheater() {
  city = document.getElementById("city").value;
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    );

    data = await res.json();
    display(data);
    console.log(data)
  } catch (err) {
    console.log(err);
  }
}












function display(data) {
  main.innerHTML = null;
let time=document.createElement("p")
time.id="time"
  let name = document.createElement("h1");
  name.id="name"
  name.innerText = data.name;
  let temp = document.createElement("h3");
  temp.id="temp"
  temp.innerText = `${data.main.temp}°C `;
  let desc = document.createElement("h4");

  desc.innerText=`🌤 Feels like ${data.main.feels_like}°C ${data.weather[0].description}`


  let details=document.createElement("div")
  details.id="details"

  
  let humidity = document.createElement("p");
  humidity.innerText = `Humidity: ${data.main.humidity}%`;

  let temp_max=document.createElement("p");
  temp_max.innerText=`Max-Temp: ${data.main.temp_max}°C`


  let temp_min=document.createElement("p");
  temp_min.innerText=`Min-Temp: ${data.main.temp_min}°C`



  let wind = document.createElement("p");
  wind.innerText = `Wind speed:-${data.wind.speed}`;





details.append(humidity,wind,temp_max,temp_min)

  main.append(time,name, temp,desc,details);
  map.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  var datetime = new Date();
console.log(datetime);
document.getElementById("time").textContent = datetime; 
document.getElementById("gmap_canvas").style.boxShadow = " rgba(0, 0, 0, 0.24) 0px 3px 8px";
}








function success(pos) {
  const crd = pos.coords;
  getwheaterbylocation(crd.latitude,crd.longitude)
}

navigator.geolocation.getCurrentPosition(success);



