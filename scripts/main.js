function loadLogos() {
  fetch("img/pagzap.svg")
    .then((response) => response.text())
    .then((svg) => {
      // document.getElementById('svg-container').innerHTML = svg;
      document
        .querySelectorAll(".logo")
        .forEach((element) => (element.innerHTML = svg));
      document
        .querySelectorAll(".logo-big")
        .forEach((element) => (element.innerHTML = svg));
    })
    .catch((error) => console.error("Error loading SVG:", error));
}

async function load_user() {
  currentUser = await fetch("php/load_user.php", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        console.log(data.message);
      }
      return data.user;
    })
    .catch((error) => {
      console.log(error);
    });
}

function logoff() {
  fetch("php/logoff.php", {
    method: "GET",
  });
  window.location.href = "index.html";
}

function displayUsername(username) {
  document
    .querySelectorAll("#username_display")
    .forEach((element) => (element.innerHTML = username));
}

function displayError(message) {
  var errorBox = document.getElementById("error");
  errorBox.style.display = "block";
  errorBox.innerHTML = message;
}

// --- On Startup
let currentUser;
loadLogos();
