const A = {
    SET_VIEW: 'SET_VIEW',
    ADD_SPACE: 'ADD_SPACE',
    FETCH_SPACES_COMPLETE: 'FETCH_SPACES_COMPLETE',
    EDIT_SPACE: 'EDIT_SPACE',
    DELETE_SPACE: 'DELETE_SPACE',
    ADD_APP: 'ADD_APP'
}

export const setView = (view = null, selectedSpace) => {
    return { type: A.SET_VIEW, view, selectedSpace }
}

export const addSpace = (space) => {
    return async (dispatch) => {
        const res = await fetch('/spaces', {
            method: 'POST',
            body: JSON.stringify(space),
            headers: { "Content-Type": "application/json" },
        })
        const savedSpace = await res.json()
        dispatch(addSpaceComplete(savedSpace))
    }
}

export const editSpace = (space) => {
    return async (dispatch) => {
        const res = await fetch('/spaces/' + space.id, {
            method: 'PATCH',
            body: JSON.stringify(space),
            headers: { "Content-Type": "application/json" },
        })
        const savedSpace = await res.json()
        dispatch(editSpaceComplete(savedSpace))
    }
}

export const deleteSpace = (id) => {
    return async (dispatch) => {
        const res = await fetch('/spaces/' + id, {
            method: 'DELETE'
        })
        dispatch(deleteSpaceComplete(id))
    }
}

export const fetchSpaces = () => {
    return async (dispatch) => {
        const res = await fetch('/spaces')
        const spaces = await res.json()
        dispatch(fetchSpacesComplete(spaces))
    }
}

export const addApp = (app) => {
    return async (dispatch) => {
        const res = await fetch('/apps', {
            method: 'POST',
            body: JSON.stringify(app),
            headers: { "Content-Type": "application/json" },
        })
        const savedApp = await res.json()
        dispatch(addAppComplete(savedApp))
    }
}

export const addSpaceComplete = (space) => {
    return { type: A.ADD_SPACE, space }
}

export const deleteSpaceComplete = (id) => {
    return { type: A.DELETE_SPACE, id: id }
}

export const editSpaceComplete = (space) => {
    return { type: A.EDIT_SPACE, space }
}

export const fetchSpacesComplete = (spaces) => {
    return { type: A.FETCH_SPACES_COMPLETE, spaces }
}

export const addAppComplete = (app) => {
    return { type: A.ADD_APP, app }
}

export default A