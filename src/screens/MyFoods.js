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

import styles from '../style/MyFoods.scss';;
import Login from "./Login";

export default class MyFoods extends Component {

    constructor (props) {
      super(props);
      this.state = {
        user: {},
        fullName: '',
        email: ''
      }
    }

    componentDidMount = async() => {
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
        this.setState({
            fullName: currentUser.userFullName,
            email: currentUser.userEmail
        })
        
    }

    updateUserInformation = async () => {
        const {email, fullName} = this.state
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

        if(currentUser.userFullName == fullName && currentUser.userEmail == email){
          Alert.alert('Error', `You have not changed any information!`,[
            {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
          ]);
        }else if(currentUser.userEmail!=email){
            Alert.alert('Email Update Warning', `If you agree to change email address, you will be logged out of your account and you will have to login again with your new email address!`,[
                {text: 'OK', onPress: async () => {
                    const updatedUser = await fetch('http://localhost:3000/users/update', {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                    userID: userID,
                    userFullName: fullName,
                    userEmail: email
                    })
                    }).then(res=> 
                        res.json()
                    ).then(res=> {
                        console.log(res)
                    })
                    await AsyncStorage.setItem('userID','0')
                    await AsyncStorage.setItem('loginAuth','0')
                    this.props.navigation.navigate("Home")
                }
                
            },
            {text: "Cancel", onPress: () => {console.log('alert box closed')}}
            ]);
            
        }
    }
    deleteUser = async() => {
        const userID = await AsyncStorage.getItem('userID')
        console.log(userID)
        Alert.alert('Delete Warning', `Are you sure you want to delete your account?`,[
            {text: 'OK', onPress: async () => {
                const deletedUser = await fetch('http://localhost:3000/users/delete', {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        userID: userID
                    })
                }).then(res => 
                    res.json()
                ).then(res=> {
                    console.log(res)
                })
                await AsyncStorage.setItem('userID','0')
                await AsyncStorage.setItem('loginAuth','0')
                this.props.navigation.navigate("Home")
            }
            
        },
        {text: "Cancel", onPress: () => {console.log('alert box closed')}}
        ]);
           
        
    }
    
  
    render() {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.container}>
                <View style={styles.foods}>
                    <View style={styles.foodImageView}>
                        <Image 
                            style={styles.foodPicture}
                            source={require('../images/foods/2.jpeg')}
                        />    
                    </View>
                    <View style={styles.foodDescriptionView}>
                        <View style={styles.foodDescription}>
                            <Text>asd</Text>
                        </View>
                        <View style={styles.foodIngredients}>
                            <Text>asdqwesd</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
      );
    }
  }