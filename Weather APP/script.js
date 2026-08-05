let input=document.getElementById("search");
let searchButton=document.getElementById("searchBtn");
let cityName=document.getElementById("cityName");
let forecast =document.getElementById("forecast");
let unitBtn =document.getElementById("unitBtn");


let unit ="metric";
let currentCityName = "";
let currentLat;
let currentLon;

window.onload = getLocation;

searchButton.addEventListener("click",handelClick); 

input.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        handelClick();
    }

})


function handelClick(){
   currentCityName = input.value.trim();
    if(currentCityName==""){
        alert("try agin");
        input.value="";
    }else{
     getCoordinates(currentCityName);

    }

}
unitBtn.addEventListener("click", function () {

    if (unit === "metric") {
        unit = "imperial";
        unitBtn.textContent = "Switch to °C";
    } else {
        unit = "metric";
        unitBtn.textContent = "Switch to °F";
    }
   
    getWeather(currentLat, currentLon);


});

async function getCoordinates(cityName){
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=${unit}`;
    try{
     const response= await fetch(url);
     if(!response.ok){
        alert("City not found")
        reset();
        return;
     }
     const data= await response.json();
     currentLat=data.coord.lat;
     currentLon=data.coord.lon;
     getWeather(currentLat,currentLon);
   
     input.value="";

    } catch(error){
         reset();

     alert("Error fetching data")
   }


}
async function getWeather(lat,lon) {
    let APIUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${unit}`;
   
    try{
     const response= await fetch( APIUrl);

    if(response.status === 200){
     const data = await response.json();
    displayForecast(data);
    input.value="";

   } else if(response.status === 404){

    reset();
    alert("City not found");

   } else if(response.status === 401){

    alert("Invalid API key");

   } else if(response.status === 500){

    alert("Server error");

   } else {

    alert("Unknown error: " + response.status);

   } } catch(error){
         reset();

     alert("Error fetching data")
   }
}

function  getLocation(){

    navigator.geolocation.getCurrentPosition((possition)=>{
        currentLat=possition.coords.latitude;
        currentLon=possition.coords.longitude;
       
        getWeather(currentLat,currentLon);

    },
    (error) => {
        alert("Location access denied");
    });
    
 }



function reset(){
    cityName.innerText="";
    forecast.replaceChildren();
   


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




                                                                                   