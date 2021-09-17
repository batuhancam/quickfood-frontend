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
import ReactNativeComponentTree from'react-native';
import { throwStatement } from "@babel/types";

export default class Foods extends Component {
    constructor (props) {
      super(props);
      this.state = {
        favorites: {},
        favFoods: []
      } 
    }

    componentDidMount = async( ) => {
      const userID = await AsyncStorage.getItem('userID')
      const favoriteFoods = await fetch('http://localhost:3000/favorites/getByUserID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userID: userID,
            })
        }).then(res=> 
            res.json()
        )
        let favs = [];
        Array.prototype.forEach.call(favoriteFoods, (fav) => {
            favs.push(fav.foodID)
        })
        while(true){
          if(favs.length>favoriteFoods.length){
            favs.pop()
          }else{
            break;
          }
        }
        favs = favs.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
       
        this.setState({favorites: favoriteFoods, favFoods: favs})
    }
    switchFavorite = async (foodID,favs) => {
      const userID = await AsyncStorage.getItem('userID')
      const addFav = await fetch('http://localhost:3000/favorites/switch',{
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            userID: userID,
            foodID: foodID
          })
        }
      ).then(res=> res.json())
      // if(addFav.foodID!= null){
      //   var joined = this.state.favFoods.concat(favs);
      //   this.setState({ favFoods: joined })
      // }
      
    }

    updateState = (likedFoods) => {
      this.setState({favFoods: []})
      this.setState({favFoods: likedFoods})
    }



    displayFoods =  () => {

        const foods = this.props.allFoods;
        const {favorites} = this.state;
        let favs
        if(this.state.favFoods.length==0)
          favs = []
        else{
          favs = this.state.favFoods
        }

        return Array.prototype.map.call(foods, (food,index) => {
            const foodImage = food.foodPicturePaths[0]           
            
            while(true){
              if(favs.length>this.state.favFoods.length){
                favs.pop()
              }else{
                break;
              }
            }
            favs = favs.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);

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
                      <MaterialCommunityIcons name={this.state.favFoods.includes(food._id) ? 'star': 'star-outline'}
                        key={food._id}
                        size = { 25 }
                        style = {styles.heartIcon}
                        onPress={()=> {
                          this.switchFavorite(food._id);
                          if(favs.includes(food._id)){
                            favs = favs.filter(f => {
                              return food._id!=f
                            })
                          }else{
                            favs.push(food._id)
                          }
                          this.updateState(favs)
                        }}
                        color = {this.state.favFoods.includes(food._id) ? '#ff3f34': '#222'}/>
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
