import { ADD_PLAYER, UPDATE_PLAYER } from './players.types';

    const INITIAL_STATE = {
        players:[]
    };

    const reducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case ADD_PLAYER:
               return {
                 ...state, players: [...state.players, action.payload],
               };
            case UPDATE_PLAYER:
                return Object.assign({}, state, {
                    players: state.players.map(item => {
                        return item.id === action.payload.id ? action.payload : item;
                    }) // replace matched item and returns the array 
                 }); 

             default: return state;
        }
    };

    export default reducer;