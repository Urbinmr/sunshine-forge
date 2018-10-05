import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSpace, setView, editSpace } from '../redux/action'

export class AddSpace extends Component {
    constructor(props) {
        super(props)
        const space = this.props.selectedSpace || {
            name: '',
            memory_quotamb: '',
            disk_quotamb: ''
        }
        this.state = {
            processing: false,
            space
        }
    }

    setProcessing = () => {
        this.setState({ processing: true })
        setTimeout(this.setState({ processing: false }), 4000)
    }
    handleAddSpace = () => {
        this.setProcessing()
        this.props.addSpace(this.state.space)
    }
    handleEditSpace = () => {
        this.setProcessing()
        this.props.editSpace(this.state.space)
    }

    handleChange = (event) => {
        this.setState({ space: { ...this.state.space, [event.target.name]: event.target.value } })
    }

    render() {
        const editMode = Boolean(this.props.selectedSpace)
        const renderActionButton = () => {
            const id = editMode ? 'editSpace' : 'addSpace'
            const handler = editMode ? this.handleEditSpace : this.handleAddSpace
            const buttonText = editMode ? 'Update' : 'Create'
            return this.state.processing
                ? <button id={id} disabled="disabled" onClick={handler}>{buttonText}</button>
                : <button id={id} onClick={handler}>{buttonText}</button>
        }
        const renderCancelButton = () => {
            return editMode ? <button id="cancelEdit" onClick={this.props.cancelEdit}>Cancel</button> : ''
        }
        const { space } = this.state
        return (
            <div className="main">
                <h1>{editMode ? 'Edit Space' : 'Create a new Space:'}</h1>
                <div>
                    Name:
                    <input onChange={this.handleChange} value={space.name} id="name" name="name" type="text" />
                </div>
                <div>
                    Memory:
                    <input onChange={this.handleChange} value={space.memory_quotamb} id="memory" name="memory_quotamb" type="number" step="1" />
                </div>
                <div>
                    Disk:
                    <input onChange={this.handleChange} value={space.disk_quotamb} id="disk" name="disk_quotamb" type="number" step="1" />
                </div>
                {renderActionButton()}
                {renderCancelButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { selectedSpace: state.selectedSpace }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSpace: (space) => dispatch(addSpace(space)),
        cancelEdit: () => dispatch(setView('spaceDetails')),
        editSpace: (space) => dispatch(editSpace(space))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpace);
