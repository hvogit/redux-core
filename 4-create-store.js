// const createStore = require('redux').createStore;

function createStore(reducer, initialState) {
	let state = initialState;
	const listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);  // run thru all switch's cases of all reducers
		listeners.forEach(listener => listener()); // trigger all listeners,
		// enhancement: listen on a reducer or an action only?
	}

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {  // unsubscribe
			listeners = listeners.filter(l => l !== listener)
		}
	}

	dispatch({}); // initialize store with empty state

	return { getState, dispatch, subscribe }
}

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      const reducer = reducers[key];
      newState[key] = reducer(state[key], action);
    }
    return newState;
  };
}

// ------------------------------------------------------

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

let reducer = combineReducers({a, b});  // {'a': a, 'b': b}
let store = createStore(reducer);
store.subscribe(() => console.log(store.getState()))

test_actions();

function test_actions() {
  store.dispatch({ type: 'INC' })    // { a: 0, b: 0 }
  store.dispatch({ type: 'INCA' })   // { a: 1, b: 0 }
  store.dispatch({ type: 'INCB' })   // { a: 1, b: 1 }
}
