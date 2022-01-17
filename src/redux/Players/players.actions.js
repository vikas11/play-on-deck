import { ADD_PLAYER, UPDATE_PLAYER } from './players.types';

export const addPlayer = (payload) => {
    return {
        type: ADD_PLAYER,
        payload: payload
    };
};

export const updatePlayer = (payload) => {
    return {
        type: UPDATE_PLAYER,
        payload: payload
    };
};