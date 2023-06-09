function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

// select the DOM elements to manipulate (we will output to these)
const datefield = document.querySelector("time");
const formdate = document.querySelector("#date");
// for european/family history format with day first.

// derive the current date using a date object
const now = new Date();
const today = now.getDay();
const fulldate = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(
  now
);
datefield.textContent = fulldate;

const year = now.getFullYear();
document.querySelector("#currentYear").textContent = year;

const lastUpdated = document.lastModified;
document.querySelector("#lastUpdated").textContent = lastUpdated;

// script for the banner on top of the header //

const bannerButton = document.getElementById("bannerButton");
const header = document.querySelector("header");
const banner = document.querySelector("#banner");

if (today === 1 || today === 2) {
  document.getElementById("banner").classList.toggle("open");
}

bannerButton.addEventListener("click", () => {
  header.removeChild(banner);
});

let imagesToLoad = document.querySelectorAll("img[data-src]");
const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}

//initialize manipulation of DOM with visitDisplay which is <span id="lastVisti"></span>
const visitsDisplay = document.querySelector("#lastVisit");
// milliseconds to days constant = 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
const msToDays = 84600000;

// Get the last visit date from local storage
let lastVisit = localStorage.getItem("lastVisit");

// If there was a last visit
if (lastVisit) {
  // Date.now() and lastVisit in miliseconds
  // diffDays in days rounded.
  let diffDays = Math.round((Date.now() - lastVisit) / msToDays);
  //   console.log(diffDays);

  // Display the result somewhere in the page
  visitsDisplay.textContent = `It's been ${diffDays} days since your last visit.`;
} else {
  // If there's no last visit date in local storage, this is the user's first visit
  visitsDisplay.textContent = "This is your first visit. Welcome!";
}

// Update the last visit date in local storage
localStorage.setItem("lastVisit", Date.now());

// Following lines show today's time in two different formats
// Example Tue Jun 06 2023 16:54:53 GMT+0000 (Greenwich Mean Time)
// from const now = new Date();
// console.log(now);

// Time in miliseconds elapsed since 1/1/1970
// Date.now()
// console.log(Date.now());

// formdate.textContent = now;

///-----------------WEATHER INFO----------------///
// select HTML elements in the document
const currentTemp = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const windSpeed = document.querySelector("#windSpeed");
const windChill = document.querySelector("#windChill");

const urlw = "https://api.openweathermap.org/data/2.5/weather?q=Sandy,USA&appid=ac62c32e0537fc708a489b00c343f912&units=imperial"

async function apiFetch(){
    try {
        const response = await fetch(urlw);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // this is for testing the call
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    }   catch(error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(weatherData) {
    let t = weatherData.main.temp.toFixed(0);
    currentTemp.innerHTML = `<strong>${t}</strong>`;
    let s = weatherData.wind.speed;
    windSpeed.textContent = `${s}`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    // captionDesc.textContent = desc;
    captionDesc.innerHTML = `<i>${desc}</i>`;

    if (t <= 50 && s > 3) {
      f = Math.round(35.74 + 0.6215 * t - (35.75 * (s**0.16)) + 0.4275 * t * (s ** 0.16));
      f = Math.round((f-32)/1.8);
      windChill.innerHTML = `${f} &deg;F`;
    } else {
      f = "N/A";
      windChill.textContent = f;
    }
}

///-------------DIRECTORY COMPANIES--------///

const url = "https://yhipolito.github.io/WDD230/chamber/json/data.json";
const cards = document.querySelector("article");
const spotlights = document.querySelector(".spotlights");

async function getCompanyData() {
  const response = await fetch(url);
  const data = await response.json();
  displayCompanies(data.companies, cards);
  // I added an new argument to this function displayCompanies to pass cards element.
  // console.table(data.companies);
  // note that we reference the prophet array of the data object given the structure of the json file
}

async function getSpotslightsData(){
  const response = await fetch(url);
  const data = await response.json();
  const goldList = data.companies.filter(item => item.membershipLevel === "Gold");
  displayCompanies(goldList,spotlights);
}

getCompanyData();
getSpotslightsData();

const displayCompanies = (companies, container) => {
  // const cards = document.querySelector("article"); 
  // select the output container element

  companies.forEach((company) => {
    // Create elements to add to the div.cards element
    let card = document.createElement("section");
    card.setAttribute("class", "companies");
    let name = document.createElement("h2");
    name.setAttribute("class", "companies");
    let address = document.createElement("p");
    address.setAttribute("class", "companies");
    let phone = document.createElement("p");
    phone.setAttribute("class", "companies");
    let website = document.createElement("p");
    website.setAttribute("class", "companies");
    let portrait = document.createElement("img");
    let membershipLevel = document.createElement("p");
    membershipLevel.setAttribute("class", "companies");

    // Build the name content out to show the companies'  name - finish the template string
    name.textContent = `${company.name}`;
    address.textContent = `${company.address}, Sandy UT84094`;
    phone.textContent = `+1 ${company.phone}`;
    website.textContent = `${company.websiteUrl}`;
    membershipLevel.textContent = `Membership Level: ${company.membershipLevel}`;

    // Build the image by setting all the relevant attributes
    portrait.setAttribute("src", company.imageUrl);
    portrait.setAttribute("class", "companies");
    portrait.setAttribute("alt", `Portrait of ${company.name}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "300");
    portrait.setAttribute("height", "200");

    // Append the section(card) with the created elements
    card.appendChild(name);
    card.appendChild(portrait);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membershipLevel);
    container.appendChild(card);
  });
  // end of forEach loop

/*-------------Grid-List------------------*/
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
  // example using arrow function
  display.classList.add("grid");
  display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
  display.classList.add("list");
  display.classList.remove("grid");
}}
