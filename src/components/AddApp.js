import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addApp } from '../redux/action'

export class AddApp extends Component {
    constructor(props) {
        super(props)
        const app = this.props.selectedApp || {
            name: '',
            memory_allocationmb: '',
            disk_allocationmb: ''
        }
        app.space_id = this.props.selectedSpace.id
        this.state = {
            processing: false,
            app
        }
    }

    setProcessing = () => {
        this.setState({ processing: true })
        setTimeout(this.setState({ processing: false }), 4000)
    }
    handleAddApp = () => {
        this.setProcessing()
        this.props.addApp(this.state.app)
    }

    handleChange = (event) => {
        this.setState({ app: { ...this.state.app, [event.target.name]: event.target.value } })
    }

    render() {
        const editMode = Boolean(this.props.selectedApp)
        const renderActionButton = () => {
            const id = editMode ? 'editApp' : 'addApp'
            const handler = editMode ? this.handleEditApp : this.handleAddApp
            const buttonText = editMode ? 'Update' : 'Create'
            return this.state.processing
                ? <button id={id} disabled="disabled" onClick={handler}>{buttonText}</button>
                : <button id={id} onClick={handler}>{buttonText}</button>
        }
        const renderCancelButton = () => {
            return editMode ? <button id="cancelEdit" onClick={this.props.cancelEdit}>Cancel</button> : ''
        }
        const { app } = this.state
        return (
            <div className="main">
                <h1>{editMode ? 'Edit App' : 'Create a new App:'}</h1>
                <div>
                    Name:
                    <input onChange={this.handleChange} value={app.name} id="name" name="name" type="text" />
                </div>
                <div>
                    Memory:
                    <input onChange={this.handleChange} value={app.memory_allocationmb} id="memory" name="memory_allocationmb" type="number" step="1" />
                </div>
                <div>
                    Disk:
                    <input onChange={this.handleChange} value={app.disk_allocationmb} id="disk" name="disk_allocationmb" type="number" step="1" />
                </div>
                {renderActionButton()}
                {renderCancelButton()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        selectedSpace: state.selectedSpace
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addApp: (app) => dispatch(addApp(app))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddApp)