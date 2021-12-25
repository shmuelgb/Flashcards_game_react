import React, { Component } from "react";

export default class Card extends Component {
  state = { type: "q", card: this.props.card };

  componentDidUpdate = (prevProps) => {
    if (prevProps.card !== this.props.card) {
      this.setState({ card: this.props.card });
    }
  };

  renderContent = () => {
    if (this.state.card) {
      if (this.state.type === "q") {
        return <div>{this.state.card.q}</div>;
      } else {
        return <div>{this.state.card.a}</div>;
      }
    }
  };

  handleAnswer = () => {
    this.setState({ type: "a" });
  };

  handleCheckAnswer = (e, answer) => {
    this.props.handleCheckAnswer(answer);
    this.handleNext();
  };

  handleNext = () => {
    this.props.handleNext();
    this.setState({ type: "q" });
  };

  renderCheckAnswer = () => {
    return (
      <div>
        <p>Did u get it right?</p>
        <button onClick={(e) => this.handleCheckAnswer(e, true)}>Yes</button>
        <button onClick={this.handleCheckAnswer}>No</button>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderContent()}
        <button onClick={this.handleNext}>New Card</button>
        <button onClick={this.handleAnswer}>Reveal Answer</button>
        {this.state.type === "a" && this.renderCheckAnswer()}
        Completed: {this.props.answers}/4
      </div>
    );
  }
}
