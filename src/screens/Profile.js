import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
  Alert,
  AsyncStorage,
  Appearance
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/Profile.scss';;
import Login from "./Login";

export default class Profile extends Component {

    constructor (props) {
      super(props);
      this.state = {
        user: {}
      }
    }

    componentDidMount = async () => {
        const userID = await AsyncStorage.getItem('userID')
        const currentUser = await fetch('http://localhost:3000/users/getByUserID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userID: userID,
            })
        }).then(res=> 
            res.json()
        )
        this.setState({user: currentUser})
    }
  
    render() {
      return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.flexContainer}> 
                    <LinearGradient style={styles.gradientBackground} colors={['#fc291d', '#ff3f34']} >
                        <View style={styles.logoAlignment}>
                            <Image
                            style={styles.logo}
                            source={require('../images/logo.png')}
                            />
                        </View>
                        <View style={styles.accountEmailView}>
                            <Text style={styles.accountEmail}>{this.state.user.userEmail}</Text>
                        </View>
                    </LinearGradient>
                    <View style={styles.solidBackground}>
                        <TouchableOpacity onPress={() => {
                            AsyncStorage.setItem('loginAuth', '0'); 
                            AsyncStorage.setItem('userID', '0')
                            this.props.navigation.navigate('Home');
                        }}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </TouchableWithoutFeedback>
      );
    }
  }
  
  const embeddedStyle = StyleSheet.create({
  
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
  
      elevation: 8,
    },
    shadowSignup: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
  
      elevation: 24,
    }
  
  })