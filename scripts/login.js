async function login() {
    const userdata = document.getElementById("userdata").value;
    const pass = document.getElementById("pass").value;
  
    if (userdata === "") {
      displayError("Please type a username or email");
      return;
    }
  
    if (pass === "") {
      displayError("Please type a password");
      return;
    }
  
    const hashedPass = await hashPassword(pass);
  
    var payload = {
      userdata: userdata,
      hashedPass: hashedPass,
    };
  
    var data = new FormData();
    data.append("payload", JSON.stringify(payload));
  
    fetch("php/login.php", {
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