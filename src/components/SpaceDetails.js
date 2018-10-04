import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setView } from '../redux/action'

export class SpaceDetails extends Component {
    render() {
        return (
            <div className="spaceDetails main" >

                <div className="app">
                    <h1>{this.props.selectedSpace.name}</h1>
                    <i id="viewEditSpace" className="fa fa-2x fa-pencil" onClick={() => this.props.viewEditPage(this.props.selectedSpace)}></i>
                </div>
                <hr />
                <dl>
                    <dt>Memory</dt>
                    <dd>0/{this.props.selectedSpace.memory_quotamb}</dd>
                    <dt>Disk</dt>
                    <dd>0/{this.props.selectedSpace.disk_quotamb}</dd>
                </dl>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return { selectedSpace: state.selectedSpace }
}


const mapDispatchToProps = (dispatch) => {
    return {
        viewEditPage: (space) => dispatch(setView('addSpace', space))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SpaceDetails);