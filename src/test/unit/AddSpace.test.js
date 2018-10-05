import React from 'react';
import { shallow } from 'enzyme'
import { AddSpace } from '../../components/AddSpace'

describe('Add Space Component', () => {
    it('should render AddSpace component', () => {
        const addSpace = shallow(<AddSpace />)
        expect(addSpace.find('h1').text()).toEqual('Create a new Space:')
        expect(addSpace.find('input')).toHaveLength(3)
        expect(addSpace.find('#addSpace')).toHaveLength(1)
    })

    it('adds a space', () => {
        //setup
        const mySpy = jest.fn()
        const addSpace = shallow(<AddSpace addSpace={mySpy} setDefaultView={jest.fn()} />)
        const newSpace = {
            name: 'mySpace',
            memory_quotamb: '20',
            disk_quotamb: '30'
        }
        addSpace.find('#name').simulate('change', { target: { name: 'name', value: newSpace.name } })
        addSpace.find('#memory').simulate('change', { target: { name: 'memory_quotamb', value: newSpace.memory_quotamb } })
        addSpace.find('#disk').simulate('change', { target: { name: 'disk_quotamb', value: newSpace.disk_quotamb } })

        //exercise
        addSpace.find('#addSpace').simulate('click')

        //assert
        expect(mySpy).toHaveBeenCalledWith(newSpace)
    })

    it('should display edit forms when edit view is enabled', () => {
        const space = {
            name: 'THE Name',
            memory_quotamb: 5,
            disk_quotamb: 10
        }
        const mySpy = jest.fn()
        const addSpace = shallow(<AddSpace selectedSpace={space} cancelEdit={mySpy} />)

        expect(addSpace.find('#editSpace')).toHaveLength(1)
        expect(addSpace.find('h1').text()).toEqual('Edit Space')
        expect(addSpace.state().space.name).toEqual(space.name)
        expect(addSpace.state().space.memory_quotamb).toEqual(space.memory_quotamb)
        expect(addSpace.state().space.disk_quotamb).toEqual(space.disk_quotamb)
        addSpace.find('#cancelEdit').simulate('click')

        expect(mySpy).toHaveBeenCalled()
    })

    it('should update space on details when edit space is clicked', () => {
        const space = {
            name: 'THE Name',
            memory_quotamb: 5,
            disk_quotamb: 10
        }
        const newSpace = {
            name: 'THE OTHER Name',
            memory_quotamb: 99,
            disk_quotamb: 30
        }
        const mySpy = jest.fn()
        const addSpace = shallow(<AddSpace selectedSpace={space} cancelEdit={() => { }} editSpace={mySpy} />)
        addSpace.setState({ space: newSpace })

        addSpace.find('#editSpace').simulate('click')

        expect(mySpy).toHaveBeenCalledWith(newSpace)
    })

})