const A = {
    SET_VIEW: 'SET_VIEW',
    ADD_SPACE: 'ADD_SPACE',
    FETCH_SPACES_COMPLETE: 'FETCH_SPACES_COMPLETE'
}

export const setView = (view = null, selectedSpace = null) => {
    return { type: A.SET_VIEW, view, selectedSpace }
}

export const postSpace = (space) => {
    return async (dispatch) => {
        const res = await fetch('/spaces', {
            method: 'POST',
            body: JSON.stringify(space),
            headers: { "Content-Type": "application/json" },
        })
        const savedSpace = await res.json()
        dispatch(addSpace(savedSpace))
    }
}
export const addSpace = (space) => {
    return { type: A.ADD_SPACE, space }
}

export const fetchSpaces = () => {
    return async (dispatch) => {
        const res = await fetch('/spaces')
        const spaces = await res.json()
        dispatch(fetchSpacesComplete(spaces))
    }
}

export const fetchSpacesComplete = (spaces) => {
    return { type: A.FETCH_SPACES_COMPLETE, spaces }
}

export default A