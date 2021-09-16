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

import styles from '../style/Food.scss';

export default class Food extends Component {

    constructor (props) {
      super(props);
      this.state = {
        fullName: '',
        email: '',
        food: {}
      }
    }

    componentDidMount = async() => {
        const foodID = await AsyncStorage.getItem('foodID')
        const food = await fetch('http://localhost:3000/foods/getByID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: foodID,
            })
        }).then(res=> 
            res.json()
        )
        this.setState({food: food})
        console.log(food)
    }
    
  
    render() {
      const {food} = this.state
      return (
        <View style={styles.container}>
            <View style={styles.foods}>
                <Text>{food['foodName']}</Text>
            </View>
        </View>
      );
    }
  }
