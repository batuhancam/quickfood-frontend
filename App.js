import React, { Component } from "react";
import {
    KeyboardAvoidingView,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    StatusBar,
    Platform
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './src/components/Intro/Intro'
import SearchInput from "./src/components/SearchInput/SearchInput";
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './src/screens/Login'
import Navigator from './router/navigator'

const Stack = createStackNavigator();

export default class App extends Component {

    constructor(props) {
        super(props);
    }



    render() {

        return ( 
        <View style = { styles.container } >
            <NavigationContainer initialRouteName = "Home" >
                <Stack.Navigator screenOptions = {{ headerShown: false } } >
                    <Stack.Screen name = "Home" component = { Navigator }/> 
                </Stack.Navigator>
            </NavigationContainer> 
        </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        height: "100%"
    }

});