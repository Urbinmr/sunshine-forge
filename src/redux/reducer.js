import Actions from './action'

const initialState = {
    view: null,
    spaces: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_VIEW:
            return { ...state, view: action.view }
        case Actions.ADD_SPACE:
            const newState = JSON.parse(JSON.stringify(state))
            newState.spaces.push(action.space)
            return newState
        default: return state
    }
}

export default reducer