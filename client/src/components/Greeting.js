import React from 'react';

// Greeting (inner) component
export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message = (this.props.body)
      ? `Welcome back ${this.props.body.email}!`
      : 'You\'re not logged in.';

    return (
      <span> {message} </span>
    );
  }
}
