import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './share-button.css';

const NextLevelButton = ({
    className,
    onClick
}) => (
    <Button
        className={classNames(
            className,
            styles.shareButton,
        )}
        onClick={onClick}
    >
        {(
            "next >"
        ) }
    </Button>
);

NextLevelButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

NextLevelButton.defaultProps = {
    onClick: () => {}
};

export default NextLevelButton;
