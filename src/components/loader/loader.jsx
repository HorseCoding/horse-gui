import React from 'react';
import {intlShape, injectIntl} from 'react-intl';
import classNames from 'classnames';
import styles from './loader.css';
import PropTypes from 'prop-types';

class LoaderComponent extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div
                className={classNames(styles.background, {
                    [styles.fullscreen]: this.props.isFullScreen
                })}
            >
                <div className={styles.container}>
                    <div className={classNames("ld", "ld-ring", "ld-cycle")}></div>
                </div>
            </div>
        );
    }
}

LoaderComponent.propTypes = {
    isFullScreen: PropTypes.bool,
    intl: intlShape.isRequired,
    messageId: PropTypes.string
};
LoaderComponent.defaultProps = {
    isFullScreen: false
};

export default injectIntl(LoaderComponent);
