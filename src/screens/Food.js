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
import HTMLView from 'react-native-htmlview';
import { SliderBox } from "react-native-image-slider-box";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

import styles from '../style/Food.scss';

export default class Food extends Component {

    constructor (props) {
      super(props);
      this.state = {
        fullName: '',
        food: {},
        images: [],
        isLiked: false
      }
    }

    fetchData = async () => {
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
        food.foodPicturePaths = Array.prototype.map.call(food.foodPicturePaths, path => {
          path = path
          return path
        })
        if(food.foodPicturePaths.length == 0) {
          food.foodPicturePaths = ['http://localhost:8081/src/images/defaultFoodImage.jpg']
        }
        const user = await fetch('http://localhost:3000/users/getByUserID',{
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            userID: food.userID
          })
        }).then(res => res.json());

        const isPostLiked = await fetch('http://localhost:3000/favorites/isLiked',{
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            userID: food.userID,
            foodID: foodID
          })
        }).then(res => res.json());
        console.log(food.foodPicturePaths)
        this.setState({food: food, images: food.foodPicturePaths, fullName: user.userFullName, isLiked: isPostLiked.status})
    }
    componentDidMount = () => {
      const { navigation } = this.props;
      this.fetchData();
      this.focusListener = navigation.addListener('focus', () => {
        this.fetchData();
      })
    }
    
    switchLike = async() => {
      const foodID = await AsyncStorage.getItem('foodID')
      const userID = await AsyncStorage.getItem('userID')
      const isPostLiked = await fetch('http://localhost:3000/favorites/switch',{
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            userID: userID,
            foodID: foodID
          })
        }).then(res => res.json());
        this.setState({isLiked: !this.state.isLiked})
      
    }
    render() {
      const {food, fullName, isLiked} = this.state
      return (
        <View style={styles.container}>
            <View style={styles.foods}>
              <SliderBox 
                images={this.state.images}
                sliderBoxHeight={300}
                disableOnPress={true}
                dotColor="#ff3f34"
                inactiveDotColor="#90A4AE" />

                <View style={styles.foodHeader}>
                  <View style={styles.foodTitleView}>
                    <Text style={styles.foodTitle}>{food.foodName} by {fullName}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name={isLiked ? 'star' : 'star-outline'}
                    size={25}
                    style={styles.starIcon}
                    color={isLiked ? '#ff3f34' : '#222'}
                    onPress={this.switchLike}
                  />
                </View>
                <View style={styles.foodDescriptionView}>
                  <Text style={styles.foodDescription}></Text>
                  <HTMLView
                    style={styles.foodDescription}
                    value={food.foodDescription}
                  />  
                </View>
            </View>
        </View>
      );
    }
  }
