function valform(event) {
  event.preventDefault();

  var username = document.forms["frm"]["name"].value;
  var email = document.forms["frm"]["email"].value;
  var password = document.forms["frm"]["pass"].value;
  var passwordConfirm = document.forms["frm"]["cpass"].value;

  if (username === "" || email === "" || password === "" || passwordConfirm === "") {
    alert("Necessary fields cannot be empty!");
    return false;
  }
  if (password !== passwordConfirm) {
    alert("Password does not match!");
    return false;
  }

  recordata(username, email, password, passwordConfirm);
  return true;
}

function recordata(username, email, password, passwordConfirm) {
  const apiEndpoint = "http://127.0.0.1:8090/api/collections/users/records";

  const data = {
    "name": username,
    "email": email,
    "password": password,
    "passwordConfirm": password,
    "face": "ggwp" // Placeholder
  };

  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Signup Success:", data);
    localStorage.setItem('newUserId', data.id);
    alert("Signup successful! Now capture your photo.");
    window.location.href = "face.html";
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Error occurred during sign-up. Please try again.");
  });
}
