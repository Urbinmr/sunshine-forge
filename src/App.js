import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Actions from '../redux/actions'
import './App.css';
import Sidebar from './components/Sidebar'
import AddSpace from './components/AddSpace'

export class App extends Component {

  render() {
    const renderAddForm = () => this.props.view === 'addSpace' ? <AddSpace /> : <div class="main"></div>
    return (
      <div className="app">
        <Sidebar />
        {renderAddForm()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { view: state.view }
}

export default connect(mapStateToProps)(App);