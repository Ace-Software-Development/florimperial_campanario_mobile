import React from 'react';
import { StyleSheet, View } from 'react-native';
import { P } from './CampanarioComponents';
import { STYLES as c } from '../../utils/constants';

export default function Guests(props) {
    return (
        <View style={style.item}>
            <View style={style.itemLeft}>
                <P>{props.text}</P>
            </View>
            <View style={style.itemDelete}>

            </View>
        </View>
    )
}

const style = StyleSheet.create({
    item: {
        backgroundColor: c.color.lightGrey,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    itemDelete: {
        width: 12,
        height: 12,
        borderWidth: 2,
        borderRadius: 10
    },
});