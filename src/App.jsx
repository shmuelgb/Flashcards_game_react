import React, { Component } from "react";
import data from "./data";
import Card from "./Components/Card";
import "./App.css";

export default class App extends Component {
  state = {
    deck: null,
    shownCards: [],
    completed: 0,
    progression: null,
    answers: 0,
    win: null,
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    this.setState({ deck: data }, () => {
      this.setState({ progression: this.state.deck.length });
      this.shuffle();
    });
  };

  shuffle = () => {
    const deck = this.state.deck;
    const newDeck = [];
    while (newDeck.length < deck.length) {
      const index = Math.floor(Math.random() * deck.length);
      if (!newDeck.includes(deck[index])) {
        newDeck.push(deck[index]);
      }
    }
    console.log("newDeck:", newDeck);
  };

  handleDelete = (id) => {
    const updatedDeck = this.state.deck.filter((card) => card.id !== id);
    this.setState({ deck: updatedDeck });
  };

  handleNext = () => {
    this.setState({ progression: this.state.progression - 1 });
    this.checkGameProgression();
  };

  handleCheckAnswer = (answer) => {
    if (answer) {
      this.setState({ answers: this.state.answers + 1 });
    }
  };

  checkGameProgression = () => {
    if (this.state.progression >= 0 && this.state.answers < 3) {
      return true;
    } else if (this.state.progression < 0) {
      this.setState({ win: "lose" });
      return false;
    } else if (this.state.answers >= 3) {
      this.setState({ win: "win" });
      return false;
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.shuffle}>shuffle</button>
        {this.state.deck && (
          <Card
            handleNext={this.handleNext}
            handleCheckAnswer={this.handleCheckAnswer}
            card={this.state.deck[this.state.progression - 1]}
            answers={this.state.answers}
          />
        )}
        {this.state.win === "lose" && <h1>You lost :(</h1>}
        {this.state.win === "win" && <h1>You won! :)</h1>}
      </div>
    );
  }
}
