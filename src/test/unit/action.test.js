import Action from '../../redux/action'
import { expect } from 'chai'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
    fetchSpaces,
    addSpace,
    editSpace,
    deleteSpace,
    addApp
} from '../../redux/action'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('space actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
    it('should fetch spaces when action is called', () => {
        //setup
        const initialSpaces = [
            {
                name: 'Madame Bovary',
                memory_quotamb: 30,
                disk_quotamb: 15
            },
            {
                name: 'Mario',
                memory_quotamb: 20,
                disk_quotamb: 5
            }
        ]
        fetchMock.getOnce('/spaces', initialSpaces)

        const expectedActions = [{ type: Action.FETCH_SPACES_COMPLETE, spaces: initialSpaces }]
        const store = mockStore({ spaces: [] })

        return store.dispatch(fetchSpaces()).then(() => {
            expect(store.getActions()).to.eql(expectedActions)
        })

    })
    it('should create a space when action is called', () => {
        //setup
        const space = {
            id: 1, name: 'Mario', memory_quotamb: 20, disk_quotamb: 5
        }
        fetchMock.post('/spaces', space)

        const expectedActions = [{ type: Action.ADD_SPACE, space: space }]
        const store = mockStore({ spaces: [], view: 'addSpace' })

        return store.dispatch(addSpace(space)).then(() => {
            expect(store.getActions()).to.eql(expectedActions)
            expect(fetchMock.called('/spaces')).to.be.true
        })
    })

    it('should edit a space', () => {
        const initialSpace = {
            id: 1, name: 'Space Odyssey', memory_quotamb: 15, disk_quotamb: 2
        }
        const finalSpace = {
            id: 1, name: 'Final Frontier', memory_quotamb: 21, disk_quotamb: 6
        }
        fetchMock.patch('/spaces/1', finalSpace)

        const expectedActions = [{ type: Action.EDIT_SPACE, space: finalSpace }]
        const store = mockStore({ spaces: [initialSpace], view: 'addSpace', selectedSpace: initialSpace })

        return store.dispatch(editSpace(finalSpace)).then(() => {
            expect(store.getActions()).to.eql(expectedActions)
            expect(fetchMock.called('/spaces/1')).to.be.true
        })

    })

    it('should delete a space', () => {
        const space = {
            id: 1, name: 'Space Odyssey', memory_quotamb: 15, disk_quotamb: 2
        }
        fetchMock.delete('/spaces/1', 200)

        const expectedActions = [{ type: Action.DELETE_SPACE, id: space.id }]
        const store = mockStore({ spaces: [space], view: 'spaceDetails', selectedSpace: space })

        return store.dispatch(deleteSpace(space.id)).then(() => {
            expect(store.getActions()).to.eql(expectedActions)
            expect(fetchMock.called('/spaces/1')).to.be.true
        })

    })
})

describe('app actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
    it('should add apps', () => {
        //setup
        const app = {
            name: 'Luigi', memory_allocationmb: 20, disk_allocationmb: 5, space_id: 2
        }
        fetchMock.post('/apps', app)

        const expectedActions = [{ type: Action.ADD_APP, app }]
        const store = mockStore({ apps: [], view: 'addApp' })

        return store.dispatch(addApp(app)).then(() => {
            expect(store.getActions()).to.eql(expectedActions)
            expect(fetchMock.called('/apps')).to.be.true
        })
    })
})
