// --- ON STARTUP
load_user().then(() => {
  var usernames = document.querySelectorAll("#username_display");

  if (currentUser === null) {
    usernames.forEach((element) => (element.innerHTML = "Login"));
    usernames.forEach((element) => (element.href = "login.html"));
    return;
  }

  usernames.forEach((element) => (element.innerHTML = currentUser.username));
});
