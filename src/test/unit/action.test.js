import Action from '../../redux/action'
import { expect } from 'chai'
import { fetchSpaces, postSpace } from '../../redux/action'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('action', () => {
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
    it('should post space when action is called', () => {
        //setup
        const space = {
            id: 1, name: 'Mario', memory_quotamb: 20, disk_quotamb: 5
        }
        fetchMock.post('/spaces', space)

        const expectedActions = [{ type: Action.ADD_SPACE, space: space }]
        const store = mockStore({ spaces: [], view: 'addSpace' })

        return store.dispatch(postSpace(space)).then(() => {
            expect(store.getActions()).to.eql(expectedActions)
            expect(fetchMock.called('/spaces')).to.be.true
        })

    })

})