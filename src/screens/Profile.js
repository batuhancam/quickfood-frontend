import React, { Component } from "react";
import {
  View,
  ScrollView,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
    accountInformation = () => {
      this.props.navigation.navigate('AccountInformation')
    }

    logout = async () => {
      AsyncStorage.setItem('loginAuth', '0'); 
      AsyncStorage.setItem('userID', '0')
      this.props.navigation.navigate('Home');
    }
  
    render() {
      const {user} = this.state;
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
                            <Text style={styles.accountEmail}>{user.userEmail}</Text>
                        </View>
                    </LinearGradient>
                    <ScrollView style={styles.solidBackground}>
                      <TouchableOpacity style={styles.profileListItem} onPress={this.accountInformation}>
                            <View style={styles.profileListItemLeftAlignment}>
                              <MaterialCommunityIcons name = 'cog-outline'
                                  size = { 25 }
                                  style = {{ marginRight: 0 }}
                                  color = '#eb4b3b'/>
                              <Text style={styles.profileListItemTitle}>Account Information</Text>
                              
                            </View>
                              <MaterialCommunityIcons name = 'menu-right'
                                  size = { 30 }
                                  style = {{ marginRight: 0 }}
                                  color = '#e22218' />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.profileListItem} onPress={this.logout}>
                            <View style={styles.profileListItemLeftAlignment}>
                              <MaterialCommunityIcons name = 'food'
                                  size = { 25 }
                                  style = {{ marginRight: 0 }}
                                  color = '#eb793b' />
                              <Text style={styles.profileListItemTitle}>My Foods</Text>
                              
                            </View>
                              <MaterialCommunityIcons name = 'menu-right'
                                  size = { 30 }
                                  style = {{ marginRight: 0 }}
                                  color = '#e22218' />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.profileListItem}>
                            <View style={styles.profileListItemLeftAlignment}>
                              <MaterialCommunityIcons name = 'star-outline'
                                  size = { 25 }
                                  style = {{ marginRight: 0 }}
                                  color = '#ebc03b' />
                              <Text style={styles.profileListItemTitle}>Favorites</Text>
                              
                            </View>
                              <MaterialCommunityIcons name = 'menu-right'
                                  size = { 30 }
                                  style = {{ marginRight: 0 }}
                                  color = '#e22218' />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.profileListItem} onPress={this.logout}>
                          <View style={styles.profileListItemLeftAlignment}>
                            <MaterialCommunityIcons name = 'logout'
                                size = { 25 }
                                style = {{ marginRight: 0 }}
                                color = '#454545' />
                            <Text style={styles.profileListItemTitle}>Logout</Text>
                            
                          </View>
                            <MaterialCommunityIcons name = 'menu-right'
                                size = { 30 }
                                style = {{ marginRight: 0 }}
                                color = '#e22218' />
                      </TouchableOpacity>
                    </ScrollView>
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