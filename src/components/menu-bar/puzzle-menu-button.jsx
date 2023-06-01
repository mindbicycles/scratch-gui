import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './puzzle-menu-button.css';

const PuzzleMenuButton = ({
    className,
    onClick,
    text
}) => (
    <Button
        className={classNames(
            className,
            styles.puzzleMenuButton,
        )}
        onClick={onClick}
    >
        {text}
    </Button>
);

PuzzleMenuButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

PuzzleMenuButton.defaultProps = {
    onClick: () => {}
};

export default PuzzleMenuButton;
