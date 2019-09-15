import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ['Eat', 'Sleep', 'Rave', 'Repeat'],
    };
  }

  render() {
    let todos = this.state.todos.map((task, index) => {
      return (
        <Todo task={task} key={index} />
      )
    });

    return (
      <div>
        <ul>
        {todos}
        </ul>
      </div>
    )
  }
};

export default TodoList;