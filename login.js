// Signup btn here to redirect signup page
document.getElementById("signup-btn").addEventListener("click", () => {
  window.location.href = "signup.html";
});

const btn = document.getElementById("signup-btn");

// sign in function here
const signInFunc = () => {
  //   getting input field values here
  const userName = document.getElementById("username-signin").value;
  const password = document.getElementById("password-signin").value;

  // getting all user data here
  const allUsers = localStorage.getItem("userInfo");

  // checking username here
  const allUsersParsed = JSON.parse(allUsers);
  if (allUsersParsed?.length) {
    for (let i = 0; i < allUsersParsed?.length; i++) {
      if (
        allUsersParsed[i].userName === userName &&
        allUsersParsed[i].password === password
      ) {
        const user = {
          userName,
          password,
        };
        const userInfoJson = JSON.stringify(user);
        localStorage.setItem("user", userInfoJson);
        return (window.location.href = "booking.html");
      } else {
        return alert("Try to give the valid user name and password");
      }
    }
  } else {
    alert("There is no user with this username ");
  }
};
// calling this function using signin btn here
document.getElementById("signin-btn").addEventListener("click", () => {
  signInFunc();
});
