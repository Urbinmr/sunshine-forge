import React from 'react'
import { shallow } from 'enzyme'
import { SpaceDetails } from '../../components/SpaceDetails'
//import { expect } from 'chai'

describe('SpaceDetails', () => {
    it('should be', () => {
        const details = shallow(<SpaceDetails selectedSpace={{}} />)
        expect(1).toEqual(1)
    })

    it('should display the selected space', () => {
        const space = { id: 2, name: "spaceName", memory_quotamb: 12, disk_quotamb: 90 }
        const details = shallow(<SpaceDetails selectedSpace={space} />)

        expect(details.find('h1').first().text()).toEqual(space.name)
        expect(details.find('.fa-pencil')).toHaveLength(1)
        const selected = details.find('dd')
        expect(selected.first().text()).toEqual(`0/${space.memory_quotamb}`)
        expect(selected.last().text()).toEqual(`0/${space.disk_quotamb}`)
        expect(details.find('h1').last().text()).toEqual('Apps')
        expect(details.find('#addApp')).toHaveLength(1)
    })

    it('should switch to edit view', () => {
        const mySpy = jest.fn()
        const details = shallow(<SpaceDetails viewEditPage={mySpy} selectedSpace={{}} />)
        details.find('#viewEditSpace').simulate('click')

        expect(mySpy).toHaveBeenCalled()
    })


    it('should display confirm delete when delete button is clicked', () => {
        const mySpy = jest.fn()
        const details = shallow(<SpaceDetails viewEditPage={() => { }} selectedSpace={{}} deleteSpace={mySpy} />)

        // stub the confirm method
        const oldConfirm = window.confirm
        window.confirm = () => true
        details.find('#deleteSpace').simulate('click')
        // restore confirm
        window.confirm = oldConfirm
        expect(mySpy).toHaveBeenCalled()
    })

    it('should click the add app button', () => {
        const mySpy = jest.fn()
        const details = shallow(<SpaceDetails selectedSpace={{}} viewAddApp={mySpy} />)
        details.find('#addApp').simulate('click')

        expect(mySpy).toHaveBeenCalled()
    })

})