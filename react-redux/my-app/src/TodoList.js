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
* Wrap App in Provider
* Connect Todolist to store
* Run createStore function in rootreducer.
* Retrieve initial state
* Pass in mapstatetoprops to connect, which is passing in initialstate. Goes to reducer, gets that state, setting as component props
* componenent renders
* initially reduxState will be passed in as { todos: Array(0), id: 0 }, turn into props in react component
*/