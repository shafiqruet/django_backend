"use strict";
const e = React.createElement;

function App() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [message, setMessage, errormessage, setErrorMessage] = React.useState("");

  const success = async (text) => {
    await localStorage.setItem("userLogin", 1);
    await localStorage.setItem("userId", text.id);
    window.location = "/profile";
  };

  const userLogin = async (e) => {
    e.preventDefault();
    await user_login_api(state, success, failed, (text) => {
      setMessage(text);
    });
  };

  const failed = async (text) => {
    setErrorMessage(text);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const checkLogin = async (e) => {
    const token = await localStorage.getItem("userId");
    if (token != 0) {
      console.log("No credentials found, redirecting...");
      window.location = "/profile";
      return [];
    }
  };

  React.useEffect(() => {
    //checkLogin();
  });

  return (
    <div>
      <div style={{ maxWidth: "1000px", margin: "auto", marginTop: "50px", marginBottom: "1em", padding: "1em" }} className="shadow">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <a className="btn btn-light" style={{ marginLeft: "auto" }} onClick={home}>
            Home
          </a>
          <a className="btn btn-light" style={{ marginLeft: "auto" }} onClick={signup}>
            Signup
          </a>
        </div>
      </div>
      <div style={{ width: "500px", margin: "auto", marginTop: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
        <div style={{ margin: "1em", color: "green" }}>{message}</div>
        <div style={{ margin: "1em", color: "red" }}>{errormessage}</div>
        <form>
          <div className="mb-3">
            <label>
              Email
              <input type="text" name="email" className="form-control" value={state.email} onChange={handleChange} />
            </label>
          </div>
          <div className="mb-3">
            <label>
              Password
              <input type="password" name="password" className="form-control" value={state.password} onChange={handleChange} />
            </label>
          </div>

          <button type="submit" className="btn btn-primary" onClick={userLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const domContainer = document.querySelector("#reactAppContainer");
ReactDOM.render(e(App), domContainer);
