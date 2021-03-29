export const initialState = {
    user: null,
    friends: [],
    rooms: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            };
        case "SET_FRIENDS":
            return {
                ...state,
                friends:[...action.friends]
            };
        case "SET_ROOMS":
            return {
                ...state,
                rooms:[...action.rooms]
            };
        case "GET_All_MESSAGES":
            return {
                ...state,
                messages: [...action.messages]
            };
        default:
            return state;
    }
}

export default reducer;