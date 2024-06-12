function delete_user() {
  if (currentUser) {
    var data = new FormData();
    data.append("id", currentUser.id);

    fetch("php/delete_user.php", {
      method: "POST",
      body: data,
    }).catch((error) => {
      console.log(error);
    });
  }

  logoff();
  window.location.href = "index.html";
}

async function load_settings() {
  
}

// --- ON STARTUP
let userSettings;

load_user().then(() => {
  if (currentUser === null) {
    window.location.href = "register.html";
    return;
  }

  displayUsername(currentUser.username);
});

load_settings().then(() => {
  console.log(userSettings);
});