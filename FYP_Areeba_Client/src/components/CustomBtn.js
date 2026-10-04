import {
    Text,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as colors from '../styles'
import Loader from './Loader';


const CustomBtn = ({ disabled, loading, title, onPress, btnStyle, titleStyle, border, loadingColor, activeOpacity }) => (
    <TouchableOpacity
        disabled={disabled}
        activeOpacity={activeOpacity ? activeOpacity : 0}
        onPress={onPress}
        style={{
            backgroundColor: disabled ? '#BDBDBD' : colors.APP_BTN_COLOR,
            borderWidth: border ? 1 : 0,
            borderColor: disabled ? '#BDBDBD ' : colors.APP_BTN_COLOR,
            width: '100%',
            height: 50,
            borderRadius: 5,
            justifyContent: 'center',
            // marginTop: SCREEN_HEIGHT * 0.04,
            ...btnStyle
        }}>
        {loading == true ? (
            <Loader color={loadingColor ? loadingColor : colors.APP_WHITE_COLOR} />
        ) : (
            <Text
                style={{
                    textAlign: 'center',
                    color: colors.APP_WHITE_COLOR,
                    fontSize: 18,
                    fontWeight: '700',
                    ...titleStyle,
                }}>
                {title}
            </Text>
        )}
    </TouchableOpacity>
)

export default CustomBtn