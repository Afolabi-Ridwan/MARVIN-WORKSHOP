const  bars = document.getElementById("bars");
let navbar = document.getElementById("navbar");
let wholeNavbar = document.querySelector(".mobileNavbar");
let radio = document.getElementById("radio");
let hr = document.getElementById("hr");
let cipContainer = document.getElementById("cipcontainer");
const xMark = document.querySelector(".xMark")
// let a = times.classList.contains("active");
let x = window.matchMedia("(max-width: 414px)");
let b = 1;
let timer;






// function hideNotificationBar() {
//   cartAdded.classList.remove("active");
//   hr.classList.remove("active");
// }

// window.addEventListener("scroll", function () {
//   wholeNavbar.classList.toggle("sticky", this.window.scrollY > 0);

//   wholeNavbar.style.zIndex = "1000";
// });

bars.addEventListener("click", function () {
  console.log("clicked")
  wholeNavbar.classList.add("active");

});

xMark.addEventListener("click", function () {
    wholeNavbar.classList.remove("active");
});

// function toggleTimes() {
//   navbar.classList.remove("toggle");
//   times.classList.remove("active");
//   bars.style.display = "block";
//   bars.style.position = "relative";
//   bars.style.right = "-45px";
//   bars.style.left = "45px";
//   navbar.style.paddingBottom = "-100px";

//   if (x.matches) {
//     bars.style.right = "-33px";
//     bars.style.top = "-10px";
    // bars.style.paddingBottom = "10px";
  // } else {
    // bars.style.display = "none";
  // }
// }
