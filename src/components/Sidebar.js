import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setView } from '../redux/action'

export class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <ul>
                    {this.props.spaces.map((space, index) => {
                        return <li className="spaceItem" key={index}>{space.name} {space.memory} {space.disk}</li>
                    })}
                </ul>
                <button id="showAddSpace" onClick={() => { this.props.showAddSpace('addSpace') }}> Add Space</button >
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { spaces: state.spaces }
}

const mapDispatchToProps = (dispatch) => {
    return { showAddSpace: (view) => dispatch(setView(view)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
