import config from "../config.json";

const handleExpectedError = (response) => {
  if (!response.ok) {
    throw new Error("Server error: Error code " + response.status + "!");
  }
  return response;
};

export async function register(username, password, name) {
  let status = "";
  const obj = {
    username: username,
    password: password,
    data: { name: name },
  };
  console.log(obj);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const apiEndpoint = config.apiEndpoint + "/register";

  await fetch(apiEndpoint, requestOptions)
    .then((response) => {
      handleExpectedError(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error === "false") {
        return;
      } else {
        status = "Register error";
      }
    })
    .catch((error) => {
      status = error.message;
      return;
    });
  return status;
}

export async function login(username, password) {
  let status = "";
  const obj = {
    username: username,
    password: password,
  };
  console.log(obj);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  const apiEndpoint = config.apiEndpoint + "/login";

  await fetch(apiEndpoint, requestOptions)
    .then((response) => {
      handleExpectedError(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error === "false") {
        localStorage.setItem("token", data.token);
        window.location = "/";
      } else {
        status = "Login error";
      }
    })
    .catch((error) => {
      status = error.message;
      return;
    });
  return status;
}
