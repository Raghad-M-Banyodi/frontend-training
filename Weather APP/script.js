let input=document.getElementById("searchInput");
let searchButton=document.getElementById("searchbtn");
let cityName=document.getElementById("cityName");
let forecast =document.getElementById("forecast");
let unit ="metric";
let unitBtn =document.getElementById("unitBtn");
let lastCity = "";
let lastLat;
let lastLon;

 window.onload = getLocation;

searchButton.addEventListener("click",handelClick); 

input.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        handelClick();
    }

})


function handelClick(){
    
    let city = input.value;

    lastCity = city;

    getWeather(city);

}
unitBtn.addEventListener("click", function () {

    if (unit === "metric") {
        unit = "imperial";
        unitBtn.textContent = "Switch to °C";
    } else {
        unit = "metric";
        unitBtn.textContent = "Switch to °F";
    }
   
   
   if (lastCity) {
    getWeather(lastCity);
   } else {
    getWeatherByLocation(lastLat, lastLon);
  }

});

async function getWeatherByLocation(lat,lon){
const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${unit}`;
 try {
        const response = await fetch(url);
        if (!response.ok) {
             reset();
            alert("Location not found");
            return;
        }
         await response.json();
          
         getForecast(lat, lon);
    } catch (error) {
        reset();
        console.error("Error fetching data:", error);
    }


}
async function getWeather(city) {
    
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=${unit}`;
    try{
     const response= await fetch(url);
     if(!response.ok){
        reset();
        alert("City not found");
        
        return;
     }
     const data= await response.json();
   
     getForecast(data.coord.lat, data.coord.lon);
     input.value="";

    } catch(error){
         reset();

     alert("Error fetching data")
   }
}

function  getLocation(){

    navigator.geolocation.getCurrentPosition((possition)=>{
        let lat=possition.coords.latitude;
        let lon=possition.coords.longitude;
            lastLat = lat;
            lastLon = lon;
        getWeatherByLocation(lat,lon);

    });
    
 }



function reset(){
    cityName.innerText="";
    forecast.replaceChildren();
   


}
async function getForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${unit}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("Forecast not found");
            return;
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {
        console.error(error);
        }
}

function displayForecast(data) {


    cityName.textContent = data.city.name;

    
    forecast.replaceChildren();
    data.list.forEach(item => {

        if (item.dt_txt.includes("12:00:00")) {

            let card = document.createElement("div");
            card.classList.add("card");


            let date = document.createElement("h3");
            date.textContent = item.dt_txt.split(" ")[0];


            let img = document.createElement("img");
            img.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;


            let temperature = document.createElement("p");
           
            temperature.textContent =`${item.main.temp} ${unit === "metric" ? "°C" : "°F"}`;


            let description = document.createElement("p");
            description.textContent = item.weather[0].description;


            card.appendChild(date);
            card.appendChild(img);
            card.appendChild(temperature);
            card.appendChild(description);
          

            forecast.appendChild(card);
        }

    });

}




                                                                                   