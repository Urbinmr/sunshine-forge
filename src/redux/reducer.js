import Actions from './action'

const initialState = {
    view: null,
    spaces: [],
    selectedSpace: null
}

const reducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case Actions.SET_VIEW:
            newState = JSON.parse(JSON.stringify(state))
            newState.view = action.view
            if (action.view === 'addSpace' || action.selectedSpace) {
                newState.selectedSpace = action.selectedSpace
            }
            return newState
        case Actions.ADD_SPACE:
            newState = JSON.parse(JSON.stringify(state))
            newState.spaces.push(action.space)
            newState.view = null
            return newState
        case Actions.FETCH_SPACES_COMPLETE: return { ...state, spaces: action.spaces }
        default: return state
    }
}

export default reducer