import Actions from './action'

const initialState = {
    view: null,
    spaces: [],
    selectedSpace: null,
}

const reducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case Actions.SET_VIEW:
            newState = JSON.parse(JSON.stringify(state))
            newState.view = action.view
            if (action.selectedSpace === null || action.selectedSpace) {
                newState.selectedSpace = action.selectedSpace
            }
            return newState
        case Actions.ADD_SPACE:
            newState = JSON.parse(JSON.stringify(state))
            newState.spaces.push(action.space)
            newState.view = null
            return newState
        case Actions.EDIT_SPACE:
            return {
                ...state,
                view: 'spaceDetails',
                selectedSpace: action.space,
                spaces: state.spaces.map(s => s.id === action.space.id ? action.space : s)
            }
        case Actions.DELETE_SPACE:
            return {
                ...state,
                view: null,
                selectedSpace: null,
                spaces: state.spaces.filter(s => s.id !== action.id)
            }
        case Actions.ADD_APP:
            const newSelectedSpace = JSON.parse(JSON.stringify(state.selectedSpace))
            newSelectedSpace.apps = newSelectedSpace.apps || []
            newSelectedSpace.apps.push(action.app)
            return {
                ...state,
                selectedSpace: newSelectedSpace,
                view: 'spaceDetails',
                spaces: state.spaces.map((space) => space.id === newSelectedSpace.id ? newSelectedSpace : space)
            }
        case Actions.FETCH_SPACES_COMPLETE: return { ...state, spaces: action.spaces }
        default: return state
    }
}

export default reducer