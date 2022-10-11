import React from 'react';

//Greeting (inner) component
export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    alert(JSON.stringify(this.props));
    let message = (this.props.body)
      ? `Hi ${this.props.body.email}!`
      : 'You\'re not logged in.';

    return (
      <span> {message} </span>
    );
  }
}
