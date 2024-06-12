async function register() {
  // --- Make all validations necessary in order to only send valid logins
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document
    .getElementById("phone_number")
    .value.replace(/\D/g, "");

  const pass = document.getElementById("pass").value;
  const passcheck = document.getElementById("passcheck").value;

  if (username === "") {
    displayError("Please type a username");
    return;
  }

  if (email === "") {
    displayError("Please type an Email");
    return;
  }

  if (!validateEmail(email)) {
    displayError("Invalid Email");
    return;
  }

  if (phoneNumber === "") {
    displayError("Please type a phone number");
    return;
  }

  if (phoneNumber.length !== 13) {
    displayError("Please type a valid phone number");
    return;
  }

  if (pass === "" || passcheck === "") {
    displayError("Please type the password and verify it");
    return;
  }

  if (pass !== passcheck) {
    displayError("Password does not match");
    return;
  }

  const hashedPass = await hashPassword(pass);

  var payload = {
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    hashedPass: hashedPass,
  };

  var data = new FormData();
  data.append("payload", JSON.stringify(payload));

  fetch("php/register.php", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      if (data.success) {
        window.location.href = 'dashboard.html';
      } else {
        displayError(data.message);
        console.log(data.log);
      }
    })
    .catch((error) => {
      displayError("An error occurred")
      console.log(error);
    });
}

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function hashPassword(password) {
  // Convert the password to an ArrayBuffer
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  // Use the SubtleCrypto API to hash the password
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);

  // Convert the hash buffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

document.getElementById("phone_number")
  .addEventListener("input", function (event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = "";

    if (value.length > 0) {
      formattedValue += "+" + value.substring(0, 2); // Country code
    }
    if (value.length >= 3) {
      formattedValue += " " + value.substring(2, 4); // First two digits after country code
    }
    if (value.length >= 5) {
      formattedValue += " " + value.substring(4, 9); // Next four digits
    }
    if (value.length >= 10) {
      formattedValue += "-" + value.substring(9, 13); // Last four digits
    }

    input.value = formattedValue;
  });