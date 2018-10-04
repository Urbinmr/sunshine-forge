import React from 'react';
import { shallow } from 'enzyme'
//import { expect } from 'chai'
import { Sidebar } from '../../components/Sidebar'

describe('Sidebar Component', () => {
    it('should have button with id addSpace', () => {
        const spaces = []
        const sideBar = shallow(<Sidebar spaces={spaces} fetchSpaces={() => { }} />)
        expect(sideBar.find('#showAddSpace')).toHaveLength(1)
    })

    it('should set the view when add space is clicked', () => {
        //setup
        const mySpy = jest.fn()
        const spaces = []
        const sidebar = shallow(<Sidebar showAddSpace={mySpy} spaces={spaces} fetchSpaces={() => { }} />)

        //exercise
        sidebar.find('#showAddSpace').simulate('click')

        //assert
        expect(mySpy).toHaveBeenCalled()
    })

    it('should list our spaces', () => {
        const spaces = [{ name: 'kevin', memory_quotamb: 10, disk_quotamb: 20 }, { name: 'spacey', memory_quotamb: 20, disk_quotamb: 42 }]
        const sidebar = shallow(<Sidebar spaces={spaces} fetchSpaces={() => { }} />)

        expect(sidebar.find('.spaceItem')).toHaveLength(2)
        sidebar.find('.spaceItem').forEach((item, i) => {
            expect(item.text()).toContain(spaces[i].name)
        })
    })

    it('should call initialize state method on mount', () => {
        const mySpaces = [{ name: 'space1' }, { name: 'spaceb' }]
        const mySpy = jest.fn(() => mySpaces)

        const sidebar = shallow(<Sidebar fetchSpaces={mySpy} spaces={[]} />)

        expect(mySpy).toHaveBeenCalled()
        // expect(sidebar.state().spaces).to.eql(mySpaces)
    })

    it('has clickable space items', () => {
        //setup
        const mySpaces = [{ name: 'space1' }]
        const mySpy = jest.fn()
        const sidebar = shallow(<Sidebar fetchSpaces={() => mySpaces} spaces={mySpaces} viewDetails={mySpy} />)
        const firstSpace = sidebar.find('.spaceItem').first()

        // execute
        firstSpace.simulate('click')

        //assert
        expect(mySpy).toHaveBeenCalled()
    })
})