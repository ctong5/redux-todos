// set initial state
// set rootreducer
// set actions so we can store.dispatch

let initialState = {
  count: 0,
}

// function rootReducer to create store
function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD TODO':
      // add a todo
    case 'REMOVE TODO':
      // remove a today
    default:
      return state;
  }
}

// create store
const store = Redux.createStore(rootReducer)

// on DOM load
$(document).ready(function() {

})