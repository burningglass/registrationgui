import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from './components/Greeting.jsx'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// App (outer) component
//  (Since >= react-scripts@0.2.3 is used, no need to require('dotenv') for process.env.* to work)
//  (process.env.* will automatically pick up env vars overridden by the .env file)
//
class App extends React.Component {
  constructor(props) {
    super(props);
    
    //Initial state
    this.state = {
      body: { email: "", loggedIn: false },
      models: [],
      colours: [],
      errors: [],
      records: [],
    };
  }

  // Pre-render event
  componentDidMount() {
    // e.g. fetch("http://localhost:3001/user"...)
    // Note. Send user credentials (cookies, basic http auth, etc.) despite API receiving this 'cross-origin'
    //
    fetch(process.env.REACT_APP_LOOKUP_ACTIVEUSER_URI, {
      credentials: 'include' 
    })
    .then(response => response.json())
    .then(response => this.setState(
      {
        body: response
      })
    );

    //e.g. fetch("http://localhost:3001/models"...)
    //
    fetch(process.env.REACT_APP_MODELS_URI)
    .then(response => response.json())
    .then(response => this.setState(
      {
        models: response
      })
    );

    //e.g. fetch("http://localhost:3001/colours"...)
    //
    fetch(process.env.REACT_APP_COLOURS_URI)
    .then(response => response.json())
    .then(response => this.setState(
      {
        colours: response
      })
    );
  }

  // Return any validation errors
  //
  validate = async() => {
    var errors = [];

    var modelId = this.selectValue("modelId");
    var colourId = this.selectValue("colourId");

    //e.g. await fetch('http://localhost:3001/validationErrors')
    //
    const response = await fetch(process.env.REACT_APP_VALIDATION_ERRORS_URI, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userName": document.getElementById("userName").value,
          "firstName": document.getElementById("firstName").value,
          "lastName": document.getElementById("lastName").value,
          "phoneNumber": document.getElementById("phoneNumber").value,
          "modelId": modelId,
          "colourId": colourId,
        })
      })
    .then(response => response.json())
    .then(response => errors = response)

    return errors;
  }

  // Return the DropDown value where it is checked/set
  //
  selectValue = (name) => {
    var els = document.getElementsByName(name);

    for (var i = 0; i < els.length; i++) {
      if (els[i].checked) {
        return els[i].value;
      }
    }

    return -1;
  }

  // Clear any checked/set radio inputs
  //
  clearOptions = (name) => {
    var els = document.getElementsByName(name);

    for (var i = 0; i < els.length; i++) {
      if (els[i].checked) {
        els[i].checked = false;
      }
    }
  }

  // Clear all form fields
  //
  clearInputs = () => {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phoneNumber").value = "";

    this.clearOptions("modelId");
    this.clearOptions("colourId");

    document.getElementById("isAutomatic").checked = false;
  }

  // Submit data (e.g. validate and write registration record)
  //
  handleSubmit = async(event) => {
    event.preventDefault();

    const errors = await this.validate();

    if (errors.length == 0) {
      var modelId = this.selectValue("modelId");
      var colourId = this.selectValue("colourId");
      var isAutomatic = false;

      if (document.getElementById("isAutomatic").checked) {
        isAutomatic = true;
      }

      const response = await fetch('http://localhost:3001/registrations', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userName": document.getElementById("userName").value,
          "firstName": document.getElementById("firstName").value,
          "lastName": document.getElementById("lastName").value,
          "phoneNumber": document.getElementById("phoneNumber").value,
          "modelId": modelId,
          "colourId": colourId,
          "isAutomatic": isAutomatic,
        })
      });

      this.clearInputs();

      if (response.status == 201) {
        alert ('Registration submitted successfully');

        const response = await fetch('http://localhost:3001/registrations', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "userName": document.getElementById("userName").value,
          })
        })
        .then(response => response.json())
        .then(response => this.setState(
          {
            records: response
          })
        );
      } else {
        alert ('Error occurred submitting registration');
      }
    }

    //Set or clear errors
    this.setState({ errors });
  }

  //Render event
  render() {
    if (!this.state.body.loggedIn) {
    return (
      <div id='App' className="p-3">
        <header>
          <h1>MyAutoSite - Welcome!</h1>
          <p>Please register an account by calling our Sales +44 20 7000 0000</p>
          <a href="http://localhost:3001/login">Login</a>        
        </header>
      </div>
    );
    }
    else
    {
    const { errors, records, models, colours } = this.state;
    return (
      <div id='App' className="p-3">
        <header>
          <h1>MyAutoSite - Welcome!</h1>
          <Greeting body={this.state.body} />
          <a href="http://localhost:3001/logout">Logout</a>
        </header>
        <div className="p-3">
          <form id="registrationForm" name="registrationForm" onSubmit={this.handleSubmit} noValidate>
            <input type="hidden" id="userName" name="userName" value={this.state.body.email} readOnly /><br/>

            <legend>Register Customer's Interest</legend>

            <label htmlFor="firstName">First name:</label><br/>
            <input type="text" id="firstName" name="firstName" /><br/>

            <label htmlFor="lastName">Last name:</label><br/>
            <input type="text" id="lastName" name="lastName" /><br/>

            <label htmlFor="phoneNumber">Phone Number:</label><br/>
            <input type="text" id="phoneNumber" name="phoneNumber" /><br/>

            <br/>
            <label>Model</label><br/>

            {models.map((model) => (
              <span><input type='radio' name='modelId' value={model.modelId} />&nbsp;{model.modelName}<br/></span>
            ))}

            <br/>
            <label>Colour</label><br/>

            {colours.map((colour) => (
              <span><input type='radio' name='colourId' value={colour.colourId} />&nbsp;{colour.colourName}<br/></span>
            ))}

            <br/>
            <input type="checkbox" id="isAutomatic" name="isAutomatic" />&nbsp;Automatic Drive?<br/>

            <br/>
            <input type="submit" value="Register" />

            <br/><br/>
            {errors.map((error) => (
              <p key={error}>Error: {error}</p>
            ))}
          </form>
        </div>
        <legend>Customer Interest Registrations</legend>
        <div className="p-3">
          <table class="table">
          <thead>
              <tr>
                <td>User Name</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Phone Number</td>
                <td>Model</td>
                <td>Colour</td>
                <td>Automatic?</td>
              </tr>
          </thead>
          <tbody>
          {records.map((record) => (
              <tr>
                <td>{record.userName}</td>
                <td>{record.firstName}</td>
                <td>{record.lastName}</td>
                <td>{record.phoneNumber}</td>
                <td>{record.modelId}</td>
                <td>{record.colourId}</td>
                <td>{record.isAutomatic == true ? "Y" : "N"}</td>
              </tr>
          ))}
          </tbody>
          </table>
        </div>
      </div>    
    );
    }
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));