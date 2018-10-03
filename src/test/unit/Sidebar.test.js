import React from 'react';
import { shallow } from 'enzyme'
//import { expect } from 'chai'
import { Sidebar } from '../../components/Sidebar'

describe('Sidebar Component', () => {
    it('should have button with id addSpace', () => {
        const spaces = []
        const sideBar = shallow(<Sidebar spaces={spaces} />)
        expect(sideBar.find('#showAddSpace')).toHaveLength(1)
    })

    it('should set the view when add space is clicked', () => {
        //setup
        const mySpy = jest.fn()
        const spaces = []
        const sidebar = shallow(<Sidebar showAddSpace={mySpy} spaces={spaces} />)

        //exercise
        sidebar.find('#showAddSpace').simulate('click')

        //assert
        expect(mySpy).toHaveBeenCalledWith('addSpace')
    })

    it('should list our spaces', () => {
        const spaces = [{ name: 'kevin', memory: 'mymem', disk: '20%' }, { name: 'spacey', memory: 'myotherMem', disk: 42 }]
        const sidebar = shallow(<Sidebar spaces={spaces} />)

        expect(sidebar.find('.spaceItem')).toHaveLength(2)
        sidebar.find('.spaceItem').forEach((item, i) => {
            expect(item.text()).toContain(spaces[i].name)
            expect(item.text()).toContain(spaces[i].memory)
            expect(item.text()).toContain(spaces[i].disk)
        })
    })
})