import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from './components/Greeting.jsx'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//App (outer) component
//  (Since >= react-scripts@0.2.3 is used, no need to require('dotenv') for process.env.* to work)
//  (process.env.* will automatically pick up env vars overridden by the .env file)
class App extends React.Component {
  constructor(props) {
    super(props);
    
    //Initial state
    this.state = {
      body: { email: "", loggedIn: false },
      errors: []
    };
  }

  //Pre-render event
  componentDidMount() {
    //e.g. fetch("http://localhost:3001/user"...)
    //Note. Send user credentials (cookies, basic http auth, etc.) despite API receiving this 'cross-origin'
    fetch(process.env.REACT_APP_LOOKUP_ACTIVEUSER_URI, {
      credentials: 'include' 
    })
    .then(response => response.json())
    .then(response => this.setState(
      {
        body: response
      })
    );
  }

  validate = () => {
    const errors = [];

    if (document.getElementById("firstName").value.length < 1 || document.getElementById("firstName").value.length > 25) {
      errors.push("First Name is mandatory and must be <= 25 characters.");
    }

    return errors;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();

    if (errors.length == 0) {
      alert("Do something");
    }

    //Set or clear errors
    this.setState({ errors });
  }

  handleNewRegistration() {
    fetch('http://localhost:5000/registrations', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "userName": "smithj",
        "firstName": "John",
        "lastName": "Smith",
        "phoneNumber": "+44 20 7470 0000",
        "modelId": "1",
        "colourId": "2",
        "isAutomatic": "True",
      })
    });
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
    const { errors } = this.state;
    return (
      <div id='App' className="p-3">
        <header>
          <h1>MyAutoSite - Welcome!</h1>
          <Greeting body={this.state.body} />
          <a href="http://localhost:3001/logout">Logout</a>
        </header>
        <br />
        <div className="p-3">
          <form id="registrationForm" name="registrationForm" onSubmit={this.handleSubmit} noValidate>
            <input type="text" id="username" name="username" value={this.state.body.email} readOnly /><br/>

            <legend>Re-enter contact details</legend>

            <label for="firstName">First name:</label><br/>
            <input type="text" id="firstName" name="firstName" /><br/>

            <label for="lastName">Last name:</label><br/>
            <input type="text" id="lastName" name="lastName" /><br/>

            <label for="phoneNumber">Phone Number:</label><br/>
            <input type="text" id="phoneNumber" name="phoneNumber" /><br/>

            <br/>
            <label>Model</label><br/>

            <input type="radio" id="optionModelX" name="optionModelX" value="1" />
            <label for="optionModelX">&nbsp;Model X</label><br/>

            <input type="radio" id="optionModelY" name="optionModelY" value="2" />
            <label for="optionModelY">&nbsp;Model Y</label><br/>

            <input type="radio" id="optionModelZ" name="optionModelZ" value="3" />
            <label for="optionModelZ">&nbsp;Model Z</label><br/>

            <br/>
            <label>Colour</label><br/>

            <input type="radio" id="optionRed" name="optionRed" value="1" />
            <label for="optionRed">&nbsp;Red</label><br/>

            <input type="radio" id="optionGreen" name="optionGreen" value="2" />
            <label for="optionGreen">&nbsp;Green</label><br/>

            <input type="radio" id="optionBlue" name="optionBlue" value="3" />
            <label for="optionBlue">&nbsp;Blue</label><br/>

            <br/>
            <label>Automatic Drive?</label><br/>

            <input type="checkbox" id="isAutomatic" name="isAutomatic" value="1" />&nbsp;Yes<br/>
            <input type="checkbox" id="isAutomatic" name="isAutomatic" value="0" />&nbsp;No<br/>

            <br/>
            <input type="submit" value="Register" />

            <br/>
            {errors.map((error) => (
              <p key={error}>Error: {error}</p>
            ))}
          </form>
        </div>
      </div>    
    );
    }
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));