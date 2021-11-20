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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../style/AddTitleAndDesc.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
export default class AddTitleAndDesc extends Component {
    richText = React.createRef();
    
    constructor (props) {
      super(props);
      this.state = {
        foodTitle: '',
        foodDesc: '',
      }
    }
    

    componentDidMount = async() => {
      //this.props.route.params.imagesAWS comin' from AddFood Screen
      
    }
    previousButton = () => {
      this.props.navigation.goBack()
    }
    nextButton = async () => {
      if(this.state.foodDesc.trim() == ""){
        Alert.alert('Warning', `Food description field can not be empty`,[
          {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
        ]);
      }
      else if(this.state.foodDesc.trim().length < 1){
        Alert.alert('Warning', `Food description is too short`,[
          {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
        ]);
      }
      else if(this.state.foodTitle.trim() == ""){
        Alert.alert('Warning', `Food title field can not be empty`,[
          {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
        ]);
      }
      else if(this.state.foodTitle.trim().length < 1){
        Alert.alert('Warning', `Food title is too short`,[
          {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
        ]);
      }
      else{
        const userID = await AsyncStorage.getItem('userID');
        const userFood = await fetch('http://localhost:3000/foods/getbyuserid',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userID: userID
          })
        }).then(res => res.json())

        userFood?.map(food => {
          if(food.foodName == this.state.foodTitle.trim()){ 
            Alert.alert('Warning', `You already have a food with same name!\nPlease change the food name!`,[
              {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
            ]);
            return;
          } 
        })

        this.props.navigation.navigate('Select Ingredients', {
          imagesAWS: this.props.route.params.imagesAWS,
          foodTitle: this.state.foodTitle.trim(),
          foodDesc: this.state.foodDesc.trim()
        })
      }
    }
   
    render() {
      return (
        <View style={styles.container}>

              <View style={styles.imageTitleAndDescView}>
                <View style={[styles.inputView]}>
                  <TextInput 
                  style={styles.input} 
                  placeholder="Food Title" 
                  placeholderTextColor='#b1b1b3'
                  value={this.state.foodTitle} 
                  onChangeText={(value) => { this.setState({foodTitle: value})}}/>
                </View>
                <View>
                  <RichEditor
                    ref={this.richText}
                    placeholder="Description for your food"
                    initialHeight={300}
                    actions={[
                      actions.undo,
                      actions.setItalic,
                      actions.insertBulletsList,
                      actions.insertOrderedList,
                    ]}
                    value={this.state.foodDesc}
                    onChange={(value) => {this.setState({foodDesc: value})}}
                  />      
                   <RichToolbar
                        editor={this.richText}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#bfbfbf'}
                        actions={[
                          actions.keyboard,
                          actions.undo,
                          actions.redo,
                          actions.setBold,
                          actions.setItalic,
                          actions.setUnderline,
                          actions.insertBulletsList,
                          actions.insertOrderedList,
                          actions.removeFormat,
                        ]}
                    />
                </View>
              </View>

              
              <TouchableOpacity style={styles.previousButtonTO} onPress={this.previousButton}>
                <MaterialCommunityIcons name='chevron-left'
                  size = { 25 }
                  style = {styles.previousButtonIcon}
                  color = '#FFF'/>
                <Text style={styles.previousButtonTitle}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButtonTO} onPress={this.nextButton}>
                <Text style={styles.nextButtonTitle}>Next</Text>
                <MaterialCommunityIcons name='chevron-right'
                  size = { 25 }
                  style = {styles.nextButtonIcon}
                  color = '#FFF'/>
              </TouchableOpacity>
        </View>
      );
    }
  }
