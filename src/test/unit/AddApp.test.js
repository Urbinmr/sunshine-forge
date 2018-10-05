import React from 'react';
import { shallow } from 'enzyme'
import { AddApp } from '../../components/AddApp'

describe('Add App Component', () => {
    it('should render AddApp component', () => {
        const addApp = shallow(<AddApp selectedSpace={{}} />)
        expect(addApp.find('h1').text()).toEqual('Create a new App:')
        expect(addApp.find('input')).toHaveLength(3)
        expect(addApp.find('#addApp')).toHaveLength(1)
    })

    it('should click create app button', () => {
        //setup
        const mySpy = jest.fn()
        const addApp = shallow(<AddApp addApp={mySpy} selectedSpace={{ id: 5 }} />)
        const newApp = {
            name: 'myApp',
            memory_allocationmb: '20',
            disk_allocationmb: '30',
            space_id: 5
        }
        addApp.find('#name').simulate('change', { target: { name: 'name', value: newApp.name } })
        addApp.find('#memory').simulate('change', { target: { name: 'memory_allocationmb', value: newApp.memory_allocationmb } })
        addApp.find('#disk').simulate('change', { target: { name: 'disk_allocationmb', value: newApp.disk_allocationmb } })

        //exercise
        addApp.find('#addApp').simulate('click')

        //assert
        expect(mySpy).toHaveBeenCalledWith(newApp)
    })
})