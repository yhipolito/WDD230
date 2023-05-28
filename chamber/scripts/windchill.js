let t = document.getElementById("temperature").textContent;
let s = document.getElementById("windSpeed").textContent;

let f;
t = (t * (9/5)) + 32;
// console.log(t);
s = s / 1.609344;

if (t <= 50 && s > 3) {
    f = Math.round(35.74 + 0.6215 * t - (35.75 * (s**0.16)) + 0.4275 * t * (s ** 0.16));
    f = Math.round((f-32)/1.8);
} else {
    f = "N/A";
}

document.getElementById("windChill").innerHTML = f ;
// console.log(f);
// "&degC" to add degrees symbol