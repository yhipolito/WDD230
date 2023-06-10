function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

// select the DOM elements to manipulate (we will output to these)
const datefield = document.querySelector("time");
const formdate = document.querySelector('#date');
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

formdate.textContent = now;
