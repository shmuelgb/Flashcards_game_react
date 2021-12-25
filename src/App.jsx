import React, { Component } from "react";
import data from "./data";
import Card from "./Components/Card";
import "./App.css";

export default class App extends Component {
  state = {
    deck: data,
    shownCards: [],
    completed: 0,
    progression: null,
  };

  componentDidMount = () => {
    this.setState({ progression: this.state.deck.length });
    console.log(this.state.deck);
  };

  shuffle = () => {
    const deck = this.state.deck;
    const newDeck = [];
    while (newDeck.length < deck.length) {
      const index = Math.floor(Math.random() * deck.length);
      if (!newDeck.includes(deck[index])) {
        newDeck.push(deck[index]);
        console.log(index);
      }
    }
    console.log("newDeck", newDeck);
  };

  render() {
    return (
      <div>
        <button onClick={this.shuffle}>shuffle</button>
      </div>
    );
  }
}
