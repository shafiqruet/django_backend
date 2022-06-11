("use strict");
const e = React.createElement;

function App() {
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    country: "",
    city: "",
  });
  const [message, setMessage, errormessage, setErrorMessage] = React.useState("");

  const success = async (text) => {
    setMessage(text);
  };

  const failed = async (text) => {
    setErrorMessage(text);
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    await signup_api(state, success, failed, (text) => {
      setMessage(text);
    });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

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
      <div style={{ width: "800px", margin: "auto", marginTop: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
        <div style={{ margin: "1em", color: "green" }}>{message}</div>
        <div style={{ margin: "1em", color: "red" }}>{errormessage}</div>
        <form className="signup-form">
          <div className="mb-5">
            <label>
              First name
              <input type="text" name="first_name" className="form-control" value={state.first_name} onChange={handleChange} />
            </label>
          </div>
          <div className="mb-5">
            <label>
              Last name
              <input type="text" name="last_name" className="form-control" value={state.last_name} onChange={handleChange} />
            </label>
          </div>
          <div className="mb-5">
            <label>
              Email
              <input type="text" name="email" className="form-control" value={state.email} onChange={handleChange} />
            </label>
          </div>
          <div className="mb-5">
            <label>
              Phone
              <input type="text" name="phone" className="form-control" value={state.phone} onChange={handleChange} />
            </label>
          </div>
          <div className="mb-5">
            <label>
              Password
              <input type="password" name="password" className="form-control" value={state.password} onChange={handleChange} />
            </label>
          </div>
          <div className="mb-5">
            <label>
              Address
              <textarea value={state.address} name="address" className="form-control" onChange={handleChange} />
            </label>
          </div>
          <div className="mb-5">
            <label>
              City
              <input type="text" name="city" className="form-control" value={state.city} onChange={handleChange} />
            </label>
          </div>
          <div className="mb-5">
            <label>
              Country
              <input type="text" name="country" className="form-control" value={state.country} onChange={handleChange} />
            </label>
          </div>

          {/*  <div style={{ margin: "1em", color: "red" }}>{message}</div> */}
          <button type="submit" className="btn btn-primary" onClick={tryLogin}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

const domContainer = document.querySelector("#reactAppContainer");
ReactDOM.render(e(App), domContainer);
