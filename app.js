window.addEventListener('load', ()=>{
let long;
let lat;
let temperatureDescription=document.querySelector(
    ".temperature-description"
);

let temperatureDegree=document.querySelector(".temperature-degree");
let locationTimezone=document.querySelector(".location-timezone");
let temperatureSection=document.querySelector(".temperature");
let temperatureSectionSpan=document.querySelector(".temperature span");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
        console.log(position);
        long=position.coords.longitude;
        lat=position.coords.latitude;
      //  const apikey='62e49af0140204c485ffa305afc9763a';
const proxy="https://cors-anywhere.herokuapp.com/";
const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;
//const api  = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apikey

fetch(api)
.then(response=>{
    return response.json();
})
.then(data=>{
    console.log(data);
    const {temperature, summary, icon}=data.currently;
    //Set DOM Elements from the API
    temperatureDegree.textContent=temperature;
    temperatureDescription.textContent=summary;
    locationTimezone.textContent=data.timezone;

    //F to C

    let celcius=(temperature-32)*(5/9);

    //setIcon
    setIcon(icon, document.querySelector(".icon"));


    //Changing temperature

    temperatureSection.addEventListener("click", ()=>{
        if(temperatureSectionSpan.textContent==="F"){
            temperatureSectionSpan.textContent="C";
            temperatureDegree.textContent=celcius.toFixed(2);
        }
        else{
            temperatureSectionSpan.textContent="F";
        }
    })
});
    });
}
function setIcon(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon=icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}
});