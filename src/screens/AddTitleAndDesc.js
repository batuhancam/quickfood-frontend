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
      const defaultActions = [
        actions.insertImage,
        actions.setBold,
        actions.setItalic,
        actions.insertBulletsList,
        actions.insertOrderedList,
        actions.insertLink
      ];
    }
    

    componentDidMount = async() => {
      //this.props.route.params.imagesAWS comin' from AddFood Screen
      
    }
    nextButton = () => {
      this.props.navigation.navigate('Select Ingredients', {
        imagesAWS: this.props.route.params.imagesAWS,
        foodTitle: this.state.foodTitle,
        foodDesc: this.state.foodDesc
      })
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
                    actions={this.defaultActions}
                    value={this.state.foodDesc}
                    onChange={(value) => {console.log(value);this.setState({foodDesc: value})}}
                  />      
                   <RichToolbar
                        editor={this.richText}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#bfbfbf'}
                    />
                </View>
              </View>

              
              <TouchableOpacity style={styles.previousButtonTO}>
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
