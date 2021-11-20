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
import Foods from "../components/Foods/Foods";
import styles from '../style/Favorites.scss';
import ContentLoader, { Facebook, Rect, Circle } from 'react-content-loader/native'

export default class Favorites extends Component {

    constructor (props) {
      super(props);
      this.state = {
        fullName: '',
        food: [],
        images: [],
        isLiked: false,
        favoriteFoodIDs: [],
        loaded: false
      }
    }

    fetchData = async() => {
      const userID = await AsyncStorage.getItem('userID')
      const user = await fetch('http://localhost:3000/users/getByUserID',{
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          userID: userID
        })
      }).then(res => res.json());
      this.setState({fullName: user.fullName})

      const favoriteFoodIDs = await fetch('http://localhost:3000/favorites/getByUserID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userID: userID,
          })
      }).then(res=> 
          res.json()
      )
      this.setState({favoriteFoodIDs: favoriteFoodIDs})
      favoriteFoodIDs.map( async (foodIDs) => {

        const food = await fetch('http://localhost:3000/foods/getByID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: foodIDs.foodID,
          })
        }).then(res=> 
          res.json()
        ).then(res=> {
          if(res){
            this.setState({food: [...this.state.food, res], loaded: true})
          }
        }).catch(err => 
          console.log(err))
        })
    }

    componentDidMount = () => {
      const { navigation } = this.props;
      this.setState({loaded:false})
      this.fetchData();
      this.focusListener = navigation.addListener('focus', () => {
        this.setState({loaded:false, food: []})
        this.fetchData();
      })
    }



    render() {
      const { fullName, food} = this.state
      return (
        <View style={styles.container}>
          {
            this.state.loaded ?
            <View style={styles.foods}>
               <Foods allFoods={this.state.food} navigation={this.props.navigation} />
            </View>
            :
            <ContentLoader
              width={550}
              height={450}
              backgroundColor="#f0f0f0"
              foregroundColor="#dedede"
            >
              <Rect x="0" y="304" rx="4" ry="4" width="271" height="9" />
              <Rect x="0" y="323" rx="3" ry="3" width="119" height="6" />
              <Rect x="0" y="20" rx="10" ry="10" width="388" height="217" />
            </ContentLoader>
            }
        </View>
      );
    }
  }
