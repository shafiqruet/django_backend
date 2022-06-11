const logout = async (e) => {
  await localStorage.setItem("userLogin", 0);
  window.location = "/";
};

const home = async (e) => {
  window.location = "/";
};

const signup = async (e) => {
  window.location = "/signup";
};

const orderPage = async (e) => {
  window.location = "/orderPage";
};

const signup_api = async (formData, success, failed, fail) => {
  console.log(formData);
  const response = await fetch(`/api/signup/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const text = await response.text();
  if (response.status === 200) {
    //console.log("success", JSON.parse(text));
    success("Rgister is completed successfully.");
  } else {
    failed("There is a problem to signup process");
  }
};

const login_api = async (username, password, success, fail) => {
  const response = await fetch(`/api/token/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const text = await response.text();
  if (response.status === 200) {
    console.log("success", JSON.parse(text));
    success(JSON.parse(text));
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};

const user_login_api = async (formData, success, failed, fail) => {
  const response = await fetch(`/api/login/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const text = await response.text();

  if (response.status === 200) {
    //console.log("success", text.data);
    console.log("success", JSON.parse(text).data);
    if (JSON.parse(text).data.id) {
      success(JSON.parse(text).data);
    } else {
      failed("There is a problem to signup process");
    }
  } else {
    failed("There is a problem to signup process");
  }
};

const user_data_api = async (userId, success, failed, message) => {
  const response = await fetch(`/api/user_data/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON",
    },
  });
  const text = await response.text();

  if (response.status === 200) {
    //console.log("success", text.data);
    if (JSON.parse(text).data.id) {
      success(JSON.parse(text).data);
    } else {
      failed("There is a problem to signup process");
    }
  } else {
    failed("There is a problem to signup process");
  }
};

const get_orders_api = async (pageNo = "", success, fail) => {
  const token = await localStorage.getItem("userLogin");
  //console.log(token);
  if (token == 0) {
    console.log("No credentials found, redirecting...");
    window.location = "";
    return [];
  }
  const response = await fetch(`/api/orders/?page_no=${pageNo}`, {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON",
    },
  });
  const text = await response.text();
  if (response.status === 401) {
    console.log("Token not valid");
    window.location = "";
    return [];
  }
  if (response.status === 200) {
    console.log("success", JSON.parse(text));
    success(JSON.parse(text));
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};

const post_order_api = async (data, success) => {
  const token = await localStorage.getItem("userLogin");
  if (token == 0) {
    console.log("No credentials found, redirecting...");
    window.location = "/";
    return [];
  }
  const response = await fetch(`/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(data),
  });
  const text = await response.text();
  if (response.status === 401) {
    console.log("Token not valid");
    window.location = "";
    return [];
  }
  if (response.status === 201) {
    console.log("success", JSON.parse(text));
    success(JSON.parse(text));
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};

const put_order_api = async (saleId, data, success) => {
  const token = await localStorage.getItem("userLogin");
  if (token == 0) {
    console.log("No credentials found, redirecting...");
    window.location = "";
    return [];
  }
  const response = await fetch(`/api/orders/${saleId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(data),
  });
  const text = await response.text();
  if (response.status === 401) {
    console.log("Token not valid");
    window.location = "";
    return [];
  }
  if (response.status === 200) {
    console.log("success", JSON.parse(text));
    success(JSON.parse(text));
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};

const delete_order_api = async (saleId, success) => {
  const token = await localStorage.getItem("userLogin");
  if (token == 0) {
    console.log("No credentials found, redirecting...");
    window.location = "";
    return [];
  }
  const response = await fetch(`/api/orders/${saleId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/JSON",
    },
  });
  const text = await response.text();
  if (response.status === 401) {
    console.log("Token not valid");
    window.location = "";
    return [];
  }
  console.log(response.status);
  if (response.status === 410) {
    console.log("success", JSON.parse(text));
    success(JSON.parse(text));
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};
