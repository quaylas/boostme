import { useReducer } from 'react';

import {
    UPDATE_DONATIONS,
    UPDATE_BENEFACTORS,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
    switch (action.type){
        case UPDATE_DONATIONS:
            return {
                ...state,
                donations: [...action.donations]
            };

        case UPDATE_BENEFACTORS:
            return {
                ...state,
                benefactors: [...action.benefactors]
            };
        
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.donation]
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.donations]
            };

        case REMOVE_FROM_CART: 
            let newState = state.cart.filter(donation => {
                    return donation._id !==action.id;
                });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}