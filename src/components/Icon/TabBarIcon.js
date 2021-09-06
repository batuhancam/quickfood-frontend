import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as React from 'react';
export default function TabBarIcon(props) {
    console.log(props)
    return (  <MaterialCommunityIcons
        name={props.name}
        size={30}
        style={{ marginRight: 0 }}
        color={props.focused ? props.focused.color : props.focused.color}
    />
    );
}