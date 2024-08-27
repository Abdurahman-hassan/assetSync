import React from 'react';
import PropTypes from 'prop-types';
import { Puff } from 'react-loader-spinner';

const LoadingSpinner = ({ color = '#32e0c4', size = 50 }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Puff color={color} height={size} width={size} />
        </div>
    );
};

LoadingSpinner.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};

export default LoadingSpinner;
