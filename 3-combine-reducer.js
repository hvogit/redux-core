const createStore = require('redux').createStore;

// {a: 1, b: 2}
function a(state = 0, action) {
  switch (action.type) {
    case 'INCA':
      return state + 1
    default:
      return state
  }
}
function b(state = 0, action) {
  switch (action.type) {
    case 'INCB':
      return state + 1
    default:
      return state
  }
}
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      const reducer = reducers[key];
      newState[key] = reducer(state[key], action); 
    }
    return newState;
  }; // {a: 0, b: 0}
}
// reducer ==> state
let reducer = combineReducers({a, b});  // {'a': ra, 'b': rb}
(state1, action) => state2

let store = createStore(reducer);
store.subscribe(() => console.log(store.getState()))

test_actions();

function test_actions() {
  store.dispatch({ type: 'xxx' })    // { a: 0, b: 0 }
  store.dispatch({ type: 'INCA' })   // { a: 1, b: 0 }
  store.dispatch({ type: 'INCB' })   // { a: 1, b: 1 }
}
