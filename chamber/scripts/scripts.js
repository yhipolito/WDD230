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
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	now
);
const fulldateUK = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(now);
// "full" or long, medium, short options ... try them

datefield.textContent = fulldate;
datefieldUK.innerHTML = `<em>${fulldateUK}</em>`;
datemessage.innerHTML = `Today is <strong>${fulldate}</strong>. What are you going to do?`;
