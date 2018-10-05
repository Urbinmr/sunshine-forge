import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setView, deleteSpace } from '../redux/action'

export class SpaceDetails extends Component {
    handleDeleteSpace = () => {
        if (window.confirm('Do you really want to delete this Space?'))
            this.props.deleteSpace(this.props.selectedSpace.id)
    }

    render() {
        return (
            <div className="spaceDetails main" >

                <div className="app">
                    <h1>{this.props.selectedSpace.name}</h1>
                    <i id="viewEditSpace" className="fa fa-2x fa-pencil" onClick={() => this.props.viewEditPage(this.props.selectedSpace)}></i>
                    <i id="deleteSpace" className="fa fa-2x fa-trash" onClick={() => this.handleDeleteSpace()}></i>
                </div>
                <hr />
                <dl>
                    <dt>Memory</dt>
                    <dd>0/{this.props.selectedSpace.memory_quotamb}</dd>
                    <dt>Disk</dt>
                    <dd>0/{this.props.selectedSpace.disk_quotamb}</dd>
                </dl>
                <h1>Apps</h1>
                {this.props.selectedSpace.apps ?
                    this.props.selectedSpace.apps.map(a => <div>{a.name}</div>)
                    : ''}

                <button id="addApp" onClick={this.props.viewAddApp}>Add App</button>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return { selectedSpace: state.selectedSpace }
}


const mapDispatchToProps = (dispatch) => {
    return {
        viewEditPage: (space) => dispatch(setView('addSpace', space)),
        deleteSpace: (id) => dispatch(deleteSpace(id)),
        viewAddApp: () => dispatch(setView('addApp'))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SpaceDetails);