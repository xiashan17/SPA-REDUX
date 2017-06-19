// import { createStore } from 'redux'

var redux = require('redux');
var createStore = redux.createStore;


const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};


let store = createStore(reducer)


let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
unsubscribe();

const actions = [
    { type: 'ADD', payload: 0 },
    { type: 'ADD', payload: 1 },
    { type: 'ADD', payload: 2 }
];

const total = actions.reduce(reducer, 0); // 3

console.log(total);