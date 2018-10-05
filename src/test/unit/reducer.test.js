import reducer from '../../redux/reducer'
import { expect } from 'chai'
import {
    setView,
    addSpaceComplete,
    editSpaceComplete,
    deleteSpaceComplete,
    fetchSpacesComplete,
    addAppComplete
} from '../../redux/action'

describe('reducer', () => {
    describe('Space stuff', () => {
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
            const newState = reducer(initialState, addSpaceComplete(space))

            //assert
            expect(newState).to.eql(expectedState)
        })

        it('should update store with edited space', () => {
            //setup
            const selectedSpace = { id: 456, name: 'test', memory_quotamb: 22, disk_quotamb: 33 }
            const initialState = { spaces: [selectedSpace], view: 'addState', selectedSpace: selectedSpace }
            const editedSpace = { id: 456, name: 'testUPDATED', memory_quotamb: 2, disk_quotamb: 3 }

            const expectedState = {
                view: 'spaceDetails',
                spaces: [editedSpace],
                selectedSpace: editedSpace
            }

            //exercise
            const newState = reducer(initialState, editSpaceComplete(editedSpace))

            //assert
            expect(newState).to.eql(expectedState)
        })

        it('should delete space', () => {
            //setup
            const selectedSpace = { id: 2, name: 'test', memory_quotamb: 22, disk_quotamb: 33 }
            const initialState = { spaces: [selectedSpace], view: 'spaceDetails', selectedSpace: selectedSpace }

            const expectedState = {
                view: null,
                spaces: [],
                selectedSpace: null
            }

            //exercise
            const newState = reducer(initialState, deleteSpaceComplete(selectedSpace.id))

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

    describe('app stuff', () => {
        it('should add app to store', () => {
            //setup
            const initialSpace = { id: 3 }
            const initialState = { view: 'addApp', selectedSpace: initialSpace, spaces: [initialSpace] }
            const app = { name: 'test' }
            const expectedSpace = { id: 3, apps: [app] }
            const expectedState = {
                view: 'spaceDetails',
                selectedSpace: expectedSpace,
                spaces: [expectedSpace]
            }

            //exercise
            const newState = reducer(initialState, addAppComplete(app))

            //assert
            expect(newState).to.eql(expectedState)
        })
    })
})