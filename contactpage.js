function sendEmail(e) {
  e.preventDefault();
  Email.send({
    Host: "smtp.gmail.com",
    Username: "afolabiridwan93@gmail.com",
    Password: "lanreafolabijun",
    To: "afolabiridwan93@gmail.com",
    From: document.getElementById("email").value,
    Subject: "This is the subject",
    Body: "And this is the body",
  }).then((message) => alert(message));
}
