import React from 'react';
import { TouchableOpacity } from 'react-native';
import { P } from './CampanarioComponents';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { STYLES as c } from '../../utils/constants';

export function SimpleBtn(props) {
	return (
		<TouchableOpacity
			onPress={() => {}}>
			<P style={{color: c.color.contrastColor}} >Guardar</P>
		</TouchableOpacity>
	);
}