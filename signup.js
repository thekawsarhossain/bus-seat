//  signup function start here
const signupFunc = () => {
  //   e.preventDefault();

  //   getting input field values here
  const userName = document.getElementById("username-signup").value;
  const password = document.getElementById("password-signup").value;

  //   userinfo object here
  const user = {
    userName,
    password,
  };

  //   checking the local storage that it has exist user or not here
  const existUser = localStorage.getItem("userInfo");

  // checking username here
  const existingUserParsed = JSON.parse(existUser);

  for (let i = 0; i < existingUserParsed?.length; i++) {
    if (
      existingUserParsed[i]?.userName?.toLowerCase() === userName.toLowerCase()
    ) {
      return alert("The user already exist !");
    }
  }

  if (userName && password) {
    //   saving to the local storage here
    let allUser = [];
    if (!existUser) {
      allUser.push(user);
    } else {
      let users = JSON.parse(existUser);
      localStorage.removeItem("userInfo");
      allUser = [...users, user];
    }
    //   making json stringify here
    const userInfoJson = JSON.stringify(allUser);
    const userJson = JSON.stringify(user);
    localStorage.setItem("userInfo", userInfoJson);
    localStorage.setItem("user", userJson);
    alert("account creation successfull !!");
    window.location.href = "booking.html";
  } else if (userName) {
    alert("give a good password to create account");
  } else if (password) {
    alert("give a good username to create account");
  } else {
    alert("you need to give username and password to procced");
  }
};
// calling this function using create btn here
document.getElementById("create-btn").addEventListener("click", () => {
  signupFunc();
});
