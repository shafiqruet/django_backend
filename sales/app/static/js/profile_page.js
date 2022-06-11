"use strict";
const e = React.createElement;

function App() {
  const [message, setMessage, errormessage, setErrorMessage] = React.useState("");

  const checkLogin = async (e) => {
    const token = await localStorage.getItem("userLogin");
    if (token == 0) {
      window.location = "login";
      return [];
    }
  };

  const failed = async (text) => {
    //console.log("Yeah! Authenticated!");
    setErrorMessage(text);
    //await localStorage.setItem("userId", text.access);
    //window.location = "/";
  };

  const success = async (text) => {
    setMessage(text);
    //console.log(text);
  };

  const fetchUserData = async (e) => {
    const userId = await localStorage.getItem("userId");
    await user_data_api(userId, success, failed, (text) => {
      setMessage(text);
    });
  };

  React.useEffect(() => {
    //checkLogin();
  });

  React.useEffect(() => {
    fetchUserData();
  }, []);
  //console.log(message);
  //console.log(setMessage);
  return (
    <div>
      <div style={{ maxWidth: "1000px", margin: "auto", marginTop: "10px", marginBottom: "1em", padding: "1em" }} className="shadow">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span>User Management App</span>
          <a className="btn btn-light" style={{ marginLeft: "auto" }} onClick={home}>
            Home
          </a>
          <a className="btn btn-light" style={{ marginLeft: "auto" }} onClick={orderPage}>
            Sales
          </a>
          <a className="btn btn-light" style={{ marginLeft: "auto" }} onClick={logout}>
            Logout
          </a>
        </div>
      </div>
      <div style={{ width: "1000px", margin: "auto", marginTop: "10px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
        <span className="user-info">User Information</span> <br /> <br />
        <div className="content-area">
          <span className="label-area">
            Name: {message.first_name} {message.last_name}
          </span>{" "}
          <br />
          <span className="label-area">Email: {message.email}</span>
          <br />
          <span className="label-area">Phone: {message.phone}</span>
          <br />
          <span className="label-area">Address: {message.address}</span>
          <br />
          <span className="label-area">City: {message.city}</span>
          <br />
          <span className="label-area">Country: {message.country}</span>
        </div>
      </div>
    </div>
  );
}

const domContainer = document.querySelector("#reactAppContainer");
ReactDOM.render(e(App), domContainer);
