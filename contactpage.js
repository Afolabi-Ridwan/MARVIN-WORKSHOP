const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const form = document.querySelector("form");

let nameInputState = false;
let mailInputState = false;
let messageInputState = false;

function nameInputHandler(event) {
  console.log(event.target.value);
  if (event.target.value.length < 3) {
    nameInput.classList.add("invalid");
    alert("Please enter at least 3 letters in the name input tab");
    //
  } else {
    nameInput.classList.add("valid");
    nameInputState = true;
  }
}

function emailInputHandler(event) {
  console.log(event.target.value);

  const emailState = event.target.value.includes("@" && ".");
  if (!emailState) {
    emailInput.classList.add("invalid");
    alert("Please enter a valid mail");
    //
  } else {
    emailInput.classList.add("valid");
    mailInputState = true;
  }
}

function messageInputHandler(event) {
  if (event.target.value.length < 5) {
    message.classList.add("invalid");
    alert("Please enter more words");
    //
  } else {
    message.classList.add("valid");
    messageInputState = true;
  }
}

form.addEventListener("submit", function sendEmail(e) {
  e.preventDefault();

  if (nameInputState && mailInputState && messageInputState) {
    alert(" ✔ Message Sent Successfully!!!");
  } else {
    alert(" ❌ Check your inputs and retry");
  }
});
