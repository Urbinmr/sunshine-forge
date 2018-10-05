import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { App } from './App'
import AddSpace from './components/AddSpace'
import SpaceDetails from './components/SpaceDetails'
import AddApp from './components/AddApp'

describe('Root App', () => {

  it('renders without crashing', () => {
    const app = shallow(<App />)
    expect(app).to.exist
  });

  it('renders the add space form with the proper view set', () => {
    const app = shallow(<App view="addSpace" />)
    expect(app.find(AddSpace)).to.have.length(1)
  })

  it('should render space details when space item is clicked', () => {
    const app = shallow(<App view="spaceDetails" selectedSpace="1" />)
    expect(app.find(SpaceDetails)).to.have.length(1)
  })

  it('should render an add app form', () => {
    const app = shallow(<App view="addApp" selectedSpace={{}} />)
    expect(app.find(AddApp)).to.have.length(1)
  })

})
