// set initial state
// set rootreducer
// set actions so we can store.dispatch

let initialState = {
  todos: [],
  id: 0,
}

// function rootReducer to create store
function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO':
      var newState = { ...state }; // make a copy of state to keep pure function, not overwriting state
      newState.id++; // increment id of newState
      return {
        ...newState, // 
        todos: [...newState.todos,  {task: action.task, id: newState.id }], // includes whatever todos plus new todo and id
      };
    case 'REMOVE_TODO':
      // again, make copy of todos to keep function pure
      let todos = state.todos.filter(todo => todo.id !== +action.id);
      return { ...state, todos };
    default:
      return state;
  }
}

// create store
const store = Redux.createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// on DOM load
$(document).ready(function() {
  $('ul').on('click', 'button', function(event){
    store.dispatch({
      type: "REMOVE_TODO",
      id: $(event.target).attr('id'),
    });

    $(event.target).parent().remove() // remove parent list item of x button
  })
  // when form is submited, dispatch "ADD_TODO" (send action to reducer). Note you can see action, type in chrome debugger if add debugger in reducer
  // grab form and trigger reset event to clear form values
  $('form').on('submit', function(event){
    event.preventDefault();
    let newTask = $('#task').val();
    store.dispatch({
      type: 'ADD_TODO',
      task: newTask,
    });

    let currentState = store.getState();

    let $newLi = $('<li>', {
      text: newTask
    });

    let $newButton = $('<button>', {
      text: 'X',
      id: currentState.id,
    })

    $newLi.append($newButton);
    $('#todos').append($newLi);
    $('form').trigger('reset');
  })
})