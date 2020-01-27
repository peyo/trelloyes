import React, { Component } from "react";
import "./App.css";
import List from "./List";
import STORE from "./STORE";

class App extends Component {
  state = {
    store: STORE
  };

  handleDeleteCard(listIndex, cardId) {
    const oldCardIds = this.state.store.lists[listIndex].cardIds;

    // get key of card from ID of card, which is a value
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
    const map = this.state.store.lists[listIndex].cardIds;
    const cardKey = getKeyByValue(map, cardId);

    // use key of card from above function
    function omit(obj, keyToOmit) {
      return Object.entries(obj).reduce(
        (newObj, [key, value]) =>
          key === keyToOmit ? newObj : { ...newObj, [key]: value },
        {}
      );
    }

    const newCardIdsA = omit(oldCardIds, cardKey);
    const newCardIdsB = Object.values(newCardIdsA);

    this.setState({
      store: {
        lists: [
          this.state.store.lists[listIndex].cardIds = newCardIdsB
        ]
      }
    })
  }

  render() {
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {this.state.store.lists.map((list, index) => (
            <List
              key={list.id}
              id={list.id}
              index={index}
              header={list.header}
              cards={list.cardIds.map(id => this.state.store.allCards[id])}
              onDeleteCard={cardId => this.handleDeleteCard(index, cardId)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
