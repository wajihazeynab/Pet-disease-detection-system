import React, { useState } from 'react';
import {

    StyleSheet,
    Text,
    View,

    TouchableOpacity,
} from 'react-native';
import { scale } from '../constants';
const Radiobtn = ({ selectedRadio, setSelectedradio }) => {
    const Category = [
        { id: 1, name: 'Pet Owner' },
        { id: 2, name: 'Vet' },


    ];

    return (
        <View style={styless.main}>
            {Category.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedradio(item.id)}>
                    <View style={styless.radiowrapper}>

                        <View style={styless.radio}>
                            {selectedRadio == item.id ? (
                                <View style={styless.radiobg}></View>
                            ) : null}
                        </View>
                        <Text style={styless.radiotxt}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};
const styless = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    radiowrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radio: {
        height: 15,
        width: 15,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        marginHorizontal: scale(10),
    },
    radiotxt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    radiobg: {
        backgroundColor: 'black',
        height: 8,
        width: 8,
        borderRadius: 20,
        alignSelf: 'center',

        marginTop: 1.5
    },
    // Con:{
    //     flexDirection:'row'
    // }
});
export default Radiobtn;