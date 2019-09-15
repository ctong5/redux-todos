import React, { Component } from 'react';

const Todo = ({ task, removeTodo }) => {
  return (
    <li>
      {task}
      <button onClick={removeTodo}>X</button>
    </li>
  )
};

export default Todo;