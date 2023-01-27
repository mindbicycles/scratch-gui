import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    setProjectId
} from '../reducers/project-state';


/* Higher Order Component to control playlist of puzzles
 * @param {React.Component} WrappedComponent: component to render
 * @returns {React.Component} component with playlist behavior
 */
const PuzzlePlaylistHOC = function (WrappedComponent) {
    class PuzzlePlaylistComponent extends React.Component {
        constructor (props) {
            super(props);

        }
        componentDidMount () {
            console.log("componentDidMount playlist this.props.index:"+this.props.index);

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
        
            if(urlParams)
            {
                const playlistParam = urlParams.get('playlist');
                if(playlistParam)
                {
                    this.playlist = playlistParam.split(",");
                    console.log("this.playlist:"+this.playlist);
                    if(this.playlist && this.playlist.length > 0)
                    {
                        console.log("first playlist level:"+this.playlist[0]);

                        this.props.setProjectId(this.playlist[0]);
                    }
                }
            }
        }
        componentDidUpdate (prevProps) {

            console.log("playlist update prevProps.index:"+prevProps.index+"   new:"+this.props.index+"  playlistLength:"+this.playlist.length );
            if(this.playlist.length > this.props.index)
            {
                console.log("load level:"+this.playlist[this.props.index]);
                this.props.setProjectId(this.playlist[this.props.index]);
            }
        }

        /*
        componentDidUpdate (prevProps) {
            // if we are newly fetching a non-hash project...
            if (this.props.isFetchingWithoutId && !prevProps.isFetchingWithoutId) {
                // ...clear the hash from the url
                history.pushState('new-project', 'new-project',
                    window.location.pathname + window.location.search);
            }
        }
        componentWillUnmount () {
        }
                */

        render () {
            const {
                /* eslint-disable no-unused-vars */
                index,
                setProjectId: setProjectIdProp,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    {...componentProps}
                />
            );
        }
    }
    PuzzlePlaylistComponent.propTypes = {
        index: PropTypes.number,
        setProjectId: PropTypes.func,
    };
    const mapStateToProps = state => ({
        index: state.scratchGui.playlist,
    });
    const mapDispatchToProps = dispatch => ({
        setProjectId: projectId => {
            dispatch(setProjectId(projectId));
        }
    });
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(PuzzlePlaylistComponent);
};

export {
    PuzzlePlaylistHOC as default
};
