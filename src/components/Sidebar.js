import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setView, fetchSpaces } from '../redux/action'

export class Sidebar extends Component {
    componentDidMount = async () => {
        await this.props.fetchSpaces()
    }

    render() {
        return (
            <div className="sidebar">
                <ul>
                    {this.props.spaces.map((space, index) => {
                        return <li className="spaceItem" key={index} onClick={() => this.props.viewDetails(space)}>
                            {space.name} 0%
                        </li>
                    })}
                </ul>
                <button id="showAddSpace" onClick={this.props.showAddSpace}> Add Space</button >
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { spaces: state.spaces }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAddSpace: () => dispatch(setView('addSpace', null)),
        fetchSpaces: () => dispatch(fetchSpaces()),
        viewDetails: (space) => dispatch(setView('spaceDetails', space)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
