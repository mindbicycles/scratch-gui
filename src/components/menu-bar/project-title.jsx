import classNames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './project-title.css';


const ProjectTitle = ({
    className,
    projectTitle
}) => (
    <div
        className={classNames(styles.title, className)}
        tabIndex="0"
    >{projectTitle}
    </div>
);

ProjectTitle.propTypes = {
    className: PropTypes.string,
    projectTitle: PropTypes.string
};

const mapStateToProps = state => ({
    projectTitle: state.scratchGui.projectTitle
});



export default connect(
    mapStateToProps,
)(ProjectTitle);
