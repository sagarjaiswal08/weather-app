
const userTab=document.querySelector("[data-userWeather]")
const searchTab=document.querySelector("[data-searchWeather]")
const grantAcccessContainer=document.querySelector(".grant-locationContainer")
const userContainer=document.querySelector(".weather-container");

const searchForm=document.querySelector("[data-searchForm]")
const loadingScreen=document.querySelector(".loading-container")
const userInfoContainer=document.querySelector(".user-info-container")
const grantAccessBtn=document.querySelector("[data-grantAccess]")

const notfound=document.querySelector("[undefined]")
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');

let oldTab=userTab;
const API_KEY="54d9cddbf5b98e0ae42c0cc8e9994474";
oldTab.classList.add("current-tab")

getfromSessionStorage();

function switchTab(newTab){
    notfound.classList.remove("active")
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab")
        oldTab=newTab;
        oldTab.classList.add("current-tab")

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active")
            grantAcccessContainer.classList.remove("active")
            searchForm.classList.add("active")
        }
        else{
            searchForm.classList.remove("active")
            userInfoContainer.classList.remove("active")
            getfromSessionStorage();

        }
    }

}

userTab.addEventListener("click",()=>{
    switchTab(userTab);
});
searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});

function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates")
    if(!localCoordinates){
        grantAcccessContainer.classList.add("active")
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}
async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates; 
    grantAcccessContainer.classList.remove("active")
    loadingScreen.classList.add("active");
    
    try{
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        
        const data= await  response.json();
        if (!data.sys) {
            throw data;
        }
        loadingScreen.classList.remove("active"); 
        userInfoContainer.classList.add("active")
        renderWeatherInfo(data);
    }
    catch(e){
        loadingScreen.classList.remove('active');
        notfound.classList.add('active');
        errorImage.style.display = 'none';
        errorText.innerText = `Error: ${err?.message}`;
        errorBtn.style.display = 'block';
        errorBtn.addEventListener("click", fetchUserWeatherInfo);
    }
}

function renderWeatherInfo(weatherInfo){
    const cityName=document.querySelector("[data-cityName]")
    const countryIcon=document.querySelector("[data-countryIcon]")
    const desc=document.querySelector("[data-weatherDesc]")
    const weatherIcon=document.querySelector("[data-weatherIcon]")
    const temp=document.querySelector("[data-temp]")
    const windSpeed=document.querySelector("[data-windspeed]")
    const humidity=document.querySelector("[data-humidity]")
    const cloudiness=document.querySelector("[data-cloudiness]")

    cityName.innerText=weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`
    desc.innerText=weatherInfo?.weather?.[0]?.description; 
    weatherIcon.src=` http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherInfo?.main?.temp}°C`; 
    windSpeed.innerText=`${weatherInfo?.wind?.speed}m/s`; 
    humidity.innerText=`${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText=`${weatherInfo?.clouds?.all}%`; 
}


grantAccessBtn.addEventListener("click", getLocation)

function getLocation(){
     if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPositon)
        
     }
     else{
        //show Alert
     }
}
function showPositon(position){
    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    console.log(userCoordinates)
    
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
let seachInput=document.querySelector("[data-searchInput]")
 
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=seachInput.value;
    if(seachInput.value==="")
        return;
    else
        fetchSearchWeatherInfo(cityName);
     
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active")
    userInfoContainer.classList.remove("active")
    grantAcccessContainer.classList.remove("active")
    notfound.classList.remove("active")
    
    try{
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        const data=await response.json();
        if (!data.sys) {
            throw data;
        }
        loadingScreen.classList.remove("active")
        userInfoContainer.classList.add("active")
        renderWeatherInfo(data);
    }
    catch(e){
        notfound.classList.add('active');
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.remove('active');
        errorText.innerText = `${e?.message}`;
        errorBtn.style.display = "none";
    }

}