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
  Appearance,
  SafeAreaView
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageDisplayer from "./imageDisplayer";
import styles from './Foods.scss';

export default class Foods extends Component {

    constructor (props) {
      super(props);
      this.state = {
        userID: ""
      } 
    }

    componentDidMount = async( ) => {
        // console.log(this.props.allFoods[0].foodName)
    }
    addFavorites = async (foodID, icon) => {
      const userID = await AsyncStorage.getItem('userID')
      console.log(icon)
    }



    displayFoods =  () => {
        const foods = this.props.allFoods;
        const {userID} = this.state
        return Array.prototype.map.call(foods, (food) => {
            const foodImage = food.foodPicturePaths[0]                
           
            return (
              <TouchableOpacity key={food._id} onPress={async ()=> {
                AsyncStorage.setItem('foodID', food._id);
                this.props.navigation.navigate('Food')
              }}>
                <View style={styles.food} >
                    <ImageDisplayer
                        path={foodImage}
                    />
                    <View style={styles.foodDescView}>
                      <Text style={styles.foodTitle}>{food.foodName}</Text>
                      <MaterialCommunityIcons name='star-outline'
                        key={food._id}
                        size = { 25 }
                        style = {styles.heartIcon}
                        onPress={(icon)=> {this.addFavorites(food._id, icon)}}
                        color = '#222'/>
                    </View>
                </View>
              </TouchableOpacity>
            )
        })
    }

   
  
    render() {
      return (
        <ScrollView style={styles.container} > 
            {this.displayFoods()}
        </ScrollView>
      );
    }
  }
