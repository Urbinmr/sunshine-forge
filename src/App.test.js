import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import AddSpace from './components/AddSpace';

describe('Root App', () => {

  it('renders without crashing', () => {
    shallow(<App />)
    expect(1).toEqual(1)
  });

  it('renders the add space form with the proper view set', () => {
    const app = shallow(<App view="addSpace" />)
    expect(app.find(AddSpace)).toHaveLength(1)
  })

})
