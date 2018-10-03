import reducer from '../../redux/reducer'
import { expect } from 'chai'
import ACTIONS, { setView, addSpace } from '../../redux/action'

describe('reducer', () => {
    it('should handle a default action', () => {
        const initialState = { state: 'initial' }

        const newState = reducer(initialState, {})

        expect(newState).to.equal(initialState)
    })

    it('should set view on props', () => {
        const initialState = { view: null }

        const newState = reducer(initialState, setView('view2'))

        expect(newState).to.eql({ view: 'view2' })
    })

    it('should add space to store', () => {
        const initialState = { spaces: [] }
        const space = { name: 'test' }
        const expectedState = {
            spaces: [space]
        }

        const newState = reducer(initialState, addSpace(space))

        expect(newState).to.eql(expectedState)
    })
})