import React, { Component } from "react";
import {
    KeyboardAvoidingView,
    View,
    StyleSheet,
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
import Food from "./src/screens/Food";
import ShowFoods from "./src/screens/ShowFoods";
import ShowFood from "./src/screens/ShowFood";
const Stack = createStackNavigator();

export default class App extends Component {

    constructor(props) {
        super(props);
    }



    render() {

        return ( 
        <View style = { styles.container } >
            <NavigationContainer initialRouteName = "Home" >
                <Stack.Navigator >
                    <Stack.Screen name = "Home" component = { Navigator } options = {{headerShown: false}}/> 

                    <Stack.Screen name = "Show Foods" component = { ShowFoods } 
                        options={({ route }) => ({ 
                            categoryID: route.params.categoryID ? route.params.categoryID : 0,
                            categoryName: route.params.categoryName ? route.params.categoryName : 0,
                            ingredients: route.params.ingredients ? route.params.ingredients : 0,
                            title: route.params.categoryName ? route.params.categoryName : 'Foods',
                            headerBackTitleVisible: false
                        })
                    }
                    /> 
                    
                    <Stack.Screen name = "Show Food" component = { ShowFood } 
                        options={({ route }) => ({ 
                            categoryID: route.params.categoryID,
                            title: route.params.name,
                            headerBackTitleVisible: false
                        })
                        
                    }
                    /> 
                    
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