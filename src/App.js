import React, { Component } from 'react';
import './App.css';
import List from './List'

class App extends Component {
  static defaultProps = {
    // this is where the STORE is broken down into lists and allCards
    store: {
      lists: [],
      allCards: {},
    }
  };
  
  render () {
    // this.props is declared as store here. This makes it easier to write below.
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List 
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => (
                store.allCards[id]
              ))}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;