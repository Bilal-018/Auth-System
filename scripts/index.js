function signup_func() {
  let user = {
    fname: "",
    lname: "",
    email: "",
    pw: "",
    num: "",
    add: "",
    edu: "",
    country: "",
    region: "",
    image: "",
  };

  user.fname = document.getElementById("fname").value;
  user.lname = document.getElementById("lname").value;
  user.email = document.getElementById("mail").value;
  user.pw = document.getElementById("pswrd").value;

  if (user.email.includes("@") && user.email.indexOf("@") > 0) {
    let userarr = [];
    if (!localStorage.length) {
      userarr.push(user);
      localStorage.setItem("users", JSON.stringify(userarr));
      alert("Account Succesfully created.");
    } else {
      let check = false;
      userarr = JSON.parse(localStorage.getItem("users"));
      for (let x in userarr) {
        if (userarr[x].email == user.email) {
          check = true;
        }
      }
      if (check) {
        alert("User already exisit");
      } else {
        userarr.push(user);
        localStorage.setItem("users", JSON.stringify(userarr));
        alert("Account Succesfully created.");
      }
    }
  }
}

// function session_timeout() {
//   let session_time = 5000;
//   // clearTimeout(auto_logout_timer);
//   let = auto_logout_timer = setTimeout(destroy_session, session_time);
// }

function login_func() {
  if (
    !document.getElementById("si-email").value &&
    !document.getElementById("si-pswrd").value
  ) {
    alert("Please Enter Email and Password.");
  } else if (!document.getElementById("si-pswrd").value) {
    alert("Please enter Password.");
  } else if (!document.getElementById("si-email").value) {
    alert("Please enter Email.");
  } else {
    userarr = JSON.parse(localStorage.getItem("users"));
    let in_pswrd = false;
    check = false;
    for (let x in userarr) {
      if (userarr[x].email == document.getElementById("si-email").value) {
        if (userarr[x].pw == document.getElementById("si-pswrd").value) {
          check = true;
          sessionStorage.setItem("id", x);
          break;
        } else {
          in_pswrd = true;
        }
      }
    }
    if (check) {
      alert("Succesfully Logged in");
      location.href = "home.html";
    } else if (in_pswrd) {
      alert("Password is incorrect.");
    } else {
      alert("User not found.");
    }
  }
}

function profile_home() {
  if (sessionStorage.getItem("id")) {
    // session_timeout();
    document.body.style.display = "block";
    userarr = JSON.parse(localStorage.getItem("users"));
    let index = sessionStorage.getItem("id");

    document.getElementById(
      "p_name"
    ).innerHTML = `${userarr[index].fname} ${userarr[index].lname}`;

    document.getElementById(
      "fullname"
    ).innerHTML = `${userarr[index].fname} ${userarr[index].lname}`;

    for (let id of Object.keys(userarr[index])) {
      if (id == "email" || id == "num" || id == "add" || id == "country") {
        if (userarr[index][id]) {
          document.getElementById(id).innerHTML = `${userarr[index][id]}`;
        } else {
          document.getElementById(id).innerHTML = ``;
        }
      }
    }

    if (userarr[index].image)
      document.querySelector("#p_img").src = userarr[index].image;
  } else {
    location.replace("index.html");
  }
}

function profile_settings() {
  if (sessionStorage.getItem("id")) {
    document.body.style.display = "block";
    userarr = JSON.parse(localStorage.getItem("users"));
    let index = sessionStorage.getItem("id");

    document.querySelector(
      "#p_set_name"
    ).innerHTML = `${userarr[index].fname} ${userarr[index].lname}`;

    document.querySelector("#p_set_mail").innerHTML = `${userarr[index].email}`;

    for (let id of Object.keys(userarr[index])) {
      if (id != "email" && id != "pw" && id != "image") {
        if (userarr[index][id]) {
          document.getElementById(id).placeholder = userarr[index][id];
        }
      }
    }

    if (userarr[index].image)
      document.querySelector("#ch_img").src = userarr[index].image;
  } else {
    location.replace("index.html");
  }
}

function update_profile() {
  userarr = JSON.parse(localStorage.getItem("users"));
  let index = sessionStorage.getItem("id");

  for (let id of Object.keys(userarr[index])) {
    if (id != "email" && id != "pw" && id != "image") {
      if (document.getElementById(id).value) {
        userarr[index][id] = document.getElementById(id).value;
      }
    }
  }

  localStorage.setItem("users", JSON.stringify(userarr));
}

function change_image() {
  document.querySelector("#button_show").style.display = "block";

  let video = document.querySelector("#video");
  let click_button = document.querySelector("#click-photo");
  let canvas = document.querySelector("#canvas");
  let save_button = document.querySelector("#save_img");
  let retake_btn = document.querySelector("#retake");
  let img_data;

  start_cam();

  async function start_cam() {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
  }

  click_button.addEventListener("click", function () {
    document.querySelector("#video_area").style.display = "none";
    canvas.style.display = "block";
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    document.querySelector("#btn_save").style.display = "flex";
    let image_data_url = canvas.toDataURL("image/jpeg");

    // data url of the image
    img_data = image_data_url;
  });

  retake_btn.addEventListener("click", function () {
    document.querySelector("#video_area").style.display = "block";
    document.querySelector("#btn_save").style.display = "none";
    canvas.style.display = "none";
  });

  save_button.addEventListener("click", function () {
    if (img_data) {
      userarr[sessionStorage.getItem("id")].image = img_data;
    }
    localStorage.setItem("users", JSON.stringify(userarr));
    document.querySelector("#ch_img").src =
      userarr[sessionStorage.getItem("id")].image;
    location.reload();
  });
}

function destroy_session() {
  sessionStorage.clear();
}
