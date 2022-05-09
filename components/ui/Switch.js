import React, { useState, useEffect } from 'react';
import { Switch as CustomSwitch } from 'react-native-switch';
import { STYLES as c } from '../../utils/constants';


export default function Switch(props) {
	const [isEnabled, setIsEnabled] = useState('defaultValue' in props ? props.defaultValue : false)

	const toggleSwitch = () => setIsEnabled(prevState => !prevState);

	useEffect(() => {
		props.onValueChange(isEnabled);
	}, [isEnabled]);

	return (
		<CustomSwitch 
			value={isEnabled}
			onValueChange={toggleSwitch}
			disabled={false}
			activeText={'activeText' in props ? props.activeText : ''}
			inActiveText={'inactiveText' in props ? props.inactiveText : ''}
			circleSize={26}
			barHeight={33}
			circleBorderWidth={0}
			backgroundActive={c.color.primaryColor}
			backgroundInactive={c.color.grey}
			circleActiveColor={c.color.lightGrey}
			circleInActiveColor={c.color.lightGrey}
			//renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
			changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
			innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
			outerCircleStyle={{}} // style for outer animated circle
			renderActiveText={true}
			renderInActiveText={true}
			switchLeftPx={5.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
			switchRightPx={5.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
			switchWidthMultiplier={2.5} // multiplied by the `circleSize` prop to calculate total width of the Switch
			switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
		/>
	);
}
