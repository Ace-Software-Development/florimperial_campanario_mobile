import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { STYLES as c } from '../../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import CloseIcon from '../../assets/icons/close-btn.svg'

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
		if (props.size === 'large')
			localStyles.fontSize = 21
		else if (props.size === 'small')
			localStyles.fontSize = 18
		else 
			localStyles.fontSize = 20


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

	const preSave = async () => {
		if (activeOnce) {
			setActiveOnce(false);
			const condition = await props.onPress();
			if (!condition) {
				setActiveOnce(true);
			}
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
		let guestsCopy = [...props.guests];
		guestsCopy.splice(index, 1);
		props.setGuests(guestsCopy);
	}
	
	return (
        <View style={defaultStyles.guestContainer}>
            <View style={defaultStyles.guest}>
                <Icon name='user' size={20} style={defaultStyles.icon}/>
                {props.isPartner ?
					<P>{props.text} (socio)</P>
					:
					<P>{props.text}</P>
				}
            </View>
			<TouchableOpacity 
				style={defaultStyles.delete} 
				onPress={() => deleteGuest(props.index)}>
					<CloseIcon />
			</TouchableOpacity>
        </View>
    )
}
export function ReservationCard(props) {
	return (
		<View style={defaultStyles.reservCard} >
				<View style={defaultStyles.reservDetails}>
					<Text style={defaultStyles.reservModule}>{props.area}</Text>
					<Text style={defaultStyles.reservContext}>{props.sitio}</Text>
					<Text style={defaultStyles.reservHourText}>Hora</Text>
					<Text style={defaultStyles.reservHour}>{props.hour} Hrs</Text>
				</View>
				<View style={defaultStyles.reservDate}>
					<Text style={defaultStyles.month}>{props.month}</Text>
					<Text style={defaultStyles.day}>{props.day}</Text>
				</View>
			</View>

	);
}

export function TrainingCard(props) {
	return (
		<View style={defaultStyles.trainingCard} >
				<View style={defaultStyles.trainingDetails}>
					<Text style={defaultStyles.trainingModule}>{props.ejercicio}</Text>
					<Text style={defaultStyles.trainingContext}>Series: {props.series}	  			Repeticiones: {props.reps}</Text>
					{props.notas ? (
						<Text style={defaultStyles.trainingContext2}>Notas: {props.notas}</Text>
					) : null
					}
				</View>
		</View>

	);
}

export function ClinicaCard(props) {
	return (
		<View style={defaultStyles.reservCard} >
				<View style={defaultStyles.reservDetails}>
					<Text style={defaultStyles.reservModule}>{props.area}</Text>
					<Text style={defaultStyles.reservContext}>{props.sitio}</Text>
					<Text style={defaultStyles.reservHourText}>Hora</Text>
					<Text style={defaultStyles.reservHour}>{props.hour} Hrs</Text>
				</View>
				<View style={defaultStyles.reservDate}>
					{props.dias.LUNES ? <Text style={defaultStyles.dias}>LUN</Text> : null}
					{props.dias.MARTES ? <Text style={defaultStyles.dias}>MAR</Text> : null}
					{props.dias.MIERCOLES ? <Text style={defaultStyles.dias}>MIE</Text> : null}
					{props.dias.JUEVES ? <Text style={defaultStyles.dias}>JUE</Text> : null}
					{props.dias.VIERNES ? <Text style={defaultStyles.dias}>VIE</Text> : null}
					{props.dias.SABADO ? <Text style={defaultStyles.dias}>SAB</Text> : null}
				</View>
			</View>

	);
}


const defaultStyles = StyleSheet.create({
	
	title: {
		color: c.color.primaryColor,
		fontSize: RFPercentage(2.6),
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

	guestContainer: {
        backgroundColor: c.color.lightGrey,
        padding: 12,
        paddingLeft: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },

    guest: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    icon: {
        marginRight: 15,
        color: c.color.darkGrey
    },

	delete: {
		width: 25,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center'
	},
	
	reservCard: {
		marginVertical: 10,
		height: 140,
		width: "100%",
		marginBottom: 10
	}, 

	trainingCard: {
		marginVertical: 10,
		height: 180,
		width: "100%",
		marginBottom: 10
	}, 

	reservDetails: {
		paddingVertical: 10,
		paddingLeft: 15,
		backgroundColor: '#56738B',
		borderRadius: 10,
		height:  "100%",
	},

	trainingDetails: {
		paddingVertical: 10,
		paddingLeft: 15,
		backgroundColor: '#FAFAFA',
		borderRadius: 10,
		height:  "100%",
	},

	reservDate: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EBEBEB',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		position: 'absolute',
		right: 0,
		width: "25%", 
		paddingVertical: 5,
		height:  "100%",
	}, 

	reservModule: {
		color: 'white',
		fontSize: RFPercentage(2.6),
		fontWeight: 'bold',
		marginVertical: 3
	},

	trainingModule: {
		color: '#2B4066',
		fontSize: RFPercentage(2.6),
		fontWeight: 'bold',
		marginVertical: 3
	},

	reservContext: {
		color: 'white',
		fontSize: RFPercentage(2.2),
		marginVertical: 3,
	},

	trainingContext: {
		color: '#2B4066',
		fontSize: RFPercentage(2.2),
		marginVertical: 3,
		marginTop: 20
	},

	trainingContext2: {
		color: '#2B4066',
		fontSize: RFPercentage(2),
		marginVertical: 3,
		marginTop: 15,
		marginRight: 5
	},

	reservHourText: {
		color: '#D5D5D5',
		fontSize: RFPercentage(1.8),
		marginVertical: 3
	},

	reservHour: {
		color: 'white',
		fontSize: RFPercentage(2.4),
		marginVertical: 3
	},

	month: {
		fontSize: RFPercentage(2.8),
		color: c.color.primaryColor,
		textTransform: 'uppercase',
		includeFontPadding: false, 
	},

	day: {
		fontSize: RFPercentage(5.6),
		color: c.color.primaryColor,
		includeFontPadding: false,
	},

	dias: {
		fontSize: RFPercentage(2.4),
		color: c.color.primaryColor,
		textTransform: 'uppercase',
		includeFontPadding: false, 
	}
	
});
