import React, { Component } from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';
import { addTodo, removeTodo } from './actionCreators';
import {Route} from 'react-router-dom'
import NewTodoForm from './NewTodoForm';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(val) {
    this.props.addTodo(val);
  }

  removeTodo(id){
    this.props.removeTodo(id);
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
        <Route path='/todos/new' component={props => (
          <NewTodoForm {...props} handleSubmit={this.handleAdd} />
        )} />

        <Route exact path='/todos' component= {() => <div>{todos}</div>} />
      </div>
    )
  }
};

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos,
  }
}

// function mapDispatchToProps(dispatch) {
//   // addTodo actionCreator
//   // removeTodo actionCreator
// }

export default connect(mapStateToProps, { addTodo, removeTodo })(TodoList);

/* 
NOTE: flow of operations...
* Run createStore index.js using rootreducer
* Wrap React App in Provider, pass in store to App
* Connect Todolist to redux state with connect function, taking in mapStateToProps. Retrieve initialState
* Goes to reducer, gets that state, setting as component props
* Componenent renders
* Initially reduxState will be passed in as { todos: Array(0), id: 0 }, turn into props in react component
* Add a todo: changes react state, dispatch an action, goes back to rootreducer, changes redux state, back to mapstatetoprops, new state, render component
* Remove a todo: click button, dispatch an action, new redux state, mapstatetoprops, put new redux state on props, render component
*/

/*
NOTE: Refactor with React Router
* Add react router, wrap browser router with provider
* 
* Remove new todo form from todolist
* 
*/