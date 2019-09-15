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
      // add a todo
      debugger;
      return state;
    case 'REMOVE_TODO':
      // remove a today
    default:
      return state;
  }
}

// create store
const store = Redux.createStore(rootReducer)

// on DOM load
$(document).ready(function() {
  // when form is submited, dispatch "ADD_TODO" (send action to reducer). Note you can see action, type in chrome debugger if add debugger in reducer
  // grab form and trigger reset event to clear form values
  $('form').on('submit', function(event){
    event.preventDefault();
    let newTask = $('#task').val();
    store.dispatch({
      type: 'ADD_TODO',
      task: newTask,
    });
    $('form').trigger('reset');
  })
})