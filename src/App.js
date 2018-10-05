import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Actions from '../redux/actions'
import './App.css';
import Sidebar from './components/Sidebar'
import AddSpace from './components/AddSpace'
import SpaceDetails from './components/SpaceDetails'
import AddApp from './components/AddApp'
//import AppDetails from './components/AppDetails'

export class App extends Component {

  render() {
    const renderMain = () => {
      switch (this.props.view) {
        case 'addSpace':
          return <AddSpace />
        case 'addApp':
          return <AddApp />
        case 'spaceDetails':
          return <SpaceDetails />
        default:
          return <div className="main" />
      }
    }
    return (
      <div className="app">
        <Sidebar />
        {renderMain()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { view: state.view }
}

export default connect(mapStateToProps)(App);