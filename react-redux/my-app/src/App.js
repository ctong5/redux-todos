import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <h1>See Our Todos!</h1>
        <TodoList />
      </div>
    );
  }
}

export default App;
