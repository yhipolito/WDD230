function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn")
x.onclick = toggleMenu;

// select the DOM elements to manipulate (we will output to these)
const datefield = document.querySelector("time");
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

if (today===1||today===2){
    document.getElementById("banner").classList.toggle("open");
}

bannerButton.addEventListener('click', () => {
	header.removeChild(banner);
});