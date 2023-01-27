const SET_INDEX = 'scratch-gui/playlist/SET_INDEX';
const INCREMENT_INDEX = 'scratch-gui/playlist/INCREMENT_INDEX';

const initialState = 0;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_INDEX:
        return action.index;
    case INCREMENT_INDEX:
        return state+1;
    default:
        return state;
    }
};
const setPlaylistIndex = newIndex => ({
    type: SET_INDEX,
    index: newIndex
});

const incrementPlaylistIndex = () => ({
    type: INCREMENT_INDEX,
});

export {
    reducer as default,
    initialState as playlistInitialState,
    setPlaylistIndex,
    incrementPlaylistIndex,
};
