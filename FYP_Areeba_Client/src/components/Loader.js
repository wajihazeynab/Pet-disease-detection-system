import React from 'react';
import { ActivityIndicator } from 'react-native';
import * as colors from '../styles'

const Loader = ({style,size,color}) => {

    return (
        <ActivityIndicator
            size={size || 'small'}
            style={[{ padding: 1 }, style]}
            color={color || colors.SPINNER}
        />
    );
}


export default Loader;
