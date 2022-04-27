import React from 'react';
import { StyleSheet, View } from 'react-native';
import { P } from './CampanarioComponents';
import { STYLES as c } from '../../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Guests(props) {
    return (
        <View style={style.item}>
            <View style={style.itemLeft}>
                <Icon name='user' size={20} style={style.icon}/>
                <P>{props.text}</P>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    item: {
        backgroundColor: c.color.lightGrey,
        padding: 12,
        paddingLeft: 20,
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
    icon: {
        marginRight: 15,
        color: c.color.darkGrey
    }
});
