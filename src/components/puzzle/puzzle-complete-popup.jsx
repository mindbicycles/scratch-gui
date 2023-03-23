import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import VM from 'scratch-vm';
import Modal from '../../containers/modal.jsx';

import {connect} from 'react-redux';

import styles from '../prompt/prompt.css';
import Box from '../box/box.jsx';

import {
    incrementPlaylistIndex
} from '../../reducers/playlist';

//based on Prompt.jsx

class PuzzleCompletePopup extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOnCloseAlert',
            'onProjectRunStart',
            'onProjectRunStop',
            'onFrameUpdate',
        ]);
        this.state = {
            visible: false,
        };
        this.running = false;
        this.frameUpdateHandle;
        this.allGoalsAchievedVariable = undefined;
        this.props.vm.on('PROJECT_RUN_START', this.onProjectRunStart);
        this.props.vm.on('PROJECT_RUN_STOP', this.onProjectRunStop);
    }
    handleOnCloseAlert () {

        this.props.incrementPlaylistIndex();
        this.setState({visible: false});
    }

    onProjectRunStart(){
        //console.log("onProjectRunStart");
        this.running = true; 
        if(this.props.vm.runtime.targets.length > 0)
        {
            this.allGoalsAchievedVariable = Object.values(this.props.vm.runtime.getTargetForStage().variables).find(v => v.name == "_allGoalsAchieved");
        }
        else
        {
            this.allGoalsAchievedVariable = undefined;
        }

        if(this.allGoalsAchievedVariable !== undefined)
        {
            //start checking the value of the variable every frame
            this.frameUpdateHandle = requestAnimationFrame(this.onFrameUpdate);
        }
        else
        {
            console.error(" no global variable called _allGoalsAchieved found in the project. This puzzle can't run")
        }
    }

    onFrameUpdate(){
        //console.log("onFrameUpdate");
        if(this.allGoalsAchievedVariable)
        {
            if(this.allGoalsAchievedVariable.value == "true")
            {
                console.log("- - - -  onFrameUpdate allGoalsAchievedVariable:"+this.allGoalsAchievedVariable.value);
                this.setState({visible: true});

                //return early to avoid requestAnimationFrame and stop the update loop
                return;
            }
        }
    
        this.frameUpdateHandle = requestAnimationFrame(this.onFrameUpdate);
    }

    onProjectRunStop() {
        console.log("- - - -  onProjectRunStop");
        this.running = false; 
        cancelAnimationFrame(this.frameUpdateHandle);
    }

    componentWillUnmount () {
        this.props.vm.removeListener('PROJECT_RUN_START', this.onProjectRunStart);
        this.props.vm.removeListener('PROJECT_RUN_STOP', this.onProjectRunStop);
    }

    render () {
        // const {
        //     intl,
        // } = this.props;
        return (
            this.state.visible &&
            <Modal
                id={"PuzzleCompletePopup"}
                onRequestClose={this.handleOnCloseAlert}
                className={styles.modalContent}
                contentLabel={"Level Complete"}
            >
                <Box className={styles.body}>
                    <Box className={styles.label}>
                        {"Well Done!"}
                    </Box>
                    <Box className={styles.buttonRow}>
                        <button
                            className={styles.okButton}
                            onClick={this.handleOnCloseAlert}
                        >
                            Next
                        </button>
                    </Box>
                </Box>
            </Modal>
        );
    }
}



PuzzleCompletePopup.propTypes = {
    intl: intlShape.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired,
    incrementPlaylistIndex: PropTypes.func
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
});

const mapDispatchToProps = dispatch => ({
    incrementPlaylistIndex: () => dispatch(incrementPlaylistIndex())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(PuzzleCompletePopup));
