const createStore = require('redux').createStore;

function reducer(state = {a:0, b:0}, action) {
  switch (action.type) {
    case 'INCA':
      return Object.freeze({...state, a: state.a + 1})
    case 'INCB':
      return Object.freeze({...state, b: state.b + 1})
    default:
      return Object.freeze(state)
  }
}

let store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))

test_actions();
test_state_is_readonly();

function test_actions() {
  store.dispatch({ type: 'INC' })    // { a: 0, b: 0 }
  store.dispatch({ type: 'INCA' })   // { a: 1, b: 0 }
  store.dispatch({ type: 'INCB' })   // { a: 1, b: 1 }
}

// it's developer to ensure 'state must be immutable'?
// use Object.freeze()
function test_state_is_readonly() {
  let state = store.getState();
  console.log('before', store.getState())   // before { a: 0, b: 0 }
  state.a = 9;
  console.log('after', store.getState())    //  after { a: 9, b: 0 }
}