const bars = document.getElementById("bars");
let wholeNavbar = document.querySelector(".mobileNavbar");
const xMark = document.querySelector(".xMark");

bars.addEventListener("click", function () {
  console.log("clicked");
  wholeNavbar.classList.add("active");
});

xMark.addEventListener("click", function () {
  wholeNavbar.classList.remove("active");
});
