import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSpace, setView } from '../redux/action'

export class AddSpace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            processing: false,
            space: {
                name: '',
                memory: '',
                disk: ''
            }
        }
    }

    handleCreateSpace = () => {
        this.setState({ processing: true })

        this.props.addSpace(this.state.space)
        this.props.setDefaultView()
    }

    handleChange = (event) => {
        this.setState({ space: { ...this.state.space, [event.target.id]: event.target.value } })
    }

    render() {
        const button = this.state.processing
            ? <button id="createSpace" disabled="disabled" onClick={this.handleCreateSpace}>Create</button>
            : <button id="createSpace" onClick={this.handleCreateSpace}>Create</button>
        return (
            <div className="main">
                <h1>Create a new Space:</h1>
                <div>
                    Name:
                    <input onChange={this.handleChange} id="name" type="text" />
                </div>
                <div>
                    Memory:
                    <input onChange={this.handleChange} id="memory" type="text" />
                </div>
                <div>
                    Disk:
                    <input onChange={this.handleChange} id="disk" type="text" />
                </div>
                {button}

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSpace: (space) => dispatch(addSpace(space)),
        setDefaultView: () => dispatch(setView())
    }
}

export default connect(null, mapDispatchToProps)(AddSpace);
