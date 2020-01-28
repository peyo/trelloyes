import React, { Component } from "react";
import "./App.css";
import List from "./List";
import STORE from "./STORE";

class App extends Component {
  state = {
    store: STORE
  };

  handleRandomCard(listId) {
    const newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      }
    }

    const newCard = newRandomCard();

    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
        return list;
    })
    console.log(newLists)

    this.setState({
      store: {
        ...this.state.store,
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  }

  handleDeleteCard(listId, cardId) {
    const cardList = this.state.store.lists.find(list => list.id === listId);
    const oldCardIds = cardList.cardIds

    //***get key of card from ID of card, which is a value
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
    const cardKey = getKeyByValue(oldCardIds, cardId);

    //***use key of card from above function
    function omit(obj, keyToOmit) {
      return Object.entries(obj).reduce(
        (newObj, [key, value]) =>
          key === keyToOmit ? newObj : { ...newObj, [key]: value },
        {}
      );
    }

    const newCardIdsA = omit(oldCardIds, cardKey);
    const newCardIdsB = Object.values(newCardIdsA);
    console.log('newCardIdsB', newCardIdsB);

    const newLists = this.state.store.lists.map(list => {
      if(list.id === listId) {
      return {
        ...list,
        // keep ids that do not match cardId
        cardIds: list.cardIds.filter(id => id !== cardId)
      };
    }
    return list;
    })
    console.log(newLists)
    
    this.setState({
      store: {
        ...this.state.store,
        lists: newLists
      },
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
              handleDeleteCard={(cardId) => this.handleDeleteCard(list.id, cardId)}
              handleRandomCard={() => this.handleRandomCard(list.id)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
