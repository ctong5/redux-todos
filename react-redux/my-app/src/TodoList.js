import React, { Component } from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.state = {
      task: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch({
      type: 'ADD_TODO',
      task: this.state.task
    });
    e.target.reset();
  }

  handleChange(e) {
    this.setState ({
      [e.target.name]: e.target.value
    });
  }

  removeTodo(id){
    this.props.dispatch({
      type: 'REMOVE_TODO',
      id,
    })
  }

  render() {
    let todos = this.props.todos.map((task, index) => {
      return (
        <Todo 
          // note: bug here if do not bind removeTodo to specific task id
          removeTodo={this.removeTodo.bind(this, task.id)} 
          task={task.task} 
          key={index} 
        />
      )
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='task'>Task</label>
          <input 
            type='text' 
            name='task' 
            id='task'
            onChange={this.handleChange}
          />
          <button>Add a Todo!</button>
        </form>
        <ul>{todos}</ul>
      </div>
    )
  }
};

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos,
  }
}

export default connect(mapStateToProps)(TodoList);

/* NOTE: flow of operations...
* Run createStore index.js using rootreducer
* Wrap React App in Provider, pass in store to App
* Connect Todolist to redux state with connect function, taking in mapStateToProps. Retrieve initialState
* Goes to reducer, gets that state, setting as component props
* Componenent renders
* Initially reduxState will be passed in as { todos: Array(0), id: 0 }, turn into props in react component
* Add a todo: changes react state, dispatch an action, goes back to rootreducer, changes redux state, back to mapstatetoprops, new state, render component
* Remove a todo: click button, dispatch an action, new redux state, mapstatetoprops, put new redux state on props, render component
*/