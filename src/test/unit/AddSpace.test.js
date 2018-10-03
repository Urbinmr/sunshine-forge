import React from 'react';
import { shallow } from 'enzyme'
import { AddSpace } from '../../components/AddSpace'

describe('Add Space Component', () => {
    it('should render AddSpace component', () => {
        const addSpace = shallow(<AddSpace />)
        expect(addSpace.find('h1').text()).toEqual('Create a new Space:')
        expect(addSpace.find('input')).toHaveLength(3)
        expect(addSpace.find('#createSpace')).toHaveLength(1)
    })

    it('adds a space', () => {
        //setup
        const mySpy = jest.fn()
        const addSpace = shallow(<AddSpace addSpace={mySpy} setDefaultView={jest.fn()} />)
        const newSpace = {
            name: 'mySpace',
            memory: '20',
            disk: '30'
        }
        addSpace.find('#name').simulate('change', { target: { id: 'name', value: newSpace.name } })
        addSpace.find('#memory').simulate('change', { target: { id: 'memory', value: newSpace.memory } })
        addSpace.find('#disk').simulate('change', { target: { id: 'disk', value: newSpace.disk } })

        //exercise
        addSpace.find('#createSpace').simulate('click')

        //assert
        expect(mySpy).toHaveBeenCalledWith(newSpace)
    })

})