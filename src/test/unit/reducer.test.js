import reducer from '../../redux/reducer'
import { expect } from 'chai'
import { setView, addSpace, fetchSpacesComplete } from '../../redux/action'

describe('reducer', () => {
    it('should handle a default action', () => {
        const initialState = { state: 'initial' }

        const newState = reducer(initialState, {})

        expect(newState).to.equal(initialState)
    })

    it('should set view on props', () => {
        const initialState = { view: null, selectedSpace: null }
        const expectedState = { view: 'view2', selectedSpace: null }

        const newState = reducer(initialState, setView(expectedState.view))

        expect(newState).to.eql(expectedState)
    })

    it('should set details view and state id on props', () => {
        const space = {
            name: 'spaceName',
            memory: '25',
            disk: '10'
        }
        const initialState = { view: null, selectedSpace: null }

        const newState = reducer(initialState, setView('view2', space))

        expect(newState).to.eql({ view: 'view2', selectedSpace: space })
    })

    it('should add space to store', () => {
        //setup
        const initialState = { spaces: [], view: 'addState' }
        const space = { name: 'test' }
        const expectedState = {
            view: null,
            spaces: [space]
        }

        //exercise
        const newState = reducer(initialState, addSpace(space))

        //assert
        expect(newState).to.eql(expectedState)
    })

    it('should receive a list of spaces', () => {
        // setup

        const initialState = { spaces: [] }
        const newSpaces = [{ name: 'space1' }, { name: 'otherspace' }]
        const expectedState = { spaces: newSpaces }

        //exercise
        const newState = reducer(initialState, fetchSpacesComplete(newSpaces))

        //assert
        expect(newState).to.eql(expectedState)
    })
})