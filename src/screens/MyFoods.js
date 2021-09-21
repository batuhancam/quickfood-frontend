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

import styles from '../style/MyFoods.scss';
import Foods from '../components/Foods/Foods'

export default class MyFoods extends Component {

    constructor (props) {
      super(props);
      this.state = {
        user: {},
        fullName: '',
        email: '',
        foods: {}
      }
    }

    componentDidMount = async() => {
        const userID = await AsyncStorage.getItem('userID')
        const foods = await fetch('http://localhost:3000/foods/getByUserID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userID: userID,
            })
        }).then(res=> 
            res.json()
        )
        this.setState({foods: foods})
    }
    
  
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.foods}>
                <Foods allFoods={this.state.foods} navigation={this.props.navigation} />
            </View>
        </View>
      );
    }
  }
