import React from 'react';

// Greeting (inner) component
export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message = (this.props.body)
      ? `Welcome back ${this.props.body.userName}!`
      : 'You\'re not logged in.';

    return (
      <span> {message} </span>
    );
  }
}
