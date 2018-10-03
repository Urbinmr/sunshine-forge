const A = {
    SET_VIEW: 'SET_VIEW',
    ADD_SPACE: 'ADD_SPACE'
}

export const setView = (view = null) => {
    return { type: A.SET_VIEW, view }
}

export const addSpace = (space) => {
    return { type: A.ADD_SPACE, space }
}

export default A