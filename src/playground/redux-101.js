import React from 'react'
import { createStore, combineReducers } from 'redux';

const expenses = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + action.by
            };
        default:
            return state;
    }
}

const filter = (state = {text: "", startDate: undefined, endDate: undefined}, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const store = createStore(combineReducers(
    {
        expenses,
        filter
    }
));

store.subscribe(() => console.log(store.getState()))

const increment = (by) => ({ type: 'INCREMENT', by})

store.dispatch(increment(3))

console.log(store.getState())

function redux() {
    return (
        <div>
            
        </div>
    )
}

export default redux
