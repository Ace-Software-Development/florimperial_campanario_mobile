import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { STYLES as c } from '../../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export function Title(props) {
	const localStyles = {
		color: 'color' in props && props.color == 'light' ? c.color.lightBg : c.color.primaryColor,
		...props.style
	};
	return (
		<Text style={[defaultStyles.title, localStyles]}>
			{ props.children }
		</Text>
	);
}

export function Subtitle(props) {
	const localStyles = {
		color: 'color' in props && props.color == 'light' ? c.color.lightBg : c.color.darkGrey,
		...props.style
	};
	return (
		<Text style={[defaultStyles.subtitle, localStyles]}>
			{ props.children }
		</Text>
	);
}

export function P(props) {
	const localStyles = {
		color: 'color' in props && props.color == 'light' ? c.color.lightBg : c.color.darkGrey,
		...props.style
	};

	if ('size' in props)
		localStyles.fontSize = props.size === 'large' ? 21 : 20

	return (
		<Text style={[defaultStyles.p, localStyles]}>
			{ props.children }
		</Text>
	);
}

export function Btn(props) {
	const localStyles = {};
	return (
		<TouchableOpacity onPress={props.onPress} style={[defaultStyles.actionBtnContainer, localStyles]}>
			{ props.children }
		</TouchableOpacity>
	);
}

export function ActionBtn(props) {
	const textLocalStyles = {};
	const containerLocalStyles = { ...props.style };
	const [activeOnce, setActiveOnce] = useState(true);

	const preSave = () => {
		if(activeOnce){
			props.onPress();
			setActiveOnce(false);
		}
	}

	return (
		<TouchableOpacity onPress={preSave} style={[defaultStyles.actionBtnContainer, containerLocalStyles]}>
			<Text style={[defaultStyles.actionBtnText, textLocalStyles]}>
				{ props.title }
			</Text>
		</TouchableOpacity>
	);
}

export function ScreenContainer(props) {
	return (
		<View style={[defaultStyles.screenContainer, props.style]}>
			{ props.children }
		</View>
	);
}

export function ModuleCard(props) {
	return (
		<TouchableOpacity
			onPress={props.onPress}
		>
			<ImageBackground
				style={defaultStyles.cardImgBg}
				source={props.source}
				imageStyle={{ borderRadius: 10}}
			>
				<Subtitle color='light' style={defaultStyles.cardTitle}>
					{props.title}
				</Subtitle>
			</ImageBackground>
		</TouchableOpacity>
	);
}

export function AnnoucementCard(props) {
	return (
		<TouchableOpacity
			onPress={props.onPress}
		>
			<ImageBackground
				style={defaultStyles.cardImgBg}
				source={props.source}
				imageStyle={{ borderRadius: 10}}
			>
				<Text style={defaultStyles.cardTimestamp}>{ props.timeTitle }</Text>
				<Subtitle color='light' style={defaultStyles.smallCardTitle}>
					{props.title} 
				</Subtitle>
			</ImageBackground>
		</TouchableOpacity>
	);
}

export function Hr(props) {
	return (
		<View style={defaultStyles.hr} />
	);
}

export function Guests(props) {
    const deleteGuest = (index) => {
		let guestsCopy = [...props.guestsList];
		guestsCopy.splice(index, 1);
		props.deleteGuest(guestsCopy);
	}
	
	return (
        <View style={defaultStyles.item}>
            <View style={defaultStyles.itemLeft}>
                <Icon name='user' size={20} style={defaultStyles.icon}/>
                <P>{props.text}</P>
					<TouchableOpacity 
						style={defaultStyles.delete} 
						onPress={() => deleteGuest(props.index)}>
							<Icon name='trash' size={20}/>
					</TouchableOpacity>
            </View>
        </View>
    )
}

const defaultStyles = StyleSheet.create({
	
	title: {
		color: c.color.primaryColor,
		fontSize: RFPercentage(2.8),
		fontWeight: 'bold',
	},

	subtitle: {
		color: c.color.darkGrey,
		fontSize: RFPercentage(2.5),
		fontWeight: 'bold'
	},

	p: {
		color: c.color.darkGrey,
		fontSize: RFPercentage(2.1),
		fontWeight: 'normal'
	},

	actionBtnContainer: {
		backgroundColor: c.color.grey,
		width: '55%',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12
	},
	
	actionBtnText: {
		color: c.color.primaryColor,
		fontSize: RFPercentage(2.1),
		fontWeight: 'bold',
		alignSelf: 'center'
	},

	screenContainer: {
		paddingTop: '15%',
		paddingHorizontal: 20,
		flex: 1
	},

	cardImgBg: {
		marginVertical: 10,
		resizeMode: 'contain',
		height: 200,
		width: "100%"
	},

	cardTitle: {
		marginHorizontal: 20,
		position: 'absolute',
		bottom: 13,
		fontSize: RFPercentage(4),
	},

	smallCardTitle: {
		marginHorizontal: 20,
		position: 'absolute',
		bottom: 13,
		fontSize: 24
	},

	cardTimestamp: {
		fontSize: RFPercentage(1.7),
		color: c.color.darkGrey,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: '#EBEBEBBB',
		width: 100,
		height: 29,
		borderRadius: 10,
		position: 'absolute',
		right: 5,
		marginHorizontal: 10,
		marginTop: 10
	},

	hr: {
		borderWidth: 0.5,
		backgroundColor: c.color.darkGrey,
        borderColor: c.color.darkGrey,
        marginVertical: 10,
	},

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
    },

	delete: {
		backgroundColor: c.color.contrastColor
	}
});
